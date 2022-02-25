const express = require('express');
const registerRouter = require('./register');
const loginRouter = require('./login');
const saleRouter = require('./sale');
const productRouter = require('./product');

const router = express.Router();

router.use('/login', loginRouter);
router.use('/sales', saleRouter);
router.use('/register', registerRouter);
router.use('/product', productRouter);

module.exports = router;