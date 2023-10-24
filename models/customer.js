'use strict';
const { Model } = require('sequelize');
const { hashPwd } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Wishlist);
    }
  }
  Customer.init(
    {
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'Email address already in use!',
        },
        validate: {
          notEmpty: {
            msg: 'Email is required',
          },
          notNull: {
            msg: 'Email is required',
          },
          isEmail: {
            msg: 'Format email is invalid',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Password is required',
          },
          notNull: {
            msg: 'Password is required',
          },
          len: {
            args: [5],
            msg: 'Password must be at least 5 characters',
          },
        },
      },
      role: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Customer',
      hooks: {
        beforeCreate: (customer, option) => {
          customer.password = hashPwd(customer.password);
        },
      },
    }
  );
  return Customer;
};
