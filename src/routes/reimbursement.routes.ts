import express from 'express';
import * as reimbursementController from '../controllers/reimbursement.controller';
import { authMiddleware, reimburseMiddleware } from '../middleware/auth.middleware';

export const reimbursementRouter = express.Router();


/**
 * [GET]    /reimbursements/status/:statusId
 */
reimbursementRouter.get('/status/:id', reimbursementController.getStatus);


/**
 * /reimbursements/author/:userId
 */
reimbursementRouter.get('/author/:id', authMiddleware, reimbursementController.getAuthor);

/**
 * /
 */
reimbursementRouter.get('/', authMiddleware, reimbursementController.getAll);

/**
 * [POST]   /reimbursements
 */
reimbursementRouter.post('/', reimburseMiddleware, reimbursementController.createReimbursement);


/**
 * [PATCH]  /reimbursements
 */
reimbursementRouter.patch('/', reimburseMiddleware, reimbursementController.updateReimbursement);