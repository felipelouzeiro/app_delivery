const registerService = require('../services/register');
const { created } = require('../utils/dictionary');

const register = async (req, res, next) => {
  try {
    const { name, email, password, role = 'customer' } = req.body;

    const response = await registerService.registerUser(name, email, password, role);
    
    return res.status(created).json(response);
  } catch (error) {
    console.log(`Register User -> ${error.message}`);
    next(error);
  }
};

module.exports = {
  register,
};
