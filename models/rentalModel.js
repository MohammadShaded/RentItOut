// models/rentalModel.js
const db = require('../config/db');


const Rental = {
    createRental: (rentalData,rental_id) => {
      
        const {item_id, renter_id, start_date, end_date, total_price, insurance_id, status } = rentalData;
        return db.execute(
            'INSERT INTO Rental (rental_id,item_id, renter_id, start_date, end_date, total_price, insurance_id, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [rental_id,item_id, renter_id, start_date, end_date, total_price, insurance_id, status]
        );
    },

    getAllRentals: () => {
        return db.execute('SELECT * FROM Rental');
    },
    getRentalById: (rental_id) => {
        return db.execute('SELECT * FROM Rental WHERE rental_id = ?', [rental_id]);
    },
    getItemById: (item_id) => {
        return db.execute('SELECT * FROM Item WHERE item_id = ?', [item_id]);
    },
    getUserById: (userId) => {
        return db.execute('SELECT * FROM User WHERE user_id = ?', [userId]);
    },


};




module.exports = Rental;
