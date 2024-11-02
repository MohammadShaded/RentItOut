// routes/userRoutes.js
import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/userController.js';

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

router.post('/logout', logoutUser);


export default router;

