import Product from "../models/Product.js";
import Inventory from "../models/Inventory.js";

// Create a new product
export const createProduct = async (req, res) => {
	try {
		const {
			name,
			description,
			sku,
			barcode,
			category,
			brand,
			price,
			costPrice,
			unit,
			weight,
			dimensions,
			images,
			reorderPoint,
			maxStock,
			location
		} = req.body;

		const storeId = req.user.store || req.body.store;

		if (!storeId) {
			return res.status(400).json({ message: "Store ID is required" });
		}

		// Check if SKU already exists
		const existingProduct = await Product.findOne({ sku, store: storeId });
		if (existingProduct) {
			return res
				.status(400)
				.json({ message: "SKU already exists for this store" });
		}

		// Create product
		const product = new Product({
			name,
			description,
			sku,
			barcode,
			category,
			brand,
			price,
			costPrice,
			unit,
			weight,
			dimensions,
			images,
			createdBy: req.user.id,
			store: storeId
		});

		await product.save();

		// Create initial inventory record
		const inventory = new Inventory({
			product: product._id,
			store: storeId,
			quantity: 0,
			reorderPoint: reorderPoint || 10,
			maxStock: maxStock || 100,
			location: location || {}
		});

		await inventory.save();

		// Populate references
		await product.populate("createdBy", "name email");
		await product.populate("store", "name location");

		res.status(201).json({
			message: "Product created successfully",
			product,
			inventory
		});
	} catch (error) {
		console.error("Error creating product:", error);
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};

// Get all products with pagination and filters
export const getProducts = async (req, res) => {
	try {
		const {
			page = 1,
			limit = 10,
			search,
			category,
			brand,
			isActive,
			sortBy = "createdAt",
			sortOrder = "desc"
		} = req.query;

		const storeId = req.user.store || req.query.store;

		if (!storeId) {
			return res.status(400).json({ message: "Store ID is required" });
		}

		const query = { store: storeId };

		// Add search filter
		if (search) {
			query.$text = { $search: search };
		}

		// Add category filter
		if (category) {
			query.category = category;
		}

		// Add brand filter
		if (brand) {
			query.brand = brand;
		}

		// Add active status filter
		if (isActive !== undefined) {
			query.isActive = isActive === "true";
		}

		const sortOptions = {};
		sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

		const products = await Product.find(query)
			.populate("createdBy", "name email")
			.populate("store", "name location")
			.sort(sortOptions)
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.exec();

		const total = await Product.countDocuments(query);

		res.json({
			products,
			totalPages: Math.ceil(total / limit),
			currentPage: page,
			total
		});
	} catch (error) {
		console.error("Error fetching products:", error);
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};

// Get product by ID
export const getProductById = async (req, res) => {
	try {
		const { id } = req.params;
		const storeId = req.user.store || req.query.store;

		const query = { _id: id };
		if (storeId) {
			query.store = storeId;
		}

		const product = await Product.findOne(query)
			.populate("createdBy", "name email")
			.populate("store", "name location");

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		// Get inventory information
		const inventory = await Inventory.findOne({
			product: id,
			store: product.store
		}).populate("product", "name sku");

		res.json({
			product,
			inventory
		});
	} catch (error) {
		console.error("Error fetching product:", error);
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};

// Update product
export const updateProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const updateData = req.body;
		const storeId = req.user.store || req.body.store;

		const query = { _id: id };
		if (storeId) {
			query.store = storeId;
		}

		// Check if SKU is being updated and if it already exists
		if (updateData.sku) {
			const existingProduct = await Product.findOne({
				sku: updateData.sku,
				store: storeId || req.user.store,
				_id: { $ne: id }
			});
			if (existingProduct) {
				return res
					.status(400)
					.json({ message: "SKU already exists for this store" });
			}
		}

		const product = await Product.findOneAndUpdate(query, updateData, {
			new: true,
			runValidators: true
		})
			.populate("createdBy", "name email")
			.populate("store", "name location");

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		res.json({
			message: "Product updated successfully",
			product
		});
	} catch (error) {
		console.error("Error updating product:", error);
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};

// Delete product
export const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const storeId = req.user.store || req.query.store;

		const query = { _id: id };
		if (storeId) {
			query.store = storeId;
		}

		const product = await Product.findOneAndDelete(query);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		// Delete associated inventory
		await Inventory.findOneAndDelete({ product: id, store: product.store });

		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.error("Error deleting product:", error);
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};

// Get product categories
export const getCategories = async (req, res) => {
	try {
		const storeId = req.user.store || req.query.store;

		if (!storeId) {
			return res.status(400).json({ message: "Store ID is required" });
		}

		const categories = await Product.distinct("category", { store: storeId });
		res.json({ categories });
	} catch (error) {
		console.error("Error fetching categories:", error);
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};

// Get product brands
export const getBrands = async (req, res) => {
	try {
		const storeId = req.user.store || req.query.store;

		if (!storeId) {
			return res.status(400).json({ message: "Store ID is required" });
		}

		const brands = await Product.distinct("brand", { store: storeId });
		res.json({ brands });
	} catch (error) {
		console.error("Error fetching brands:", error);
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};
