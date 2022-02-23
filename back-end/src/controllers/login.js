const { success } = require('../utils/dictionary');
const { loginService } = require('../services/login');

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const token = await loginService(email, password);

    return res.status(success).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginController,
};
