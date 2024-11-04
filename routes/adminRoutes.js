import express from 'express'
import {
        getUsersByRole,
        getAdminReports,
        getFlaggedContent,
        updateFlaggedContentStatus
} from '../controllers/adminController.js'
import authenticateToken from '../middleware/authenticateToken.js';

const router = express.Router();

router.get('/users/:role', authenticateToken,getUsersByRole);
router.get('/reports',authenticateToken , getAdminReports);
router.get('/items/flagged', authenticateToken, getFlaggedContent);
router.patch('/items/flagged/:flag_id', authenticateToken, updateFlaggedContentStatus);


export default router;