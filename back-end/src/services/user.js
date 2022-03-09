const md5 = require('md5');
const { user } = require('../database/models');
const { registerSchema } = require('../utils/joiSchemas');
const errorConstructor = require('../utils/errorConstructor');
const { badRequest, conflict, unauthorized } = require('../utils/dictionary');

const getUserService = async () => {
  const users = await user.findAll();

  const UserData = users.map((client) => {
    const { password: _password, ...userInfo } = client.dataValues;
    return userInfo;
  });

  return UserData;
};

const createUserService = async (userPayload, admRole) => {
  const { name, email, password, role } = userPayload;
  const { error } = registerSchema.validate({ name, email, password, role });
  if (error) throw errorConstructor(badRequest, error.message);

  const emailExist = await user.findOne({ where: { email } });
  if (emailExist) throw errorConstructor(conflict, 'Email already exist');

  if (admRole !== 'administrator') {
    throw errorConstructor(unauthorized, 'User is not administrator'); 
  }

  const hash = md5(password);
  
  const { dataValues } = await user.create({ name, email, password: hash, role });

  return dataValues;
};

const deleteUserService = async (id, role) => {
  if (role !== 'administrator') {
    throw errorConstructor(unauthorized, 'User is not administrator'); 
  }
  await user.destroy({ where: { id } });

  return 'User deleted';
};

module.exports = {
  getUserService,
  createUserService,
  deleteUserService,
};
