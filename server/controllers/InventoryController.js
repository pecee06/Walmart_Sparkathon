import Inventory from "../models/Inventory.js";
import InventoryTransaction from "../models/InventoryTransaction.js";
import Product from "../models/Product.js";

// Get inventory for all products
export const getInventory = async (req, res) => {
	try {
		const {
			page = 1,
			limit = 10,
			search,
			category,
			lowStock,
			outOfStock,
			sortBy = "product.name",
			sortOrder = "asc"
		} = req.query;

		const storeId = req.user.store || req.query.store;

		if (!storeId) {
			return res.status(400).json({ message: "Store ID is required" });
		}

		const query = { store: storeId };

		// Add low stock filter
		if (lowStock === "true") {
			query.$expr = { $lte: ["$quantity", "$reorderPoint"] };
		}

		// Add out of stock filter
		if (outOfStock === "true") {
			query.quantity = 0;
		}

		const sortOptions = {};
		sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

		let inventoryQuery = Inventory.find(query)
			.populate({
				path: "product",
				select: "name sku category brand price",
				match: search ? { $text: { $search: search } } : {},
				populate: {
					path: "category",
					select: "name"
				}
			})
			.sort(sortOptions)
			.limit(limit * 1)
			.skip((page - 1) * limit);

		// Add category filter
		if (category) {
			inventoryQuery = inventoryQuery.populate({
				path: "product",
				select: "name sku category brand price",
				match: { category },
				populate: {
					path: "category",
					select: "name"
				}
			});
		}

		const inventory = await inventoryQuery.exec();

		// Filter out inventory items with no product (due to search/category filters)
		const filteredInventory = inventory.filter((item) => item.product);

		const total = await Inventory.countDocuments(query);

		res.json({
			inventory: filteredInventory,
			totalPages: Math.ceil(total / limit),
			currentPage: page,
			total
		});
	} catch (error) {
		console.error("Error fetching inventory:", error);
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};

// Get inventory for specific product
export const getProductInventory = async (req, res) => {
	try {
		const { productId } = req.params;
		const storeId = req.user.store || req.query.store;

		if (!storeId) {
			return res.status(400).json({ message: "Store ID is required" });
		}

		const inventory = await Inventory.findOne({
			product: productId,
			store: storeId
		}).populate("product", "name sku category brand price costPrice");

		if (!inventory) {
			return res.status(404).json({ message: "Inventory not found" });
		}

		// Get recent transactions
		const transactions = await InventoryTransaction.find({
			product: productId,
			store: storeId
		})
			.sort({ createdAt: -1 })
			.limit(10)
			.populate("performedBy", "name email");

		res.json({
			inventory,
			recentTransactions: transactions
		});
	} catch (error) {
		console.error("Error fetching product inventory:", error);
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};

// Update inventory (stock adjustment)
export const updateInventory = async (req, res) => {
	try {
		const { productId } = req.params;
		const {
			quantity,
			reason,
			notes,
			transactionType = "ADJUSTMENT"
		} = req.body;
		const storeId = req.user.store || req.body.store;

		if (!storeId) {
			return res.status(400).json({ message: "Store ID is required" });
		}

		const inventory = await Inventory.findOne({
			product: productId,
			store: storeId
		});
		if (!inventory) {
			return res.status(404).json({ message: "Inventory not found" });
		}

		const previousQuantity = inventory.quantity;
		const newQuantity = Math.max(0, previousQuantity + quantity);

		// Update inventory
		inventory.quantity = newQuantity;
		inventory.lastRestocked =
			quantity > 0 ? new Date() : inventory.lastRestocked;
		await inventory.save();

		// Create transaction record
		const transaction = new InventoryTransaction({
			product: productId,
			store: storeId,
			transactionType,
			quantity: Math.abs(quantity),
			previousQuantity,
			newQuantity,
			reason,
			notes,
			performedBy: req.user.id
		});

		await transaction.save();

		res.json({
			message: "Inventory updated successfully",
			inventory,
			transaction
		});
	} catch (error) {
		console.error("Error updating inventory:", error);
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};

// Bulk stock update
export const bulkUpdateInventory = async (req, res) => {
	try {
		const { updates } = req.body;
		const storeId = req.user.store || req.body.store;

		if (!storeId) {
			return res.status(400).json({ message: "Store ID is required" });
		}

		if (!Array.isArray(updates) || updates.length === 0) {
			return res.status(400).json({ message: "Updates array is required" });
		}

		const results = [];

		for (const update of updates) {
			const {
				productId,
				quantity,
				reason,
				notes,
				transactionType = "ADJUSTMENT"
			} = update;

			const inventory = await Inventory.findOne({
				product: productId,
				store: storeId
			});
			if (!inventory) {
				results.push({
					productId,
					success: false,
					message: "Inventory not found"
				});
				continue;
			}

			const previousQuantity = inventory.quantity;
			const newQuantity = Math.max(0, previousQuantity + quantity);

			// Update inventory
			inventory.quantity = newQuantity;
			inventory.lastRestocked =
				quantity > 0 ? new Date() : inventory.lastRestocked;
			await inventory.save();

			// Create transaction record
			const transaction = new InventoryTransaction({
				product: productId,
				store: storeId,
				transactionType,
				quantity: Math.abs(quantity),
				previousQuantity,
				newQuantity,
				reason,
				notes,
				performedBy: req.user.id
			});

			await transaction.save();

			results.push({
				productId,
				success: true,
				previousQuantity,
				newQuantity,
				transaction: transaction._id
			});
		}

		res.json({
			message: "Bulk inventory update completed",
			results
		});
	} catch (error) {
		console.error("Error in bulk inventory update:", error);
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};

// Get low stock items
export const getLowStockItems = async (req, res) => {
	try {
		const storeId = req.user.store || req.query.store;

		if (!storeId) {
			return res.status(400).json({ message: "Store ID is required" });
		}

		const lowStockItems = await Inventory.find({
			store: storeId,
			$expr: { $lte: ["$quantity", "$reorderPoint"] }
		})
			.populate("product", "name sku category brand price")
			.sort({ quantity: 1 });

		res.json({ lowStockItems });
	} catch (error) {
		console.error("Error fetching low stock items:", error);
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};

// Get out of stock items
export const getOutOfStockItems = async (req, res) => {
	try {
		const storeId = req.user.store || req.query.store;

		if (!storeId) {
			return res.status(400).json({ message: "Store ID is required" });
		}

		const outOfStockItems = await Inventory.find({
			store: storeId,
			quantity: 0
		})
			.populate("product", "name sku category brand price")
			.sort({ "product.name": 1 });

		res.json({ outOfStockItems });
	} catch (error) {
		console.error("Error fetching out of stock items:", error);
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};

// Get inventory transactions
export const getInventoryTransactions = async (req, res) => {
	try {
		const {
			page = 1,
			limit = 20,
			productId,
			transactionType,
			startDate,
			endDate,
			sortBy = "createdAt",
			sortOrder = "desc"
		} = req.query;

		const storeId = req.user.store || req.query.store;

		if (!storeId) {
			return res.status(400).json({ message: "Store ID is required" });
		}

		const query = { store: storeId };

		if (productId) {
			query.product = productId;
		}

		if (transactionType) {
			query.transactionType = transactionType;
		}

		if (startDate || endDate) {
			query.createdAt = {};
			if (startDate) query.createdAt.$gte = new Date(startDate);
			if (endDate) query.createdAt.$lte = new Date(endDate);
		}

		const sortOptions = {};
		sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

		const transactions = await InventoryTransaction.find(query)
			.populate("product", "name sku")
			.populate("performedBy", "name email")
			.sort(sortOptions)
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.exec();

		const total = await InventoryTransaction.countDocuments(query);

		res.json({
			transactions,
			totalPages: Math.ceil(total / limit),
			currentPage: page,
			total
		});
	} catch (error) {
		console.error("Error fetching inventory transactions:", error);
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};

// Get inventory summary/dashboard data
export const getInventorySummary = async (req, res) => {
	try {
		const storeId = req.user.store || req.query.store;

		if (!storeId) {
			return res.status(400).json({ message: "Store ID is required" });
		}

		// Total products
		const totalProducts = await Inventory.countDocuments({ store: storeId });

		// Low stock items
		const lowStockCount = await Inventory.countDocuments({
			store: storeId,
			$expr: { $lte: ["$quantity", "$reorderPoint"] }
		});

		// Out of stock items
		const outOfStockCount = await Inventory.countDocuments({
			store: storeId,
			quantity: 0
		});

		// Total inventory value
		const inventoryWithProducts = await Inventory.find({
			store: storeId
		}).populate("product", "costPrice");

		const totalValue = inventoryWithProducts.reduce((sum, item) => {
			return sum + item.quantity * (item.product?.costPrice || 0);
		}, 0);

		// Recent transactions count
		const recentTransactionsCount = await InventoryTransaction.countDocuments({
			store: storeId,
			createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } // Last 24 hours
		});

		res.json({
			summary: {
				totalProducts,
				lowStockCount,
				outOfStockCount,
				totalValue: Math.round(totalValue * 100) / 100,
				recentTransactionsCount
			}
		});
	} catch (error) {
		console.error("Error fetching inventory summary:", error);
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};
