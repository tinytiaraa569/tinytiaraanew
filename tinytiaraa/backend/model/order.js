const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({

    cart: {
        type: Array,
        required: true
    },
    shippingAddress: {
        type: Object,
        required: true,
    },
    billingAddress: {
        type: Object,
        // required: true,
    },

    
    user: {
        // type: Object,
        // required: true,
        // ref: 'User'

        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: "User",
        default: null, // Allow null for guest users
    },
    totalPrice: {
        type: Number,
        required: true
    },
    couponDiscount: {
        type: Number,
    },
    status: {
        type: String,
        default: "Processing"
    },
    paymentInfo: {
        id: {
            type: String
        },
        status: {
            type: String

        },
        type: {
            type: String

        }
    },
    referralBalance: {
        type: Number,
        default: 0, // This might be better handled in a User model
    },
    referralCodeUsed: {
        type: String, // Store the referral code used
        default: null,
    },
    referredUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    referralPointsApplied: { // Add this field to track referral points used
        type: Number,
        default: 0,
    },
    rewardAmount:{
        type: Number,
    },
   
    guestEmail: {
        type: String,
        default: null,
    },
    paidAt: {
        type: Date,
        default: Date.now(),
    },
    docketno:{
        type: String,
        trim: true,
    },
    invoice: {
        type: String, // Path to the invoice PDF
        required: false,
    },
    deliveredAt: {
        type: Date

    },
    createdAt: {
        type: Date,
        default: Date.now()

    }
})

module.exports = mongoose.model("Order", orderSchema)