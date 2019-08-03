import express from 'express';
import * as userController from '../controllers/user.controller';
import { authMiddleware, reimburseMiddleware } from '../middleware/auth.middleware';


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
 * passing an argument to findById
 * /users/role/:id/
 */
userRouter.get('/role/:id', authMiddleware, userController.findByRole);

/**
 * [POST]   users/login
 */
userRouter.post('/login', userController.loginUser);
userRouter.post('/', authMiddleware, userController.createUser);
userRouter.post('/logout', reimburseMiddleware, userController.logoutUser);

/**
 * [PATCH]  /users/:id
 */
userRouter.patch('/:id', authMiddleware, userController.updateUser);

/**
 * [DELETE]     /users/:id
 */
userRouter.delete('/:id', authMiddleware, userController.deleteUser);