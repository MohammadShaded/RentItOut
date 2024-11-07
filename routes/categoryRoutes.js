import express from "express";
const router = express.Router();
import {
  createCategoryController,
  getCategoriesController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
  getItemsBasedOnCategoryController,
  getCategoryBasedOnNameController,
} from "../controllers/categoryController.js";
import authenticateToken from "../middleware/authenticateToken.js";
/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "123"
 *         name:
 *           type: string
 *           example: "Electronics"
 */
/**
 * @swagger
 * tags:
 * name: category
 * description: the category apis
 */

router.post("/",authenticateToken, createCategoryController);
router.get("/search",authenticateToken, getCategoryBasedOnNameController);
router.get("/:categoryId/items",authenticateToken, getItemsBasedOnCategoryController);
router.get("/:id",authenticateToken, getCategoryController);
/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve a list of all categories.
 *     tags:
 *       [Categories]
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get("/",getCategoriesController);
router.put("/:id",authenticateToken, updateCategoryController);
router.delete("/:id",authenticateToken, deleteCategoryController);

export default router;
