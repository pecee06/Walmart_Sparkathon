const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },
    phone:{
        type:String,
        required:true
    },
    role: {
        type: String,
        enum: ['user', 'cashier', 'admin', 'superadmin'],
        required: true
    },

    // For admin/cashier
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: function () {
            return this.role === 'admin' || this.role === 'cashier';
        }
    },

    // For superadmin only
    stores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    }],

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    isShoppingConfirmed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const User = mongoose.model("User",userSchema);
export default User;
