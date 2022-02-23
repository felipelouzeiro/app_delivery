const saleService = require('../services/sale');
const { created } = require('../utils/dictionary');

const register = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const salesInfo = req.body;

    await saleService.createSale(salesInfo, userId);
    
    return res.status(created).json({ message: 'registered sale' });
  } catch (error) {
    console.log(`Create Sale -> ${error.message}`);
    next(error);
  }
};

module.exports = {
  register,
};
