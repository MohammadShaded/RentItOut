import express from 'express';
import {createPaymentController ,getPaymentByIdController ,  refundPaymentController , getPaymentsByUserIdController } from '../controllers/PaymentController.js'; 
import authenticateToken from '../middleware/authenticateToken.js';
const router = express.Router();
router.post('/', createPaymentController);
router.get('/:payment_id', getPaymentByIdController);
router.post('/:payment_id/refund',authenticateToken, refundPaymentController);
router.get('/users/:user_id', getPaymentsByUserIdController);
export default router;