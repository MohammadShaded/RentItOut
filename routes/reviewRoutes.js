import express from "express";
import {
    createReviewController,
    getReviewsByItemIdController,
    getUserReviewsController,
    editReviewController,
    deleteReviewController
} from "../controllers/ReviewController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         review_id:
 *           type: string
 *           example: "22152362-b2f7-405e-bf10-5bf1b75df8ef"
 *         rental_id:
 *           type: string
 *           example: "00cde1ee-b521-4958-b722-59ce1b8c9329"
 *         reviewer_id:
 *           type: string
 *           example: "2"
 *         rating:
 *           type: integer
 *           example: 4
 *         comments:
 *           type: string
 *           example: "Good experience."
 *         review_date:
 *           type: string
 *           format: date
 *           example: "2024-12-31"
 */


/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Review created successfully
 *       400:
 *         description: Bad request
 */
router.post("/", createReviewController);

/**
 * @swagger
 * /reviews/items/{item_id}:
 *   get:
 *     summary: Get reviews by item ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: item_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the item
 *     responses:
 *       200:
 *         description: A list of reviews for the item
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       404:
 *         description: Reviews not found
 */
router.get("/items/:item_id", getReviewsByItemIdController);

/**
 * @swagger
 * /reviews/users/{user_id}:
 *   get:
 *     summary: Get reviews by user ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: A list of reviews by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       404:
 *         description: Reviews not found for this user
 */
router.get("/users/:user_id", getUserReviewsController);

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Update a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the review to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Review not found
 */
router.put("/:id", editReviewController);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the review to delete
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 */
router.delete("/:id", deleteReviewController);

export default router;
