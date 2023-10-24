const { History } = require('../models');

class HistoryController {
  static async showHistory(req, res, next) {
    try {
      const showAllHistory = await History.findAll({
        order: [['createdAt', 'DESC']],
      });

      if (!showAllHistory) {
        throw new Error('history_not_found');
      }

      res.status(200).json({
        statusCode: 200,
        message: 'Success get all history data',
        data: showAllHistory,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = HistoryController;
