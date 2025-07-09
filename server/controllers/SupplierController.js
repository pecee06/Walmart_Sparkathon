import Supplier from "../models/Supplier.js";

// Create a new supplier
export const createSupplier = async (req, res) => {
	try {
		const {
			name,
			code,
			contactPerson,
			address,
			email,
			phone,
			website,
			taxId,
			paymentTerms,
			creditLimit,
			rating,
			notes
		} = req.body;

		const storeId = req.user.store || req.body.store;

		if (!storeId) {
			return res.status(400).json({ message: "Store ID is required" });
		}

		// Check if supplier code already exists
		const existingSupplier = await Supplier.findOne({ code, store: storeId });
		if (existingSupplier) {
			return res
				.status(400)
				.json({ message: "Supplier code already exists for this store" });
		}

		const supplier = new Supplier({
			name,
			code,
			contactPerson,
			address,
			email,
			phone,
			website,
			taxId,
			paymentTerms,
			creditLimit,
			rating,
			notes,
			createdBy: req.user.id,
			store: storeId
		});

		await supplier.save();

		// Populate references
		await supplier.populate("createdBy", "name email");
		await supplier.populate("store", "name location");

		res.status(201).json({
			message: "Supplier created successfully",
			supplier
		});
	} catch (error) {
		console.error("Error creating supplier:", error);
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};

// Get all suppliers with pagination and filters
export const getSuppliers = async (req, res) => {
	try {
		const {
			page = 1,
			limit = 10,
			search,
			isActive,
			sortBy = "name",
			sortOrder = "asc"
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

		// Add active status filter
		if (isActive !== undefined) {
			query.isActive = isActive === "true";
		}

		const sortOptions = {};
		sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

		const suppliers = await Supplier.find(query)
			.populate("createdBy", "name email")
			.populate("store", "name location")
			.sort(sortOptions)
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.exec();

		const total = await Supplier.countDocuments(query);

		res.json({
			suppliers,
			totalPages: Math.ceil(total / limit),
			currentPage: page,
			total
		});
	} catch (error) {
		console.error("Error fetching suppliers:", error);
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};

// Get supplier by ID
export const getSupplierById = async (req, res) => {
	try {
		const { id } = req.params;
		const storeId = req.user.store || req.query.store;

		const query = { _id: id };
		if (storeId) {
			query.store = storeId;
		}

		const supplier = await Supplier.findOne(query)
			.populate("createdBy", "name email")
			.populate("store", "name location");

		if (!supplier) {
			return res.status(404).json({ message: "Supplier not found" });
		}

		res.json({ supplier });
	} catch (error) {
		console.error("Error fetching supplier:", error);
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};

// Update supplier
export const updateSupplier = async (req, res) => {
	try {
		const { id } = req.params;
		const updateData = req.body;
		const storeId = req.user.store || req.body.store;

		const query = { _id: id };
		if (storeId) {
			query.store = storeId;
		}

		// Check if supplier code is being updated and if it already exists
		if (updateData.code) {
			const existingSupplier = await Supplier.findOne({
				code: updateData.code,
				store: storeId || req.user.store,
				_id: { $ne: id }
			});
			if (existingSupplier) {
				return res
					.status(400)
					.json({ message: "Supplier code already exists for this store" });
			}
		}

		const supplier = await Supplier.findOneAndUpdate(query, updateData, {
			new: true,
			runValidators: true
		})
			.populate("createdBy", "name email")
			.populate("store", "name location");

		if (!supplier) {
			return res.status(404).json({ message: "Supplier not found" });
		}

		res.json({
			message: "Supplier updated successfully",
			supplier
		});
	} catch (error) {
		console.error("Error updating supplier:", error);
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};

// Delete supplier
export const deleteSupplier = async (req, res) => {
	try {
		const { id } = req.params;
		const storeId = req.user.store || req.query.store;

		const query = { _id: id };
		if (storeId) {
			query.store = storeId;
		}

		const supplier = await Supplier.findOneAndDelete(query);

		if (!supplier) {
			return res.status(404).json({ message: "Supplier not found" });
		}

		res.json({ message: "Supplier deleted successfully" });
	} catch (error) {
		console.error("Error deleting supplier:", error);
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};

// Get supplier summary
export const getSupplierSummary = async (req, res) => {
	try {
		const storeId = req.user.store || req.query.store;

		if (!storeId) {
			return res.status(400).json({ message: "Store ID is required" });
		}

		// Total suppliers
		const totalSuppliers = await Supplier.countDocuments({ store: storeId });

		// Active suppliers
		const activeSuppliers = await Supplier.countDocuments({
			store: storeId,
			isActive: true
		});

		// Average rating
		const suppliersWithRating = await Supplier.find({
			store: storeId,
			rating: { $exists: true, $ne: null }
		});

		const averageRating =
			suppliersWithRating.length > 0
				? suppliersWithRating.reduce(
						(sum, supplier) => sum + supplier.rating,
						0
				  ) / suppliersWithRating.length
				: 0;

		// Top rated suppliers
		const topRatedSuppliers = await Supplier.find({
			store: storeId,
			rating: { $exists: true, $ne: null }
		})
			.sort({ rating: -1 })
			.limit(5)
			.select("name rating");

		res.json({
			summary: {
				totalSuppliers,
				activeSuppliers,
				averageRating: Math.round(averageRating * 10) / 10,
				topRatedSuppliers
			}
		});
	} catch (error) {
		console.error("Error fetching supplier summary:", error);
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};

// Update supplier balance
export const updateSupplierBalance = async (req, res) => {
	try {
		const { id } = req.params;
		const { amount, operation = "add" } = req.body; // operation: 'add' or 'subtract'
		const storeId = req.user.store || req.body.store;

		const query = { _id: id };
		if (storeId) {
			query.store = storeId;
		}

		const supplier = await Supplier.findOne(query);
		if (!supplier) {
			return res.status(404).json({ message: "Supplier not found" });
		}

		// Update balance
		if (operation === "add") {
			supplier.currentBalance += amount;
		} else if (operation === "subtract") {
			supplier.currentBalance = Math.max(0, supplier.currentBalance - amount);
		}

		await supplier.save();

		res.json({
			message: "Supplier balance updated successfully",
			supplier
		});
	} catch (error) {
		console.error("Error updating supplier balance:", error);
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};
