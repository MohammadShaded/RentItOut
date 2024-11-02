// routes/rentalRoutes.js
const express = require('express');
const rentalController = require('../controllers/rentalController');
const router = express.Router();

router.post('/', rentalController.createRental);
router.get('/:rental_id', rentalController.getRentalById);
router.get('/', rentalController.getAllRentals);
router.put('/:rental_id', rentalController.updateRental);
router.put('/:rental_id/status', rentalController.updateRentalStatus);
router.put('/:rental_id/cancel', rentalController.cancelRental);
router.delete('/:rental_id', rentalController.deleteRental);
module.exports = router;
