const { product } = require('../database/models');

const getProductService = async () => {
  const products = await product.findAll();

  return products;
};

module.exports = {
  getProductService,
};
