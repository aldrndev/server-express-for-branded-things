const express = require('express');
const HistoryController = require('../controllers/historyController');
const router = express.Router();

router.get('/all', HistoryController.showHistory);

module.exports = router;
