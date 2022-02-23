const errorConstructor = require('../utils/errorConstructor');
const { loginSchema } = require('../utils/joiSchemas');
const { unauthorized } = require('../utils/dictionary');
const { user } = require('../database/models');
const { generateToken } = require('../utils/auth');
const md5 = require('md5')

const loginService = async (email, password) => {
  const { error } = loginSchema.validate({ email, password });

  if (error) throw errorConstructor(unauthorized, error.message);

  const { dataValues } = await user.findOne({ where: { email } });
  const encryptedPassword = md5(password);

  if (!dataValues || dataValues.password !== encryptedPassword) {
    throw errorConstructor(unauthorized, 'Incorrect email or password');
  }

  const { password: _password, ...userWithoutPassword } = dataValues;

  const token = generateToken(userWithoutPassword);

  return token;
};

module.exports = {
  loginService,
};
