import express from 'express';
import * as userController from '../controllers/user.controller';
// import User from '../models/User';


export const userRouter = express.Router();

/**
 * /users
 */
userRouter.get('/', userController.findAll);


/**
 * because `req.params.id` returns a string value, we must convert
 * it to an integer first (parseInt())
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
// userRouter.patch('/', (req, res) => {
//     userController.updateUser(req.body);
//     res.send('Record updated!');
// });


/**
 *  [DELETE]    /delete/:id
 */
// userRouter.delete('/delete/:id', (req, res) => {
//     res.json(userController.deleteUser(parseInt(req.params.id)));
// });