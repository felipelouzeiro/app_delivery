const { success } = require('../utils/dictionary');
const { getProductService } = require('../services/product');

const getProductController = async (req, res, next) => {
  try {
    
    const products = await getProductService();

    return res.status(success).json(products);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProductController,
};
