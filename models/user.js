'use strict';
const { Model } = require('sequelize');
const { hashPwd } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, { foreignKey: 'authorId' });
    }
  }
  User.init(
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
      modelName: 'User',
      hooks: {
        beforeCreate: (user, option) => {
          user.password = hashPwd(user.password);
        },
      },
    }
  );
  return User;
};
