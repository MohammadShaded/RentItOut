import express from 'express'
import {
        getUsersByRole
} from '../controllers/adminController.js'
import authenticateToken from '../middleware/authenticateToken.js';

const router = express.Router();

router.get('/users/:role', authenticateToken,getUsersByRole);


export default router;