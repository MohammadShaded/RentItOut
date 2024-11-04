
import {
    addReview,
    
} from "../models/review.js";


// new review
export const createReviewController = async (req, res) => {
    try {
        const Review = req.body;

        console.log("controller");

        await addReview(Review);
        res.status(201).json(Review);
    } catch (error) {
        console.error('Error creating Review:', error);
        res.status(400).json({ message: error.message });
    }
};