const { sale, saleProduct, product } = require('../database/models');
const { badRequest, notFound } = require('../utils/dictionary');
const errorConstructor = require('../utils/errorConstructor');
const { salesSchema } = require('../utils/joiSchemas');

const createSale = async (salesInfo, userId) => {
  const { sellerId, totalPrice, deliveryAddress, deliveryNumber, products } = salesInfo;

  const { error } = salesSchema
    .validate({ userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, products });
  if (error) throw errorConstructor(badRequest, error.message);

  const { dataValues } = await sale
    .create({ userId, sellerId, totalPrice, deliveryAddress, deliveryNumber });

  const { id: saleId } = dataValues;

  const saleProductRequest = products
    .map(async ({ productId, quantity }) => saleProduct.create({ saleId, productId, quantity }));

  await Promise.all(saleProductRequest);

  return saleId;
};

const getAll = async (id, role) => {
  if (role === 'customer') return sale.findAll({ where: { userId: id } });
  return sale.findAll({ where: { sellerId: id } });
};

const getWithProducts = async (id) => {
  const foundSaleWithProducts = await sale.findOne({
    where: { id },
    include: [{ model: product, as: 'products', through: { attributes: ['quantity'] } }],
  });

  if (!foundSaleWithProducts) throw errorConstructor(notFound, 'sale not found');

  return foundSaleWithProducts;
};

module.exports = {
  createSale,
  getAll,
  getWithProducts,
};