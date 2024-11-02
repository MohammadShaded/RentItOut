import pool from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

const User = {
    // Method to create a new user
    createUser: async (data) => {
        const userId = uuidv4(); // Generate UUID for user ID
        const { name, email, password, role, phone_number, location_id } = data;
        const query = `INSERT INTO User (user_id, name, email, password, role, phone_number, location_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await pool.query(query, [userId, name, email, password, role, phone_number, location_id]);
        return userId; // Returns the generated UUID of the newly created user
    },

    // Method to find a user by email
    findUserByEmail: async (email) => {
        const query = 'SELECT * FROM User WHERE email = ?';
        const [rows] = await pool.query(query, [email]);
        return rows[0]; // Returns the user record if found, otherwise undefined
    },

    addItemTofav: async(user_id,item_id)=>{
        // Insert the item into the user's favorites
        const insertQuery = 'INSERT INTO Favorites (user_id, item_id) VALUES (?, ?)';
        await pool.query(insertQuery, [user_id, item_id]);
    },
    checkExisting: async(user_id,item_id) =>{
        const checkQuery = 'SELECT * FROM Favorites WHERE user_id = ? AND item_id = ?';
        const [existing] = await pool.query(checkQuery, [user_id, item_id]);
        return existing;
    }
};



export default User;
