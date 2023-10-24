const { Product, User, History } = require('../models');

class DataController {
  static async addProduct(req, res, next) {
    try {
      const authorId = req.user.id;
      const userEmail = req.user.email;
      const { name, description, price, stock, imgUrl, categoryId } = req.body;

      const createProduct = await Product.create({
        name,
        description,
        price,
        stock,
        imgUrl,
        authorId,
        categoryId,
      });

      await History.create({
        name: createProduct.name,
        description: `New product with id ${createProduct.id} created`,
        updatedBy: userEmail,
      });

      res.status(201).json({
        statusCode: 201,
        message: `Product ${createProduct.name} create successfully`,
        data: createProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  static async showProducts(req, res, next) {
    try {
      const getAllProduct = await Product.findAll({
        include: User,
        order: [['id', 'ASC']],
      });

      if (!getAllProduct) {
        throw new Error('notfoundproduct');
      }

      res.status(200).json({
        statusCode: 200,
        message: 'Get All Product Successfully',
        data: getAllProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  static async showProductDetail(req, res, next) {
    try {
      const { id } = req.params;

      const showProductDetail = await Product.findByPk(id);

      if (!showProductDetail) {
        throw new Error('notfoundproductdetail');
      }

      res.status(200).json({
        statusCode: 200,
        message: 'Get Product by Id Successfully',
        data: showProductDetail,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;

      const findDeleteProduct = await Product.findOne({
        where: {
          id,
        },
      });

      const deletedProduct = await Product.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: `${findDeleteProduct.name} success to delete`,
        data: deletedProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  static async editProduct(req, res, next) {
    try {
      const { id } = req.params;
      const authorId = req.user.id;
      const userEmail = req.user.email;
      const { name, description, price, stock, imgUrl, categoryId } = req.body;

      const editProduct = await Product.update(
        {
          name,
          description,
          price,
          stock,
          imgUrl,
          categoryId,
          authorId,
        },
        {
          where: {
            id,
          },
        }
      );

      const updatedProduct = await Product.findByPk(id);

      await History.create({
        name: updatedProduct.name,
        description: `Product with id ${updatedProduct.id} updated`,
        updatedBy: userEmail,
      });

      res.status(200).json({
        statusCode: 200,
        message: `Edit Product ${updatedProduct.name} Successfully`,
        data: updatedProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  static async editStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const userEmail = req.user.email;

      const foundStatus = await Product.findByPk(id);

      const updateStatus = await Product.update(
        {
          status,
        },
        {
          where: {
            id,
          },
        }
      );

      const updatedData = await Product.findByPk(id);

      await History.create({
        name: updatedData.name,
        description: `Product status with id ${updatedData.id} has been updated from ${foundStatus.status} to ${updatedData.status}`,
        updatedBy: userEmail,
      });

      res.status(200).json({
        statusCode: 200,
        message: `Product ${updatedData.name} status successfully updated.`,
        data: updatedData,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DataController;
