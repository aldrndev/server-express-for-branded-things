'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, { foreignKey: 'categoryId' });
      Product.belongsTo(models.User, { foreignKey: 'authorId' });
      Product.hasMany(models.Wishlist);
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Name is required',
          },
          notNull: {
            msg: 'Name is required',
          },
        },
      },
      description: DataTypes.STRING,
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Price is required',
          },
          notNull: {
            msg: 'Price is required',
          },
          min: {
            args: 50000,
            msg: 'Min Price is 50.000',
          },
        },
      },
      stock: DataTypes.INTEGER,
      imgUrl: DataTypes.STRING,
      authorId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      status: {
        type: DataTypes.STRING,
        defaultValue: 'Active',
      },
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
