const Joi = require('joi');

const emailMessage = 'Incorrect email or password';

const registerSchema = Joi.object({
  name: Joi.string().min(12).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.email': emailMessage,
    }),
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
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.email': emailMessage,
    }),
  password: Joi.string().required().empty(),
});

const createUserSchema = Joi.object({
  name: Joi.string().min(12).required(),
  email: Joi.string().email().required() 
    .messages({
      'string.email': emailMessage,
    }),
  password: Joi.string().min(6).required(),
  role: Joi.required(),
});

module.exports = {
  loginSchema,
  registerSchema,
  salesSchema,
  createUserSchema,
};
