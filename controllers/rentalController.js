// controllers/rentalController.js
const Rental = require('../models/rentalModel');
const { v4: uuidv4 } = require('uuid'); 
exports.createRental = async (req, res) => {
    const userId = req.headers.user_id; 

    try {
        const [userRows] = await Rental.getUserById(userId);
        if (userRows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userRole = userRows[0].role; 
        if (userRole !== 'Owner') {
            return res.status(403).json({userRole:userRole, message: 'You do not have permission to create a rental. Only owners can create rentals.' });
        }
        const rental_id = uuidv4(); 
        const [result] = await Rental.createRental(req.body, rental_id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Rental not created' });
        }
        res.status(201).json({ rentalId: rental_id, ...req.body }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
