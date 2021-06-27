const tradeRouter = require('express').Router();

const tradeController = require('../controllers/tradeController');

tradeRouter.post('', tradeController.createTrade);

tradeRouter.get('', tradeController.getTrades);

tradeRouter.get('/:id', tradeController.getTradeById);

module.exports = tradeRouter;