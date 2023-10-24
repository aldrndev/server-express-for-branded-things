const errorHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (error.message === 'product_already_wishlisted') {
    statusCode = 400;
    message = 'This product already in your wishlist';
  }

  if (error.name === 'not_found_edit_product') {
    statusCode = 404;
    message = 'Edit product failed because the product not found';
  }

  if (error.name === 'history_not_found') {
    statusCode = 404;
    message = 'No history found';
  }

  if (error.message === 'notfoundcategory') {
    statusCode = 404;
    message = 'No category found';
  }

  if (
    error.name === 'SequelizeValidationError' ||
    error.name === 'SequelizeUniqueConstraintError'
  ) {
    statusCode = 400;
    message = error.errors.map((el) => {
      return el.message;
    });
  }

  if (error.message === 'wishlist_not_found') {
    statusCode = 404;
    message = 'Wishlist not found';
  }

  if (error.message === 'notfoundproduct') {
    statusCode = 404;
    message = 'No product found';
  }

  if (error.message === 'notfoundproductdetail') {
    statusCode = 404;
    message = 'Product detail not found';
  }

  if (error.message === 'notfounddeleteproduct') {
    statusCode = 404;
    message = 'Deleted product not found';
  }

  if (error.message === 'Unauthorized' || error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Please login first with your email and password';
  }

  if (error.message === 'Forbidden') {
    statusCode = 403;
    message = 'You dont have access to this action';
  }

  if (error.message === 'forbidden_edit') {
    statusCode = 403;
    message = 'You only allowed update your product';
  }

  if (error.message === 'forbidden_status') {
    statusCode = 403;
    message = 'Only admin allowed to this action';
  }

  if (
    error.message === 'user_not_found' ||
    error.message === 'invalid_password'
  ) {
    statusCode = 401;
    message = 'Invalid Username/Password';
  }

  res.status(statusCode).json({
    statusCode,
    message,
  });
};

module.exports = errorHandler;
