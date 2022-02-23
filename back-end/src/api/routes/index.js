const express = require('express');
const registerRouter = require('./register');
const loginRouter = require('./login');

const router = express.Router();

router.use('/login', loginRouter);

router.use('/register', registerRouter);

module.exports = router;