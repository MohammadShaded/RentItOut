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

};




module.exports = Rental;
