const express = require('express');
const registerRouter = require('./register');
const loginRouter = require('./login');
const saleRouter = require('./sale');
const productRouter = require('./product');
const userRouter = require('./user');

const router = express.Router();

router.use('/login', loginRouter);
router.use('/sales', saleRouter);
router.use('/register', registerRouter);
router.use('/product', productRouter);
router.use('/user', userRouter);

module.exports = router;