
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
      // get reviews by user_id
export async function getUserReviews(user_id) {
    try {
        
      const [rows] = await db.query(`
          select * from Review
            where reviewer_id = ?
        `, [user_id]);

     console.log(rows);
     if (rows.length === 0) {
         throw new Error("review not found for this user");
     }
     return rows;
 } catch (error) {
     throw error;
 }
        }

       
export async function updateReview (id, updateReview) {
 
    try {
        const [rows] = await db.query(
          `update Review SET  rating=?, comments=?,review_date=? where review_id=?`,
          [
            
            
            updateReview.rating,
            updateReview.comments,
            updateReview.review_date,
            id,
        ] );

        if (rows.affectedRows == 0) {
            throw new Error("Review not found or no changes were made");
          }
          
          return rows;
        } catch (err) {
          throw err;
        }



}

// Delete  review
export async function deleteReview  (id) {
    try{
    const [rows] = await db.query( "delete from Review where review_id = ?" , 
     [
        id,

     ]
    );
    if (rows.affectedRows == 0) {
        throw new Error("review not found");
      }
    } catch (err) {
      throw err;
    }

}
