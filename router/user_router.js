const express = require('express');
const userRouter = express.Router();

const UserController = require('../controllers/user_ctrl.js');

userRouter.get('/users', UserController.index);
userRouter.post('/users', UserController.create);
userRouter.get('/users/:id', UserController.show);
userRouter.put('/users/:id', UserController.update_user);
userRouter.delete('/users/:id', UserController.detele_user);

module.exports = userRouter;
