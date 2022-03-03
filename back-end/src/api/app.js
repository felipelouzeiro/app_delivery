const express = require('express');
const cors = require('cors');
const path = require('path');
const errorHandler = require('../middlewares/errorHandler');
const router = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use('/images', express.static(path.resolve(__dirname, '../../public/images')));
app.use(errorHandler);

module.exports = app;
