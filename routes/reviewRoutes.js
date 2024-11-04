import express from "express";
import {
    createReviewController,
   
} from "../controllers/ReviewController.js";

const router = express.Router();

router.post("/", createReviewController);

export default router;