const registerService = require('../services/register');
const { created } = require('../utils/dictionary');
const { generateToken } = require('../utils/auth');

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await registerService.registerUser(name, email, password, role);
    console.log('🚀 ~ file: register.js ~ line 10 ~ register ~ user', user);

    const token = generateToken(user);
    
    return res.status(created).json({ token });
  } catch (error) {
    console.log(`Register User -> ${error.message}`);
    next(error);
  }
};

module.exports = {
  register,
};
