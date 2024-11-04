import pool from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

const User = {
    createUser: async (data) => {
        const userId = uuidv4();
        const { name, email, password, role, phone_number, location_id } = data;
        const query = `INSERT INTO User (user_id, name, email, password, role, phone_number, location_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await pool.query(query, [userId, name, email, password, role, phone_number, location_id]);
        return userId; 
    },

    findUserByEmail: async (email) => {
        const query = 'SELECT * FROM User WHERE email = ?';
        const [rows] = await pool.query(query, [email]);
        return rows[0]; 
    },
    findUserById: async (id) => {
        const query = 'SELECT * FROM User WHERE user_id = ?';
        const [rows] = await pool.query(query, [id]);
        return rows[0]; 
    },

    addItemTofav: async(user_id,item_id)=>{
        const insertQuery = 'INSERT INTO Favorites (user_id, item_id) VALUES (?, ?)';
        await pool.query(insertQuery, [user_id, item_id]);
    },
    checkExisting: async(user_id,item_id) =>{
        const checkQuery = 'SELECT * FROM Favorites WHERE user_id = ? AND item_id = ?';
        const [existing] = await pool.query(checkQuery, [user_id, item_id]);
        return existing;
    },
    updatePassword: async(hashedPassword, email)=>{
        await pool.query(
            'UPDATE User SET password = ? WHERE email = ?',
            [hashedPassword, email]
        );
    },
    updateUserById: async(user_id, data)=> {
        const fields = [];
        const values = [];

        // this will create the query in term of what fields 
        for (const [key, value] of Object.entries(data)) {
            fields.push(`${key} = ?`);
            values.push(value);
        }

        if (fields.length === 0) {
            return null; // no fields to update
        }

        const query = `UPDATE User SET ${fields.join(', ')} WHERE user_id = ?`;
        values.push(user_id); 

        const [result] = await pool.query(query, values);

        // this if the user has been updated will retern it, else it will return null
        return result.affectedRows > 0 ? { user_id, ...data } : null; 
    },

    getUserItems: async (userId)=>{
        const query = `SELECT item_id, title, description,category_id,price_per_day,deposit, location_id,status,rating 
        FROM Item WHERE owner_id =?`;
        const [rows] = await pool.query(query, [userId]);
        return rows;
    },
    
    getUserActivity: async (userId)=>{
        const query = `
            SELECT rental_id, item_id, start_date, end_date, total_price, status
            FROM Rental
            WHERE renter_id = ?
            ORDER BY start_date DESC
            LIMIT 10
        `;
        const [rows] = await pool.query(query, [userId]);
        return rows;    
    },


};



export default User;
