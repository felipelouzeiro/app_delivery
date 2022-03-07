const { success } = require('../utils/dictionary');
const { loginService } = require('../services/login');

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const response = await loginService(email, password);

    return res.status(success).json(response);
  } catch (error) {
    console.log(`Login -> ${error.message}`);
    next(error);
  }
};

module.exports = {
  loginController,
};
