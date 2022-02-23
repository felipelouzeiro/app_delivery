const saleRouter = require('express').Router();
const saleController = require('../../controllers/sale');
const { authentication } = require('../../middlewares/authentication');

saleRouter.post('/', authentication, saleController.register);

module.exports = saleRouter;