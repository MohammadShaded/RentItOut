// routes/rentalRoutes.js
import express from 'express';
import rentalController from '../controllers/rentalController.js';
import authenticateToken from '../middleware/authenticateToken.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Rentals
 *   description: API endpoints for managing rentals
 */

/**
 * @swagger
 * /rentals:
 *   post:
 *     summary: Create a new rental
 *     tags: [Rentals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item_id:
 *                 type: string
 *               renter_id:
 *                 type: string
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               total_price:
 *                 type: number
 *               insurance_id:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Rental created successfully
 *       403:
 *         description: You do not have permission to create a rental. Only owners can create rentals
 *       404:
 *         description: User not found || Rental not created
 *       500:
 *         description: Internal server error
 */
router.post('/', authenticateToken, rentalController.createRental);

/**
 * @swagger
 * /rentals/{rental_id}:
 *   get:
 *     summary: Get rental by ID
 *     tags: [Rentals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rental_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rental details
 *       403:
 *         description: You do not have permission to access this rental
 *       404:
 *         description: Rental not found || Item not found || User not found
 *       500:
 *         description: Internal server error
 */
router.get('/:rental_id', authenticateToken, rentalController.getRentalById);

/**
 * @swagger
 * /rentals:
 *   get:
 *     summary: Get all rentals
 *     tags: [Rentals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of rentals
 *       401:
 *         description: You do not have permission to delete this rental
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/', authenticateToken, rentalController.getAllRentals);

/**
 * @swagger
 * /rentals/{rental_id}:
 *   put:
 *     summary: Update a rental
 *     tags: [Rentals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rental_id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               total_price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Rental updated successfully
 *       401:
 *         description: You do not have permission to update this rental
 *       404:
 *         description: Rental not found || Item not found || User not found
 *       500:
 *         description: Internal server error
 */
router.put('/:rental_id', authenticateToken, rentalController.updateRental);

/**
 * @swagger
 * /rentals/{rental_id}/status:
 *   put:
 *     summary: Update rental status
 *     tags: [Rentals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rental_id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [active, completed, canceled]
 *     responses:
 *       200:
 *         description: Rental status updated successfully
 *       400:
 *         description: Invalid status
 *       401:
 *         description: You do not have permission to update this rental
 *       404:
 *         description: Rental not found || Item not found || User not found
 *       500:
 *         description: Internal server error
 */
router.put('/:rental_id/status', authenticateToken, rentalController.updateRentalStatus);

/**
 * @swagger
 * /rentals/{rental_id}/cancel:
 *   put:
 *     summary: Cancel a rental
 *     tags: [Rentals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rental_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rental canceled successfully
 *       400:
 *         description: Cannot cancel after start date
 *       401:
 *         description: You do not have permission to cancel this rental
 *       404:
 *         description: Rental not found || Item not found || User not found
 *       500:
 *         description: Internal server error
 */
router.put('/:rental_id/cancel', authenticateToken, rentalController.cancelRental);

export default router;


