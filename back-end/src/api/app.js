const express = require('express');
const path = require('path');
const errorHandler = require('../middlewares/errorHandler');
const router = require('./routes');

const app = express();

app.use(express.json());
app.use(router);
app.use('/images', express.static(path.resolve(__dirname, '../images')));
app.use(errorHandler);

module.exports = app;
