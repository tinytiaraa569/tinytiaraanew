const mongoose = require('mongoose');

const customBannerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
    },
    images: [
        {
            public_id: {
                type: String,
                // Not required, as per your preference
            },
            url: {
                type: String,
                // Not required, as per your preference
            },
        },
    ],
    order: { type: Number, default: 0 }, // Order field
    createdAt: {
        type: Date,
        default: Date.now, // Use Date.now without parentheses
    },
});

// Create the AboutBanner model
const CustomBanner = mongoose.model('CustomBanner', customBannerSchema);

module.exports = CustomBanner;
