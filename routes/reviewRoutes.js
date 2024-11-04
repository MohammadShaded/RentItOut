import express from "express";
import {
    createReviewController,
    getReviewsByItemIdController,
} from "../controllers/ReviewController.js";

const router = express.Router();

router.post("/", createReviewController);

router.get("/items/:item_id", getReviewsByItemIdController);

export default router;