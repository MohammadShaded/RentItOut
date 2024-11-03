// routes/insuranceRoutes.js
import express from 'express';
import insuranceController from '../controllers/insuranceController.js';
import authenticateToken from '../middleware/authenticateToken.js';
const router = express.Router();

router.post('/',authenticateToken, insuranceController.createInsurance);





export default router;
