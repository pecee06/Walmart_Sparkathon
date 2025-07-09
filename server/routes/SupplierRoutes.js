import express from "express";
import {
	createSupplier,
	getSuppliers,
	getSupplierById,
	updateSupplier,
	deleteSupplier,
	getSupplierSummary,
	updateSupplierBalance
} from "../controllers/SupplierController.js";
import { authenticateToken } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Supplier CRUD routes
router.post("/", createSupplier);
router.get("/", getSuppliers);
router.get("/summary", getSupplierSummary);
router.get("/:id", getSupplierById);
router.put("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);

// Supplier balance management
router.put("/:id/balance", updateSupplierBalance);

export default router;
