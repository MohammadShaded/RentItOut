import express from "express";
const router = express.Router();
import { createCategoryController,getCategoriesController,getCategoryController,updateCategoryController,deleteCategoryController } from "../controllers/categoryController.js";

router.post("/", createCategoryController);
router.get("/:id",getCategoryController);
router.get("/", getCategoriesController);
router.put("/:id",updateCategoryController);
router.delete("/:id", deleteCategoryController);
export default router;
