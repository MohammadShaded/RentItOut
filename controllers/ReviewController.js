
import {
    addReview,
    getReviewsByItemId,
} from "../models/review.js";



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

// Get reviews by item_id
export const getReviewsByItemIdController = async (req, res) => {
    const { item_id } = req.params;
    try {
        
        const reviews = await getReviewsByItemId(item_id);
        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error retrieving reviews:", error);
        res.status(404).json({ message: "reviews not found" });
    }
};
