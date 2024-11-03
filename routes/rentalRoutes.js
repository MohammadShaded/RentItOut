// routes/rentalRoutes.js
import express from 'express';
import rentalController from '../controllers/rentalController.js';
import authenticateToken from '../middleware/authenticateToken.js';

const router = express.Router();

router.post('/',authenticateToken, rentalController.createRental);
router.get('/:rental_id',authenticateToken, rentalController.getRentalById);
router.get('/',authenticateToken, rentalController.getAllRentals);
router.put('/:rental_id',authenticateToken, rentalController.updateRental);
router.put('/:rental_id/status',authenticateToken, rentalController.updateRentalStatus);
router.put('/:rental_id/cancel',authenticateToken, rentalController.cancelRental);
router.delete('/:rental_id',authenticateToken, rentalController.deleteRental);

export default router;


