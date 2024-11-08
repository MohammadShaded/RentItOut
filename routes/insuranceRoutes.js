// routes/insuranceRoutes.js
import express from 'express';
import insuranceController from '../controllers/insuranceController.js';
import authenticateToken from '../middleware/authenticateToken.js';
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Insurance
 *   description: API endpoints for managing  insurance
 */

/**
 * @swagger
 * /insurance:
 *   post:
 *     summary: Create new insurance
 *     tags: [Insurance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               provider_name:
 *                 type: string
 *               premium:
 *                 type: number
 *               terms:
 *                 type: string
 *             required:
 *               - provider_name
 *               - premium
 *               - terms
 *     responses:
 *       201:
 *         description: Insurance created successfully
 *       401:
 *         description: You do not have permission to add this insurence
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post('/', authenticateToken, insuranceController.createInsurance);

/**
 * @swagger
 * /insurance/{insurance_id}:
 *   get:
 *     summary: Get insurance by ID
 *     tags: [Insurance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: insurance_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Insurance found
 *       404:
 *         description: Insurance not found || User not found
 *       500:
 *         description: Internal server error
 */
router.get('/:insurance_id', authenticateToken, insuranceController.getInsuranceById);

/**
 * @swagger
 * /insurance/name/{provider_name}:
 *   get:
 *     summary: Get insurance by provider name
 *     tags: [Insurance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: provider_name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Insurance found by provider name
 *       404:
 *         description: Insurance provider not found || User not found
 *       500:
 *         description: Internal server error
 */
router.get('/name/:provider_name', authenticateToken, insuranceController.getInsuranceByName);

/**
 * @swagger
 * /insurance:
 *   get:
 *     summary: Get all insurances
 *     tags: [Insurance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all insurances
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/', authenticateToken, insuranceController.getAllInsurance);

/**
 * @swagger
 * /insurance/all/providers:
 *   get:
 *     summary: Get all insurance providers
 *     tags: [Insurance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all insurance providers
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/all/providers', authenticateToken, insuranceController.getAllProviders);

/**
 * @swagger
 * /insurance/{insurance_id}:
 *   put:
 *     summary: Update insurance by ID
 *     tags: [Insurance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: insurance_id
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
 *               provider_name:
 *                 type: string
 *               premium:
 *                 type: number
 *               terms:
 *                 type: string
 *             required:
 *               - provider_name
 *               - premium
 *               - terms
 *     responses:
 *       200:
 *         description: Insurance updated successfully
 *       401:
 *         description: You do not have permission to update this insurence
 *       404:
 *         description: Insurance not found || User not found
 *       500:
 *         description: Internal server error
 */
router.put('/:insurance_id', authenticateToken, insuranceController.updateInsuranceById);

/**
 * @swagger
 * /insurance/name/{provider_name}:
 *   put:
 *     summary: Update insurance by provider name
 *     tags: [Insurance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: provider_name
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
 *               premium:
 *                 type: number
 *               terms:
 *                 type: string
 *             required:
 *               - premium
 *               - terms
 *     responses:
 *       200:
 *         description: Insurance updated successfully by provider name
 *       401:
 *         description: You do not have permission to update this insurence
 *       404:
 *         description: Insurance provider not found || User not found
 *       500:
 *         description: Internal server error
 */
router.put('/name/:provider_name', authenticateToken, insuranceController.updateInsuranceByName);

/**
 * @swagger
 * /insurance/{insurance_id}:
 *   delete:
 *     summary: Delete insurance by ID
 *     tags: [Insurance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: insurance_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Insurance deleted successfully
 *       401:
 *         description: You do not have permission to delete this insurence
 *       404:
 *         description: Insurance not found || User not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:insurance_id', authenticateToken, insuranceController.deleteInsurance);

export default router;
