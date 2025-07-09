import express from "express";
import {
	createProduct,
	getProducts,
	getProductById,
	updateProduct,
	deleteProduct,
	getCategories,
	getBrands
} from "../controllers/ProductController.js";
import { authenticateToken } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Product CRUD routes
router.post("/", createProduct);
router.get("/", getProducts);
router.get("/categories", getCategories);
router.get("/brands", getBrands);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
