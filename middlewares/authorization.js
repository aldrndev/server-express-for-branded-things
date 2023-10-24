const { Product, Category } = require('../models');

async function deleteProductAuthorization(req, res, next) {
  try {
    const { id } = req.params;
    const currentUserId = req.user.id;
    const currentUserRole = req.user.role;

    const findDeleteProduct = await Product.findOne({ where: { id } });

    if (!findDeleteProduct) {
      throw new Error('notfounddeleteproduct');
    }

    if (
      findDeleteProduct.authorId !== currentUserId &&
      currentUserRole !== 'admin'
    ) {
      throw new Error('Forbidden');
    }

    next();
  } catch (error) {
    next(error);
  }
}

async function editProductAuthorization(req, res, next) {
  try {
    const { id } = req.params;
    const currentUserRole = req.user.role;
    const currentUserId = req.user.id;

    const foundEditProduct = await Product.findOne({
      where: {
        id,
      },
      include: Category,
    });

    if (!foundEditProduct) {
      throw new Error('not_found_edit_product');
    }

    if (
      currentUserRole !== 'admin' &&
      foundEditProduct.authorId !== currentUserId
    ) {
      throw new Error('forbidden_edit');
    }

    next();
  } catch (error) {
    next(error);
  }
}

async function editStatusAuthorization(req, res, next) {
  try {
    const { id } = req.params;
    const currentUserRole = req.user.role;

    const foundEditProduct = await Product.findOne({
      where: {
        id,
      },
    });

    if (!foundEditProduct) {
      throw new Error('not_found_edit_product');
    }

    if (currentUserRole !== 'admin') {
      throw new Error('forbidden_status');
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  deleteProductAuthorization,
  editProductAuthorization,
  editStatusAuthorization,
};
