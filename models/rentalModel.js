// models/rentalModel.js


import db from '../config/db.js';

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


    updateRental: (rentalId, data) => {
        const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
        const values = Object.values(data);
        return db.execute(`UPDATE Rental SET ${fields} WHERE rental_id = ?`, [...values, rentalId]);
    },

    updateRentalStatus: (rental_id, status) => {
        return db.execute('UPDATE Rental SET status = ? WHERE rental_id = ?', [status, rental_id]);
    },

    deleteRental: (rental_id) => {
        return db.execute('DELETE FROM Rental WHERE rental_id = ?', [rental_id]);
    }

};


export default Rental;


