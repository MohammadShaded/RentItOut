// routes/userRoutes.js
import express from 'express';
import { registerUser, loginUser, logoutUser, addItemToFavourite, forgotPassword, resetPassword} from '../controllers/userController.js';

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

router.post('/logout', logoutUser);
router.post('/addtofav/:uid/:iid', addItemToFavourite);
router.post('/forgot-password', forgotPassword);            // POST /users/forgot-password
router.post('/reset-password/:token', resetPassword);       // POST /users/reset-password/:token


export default router;

