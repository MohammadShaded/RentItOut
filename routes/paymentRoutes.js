import express from 'express';
import {createPaymentController ,getPaymentByIdController ,  refundPaymentController } from '../controllers/PaymentController.js'; 
import authenticateToken from '../middleware/authenticateToken.js';
const router = express.Router();
router.post('/', createPaymentController);
router.get('/:payment_id', getPaymentByIdController);
router.post('/:payment_id/refund',authenticateToken, refundPaymentController);

export default router;