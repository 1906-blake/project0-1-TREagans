import express from 'express';
import { userRouter } from './routes/user.routes';
import { reimbursementRouter } from './routes/reimbursement.routes';
import bodyParser from 'body-parser';
import expressSessions from 'express-session';
// import cors from 'cors';


const port = 8012;
const app = express();

app.use(bodyParser.json());

// allow cross origins
app.use((req, resp, next) => {
    console.log(req.get('host'));
    resp.header('Access-Control-Allow-Origin', `${req.headers.origin}`);
    resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    resp.header('Access-Control-Allow-Credentials', 'true');
    resp.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, PATCH');
    next();
});

app.use(expressSessions({
    secret: 'topsecret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// app.use(cors());

/*************
 * REGISTERING ROUTES
 ******************************/ 
app.use('/users', userRouter);
app.use('/reimbursements', reimbursementRouter);


app.listen(port, () => {
    console.log('Listening on port: ' + port);
});