const productRouter = require('express').Router();
const { getProductController } = require('../../controllers/product');
const { authentication } = require('../../middlewares/authentication');

productRouter.get('/', authentication, getProductController);

module.exports = productRouter;