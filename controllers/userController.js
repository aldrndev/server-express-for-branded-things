const { checkPwd } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');
const { User } = require('../models');

//google auth
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      const role = 'admin';

      const register = await User.create({
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      });

      res.status(201).json({
        statusCode: 201,
        message: `Success register account ${register.username}`,
        data: register,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const foundUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!foundUser) {
        throw new Error('user_not_found');
      }

      if (!checkPwd(password, foundUser.password)) {
        throw new Error('invalid_password');
      }

      //data yang di kirim
      const payload = {
        id: foundUser.id,
        email: foundUser.email,
        username: foundUser.username,
        role: foundUser.role,
      };

      const token = createToken(payload);

      res.status(200).json({
        statusCode: 200,
        data: {
          access_token: token,
          message: `User ${payload.username} logged in successfully`,
          user: payload,
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async loginGoogle(req, res, next) {
    try {
      const { token } = req.body;

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
      });

      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.email.split('@')[0],
          password: '123456',
          role: 'staff',
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
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
