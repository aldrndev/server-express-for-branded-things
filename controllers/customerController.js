const { checkPwd } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');
const { Customer, Wishlist, Product, Category } = require('../models');
const { Op } = require('sequelize');

//google auth

const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');
const client = new OAuth2Client(process.env.CLIENT_ID_CUSTOMER);

class CustomerController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const checkUser = await Customer.findOne({
        where: {
          email,
        },
      });

      if (!checkUser) {
        throw new Error('user_not_found');
      }

      if (!checkPwd(password, checkUser.password)) {
        throw new Error('invalid_password');
      }

      const payload = {
        id: checkUser.id,
        email: checkUser.email,
        username: checkUser.username,
        role: checkUser.role,
      };

      const token = createToken(payload);

      res.status(200).json({
        statusCode: 200,
        data: {
          access_token: token,
          message: `User ${checkUser.username} logged in successfully`,
          user: payload,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      const customerCreate = await Customer.create({
        username,
        email,
        password,
        role: 'customer',
        phoneNumber,
        address,
      });

      res.status(201).json({
        statusCode: 201,
        message: `User ${customerCreate.username} has been created`,
        data: customerCreate,
      });
    } catch (error) {
      next(error);
    }
  }

  static async loginGoogle(req, res, next) {
    try {
      const { token } = req.body;

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID_CUSTOMER,
      });

      const payload = ticket.getPayload();

      const [user, created] = await Customer.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.email.split('@')[0],
          password: '123456',
          role: 'customer',
          phoneNumber: '081300000',
          address: 'jakarta',
        },
      });

      const customPayload = {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      };

      const getToken = createToken(customPayload);

      res.status(200).json({
        statusCode: 200,
        access_token: getToken,
        message: `User ${customPayload.username} logged in successfully`,
        data: customPayload,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addWishlist(req, res, next) {
    try {
      const { productId } = req.params;
      const { id: CustomerId } = req.user;

      const findProduct = await Product.findByPk(productId);

      if (!findProduct) {
        throw new Error('notfoundproduct');
      }

      const checkWishlist = await Wishlist.findOne({
        where: {
          ProductId: productId,
          CustomerId,
        },
      });

      if (checkWishlist) {
        throw new Error('product_already_wishlisted');
      }

      const createWishlist = await Wishlist.create({
        CustomerId,
        ProductId: productId,
      });

      res.status(201).json({
        statusCode: 201,
        message: `Product ${findProduct.name} has been added to your wishlist`,
        data: createWishlist,
      });
    } catch (error) {
      next(error);
    }
  }

  static async showWishlist(req, res, next) {
    try {
      const { id } = req.user;

      const getWishlist = await Wishlist.findAll({
        where: {
          CustomerId: id,
        },
        include: [Customer, Product],
      });

      if (getWishlist.length === 0) {
        res.status(200).json({
          statusCode: 200,
          message: `No wishlist found for the user`,
          data: [],
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: `Show wishlist for ${getWishlist[0].Customer.username} successfully`,
        data: getWishlist,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteWishlist(req, res, next) {
    try {
      const { productId } = req.params;
      const { id: CustomerId } = req.user;

      const findWishlist = await Wishlist.findOne({
        where: {
          ProductId: productId,
          CustomerId,
        },
        include: [Product, Customer],
      });

      if (!findWishlist) {
        throw new Error('Wishlist not found');
      }

      await Wishlist.destroy({
        where: {
          id: findWishlist.id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: `Wishlist ${findWishlist.Product.name} has been deleted from your wishlist`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async showProduct(req, res, next) {
    try {
      const nameQuery = req.query.name
        ? { name: { [Op.iLike]: `%${req.query.name}%` } }
        : {};

      // Untuk paginasi
      const limit = 8;
      const page = req.query.page ? Number(req.query.page) : 1;
      const offset = (page - 1) * limit;

      const { count, rows } = await Product.findAndCountAll({
        where: {
          status: 'Active',
          ...nameQuery,
        },
        include: Category,
        limit: limit,
        offset: offset,
        order: [['createdAt', 'DESC']],
      });

      if (count === 0) {
        throw new Error('notfoundproduct');
      }

      res.status(200).json({
        statusCode: 200,
        message: `Get all product successfully`,
        data: rows,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(count / limit),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async productDetail(req, res, next) {
    try {
      const { productId } = req.params;

      const getProduct = await Product.findOne({
        where: {
          id: productId,
        },
        include: Category,
      });

      if (!getProduct) {
        throw new Error('notfoundproductdetail');
      }
      const { data } = await axios({
        url: 'https://api.qr-code-generator.com/v1/create',
        methods: 'GET',
        params: {
          'access-token':
            'esxJfJZOaZdz0D39UyDznoHVQ4RsU6acDrLf4zER7jqqcM_E7C49OdJhqpVDnu_z',
          qr_code_text: `https://zaloris.web.app/product/detail/${productId}`,
          image_format: 'PNG',
          image_width: 250,
          download: 1,
        },
        responseType: 'arraybuffer',
      });
      const base64 = btoa(
        new Uint8Array(data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );

      res.status(200).json({
        statusCode: 200,
        message: `Get Product ${getProduct.name} Successfully`,
        data: { getProduct, qrCode: base64 },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getWishlist(req, res, next) {
    try {
      const { id } = req.params;
      const { id: customerId } = req.user;

      const findWishlist = await Wishlist.findOne({
        where: {
          CustomerId: customerId,
          ProductId: id,
        },
      });

      if (!findWishlist) {
        res.status(200).json({
          statusCode: 200,
          message: `Wishlist not found`,
          data: null,
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: `Get wishlist succcessfully`,
        data: findWishlist,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CustomerController;
