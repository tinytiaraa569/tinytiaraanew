const cloudinary = require('cloudinary');
const Customisation = require('../model/Customised');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/Errorhandler');
const express = require("express")
const router = express.Router()

// Initialize router


// POST /customise/detail - Create a new customisation request
router.post("/request", catchAsyncErrors(async (req, res, next) => {
    try {
        // Extract fields from the request body
        const { name, email, message, phonenumber, images , budget ,address} = req.body;

        // Validate required fields
        if (!name || !email || !phonenumber || !message) {
            return next(new ErrorHandler("All fields are required", 400));
        }

        // Process and upload images to Cloudinary
        let imagesLinks = [];
        if (images && images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "customisations",
                });

                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
            }
        }

        // Create a new customisation document
        const customisation = await Customisation.create({
            name,
            email,
            message,
            phonenumber,
            budget,
            address,
            images: imagesLinks.map(img => img.url), // Store only the image URLs
        });

        // Send a success response
        res.status(201).json({
            success: true,
            message: "Customisation request submitted successfully!",
            customisation,
        });
    } catch (error) {
        // Handle errors
        return next(new ErrorHandler(error.message || "Internal Server Error", 500));
    }
}));



router.get("/all/requests", catchAsyncErrors(async (req, res, next) => {
    try {
        const customisationRequests = await Customisation.find().sort({ CreatedAt: -1 });

        res.status(200).json({
            success: true,
            customisationRequests,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message || "Internal Server Error", 500));
    }
}));



router.get("/request/:id", catchAsyncErrors(async (req, res, next) => {
    try {
        // Extract the ID from the request parameters
        const { id } = req.params;

        // Fetch the customisation request from the database
        const customisationRequest = await Customisation.findById(id);

        // Check if the request exists
        if (!customisationRequest) {
            return res.status(404).json({
                success: false,
                message: 'Customisation request not found',
            });
        }

        // Send the customisation request data back to the client
        res.status(200).json({
            success: true,
            customisationRequest,
        });
    } catch (error) {
        console.error('Error fetching customisation request:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }

}));


// Export the router
module.exports = router;