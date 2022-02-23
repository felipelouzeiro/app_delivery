const jwt = require('jsonwebtoken');
const errorConstructor = require('./errorConstructor')
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

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretJwt);
    const { data } = decoded; 
    return data;
  } catch (error) {
    throw errorConstructor(Unauthorized, 'jwt malformed');
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
