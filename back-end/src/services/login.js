const errorConstructor = require('../utils/errorConstructor');
const { loginSchema } = require('../utils/joiSchemas');
const { unauthorized } = require('../utils/dictionary');
const { User } = require('../database/models');
const { generateToken } = require('../utils/JWTServices');

const loginService = async (email, password) => {
  const { error } = loginSchema.validate({ email, password });

  if (error) throw errorConstructor(unauthorized, error.message);

  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    throw errorConstructor(unauthorized, 'Incorrect email or password');
  }

  const { password: _password, ...userWithoutPassword } = user;

  const token = generateToken(userWithoutPassword);

  return token;
};

module.exports = {
  loginService,
};
