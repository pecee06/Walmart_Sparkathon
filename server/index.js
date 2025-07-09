import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";
import productRoutes from "./routes/ProductRoutes.js";
import inventoryRoutes from "./routes/InventoryRoutes.js";
import supplierRoutes from "./routes/SupplierRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
const databaseUrl = process.env.DATABASE_URL;

app.use(
	cors({
		origin: process.env.ORIGIN || "http://localhost:3000",
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true
	})
);

app.use(cookieParser());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/suppliers", supplierRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
	res.json({
		status: "OK",
		message: "Inventory Management API is running",
		timestamp: new Date().toISOString()
	});
});

const server = app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

mongoose
	.connect(databaseUrl)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => {
		console.error("Error connecting to MongoDB:", err);
	});
