import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}).promise();

pool.getConnection()
    .then(conn => {
        console.log('Connected to AWS RDS MySQL Database!');
        conn.release();
    })
    .catch(err => {
        console.error('Database connection failed:', err);
        process.exit(1);
    });

export default pool;