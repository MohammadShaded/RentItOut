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
import authenticateToken from "../middleware/authenticateToken.js";

router.get("/filter",authenticateToken, filterItemsController);
router.get("/trending",authenticateToken, getTrendingItemsController);
router.get("/:id",authenticateToken, getItemController);
router.post("/",authenticateToken, createItemController);
router.put("/:id",authenticateToken, updateItemController);
router.delete("/:id", authenticateToken,deleteItemController);

export default router;
