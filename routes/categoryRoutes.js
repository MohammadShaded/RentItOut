import express from "express";
const router = express.Router();
import { createCategoryController,getCategoriesController,getCategoryController } from "../controllers/categoryController.js";

router.post("/", createCategoryController);
router.get("/:id",getCategoryController);
router.get("/", getCategoriesController);
router.put("/:id",updateItemController);

export default router;
