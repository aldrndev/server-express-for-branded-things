const express = require('express');
const DataController = require('../controllers/dataController');
const {
  deleteProductAuthorization,
  editProductAuthorization,
  editStatusAuthorization,
} = require('../middlewares/authorization');
const router = express.Router();

router.post('/add', DataController.addProduct);

router.get('/all', DataController.showProducts);

router.get('/:id/detail', DataController.showProductDetail);

router.delete(
  '/:id/delete',
  deleteProductAuthorization,
  DataController.deleteProduct
);

router.put('/:id/edit', editProductAuthorization, DataController.editProduct);
router.patch(
  '/:id/edit-status',
  editStatusAuthorization,
  DataController.editStatus
);

module.exports = router;
