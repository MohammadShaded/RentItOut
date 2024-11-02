// routes/rentalRoutes.js
const express = require('express');
const rentalController = require('../controllers/rentalController');
const router = express.Router();

router.post('/', rentalController.createRental);
router.get('/:rental_id', rentalController.getRentalById);
router.get('/', rentalController.getAllRentals);

module.exports = router;
