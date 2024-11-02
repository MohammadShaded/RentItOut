// routes/userRoutes.js
import express from 'express';
import { registerUser, loginUser, logoutUser, addItemToFavourite} from '../controllers/userController.js';

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

router.post('/logout', logoutUser);
router.post('/addtofav/:uid/:iid', addItemToFavourite);


export default router;

