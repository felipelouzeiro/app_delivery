const md5 = require('md5');
const { User } = require('../database/models');
const { badRequest, conflict } = require('../utils/dictionary');
const errorConstructor = require('../utils/errorConstructor');
const { registerSchema } = require('../utils/joiSchemas');

const registerUser = async (name, email, password, role) => {
  const { error } = registerSchema.validate({ name, email, password, role });
  if (error) throw errorConstructor(badRequest, error.message);

  const emailExist = await User.findOne({ where: { email } });
  if (emailExist) throw errorConstructor(conflict, 'Email already exist');

  const hash = md5(password);
  const { dataValues } = await User.create({ name, email, password: hash, role });
  
  return dataValues;
};

module.exports = {
  registerUser,
};
