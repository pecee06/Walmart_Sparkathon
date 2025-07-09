import mongoose from "mongoose";

const inventoryTransactionSchema = new mongoose.Schema(
	{
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			required: true
		},

		store: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Store",
			required: true
		},

		transactionType: {
			type: String,
			required: true,
			enum: [
				"IN",
				"OUT",
				"ADJUSTMENT",
				"TRANSFER",
				"RETURN",
				"DAMAGE",
				"EXPIRY"
			]
		},

		quantity: {
			type: Number,
			required: true
		},

		previousQuantity: {
			type: Number,
			required: true
		},

		newQuantity: {
			type: Number,
			required: true
		},

		reason: {
			type: String,
			required: true,
			trim: true
		},

		reference: {
			type: String,
			trim: true
		},

		referenceId: {
			type: mongoose.Schema.Types.ObjectId
		},

		unitCost: {
			type: Number,
			min: 0
		},

		totalCost: {
			type: Number,
			min: 0
		},

		notes: {
			type: String,
			trim: true
		},

		performedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		},

		supplier: {
			name: { type: String, trim: true },
			id: { type: String, trim: true }
		},

		batchNumber: {
			type: String,
			trim: true
		},

		expiryDate: {
			type: Date
		}
	},
	{
		timestamps: true
	}
);

// Indexes for efficient queries
inventoryTransactionSchema.index({ product: 1, store: 1, createdAt: -1 });
inventoryTransactionSchema.index({ transactionType: 1, createdAt: -1 });
inventoryTransactionSchema.index({ performedBy: 1, createdAt: -1 });
inventoryTransactionSchema.index({ referenceId: 1 });

const InventoryTransaction = mongoose.model(
	"InventoryTransaction",
	inventoryTransactionSchema
);

export default InventoryTransaction;
