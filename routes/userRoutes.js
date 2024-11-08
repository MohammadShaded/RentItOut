// routes/userRoutes.js
import express from 'express';
import { registerUser,
        loginUser,
        logoutUser,
        addItemToFavourite,
        forgotPassword,
        resetPassword,
        retriveProfile,
        updateProfile,
        getUserActivity} from '../controllers/userController.js';
import authenticateToken from '../middleware/authenticateToken.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Mohammad Shadid"
 *         email:
 *           type: string
 *           example: "mohammad@gmail.com"
 *         password:
 *           type: string
 *           example: "123456789M"
 *         role:
 *           type: string
 *           example: "Renter"
 *         phone_number:
 *           type: string
 *           example: "0595555555"
 *         location_id:
 *           example: "4"
 *     Auth:
 *       type: object
 *       properties:
 *         email:
 *           example: "3sfr3sfr@gmail.com"
 *         password:
 *           type: "string"
 *           example: "123456789"
 *     TokenResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT token for user authentication
 *     PasswordReset:
 *       type: object
 *       properties:
 *         newPassword:
 *           type: string
 *           example: "100200300"
 *           description: New password for the user
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email already registered
 *       500:
 *         description: Error registering user
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: User logged in successfully with JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Error logging in user
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Specifies that the Authorization header with Bearer token is required
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for authorization (e.g., "Bearer <JWT token>")
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       400:
 *         description: No token provided
 *       403:
 *         description: Token has been invalidated
 */
router.post('/logout', logoutUser);
/**
 * @swagger
 * /users/addtofav/{uid}/{iid}:
 *   post:
 *     summary: Add item to user's favorites
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         example: "fcaf61ee-17b8-46fe-888b-87fd76f8d78f"  
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: path
 *         name: iid
 *         example: "5587b071-d816-4f7c-8c3e-c4f159bcf645"  
 *         required: true
 *         schema:
 *           type: string
 *         description: Item ID
 *     responses:
 *       201:
 *         description: Item added to favorites successfully
 *       400:
 *         description: Item is already in favorites
 *       403:
 *         description: Unauthorized access
 *       500:
 *         description: Error adding item to favorites
 */
router.post('/addtofav/:uid/:iid',authenticateToken, addItemToFavourite);

/**
 * @swagger
 * /users/forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "3sfr3sfr@gmail.com"
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
 *       404:
 *         description: User not found with this email
 *       500:
 *         description: Error processing password reset request
 */
router.post('/forgot-password', forgotPassword);
/**
 * @swagger
 * /users/reset-password/{token}:
 *   post:
 *     summary: Reset user password
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Password reset token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PasswordReset'
 *     responses:
 *       200:
 *         description: Password has been reset successfully
 *       400:
 *         description: Reset token has expired
 *       500:
 *         description: Error resetting password
 */            
router.post('/reset-password/:token', resetPassword);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: User not found
 *       500:
 *         description: Error retrieving user profile
 */
router.get('/:id', authenticateToken,retriveProfile);
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       400:
 *         description: No valid fields provided for update
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating user profile
 */     
router.put('/:id', authenticateToken, updateProfile);
/**
 * @swagger
 * /users/{id}/activity:
 *   get:
 *     summary: Retrieve user activity
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User activity retrieved successfully
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: User activity not found
 *       500:
 *         description: Error retrieving user activity
 */
router.get('/:id/activity', authenticateToken, getUserActivity);

export default router;

