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
/**
 * @swagger
 * /admin/reports:
 *   get:
 *     summary: Retrieve admin reports including rental statuses, revenue, and user summary
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin report with rental and revenue statistics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminReport'
 *       403:
 *         description: Access denied. Admins only.
 *       500:
 *         description: Error generating report
 */
router.get('/reports',authenticateToken , getAdminReports);
/**
 * @swagger
 * /admin/items/flagged:
 *   get:
 *     summary: Retrieve all flagged content
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all flagged content
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   flag_id:
 *                     type: string
 *                   content_id:
 *                     type: string
 *                   status:
 *                     type: string
 *                     example: "pending"
 *                   description:
 *                     type: string
 *       403:
 *         description: Access denied. Admins only.
 *       500:
 *         description: Error retrieving flagged content
 */
router.get('/items/flagged', authenticateToken, getFlaggedContent);
/**
 * @swagger
 * /admin/items/flagged/{flag_id}:
 *   patch:
 *     summary: Update the status of flagged content
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: flag_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the flagged content
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FlaggedContentStatusUpdate'
 *     responses:
 *       200:
 *         description: Flagged content status updated
 *       400:
 *         description: Invalid status
 *       403:
 *         description: Access denied. Admins only.
 *       404:
 *         description: Flagged content not found
 *       500:
 *         description: Error updating flagged content status
 */
router.patch('/items/flagged/:flag_id', authenticateToken, updateFlaggedContentStatus);
/**
 * @swagger
 * /admin/analytics:
 *   get:
 *     summary: Retrieve analytics data, including rentals and revenue per month
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly analytics data for rentals and revenue
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rentalsPerMonth:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       month:
 *                         type: string
 *                       rentals:
 *                         type: integer
 *                 revenuePerMonth:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       month:
 *                         type: string
 *                       revenue:
 *                         type: number
 *                         format: float
 *       403:
 *         description: Access denied. Admins only.
 *       500:
 *         description: Failed to fetch analytics data
 */
router.get('/analytics', authenticateToken, getAnalytics);
/**
 * @swagger
 * /admin/system/usage-stats:
 *   get:
 *     summary: Retrieve system usage statistics, including memory and CPU load
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: System usage statistics including memory and CPU load
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 memoryUsage:
 *                   type: object
 *                   properties:
 *                     rss:
 *                       type: integer
 *                     heapTotal:
 *                       type: integer
 *                     heapUsed:
 *                       type: integer
 *                     external:
 *                       type: integer
 *                 cpuLoad:
 *                   type: object
 *                   properties:
 *                     1min:
 *                       type: number
 *                     5min:
 *                       type: number
 *                     15min:
 *                       type: number
 *                 uptime:
 *                   type: integer
 *                   description: System uptime in seconds
 *                 processUptime:
 *                   type: integer
 *                   description: Process uptime in seconds
 *       500:
 *         description: Failed to retrieve system usage statistics
 */
router.get('/system/usage-stats', authenticateToken,getUsageStats);


export default router;