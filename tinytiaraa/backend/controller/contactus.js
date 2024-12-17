const cloudinary = require('cloudinary');
const Contactus = require('../model/contactus');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/Errorhandler');
const express = require("express")
const router = express.Router()

// Initialize router


// POST /customise/detail - Create a new customisation request
router.post("/contactus", catchAsyncErrors(async (req, res, next) => {
    try {
        // Extract fields from the request body
        const { name, email, message, phonenumber } = req.body;

        // Validate required fields
        if (!name || !email || !phonenumber || !message) {
            return next(new ErrorHandler("All fields are required", 400));
        }


        // Create a new customisation document
        const contactus = await Contactus.create({
            name,
            email,
            message,
            phonenumber,
        });

        // Send a success response
        res.status(201).json({
            success: true,
            message: "Thank you for reaching out to us! We will review your message and get back to you as soon as possible.",
            contactus,
        });
    } catch (error) {
        // Handle errors
        return next(new ErrorHandler(error.message || "Internal Server Error", 500));
    }
}));



router.get("/all/contactus", catchAsyncErrors(async (req, res, next) => {
    try {
        const contactusRequests = await Contactus.find().sort({ CreatedAt: -1 });

        res.status(200).json({
            success: true,
            contactusRequests,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message || "Internal Server Error", 500));
    }
}));





// Export the router
module.exports = router;