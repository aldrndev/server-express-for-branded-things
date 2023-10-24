const express = require('express');
const CustomerController = require('../controllers/customerController');
const { authenticateCustomer } = require('../middlewares/authentication');

const router = express.Router();

router.post('/login', CustomerController.login);
router.post('/register', CustomerController.register);
router.post('/login-google', CustomerController.loginGoogle);
router.get('/product', CustomerController.showProduct);
router.get('/product/:productId', CustomerController.productDetail);

router.use(authenticateCustomer);
router.get('/wishlist', CustomerController.showWishlist);
router.get('/wishlist/:id', CustomerController.getWishlist);
router.post('/wishlist/:productId', CustomerController.addWishlist);
router.delete('/wishlist/:productId/delete', CustomerController.deleteWishlist);

module.exports = router;
