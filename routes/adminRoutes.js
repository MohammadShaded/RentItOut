import express from 'express'
import {
        getUsersByRole,
        getAdminReports
} from '../controllers/adminController.js'
import authenticateToken from '../middleware/authenticateToken.js';

const router = express.Router();

router.get('/users/:role', authenticateToken,getUsersByRole);
router.get('/reports',authenticateToken , getAdminReports);


export default router;