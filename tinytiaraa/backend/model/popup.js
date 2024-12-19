const mongoose = require('mongoose');

const popupSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    bannerimg: {
        public_id: {
            type: String,
            // Not required, as per your preference
        },
        url: {
            type: String,
            // Not required, as per your preference
        },
    },
    isLive: {
        type: Boolean,
        default: false, // initially, popup is not live
      },
    createdAt: {
        type: Date,
        default: Date.now, // Use Date.now without parentheses for the default value
    },
});

// Create the Popup model
const Popup = mongoose.model('Popup', popupSchema);

module.exports = Popup;
