const md5 = require('md5');
const errorConstructor = require('../utils/errorConstructor');
const { loginSchema } = require('../utils/joiSchemas');
const { unauthorized, notFound } = require('../utils/dictionary');
const { user } = require('../database/models');
const { generateToken } = require('../utils/JWTServices');

const loginService = async (email, password) => {
  const { error } = loginSchema.validate({ email, password });

  if (error) throw errorConstructor(unauthorized, error.message);

  const storedUser = await user.findOne({ where: { email } });
  const encryptedPassword = md5(password);

  if (!storedUser || storedUser.dataValues.password !== encryptedPassword) {
    throw errorConstructor(notFound, 'Incorrect email or password');
  }

  const { password: _password, ...userWithoutPassword } = storedUser.dataValues;

  const token = generateToken(userWithoutPassword);

  return token;
};

module.exports = {
  loginService,
};
