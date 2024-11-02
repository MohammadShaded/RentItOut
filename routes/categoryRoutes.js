import express from "express";
const router = express.Router();
import { createCategoryController,getCategoriesController,getCategoryController,updateCategoryController } from "../controllers/categoryController.js";

router.post("/", createCategoryController);
router.get("/:id",getCategoryController);
router.get("/", getCategoriesController);
router.put("/:id",updateCategoryController);

export default router;
