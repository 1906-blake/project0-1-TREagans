import express from 'express';

export const userRouter = express.Router();

/**
 * /users
 */
userRouter.get('/', (req, res) => {
    res.send('returned all users in users array');
});


/**
 * /users/:id/
 */
userRouter.get('/:id', (req, res) => {
    res.send(`Found user ${req.params.id}`);
});


/**
 * [POST]   /login
 */
userRouter.post('/login', (req, res) => {
    res.send('login successful!');
});


/**
 * [PATCH]  /users
 */
userRouter.patch('/', (req, res) => {
    res.send('user updated!');
});