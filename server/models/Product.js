import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},

		description: {
			type: String,
			trim: true
		},

		sku: {
			type: String,
			required: true,
			unique: true,
			trim: true
		},

		barcode: {
			type: String,
			unique: true,
			sparse: true,
			trim: true
		},

		category: {
			type: String,
			required: true,
			trim: true
		},

		brand: {
			type: String,
			trim: true
		},

		price: {
			type: Number,
			required: true,
			min: 0
		},

		costPrice: {
			type: Number,
			required: true,
			min: 0
		},

		unit: {
			type: String,
			required: true,
			trim: true,
			default: "piece"
		},

		weight: {
			type: Number,
			min: 0
		},

		dimensions: {
			length: { type: Number, min: 0 },
			width: { type: Number, min: 0 },
			height: { type: Number, min: 0 }
		},

		images: [
			{
				type: String
			}
		],

		isActive: {
			type: Boolean,
			default: true
		},

		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		},

		store: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Store",
			required: true
		}
	},
	{
		timestamps: true
	}
);

// Index for efficient queries
productSchema.index({ sku: 1, store: 1 });
productSchema.index({ category: 1, store: 1 });
productSchema.index({ name: "text", description: "text" });

const Product = mongoose.model("Product", productSchema);

export default Product;
