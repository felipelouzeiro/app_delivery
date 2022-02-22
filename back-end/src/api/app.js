const express = require('express');
const errorHandler = require('../middlewares/errorHandler');
const router = require('./routes');

const app = express();

app.use(express.json());
app.use(router);
app.use(errorHandler);

module.exports = app;
