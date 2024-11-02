import express from "express";
const router = express.Router();
import {
  createItemController,
  getItemController,
  updateItemController,
  deleteItemController,
  filterItemsController,
  getTrendingItemsController,
} from "../controllers/itemController.js";

router.get("/filter", filterItemsController);
router.get("/trending", getTrendingItemsController);
router.get("/:id", getItemController);
router.post("/", createItemController);
router.put("/:id", updateItemController);
router.delete("/:id", deleteItemController);

export default router;
