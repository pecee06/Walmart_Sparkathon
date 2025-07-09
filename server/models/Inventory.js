import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
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

		quantity: {
			type: Number,
			required: true,
			min: 0,
			default: 0
		},

		reservedQuantity: {
			type: Number,
			required: true,
			min: 0,
			default: 0
		},

		availableQuantity: {
			type: Number,
			required: true,
			min: 0,
			default: 0
		},

		reorderPoint: {
			type: Number,
			required: true,
			min: 0,
			default: 10
		},

		maxStock: {
			type: Number,
			required: true,
			min: 0,
			default: 100
		},

		location: {
			aisle: { type: String, trim: true },
			shelf: { type: String, trim: true },
			bin: { type: String, trim: true }
		},

		lastRestocked: {
			type: Date
		},

		lastUpdated: {
			type: Date,
			default: Date.now
		}
	},
	{
		timestamps: true
	}
);

// Virtual for available quantity calculation
inventorySchema.virtual("calculatedAvailable").get(function () {
	return Math.max(0, this.quantity - this.reservedQuantity);
});

// Pre-save middleware to update available quantity
inventorySchema.pre("save", function (next) {
	this.availableQuantity = Math.max(0, this.quantity - this.reservedQuantity);
	this.lastUpdated = new Date();
	next();
});

// Indexes for efficient queries
inventorySchema.index({ product: 1, store: 1 }, { unique: true });
inventorySchema.index({ store: 1, quantity: 1 });
inventorySchema.index({ "location.aisle": 1, store: 1 });

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
