import express from 'express'
import {
        getUsersByRole,
        getAdminReports,
        getFlaggedContent,
        updateFlaggedContentStatus,
        getAnalytics,
        getUsageStats
} from '../controllers/adminController.js'
import authenticateToken from '../middleware/authenticateToken.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     AdminReport:
 *       type: object
 *       properties:
 *         rentals:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *             active:
 *               type: integer
 *             completed:
 *               type: integer
 *         revenue:
 *           type: object
 *           properties:
 *             totalRevenue:
 *               type: number
 *               format: float
 *         userActivity:
 *           type: object
 *           properties:
 *             totalUsers:
 *               type: integer
 *     FlaggedContentStatusUpdate:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [pending, reviewed, resolved]
 *           description: Status of the flagged content
 */

/**
 * @swagger
 * /admin/users/{role}:
 *   get:
 *     summary: Retrieve users by role
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [Admin, Renter, Owner]
 *         description: The role of users to retrieve
 *     responses:
 *       200:
 *         description: List of users with the specified role
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid query parameters
 *       403:
 *         description: Access denied. Admins only.
 *       500:
 *         description: Internal Server Error
 */
router.get('/users/:role', authenticateToken,getUsersByRole);
router.get('/reports',authenticateToken , getAdminReports);
router.get('/items/flagged', authenticateToken, getFlaggedContent);
router.patch('/items/flagged/:flag_id', authenticateToken, updateFlaggedContentStatus);
router.get('/analytics', authenticateToken, getAnalytics);
router.get('/system/usage-stats', authenticateToken,getUsageStats);


export default router;