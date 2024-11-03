// routes/insuranceRoutes.js
import express from 'express';
import insuranceController from '../controllers/insuranceController.js';
import authenticateToken from '../middleware/authenticateToken.js';
const router = express.Router();

router.post('/',authenticateToken, insuranceController.createInsurance);
router.get('/:insurance_id',authenticateToken, insuranceController.getInsuranceById);
router.get('/name/:provider_name',authenticateToken ,insuranceController.getInsuranceByName);
router.get('/', authenticateToken,insuranceController.getAllInsurance);
router.get('/all/providers', authenticateToken,insuranceController.getAllProviders);
router.put('/:insurance_id', authenticateToken,insuranceController.updateInsuranceById);
router.put('/name/:provider_name',authenticateToken, insuranceController.updateInsuranceByName);
router.delete('/:insurance_id',authenticateToken, insuranceController.deleteInsurance);





export default router;
