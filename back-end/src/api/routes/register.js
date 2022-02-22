const registerRouter = require('express').Router();
const registerController = require('../../controllers/register');

registerRouter.post('/', registerController.register);

module.exports = registerRouter;