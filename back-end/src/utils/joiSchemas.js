const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(12).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.required(),
});

const salesSchema = Joi.object({
  userId: Joi.number().required(),
  sellerId: Joi.number().required(),
  totalPrice: Joi.number().required(),
  deliveryAddress: Joi.string().required(),
  deliveryNumber: Joi.string().required(),
  products: Joi.array().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required().empty(),
  password: Joi.string().required().empty(),
});

module.exports = {
  loginSchema,
  registerSchema,
  salesSchema,
};
