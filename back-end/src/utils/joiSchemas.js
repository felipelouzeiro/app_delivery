const Joi = require('joi');

const loginSchema = Joi.object({
  registry: Joi.string().required().empty(),
  password: Joi.string().required().empty(),
});

module.exports = {
  loginSchema,
};