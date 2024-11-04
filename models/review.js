
import db from "../config/db.js";

import { v4 as uuid } from 'uuid';
// Create a new review
export async function addReview(review)  {
    const id = uuid();
    try {
        const [rows] = await db.query(

        `insert into Review (review_id, rental_id, reviewer_id, rating, comments,review_date)
        VALUES (?,?, ?, ?, ?,?)`,
        [
            id,
            review.rental_id,
            review.reviewer_id,
            review.rating,
            review.comments,
            review.review_date,
        ] );
        return rows;
    } catch (error) {
        throw error;
    }
}

// get reviews by item_id
export async function getReviewsByItemId(item_id) {
    try {
    
        const [rows] = await db.query(
            `select * from Review
             WHERE rental_id = (select rental_id from Rental where item_id = ?)`,
            [item_id] 
        );
        console.log(rows);
        if (!rows) {
            throw new Error("review not found");
        }
        return rows;
    } catch (error) {
        throw error;
    }
    }