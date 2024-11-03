import db from "../config/db.js";

import { v4 as uuid } from 'uuid';

export async function addPayment(payment) {
    const id = uuid();
    try {
        console.log("db");
        const [rows] = await db.query(
            `INSERT INTO Payment (payment_id , rental_id, user_id, amount, payment_date, payment_method, service_fee, status) 
             VALUES ( ?, ?, ?, ?, ?, ?, ? , ?)`,
            [
                id,
                payment.rental_id,
                payment.user_id,
                payment.amount,
                payment.payment_date,
                payment.payment_method,
                payment.service_fee,
                payment.status
            ]
        );
        return rows;
    } catch (error) {
        throw error;
    }
}

export async function getPaymentById(id) {
    try {
        const [rows] = await db.query(
            `SELECT * FROM Payment WHERE payment_id = ?`,
            [id]
        );
        console.log(rows);
        if (!rows[0]) {
            throw new Error("Payment not found");
        }
        return rows[0];
    } catch (error) {
        throw error;
    }
}


export async function requestRefund(paymentId) {
    try {
       
        const [payment] = await db.query(
            `SELECT * FROM Payment WHERE payment_id = ?`, 
            [paymentId]
        );

        if (payment.length === 0) {
            throw new Error("Payment not found");
        }

        const rentalId = payment[0].rental_id;

        
        const [rental] = await db.query(
            `SELECT * FROM Rental WHERE rental_id = ?`, 
            [rentalId]
        );

        if (rental.length === 0) {
            throw new Error("Rental not found");
        }

        const currentDate = new Date();
        const startDate = new Date(rental[0].start_date);

        if (rental[0].status === 'canceled' && startDate < currentDate) {
           
            await db.query(
                `UPDATE Payment SET status = 'refunded' WHERE payment_id = ?`,
                [paymentId]
            );
            return { message: "Refund requested successfully." };
        } else {
            throw new Error("Refund not applicable for this rental.");
        }
    } catch (error) {
        console.error("Error processing refund:", error);
        throw error; 
    }
}
