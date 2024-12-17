const Ttclub = require('../model/ttclub');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/Errorhandler');
const express = require("express");
const router = express.Router();

// POST /ttclub - Create a new subscription request
router.post("/ttclub", catchAsyncErrors(async (req, res, next) => {
    try {
        // Extract fields from the request body
        const { email } = req.body;

        // Validate required fields
        if (!email) {
            return next(new ErrorHandler("Email field is required", 400));
        }

        // Create a new subscription document
        const ttclub = await Ttclub.create({
            email,
        });

        // Send a success response
        res.status(201).json({
            success: true,
            message: "You're subscribed to the TT Club membership",
            ttclub,
        });
    } catch (error) {
        // Handle errors
        return next(new ErrorHandler(error.message || "Internal Server Error", 500));
    }
}));

// Export the router
module.exports = router;