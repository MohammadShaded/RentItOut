
import {
    addReview,
    getReviewsByItemId,
    getUserReviews,
    updateReview,
    deleteReview
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
// Get reviews by user_id
export const getUserReviewsController = async (req, res) => {
    const  {user_id } = req.params;
    try {
        
        const Reviews = await getUserReviews(user_id);

        
        res.status(200).json(Reviews);
    } catch (error) {
        console.error('Error retrieving Reviews:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
// Update review
export const editReviewController = async (req, res) => {
    try {

        const ReviewId = req.params.id;
        const  updatereview = req.body;
        await  updateReview(ReviewId,  updatereview);
        res.status(200).json( updatereview);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
};

// Delete review
export const deleteReviewController = async (req, res) => {
    try {
        const ReviewId = req.params.id;
        await deleteReview(ReviewId);
        res.status(200).json({ message: "Review deleted successfully" });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
};
