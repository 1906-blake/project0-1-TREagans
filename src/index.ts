import express from 'express';
import { userRouter } from './routes/user.routes';
import { reimbursementRouter } from './routes/reimbursement.routes';

const port = 8012;
const app = express();

/**
 * /login
 */
app.post('/login', (req, res) => {
    if (true) {
        res.send('Login Successful!');
    } else {
        res.status(400);
        res.send('message: "Invalid Credentials"');
    }
});


/*************
 * REGISTERING ROUTES
 ******************************/ 
app.use('/users', userRouter);
app.use('/reimbursements', reimbursementRouter);


app.listen(port, () => {
    console.log('Listening on port: ' + port);
});