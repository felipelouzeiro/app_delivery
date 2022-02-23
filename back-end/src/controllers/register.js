const registerService = require('../services/register');
const { created } = require('../utils/dictionary');
const { generateToken } = require('../utils/JWTServices');

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await registerService.registerUser(name, email, password, role);

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
