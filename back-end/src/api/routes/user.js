const userRouter = require('express').Router();
const { getUserController } = require('../../controllers/user');
const { createUserController } = require('../../controllers/user');
const { authentication } = require('../../middlewares/authentication');

userRouter.get('/', authentication, getUserController);
userRouter.post('/', authentication, createUserController);

module.exports = userRouter;