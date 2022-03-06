const { user } = require('../database/models');

const getUserService = async () => {
  const users = await user.findAll();

  const UserData = users.map((client) => {
    const { password: _password, ...userInfo } = client.dataValues;
    return userInfo;
  });

  return UserData;
};

module.exports = {
  getUserService,
};
