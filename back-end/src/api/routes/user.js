const userRouter = require('express').Router();
const { getUserController } = require('../../controllers/user');
const { createUserController } = require('../../controllers/user');
const { deleteUserController } = require('../../controllers/user');
const { authentication } = require('../../middlewares/authentication');

userRouter.get('/', authentication, getUserController);
userRouter.post('/', authentication, createUserController);
userRouter.delete('/:id', authentication, deleteUserController);

module.exports = userRouter;