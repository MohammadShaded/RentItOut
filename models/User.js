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
    }


};



export default User;
