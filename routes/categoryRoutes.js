import express from "express";
const router = express.Router();
import { createCategoryController } from "../controllers/categoryController.js";


router.post("/",createCategoryController);


export default router;