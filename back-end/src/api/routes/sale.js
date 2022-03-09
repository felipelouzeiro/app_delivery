const saleRouter = require('express').Router();
const saleController = require('../../controllers/sale');
const { authentication } = require('../../middlewares/authentication');

saleRouter.post('/', authentication, saleController.register);
saleRouter.get('/:id', authentication, saleController.getWithProducts);
saleRouter.get('/', authentication, saleController.getAll);

module.exports = saleRouter;