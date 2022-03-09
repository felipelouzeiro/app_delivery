const { success } = require('../utils/dictionary');
const { getUserService } = require('../services/user');
const { createUserService } = require('../services/user');
const { deleteUserService } = require('../services/user');

const getUserController = async (_req, res, next) => {
  try {
    const users = await getUserService();

    return res.status(success).json(users);
  } catch (error) {
    next(error);
  }
};

const createUserController = async (req, res, next) => {
  try {
    const newUser = req.body;
    const { role } = req.user;
    
    const users = await createUserService(newUser, role);

    return res.status(success).json(users);
  } catch (error) {
    next(error);
  }
};

const deleteUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.user;
    
    const users = await deleteUserService(id, role);

    return res.status(success).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserController,
  createUserController,
  deleteUserController,
};