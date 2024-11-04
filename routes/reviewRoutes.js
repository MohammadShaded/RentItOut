import express from "express";
import {
    createReviewController,
    getReviewsByItemIdController,
    getUserReviewsController,
    editReviewController,
} from "../controllers/ReviewController.js";

const router = express.Router();

router.post("/", createReviewController);
router.get("/items/:item_id", getReviewsByItemIdController);
router.get("/users/:user_id", getUserReviewsController);
router.put("/:id", editReviewController);
export default router;