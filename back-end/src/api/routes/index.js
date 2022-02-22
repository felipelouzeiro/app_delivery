const express = require('express');
const registerRouter = require('./register');

const router = express.Router();

// Ex: router.use('/users', usersRouter);
router.use('/register', registerRouter);

module.exports = router;