import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},

		code: {
			type: String,
			required: true,
			unique: true,
			trim: true
		},

		contactPerson: {
			name: { type: String, trim: true },
			email: { type: String, trim: true },
			phone: { type: String, trim: true }
		},

		address: {
			street: { type: String, trim: true },
			city: { type: String, trim: true },
			state: { type: String, trim: true },
			zipCode: { type: String, trim: true },
			country: { type: String, trim: true }
		},

		email: {
			type: String,
			trim: true
		},

		phone: {
			type: String,
			trim: true
		},

		website: {
			type: String,
			trim: true
		},

		taxId: {
			type: String,
			trim: true
		},

		paymentTerms: {
			type: String,
			trim: true,
			default: "Net 30"
		},

		creditLimit: {
			type: Number,
			min: 0,
			default: 0
		},

		currentBalance: {
			type: Number,
			default: 0
		},

		rating: {
			type: Number,
			min: 1,
			max: 5
		},

		isActive: {
			type: Boolean,
			default: true
		},

		notes: {
			type: String,
			trim: true
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

// Indexes for efficient queries
supplierSchema.index({ code: 1, store: 1 });
supplierSchema.index({ name: "text" });
supplierSchema.index({ isActive: 1, store: 1 });

const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;
