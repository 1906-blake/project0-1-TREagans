import express from 'express';
import { userRouter } from './routes/user.routes';
import { reimbursementRouter } from './routes/reimbursement.routes';
import bodyParser from 'body-parser';


const port = 8012;
const app = express();

app.use(bodyParser.json());


/*************
 * REGISTERING ROUTES
 ******************************/ 
app.use('/users', userRouter);
app.use('/reimbursements', reimbursementRouter);


app.listen(port, () => {
    console.log('Listening on port: ' + port);
});