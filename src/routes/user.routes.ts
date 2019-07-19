import express from 'express';
import * as userController from '../controllers/user.controller';


export const userRouter = express.Router();

/**
 * [GET]    /users
 */
userRouter.get('/', userController.findAll);


/**
 * passing an argument to findById
 * /users/:id/
 */
userRouter.get('/:id', userController.findById);


/**
 * [POST]   /login
 */
userRouter.post('/login', userController.userLogin);
userRouter.post('/create', userController.createUser);


/**
 * [PATCH]  /users
 */
userRouter.patch('/', userController.updateUser);