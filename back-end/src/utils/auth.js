const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const secretJwt = fs
  .readFileSync(
    path.join(`${__dirname}../../../jwt.evaluation.key`), {},
  ).toString();

const JWT_CONFIG = {
  expiresIn: 3600,
  algorithm: 'HS256',
};

const generateToken = (user) => {
  const { password: _password, ...userWithoutPassword } = user;
  
  const token = jwt.sign({ data: userWithoutPassword }, secretJwt, JWT_CONFIG);

  return token;
};

module.exports = {
  generateToken,
};
