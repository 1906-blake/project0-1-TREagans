import express from 'express';
import * as userController from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';


export const userRouter = express.Router();

/**
 * [GET]    /users
 */
userRouter.get('/', authMiddleware, userController.findAll);


/**
 * passing an argument to findById
 * /users/:id/
 */
userRouter.get('/:id', authMiddleware, userController.findById);


/**
 * [POST]   users/login
 */
userRouter.post('/login', userController.loginUser);
userRouter.post('/', authMiddleware, userController.createUser);


/**
 * [PATCH]  /users
 */
userRouter.patch('/:id', authMiddleware, userController.updateUser);

/**
 * [DELETE]     /users/:id
 */
userRouter.delete('/:id', authMiddleware, userController.deleteUser);