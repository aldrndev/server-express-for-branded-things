const { Category } = require('../models');

class CategoryController {
  static async showCategories(req, res, next) {
    try {
      const showCategories = await Category.findAll({
        order: [['id', 'ASC']],
      });

      if (!showCategories) {
        throw new Error('notfoundcategory');
      }

      res.status(200).json({
        statusCode: 200,
        message: 'Get All Categories Successfully',
        data: showCategories,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addCategory(req, res, next) {
    try {
      const { name } = req.body;

      const addCategory = await Category.create({
        name,
      });

      res.status(201).json({
        statusCode: 201,
        message: `Category ${addCategory.name} success created`,
        data: addCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;

      const foundDeleteCategory = await Category.findOne({
        where: {
          id,
        },
      });

      if (!foundDeleteCategory) {
        throw new Error('notfoundcategory');
      }

      const deleteCategory = await Category.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: `${foundDeleteCategory.name} success deleted`,
        data: deleteCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  static async editCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const editCategory = await Category.update(
        {
          name,
        },
        {
          where: { id },
        }
      );

      const updatedCategory = await Category.findByPk(id);

      res.status(200).json({
        statusCode: 200,
        message: `Category ${updatedCategory.name} has been updated`,
        data: updatedCategory,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;
