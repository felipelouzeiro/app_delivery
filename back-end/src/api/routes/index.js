const express = require('express');
const registerRouter = require('./register');
const loginRouter = require('./login');
const saleRouter = require('./sale');

const router = express.Router();

router.use('/login', loginRouter);
router.use('/sales', saleRouter);
router.use('/register', registerRouter);

module.exports = router;