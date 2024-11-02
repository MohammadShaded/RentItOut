// routes/rentalRoutes.js
import express from 'express';
import rentalController from '../controllers/rentalController.js';

const router = express.Router();

router.post('/', rentalController.createRental);
router.get('/:rental_id', rentalController.getRentalById);
router.get('/', rentalController.getAllRentals);
router.put('/:rental_id', rentalController.updateRental);
router.put('/:rental_id/status', rentalController.updateRentalStatus);
router.put('/:rental_id/cancel', rentalController.cancelRental);
router.delete('/:rental_id', rentalController.deleteRental);
//use
export default router;


