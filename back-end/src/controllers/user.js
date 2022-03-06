const { success } = require('../utils/dictionary');
const { getUserService } = require('../services/user');

const getUserController = async (req, res, next) => {
  try {
    const users = await getUserService();

    return res.status(success).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserController,
};