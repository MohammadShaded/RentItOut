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

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

router.post('/logout', logoutUser);
router.post('/addtofav/:uid/:iid',authenticateToken, addItemToFavourite);
router.post('/forgot-password', forgotPassword);            
router.post('/reset-password/:token', resetPassword);       
router.get('/:id', authenticateToken,retriveProfile);
router.put('/:id', authenticateToken, updateProfile);
router.get('/:id/activity', authenticateToken, getUserActivity);

export default router;

