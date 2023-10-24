const express = require('express');
const CategoryController = require('../controllers/categoryController');
const router = express.Router();

router.get('/all', CategoryController.showCategories);
router.post('/add', CategoryController.addCategory);
router.delete('/:id/delete', CategoryController.deleteCategory);
router.put('/:id/edit', CategoryController.editCategory);

module.exports = router;
