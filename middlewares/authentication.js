const { verifyToken } = require('../helpers/jwt');
const { User, Customer } = require('../models');

const authenticate = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw new Error('Unauthorized');
    }

    const decoded = verifyToken(access_token);

    const foundUser = await User.findByPk(decoded.id);

    if (!foundUser) {
      throw new Error('Unauthorized');
    }
    req.user = decoded; // data dari payload yang di kirim saat login

    next();
  } catch (error) {
    next(error);
  }
};

const authenticateCustomer = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw new Error('Unauthorized');
    }

    const decoded = verifyToken(access_token);

    const customer = await Customer.findByPk(decoded.id);

    if (!customer) {
      throw new Error('Unauthorized');
    }
    req.user = decoded; // data dari payload yang di kirim saat login

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticate, authenticateCustomer };
