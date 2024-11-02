// routes/rentalRoutes.js
const express = require('express');
const rentalController = require('../controllers/rentalController');
const router = express.Router();

router.post('/', rentalController.createRental);


module.exports = router;
