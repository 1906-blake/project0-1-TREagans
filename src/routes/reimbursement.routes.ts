import express from 'express';
import * as reimbursementController from '../controllers/reimbursement.controller';
// import { authMiddleware } from '../middleware/auth.middleware';

export const reimbursementRouter = express.Router();


/**
 * [GET]    /reimbursements/status/:statusId
 */
reimbursementRouter.get('/status/:id', reimbursementController.getStatus);


/**
 * /reimbursements/author/:userId
 */
reimbursementRouter.get('/author/:id', reimbursementController.getAuthor);


/**
 * [POST]   /reimbursements
 */
reimbursementRouter.post('/', reimbursementController.createReimbursement);


/**
 * [PATCH]  /reimbursements
 */
reimbursementRouter.patch('/', reimbursementController.updateReimbursement);