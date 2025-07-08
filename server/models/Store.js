import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    location: {
        type: String,
        trim: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Refers to a Super Admin
        required: true
    },

    admins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Admins assigned to this store
    }],

    cashiers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Cashiers assigned to this store
    }]
}, {
    timestamps: true
});

const Store = mongoose.model("Store",storeSchema);
