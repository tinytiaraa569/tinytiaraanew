const express = require('express');
const router = express.Router();
const CustomBanner = require('../model/custombanner'); // Import the Banner model
const fs = require('fs');
const path = require('path');
const ErrorHandler = require('../utils/Errorhandler');
const crypto = require('crypto');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Function to generate a random string for public_id
const generateRandomString = (length) => {
    return crypto.randomBytes(length).toString('hex').slice(0, length); // Generate random bytes and convert to hex
};

// Function to process base64 images
// router.post('/home-create-banners', catchAsyncErrors(async (req, res, next) => {
//     const { title, link, images } = req.body;

//     // Check if title and images are provided
//     if (!title || !images || images.length === 0) {
//         return next(new ErrorHandler('Title and at least one image are required', 400));
//     }

//     // Initialize an array for processed images
//     let processedImages = [];

//     // Function to process base64 images
//     const processBase64Image = (imagePath, destinationArray) => { 
//         if (typeof imagePath === "string" && imagePath.startsWith("data:")) {
//             const matches = imagePath.match(/^data:(.+);base64,(.+)$/);
//             if (!matches) {
//                 console.error('Invalid base64 format:', imagePath);
//                 return;
//             }
//             const mimeType = matches[1];
//             const base64Data = matches[2];
//             const extension = mimeType.split('/')[1];
//             const uniqueId = generateRandomString(20);
//             const localImagePath = path.join(__dirname, '../uploads/images/banners', `${uniqueId}.${extension}`);
    
//             fs.writeFileSync(localImagePath, Buffer.from(base64Data, 'base64'));
//             destinationArray.push({
//                 public_id: `banners/${uniqueId}`,
//                 url: `/uploads/images/banners/${uniqueId}.${extension}`
//             });
//         } else {
//             destinationArray.push({ url: imagePath });
//         }
//     };

//     // Process the images sent in the request
//     images.forEach(image => {
//         const imagePath = typeof image === "object" && (image.url || image.path)
//             ? image.url || image.path // Handle object case
//             : typeof image === "string"
//                 ? image // Handle plain string case
//                 : null; // Invalid format

//         if (!imagePath) {
//             return next(new ErrorHandler('Invalid image format provided', 400));
//         }

//         processBase64Image(imagePath, processedImages);
//     });

//     // Create a new banner
//     const banner = new Banner({
//         title,
//         link,
//         images: processedImages // Store processed image links
//     });

//     await banner.save();

//     res.status(201).json({
//         success: true,
//         message: 'Banner created successfully',
//         banner
//     });
// }));

router.post('/custom-create-banners', catchAsyncErrors(async (req, res, next) => {
    const { title, link, images } = req.body;

    // Check if title and images are provided
    if (!title || !images || images.length === 0) {
        return next(new ErrorHandler('Title and at least one image are required', 400));
    }

    // Initialize an array for processed images
    let processedImages = [];

    // Function to process base64 images
    const processBase64Image = (imagePath, destinationArray) => { 
        if (typeof imagePath === "string" && imagePath.startsWith("data:")) {
            const matches = imagePath.match(/^data:(.+);base64,(.+)$/);
            if (!matches) {
                console.error('Invalid base64 format:', imagePath);
                return;
            }
            const mimeType = matches[1];
            const base64Data = matches[2];
            const extension = mimeType.split('/')[1];
            const uniqueId = generateRandomString(20);
            const localImagePath = path.join(__dirname, '../uploads/images/banners/custom', `${uniqueId}.${extension}`);
    
            fs.writeFileSync(localImagePath, Buffer.from(base64Data, 'base64'));
            destinationArray.push({
                public_id: `banners/${uniqueId}`,
                url: `/uploads/images/banners/custom/${uniqueId}.${extension}`
            });
        } else {
            destinationArray.push({ url: imagePath });
        }
    };

    // Process the images sent in the request
    images.forEach(image => {
        const imagePath = typeof image === "object" && (image.url || image.path)
            ? image.url || image.path // Handle object case
            : typeof image === "string"
                ? image // Handle plain string case
                : null; // Invalid format

        if (!imagePath) {
            return next(new ErrorHandler('Invalid image format provided', 400));
        }

        processBase64Image(imagePath, processedImages);
    });

    // Fetch the current banners and determine the next order value
    const banners = await CustomBanner.find();
    const maxOrder = banners.length > 0 ? Math.max(...banners.map(banner => banner.order)) : 0;
    
    // Create a new banner with the correct order
    const banner = new CustomBanner({
        title,
        link,
        images: processedImages,
        order: maxOrder + 1  // Set the correct order value
    });

    await banner.save();

    res.status(201).json({
        success: true,
        message: 'Banner created successfully',
        banner
    });
}));


// // Get all banners

router.get('/get-allcustombanners', catchAsyncErrors(async (req, res, next) => {

    try {
        const banners = await CustomBanner.find();

        res.status(200).json({
            success: true,
            banners
        });
    } catch (error) {
        console.error('Error fetching banners:', error);
        return next(new ErrorHandler('Internal server error', 500));
    }
}));

// // Get a banner by ID
router.get('/get-custombanner/:id', catchAsyncErrors(async (req, res, next) => {

    try {
        const banner = await CustomBanner.findById(req.params.id);

        if (!banner) {
            return next(new ErrorHandler('Banner not found', 404));
        }

        res.status(200).json({
            success: true,
            banner
        });
    } catch (error) {
        console.error('Error fetching banner:', error);
        return next(new ErrorHandler('Internal server error', 500));
    }
}));

// // Update a banner by ID



router.put('/update-custombanner/:id', catchAsyncErrors(async (req, res, next) => {
    const { title, link, images } = req.body;

    // Find the existing banner
    const banner = await CustomBanner.findById(req.params.id);
    if (!banner) {
        return next(new ErrorHandler('Banner not found', 404));
    }

    // Initialize an array for the updated images
    let updatedImages = [];

    // Function to process base64 images
    const EditprocessBase64Image = (imagePath, destinationArray) => { 
        if (typeof imagePath === "string" && imagePath.startsWith("data:")) {
            const matches = imagePath.match(/^data:(.+);base64,(.+)$/);
            if (!matches) {
                console.error('Invalid base64 format:', imagePath);
                return;
            }
            const mimeType = matches[1];
            const base64Data = matches[2];
            const extension = mimeType.split('/')[1];
            const uniqueId = generateRandomString(20);
            const localImagePath = path.join(__dirname, '../uploads/images/banners/custom', `${uniqueId}.${extension}`);
    
            fs.writeFileSync(localImagePath, Buffer.from(base64Data, 'base64'));
            destinationArray.push({
                public_id: `banners/${uniqueId}`,
                url: `/uploads/images/banners/custom/${uniqueId}.${extension}`
            });
        } else {
            destinationArray.push({ url: imagePath });
        }
    };

    // Get existing image URLs for comparison
    const existingImages = banner.images.map(img => img.url);

    // Determine if images are provided as a single string or an array
    let incomingImages = [];
    if (typeof images === "string") {
        incomingImages.push(images); // Single image as a string
    } else if (Array.isArray(images)) {
        incomingImages = images; // Array of images
    }

    for (const image of incomingImages) {
        const imagePath = typeof image === "object" && (image.url || image.path)
            ? image.url || image.path // Handle object case
            : typeof image === "string"
                ? image // Handle plain string case
                : null; // Invalid format

        if (!imagePath) {
            return next(new ErrorHandler('Invalid image format provided', 400));
        }

        // Only upload new images that are not already in the database
        if (!existingImages.includes(imagePath)) {
            EditprocessBase64Image(imagePath, updatedImages);
        } else {
            // If the image already exists, just add the existing image info
            updatedImages.push(banner.images.find(img => img.url === imagePath));
        }
    }

    // Update banner fields
    banner.title = title;
    banner.link = link;
    banner.images = updatedImages;

    await banner.save();

    res.status(200).json({
        success: true,
        message: 'Banner updated successfully',
        banner
    });
}));

// // Delete a banner by ID

router.delete('/delete-custombanner/:id', catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    // Find and delete the banner
    const bannerToDelete = await CustomBanner.findByIdAndDelete(id);

    if (!bannerToDelete) {
        return next(new ErrorHandler('Banner not found', 404));
    }

    // After deleting the banner, we need to reassign the order values
    const remainingBanners = await CustomBanner.find().sort({ order: 1 }); // Sort banners by current order

    // Reassign order values to maintain a continuous sequence starting from 0
    for (let i = 0; i < remainingBanners.length; i++) {
        remainingBanners[i].order = i;  // Assign new order value starting from 0 (0, 1, 2, ...)
        await remainingBanners[i].save();   // Save the updated order
    }

    res.status(200).json({
        success: true,
        message: 'Banner deleted and order reassigned successfully'
    });
}));

// delete multiple baners ID 
// router.post('/delete-multiple-banners', catchAsyncErrors(async (req, res, next) => {
//     const { ids } = req.body; // Expecting an array of IDs in the request body

//     // Check if the ids array is provided and not empty
//     if (!ids || !Array.isArray(ids) || ids.length === 0) {
//         return next(new ErrorHandler('No banner IDs provided', 400));
//     }

//     try {
//         // Delete all banners with the provided IDs
//         const deleteResult = await Banner.deleteMany({ _id: { $in: ids } });

//         if (deleteResult.deletedCount === 0) {
//             return next(new ErrorHandler('No banners found for the provided IDs', 404));
//         }

//         res.status(200).json({
//             success: true,
//             message: `${deleteResult.deletedCount} banners deleted successfully`
//         });
//     } catch (error) {
//         console.error('Error deleting multiple banners:', error);
//         return next(new ErrorHandler('Internal server error', 500));
//     }
// }));
router.post('/delete-multiple-custombanners', catchAsyncErrors(async (req, res, next) => {
    const { ids } = req.body; // Expecting an array of IDs in the request body

    // Check if the ids array is provided and not empty
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return next(new ErrorHandler('No banner IDs provided', 400));
    }

    try {
        // Delete all banners with the provided IDs
        const deleteResult = await CustomBanner.deleteMany({ _id: { $in: ids } });

        if (deleteResult.deletedCount === 0) {
            return next(new ErrorHandler('No banners found for the provided IDs', 404));
        }

        // Now, update the order of the remaining banners
        const remainingBanners = await CustomBanner.find().sort({ order: 1 }); // Sort by current order

        // Reassign the order values to ensure they start from 0 and increment correctly
        for (let i = 0; i < remainingBanners.length; i++) {
            remainingBanners[i].order = i;  // Set new order starting from 0
            await remainingBanners[i].save();  // Save the updated banner order
        }

        res.status(200).json({
            success: true,
            message: `${deleteResult.deletedCount} banners deleted successfully, order reassigned`
        });
    } catch (error) {
        console.error('Error deleting multiple banners:', error);
        return next(new ErrorHandler('Internal server error', 500));
    }
}));

// In your routes file, e.g., bannerRoutes.js
router.post('/update-custombanner-order', catchAsyncErrors(async (req, res, next) => {
    const { orderedBanners } = req.body;

    // Iterate over orderedBanners and update each banner's order in the database
    try {
        for (const { id, order } of orderedBanners) {
            await CustomBanner.findByIdAndUpdate(id, { order });
        }
        res.status(200).json({ success: true, message: "Banner order updated successfully" });
    } catch (error) {
        console.error("Error updating banner order:", error);
        return next(new ErrorHandler("Failed to update banner order", 500));
    }
}));

// Export the router
module.exports = router;