const md5 = require('md5');
const { user } = require('../database/models');
const { badRequest, conflict } = require('../utils/dictionary');
const errorConstructor = require('../utils/errorConstructor');
const { registerSchema } = require('../utils/joiSchemas');
const { generateToken } = require('../utils/JWTServices');

const registerUser = async (name, email, password, role) => {
  const { error } = registerSchema.validate({ name, email, password, role });
  if (error) throw errorConstructor(badRequest, error.message);

  const emailExist = await user.findOne({ where: { email } });
  if (emailExist) throw errorConstructor(conflict, 'Email already exist');

  const hash = md5(password);
  
  const { dataValues } = await user.create({ name, email, password: hash, role });
  
  const { password: _password, ...userWithoutPassword } = dataValues;

  const token = generateToken(userWithoutPassword);

  const { id: _id, ...userWithoutId } = userWithoutPassword;

  const response = {
    ...userWithoutId,
    token,
  };

  return response;
};

module.exports = {
  registerUser,
};
