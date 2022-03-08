const express = require('express');
const app = require('express')();
const cors = require('cors');
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET'],
  },
});
const errorHandler = require('../middlewares/errorHandler');
const router = require('./routes');

app.use(express.json());
app.use(cors());
app.use(router);
app.use('/images', express.static(path.resolve(__dirname, '../../public/images')));
app.use(errorHandler);
require('../sockets/status')(io);

module.exports = http;
