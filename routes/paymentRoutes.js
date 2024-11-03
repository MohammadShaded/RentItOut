import express from 'express';
import {refundPaymentController } from '../controllers/PaymentController.js'; 
import authenticateToken from '../middleware/authenticateToken.js';
const router = express.Router();
router.post('/:payment_id/refund',authenticateToken, refundPaymentController);

export default router;