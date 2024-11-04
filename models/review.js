
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