const { sale, saleProduct } = require('../database/models');
const { badRequest } = require('../utils/dictionary');
const errorConstructor = require('../utils/errorConstructor');
const { salesSchema } = require('../utils/joiSchemas');

const createSale = async (salesInfo, userId) => {
  const { sellerId, totalPrice, deliveryAddress, deliveryNumber, products } = salesInfo;

  const { error } = salesSchema
    .validate({ userId, sellerId, totalPrice, deliveryAddress, deliveryNumber });
  if (error) throw errorConstructor(badRequest, error.message);

  const { dataValues } = await sale
    .create({ userId, sellerId, totalPrice, deliveryAddress, deliveryNumber });

  const { id: saleId } = dataValues;

  const saleProductRequest = products
    .map(async ({ productId, quantity }) => saleProduct.create({ saleId, productId, quantity }));  

  await Promise.all(saleProductRequest);

  return true;
};

module.exports = {
  createSale,
};