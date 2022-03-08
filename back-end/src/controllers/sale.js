const saleService = require('../services/sale');
const { created, success } = require('../utils/dictionary');

const register = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const salesInfo = req.body;

    const saleId = await saleService.createSale(salesInfo, userId);
    
    return res.status(created).json({ message: 'registered sale', id: saleId });
  } catch (error) {
    console.log(`Create Sale -> ${error.message}`);
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const { id, role } = req.user;
    const sales = await saleService.getAll(id, role);

    return res.status(success).json({ sales });
  } catch (error) {
    console.log(`Get all Sales -> ${error.message}`);
    next(error);
  }
};

module.exports = {
  register,
  getAll,
};
