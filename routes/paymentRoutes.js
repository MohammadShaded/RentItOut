import express from 'express';
import {
  createPaymentController,
  getPaymentByIdController,
  refundPaymentController,
  getPaymentsByUserIdController
} from '../controllers/PaymentController.js';
import authenticateToken from '../middleware/authenticateToken.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         payment_id:
 *           type: string
 *           example: "321e3d6e-b9d7-4dbb-bf20-587a3589f8c0"
 *         rental_id:
 *           type: string
 *           example: "00cde1ee-b521-4958-b722-59ce1b8c9329"
 *         user_id:
 *           type: string
 *           example: "2"
 *         amount:
 *           type: number
 *           format: float
 *           example: 100.00
 *         payment_date:
 *           type: string
 *           format: date
 *           example: "2024-12-31"
 *         payment_method:
 *           type: string
 *           example: "credit card"
 *         service_fee:
 *           type: number
 *           format: float
 *           example: 5.00
 *         status:
 *           type: string
 *           example: "completed"
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   - name: Payments
 *     description: API endpoints for managing payments
 */

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', createPaymentController);

/**
 * @swagger
 * /payments/{payment_id}:
 *   get:
 *     summary: Get a payment by ID
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: payment_id
 *         required: true
 *         description: The ID of the payment
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Payment not found
 */
router.get('/:payment_id', getPaymentByIdController);

/**
 * @swagger
 * /payments/{payment_id}/refund:
 *   post:
 *     summary: Request a refund for a payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: payment_id
 *         required: true
 *         description: The ID of the payment to refund
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Refund processed successfully
 *       400:
 *         description: Invalid payment ID
 *       403:
 *         description: Unauthorized (admin approval required)
 *       404:
 *         description: Payment not found
 */
router.post('/:payment_id/refund', authenticateToken, refundPaymentController);

/**
 * @swagger
 * /payments/users/{user_id}:
 *   get:
 *     summary: Get all payments by user ID
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of payments for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Payments not found for the user
 */
router.get('/users/:user_id', getPaymentsByUserIdController);

export default router;
