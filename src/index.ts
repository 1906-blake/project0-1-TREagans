import express from 'express';
import { userRouter } from './routes/user.routes';
import { reimbursementRouter } from './routes/reimbursement.routes';
import bodyParser from 'body-parser';
import expressSessions from 'express-session';

const port = 8012;
const app = express();

app.use(bodyParser.json());

app.use(expressSessions({
    secret: 'topsecret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

/*************
 * REGISTERING ROUTES
 ******************************/ 
app.use('/users', userRouter);
app.use('/reimbursements', reimbursementRouter);


app.listen(port, () => {
    console.log('Listening on port: ' + port);
});