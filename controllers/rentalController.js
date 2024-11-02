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


exports.getAllRentals = async (req, res) => {
    const userId = req.headers.user_id;
    try {
        const [userRows] = await Rental.getUserById(userId);
        if (userRows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userRole = userRows[0].role; 
        if(userRole=="Admin"){
        const [rentals] = await Rental.getAllRentals(); 
        res.json(rentals);}
        else{
            return res.status(401).json({ message: 'You do not have permission to delete this rental.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRentalById = async (req, res) => {
    const rentalId = req.params.rental_id;
    const userId = req.headers.user_id; 

    try {
        const [rentalRows] = await Rental.getRentalById(rentalId);
        if (rentalRows.length === 0) {
            return res.status(404).json({ message: 'Rental not found' });
        }

        const itemId = rentalRows[0].item_id; 

      
        const [itemRows] = await Rental.getItemById(itemId);
        if (itemRows.length === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const ownerId = itemRows[0].owner_id; 

      
        const [userRows] = await Rental.getUserById(userId);
        if (userRows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userRole = userRows[0].role; 

        if (userRole === 'Admin' || rentalRows[0].renter_id === parseInt(userId) || ownerId === parseInt(userId)) {
            res.json({userRole:userRole,Rental:rentalRows[0]}); 
        } else {
            return res.status(403).json({ message: 'You do not have permission to access this rental.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
