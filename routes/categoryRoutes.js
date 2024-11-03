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

router.post("/",authenticateToken, createCategoryController);
router.get("/search",authenticateToken, getCategoryBasedOnNameController);
router.get("/:categoryId/items",authenticateToken, getItemsBasedOnCategoryController);
router.get("/:id",authenticateToken, getCategoryController);
router.get("/", authenticateToken,getCategoriesController);
router.put("/:id",authenticateToken, updateCategoryController);
router.delete("/:id",authenticateToken, deleteCategoryController);

export default router;
