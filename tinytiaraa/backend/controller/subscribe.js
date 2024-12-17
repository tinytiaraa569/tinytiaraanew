const Subscribe = require('../model/subscribe');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/Errorhandler');
const express = require("express");
const router = express.Router();

// POST /ttclub - Create a new subscription request
router.post("/subscribe", catchAsyncErrors(async (req, res, next) => {
    try {
        // Extract fields from the request body
        const { email , phonenumber} = req.body;

        // Validate required fields
        if (!email) {
            return next(new ErrorHandler("Email field is required", 400));
        }
        if (!phonenumber) {
            return next(new ErrorHandler("Phonenumber field is required", 400));
        }

        // Create a new subscription document
        const subscribe = await Subscribe.create({
            email,phonenumber
        });

        // Send a success response
        res.status(201).json({
            success: true,
            message: "You're subscribed to the Tiny Tiaraa's membership",
            subscribe,
        });
    } catch (error) {
        // Handle errors
        return next(new ErrorHandler(error.message || "Internal Server Error", 500));
    }
}));

// Export the router
module.exports = router;