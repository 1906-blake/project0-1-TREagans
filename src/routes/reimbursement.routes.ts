import express from 'express';

export const reimbursementRouter = express.Router();


/**
 * /reimbursements/status/:statusId
 */
reimbursementRouter.get('/status/:statusId', (req, res) => {
    res.send(`Status ID for reimbursement claim: ${req.params.statusId}`);
});


/**
 * /reimbursements/author/:userId
 */
reimbursementRouter.get('/author/:userId', (req, res) => {
    res.send(`Authorization approved by: ${req.params.userId}`);
});


/**
 * [POST]   /reimbursements
 */
reimbursementRouter.post('/', (req, res) => {
    res.status(201);
    res.send('return reimbursements array');
});


/**
 * [PATCH]  /reimbursements
 */
reimbursementRouter.patch('/', (req, res) => {
    res.send('reimbursement form updated');
});