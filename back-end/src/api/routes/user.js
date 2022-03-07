const userRouter = require('express').Router();
const { getUserController } = require('../../controllers/user');
const { authentication } = require('../../middlewares/authentication');

userRouter.get('/', authentication, getUserController);

module.exports = userRouter;