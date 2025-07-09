import express from "express";
import {
	getInventory,
	getProductInventory,
	updateInventory,
	bulkUpdateInventory,
	getLowStockItems,
	getOutOfStockItems,
	getInventoryTransactions,
	getInventorySummary
} from "../controllers/InventoryController.js";
import { authenticateToken } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Inventory management routes
router.get("/", getInventory);
router.get("/summary", getInventorySummary);
router.get("/low-stock", getLowStockItems);
router.get("/out-of-stock", getOutOfStockItems);
router.get("/transactions", getInventoryTransactions);

// Product-specific inventory routes
router.get("/product/:productId", getProductInventory);
router.put("/product/:productId", updateInventory);

// Bulk operations
router.post("/bulk-update", bulkUpdateInventory);

export default router;
