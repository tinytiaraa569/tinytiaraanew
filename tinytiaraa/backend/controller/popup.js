const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const ErrorHandler = require('../utils/Errorhandler');
const crypto = require('crypto');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Popup = require('../model/popup');

// Function to generate a random string for public_id
const generateRandomString = (length) => {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
};

router.post('/create-popup', catchAsyncErrors(async (req, res, next) => {
    const { title, bannerimg } = req.body;

    // Check if title is provided
    if (!title) {
        return next(new ErrorHandler('Title is required', 400));
    }
    
    // Helper function to process base64 images
    const processBase64Image = (imagePath) => {
        if (typeof imagePath === "string" && imagePath.startsWith("data:")) {
            const matches = imagePath.match(/^data:(.+);base64,(.+)$/);
            if (!matches) {
                console.error('Invalid base64 format:', imagePath);
                return null;
            }
            const mimeType = matches[1];
            const base64Data = matches[2];
            const extension = mimeType.split('/')[1];
            const uniqueId = generateRandomString(20);
            const localImagePath = path.join(__dirname, '../uploads/images/popup', `${uniqueId}.${extension}`);

            fs.writeFileSync(localImagePath, Buffer.from(base64Data, 'base64'));
            return {
                public_id: `categories/${uniqueId}`,
                url: `/uploads/images/popup/${uniqueId}.${extension}`
            };
        } else {
            return { url: imagePath };
        }
    };

    // Process the images if provided
    const processedBannerImg = bannerimg ? processBase64Image(bannerimg.url || bannerimg.path || bannerimg) : null;
  
    // Fetch the current categories to determine the next order value
  

    // Create a new category
    const popup = new Popup({
        title,
        bannerimg: processedBannerImg || {},
    });

    await popup.save();

    res.status(201).json({
        success: true,
        message: 'Popup created successfully',
        popup
    });
}));



router.get('/get-allpopup', catchAsyncErrors(async (req, res, next) => {
    try {
        // Fetch all categories from the database
        const popup = await Popup.find();

        // Respond with the categories data
        res.status(200).json({
            success: true,
            popup
        });
    } catch (error) {
        // Log the error and pass it to the next middleware for error handling
        console.error('Error fetching categories:', error);
        return next(new ErrorHandler('Internal server error', 500));
    }
}));



router.get('/get-popup/:popupId', catchAsyncErrors(async (req, res, next) => {
    const { popupId } = req.params;
  
    try {
      // Find the category by its ID
      const popup = await Popup.findById(popupId);
  
      if (!category) {
        return res.status(404).json({ message: 'popup not found' });
      }
  
      // Respond with the category data
      res.status(200).json({
        success: true,
        popup
      });
    } catch (error) {
      // Handle errors and pass them to the error handler
      console.error('Error fetching popup:', error);
      return next(new ErrorHandler('Internal server error', 500));
    }
  }));



  router.put('/update-popup/:popupId', catchAsyncErrors(async (req, res, next) => {
    const { popupId } = req.params;
    const { title, bannerimg } = req.body; // Include `order` in the request body

  
    try {
      // Find the category by its ID
      const popup = await Popup.findById(popupId);
  
      if (!popup) {
        return res.status(404).json({ message: 'popup not found' });
      }
  
    
  
      // Helper function to process base64 images, if needed
      const processBase64Image = (imagePath) => {
        if (typeof imagePath === "string" && imagePath.startsWith("data:")) {
          const matches = imagePath.match(/^data:(.+);base64,(.+)$/);
          if (!matches) {
            console.error('Invalid base64 format:', imagePath);
            return null;
          }
          const mimeType = matches[1];
          const base64Data = matches[2];
          const extension = mimeType.split('/')[1];
          const uniqueId = generateRandomString(20);
          const localImagePath = path.join(__dirname, '../uploads/images/popup', `${uniqueId}.${extension}`);
  
          fs.writeFileSync(localImagePath, Buffer.from(base64Data, 'base64'));
          return {
            public_id: `popup/${uniqueId}`,
            url: `/uploads/images/popup/${uniqueId}.${extension}`
          };
        } else {
          return { url: imagePath };
        }
      };
  
      // Process and update images if provided
      if (bannerimg) {
        popup.bannerimg = processBase64Image(bannerimg.url || bannerimg.path || bannerimg) || popup.bannerimg;
      }

      // If title is provided, update the title
    if (title) {
        popup.title = title;
      }
      
  
      // Save the updated popup
      await popup.save();

  
      res.status(200).json({
        success: true,
        message: 'popup updated successfully',
        popup
      });
    } catch (error) {
      console.error('Error updating category:', error);
      return next(new ErrorHandler('Internal server error', 500));
    }
  }));
  

  router.put('/toogle-popup/:popupId?', catchAsyncErrors(async (req, res, next) => {
    const { popupId } = req.params;  // Get popup ID from request params (optional)
    
    try {
      if (popupId) {
        // Set all popups to isLive = false
        await Popup.updateMany({}, { $set: { isLive: false } });
  
        // Find the popup by ID and set its isLive status to true
        const popup = await Popup.findById(popupId);
        if (!popup) {
          return res.status(404).json({ message: 'Popup not found' });
        }
  
        popup.isLive = true;
        await popup.save();
  
        res.status(200).json({ message: 'Popup live status updated', popup });
      } else {
        // If no popupId is provided, set all popups' isLive to false
        await Popup.updateMany({}, { $set: { isLive: false } });
        
        res.status(200).json({ message: 'All popups set to inactive' });
      }
    } catch (error) {
      console.error('Error toggling live status:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }));
  


router.delete('/delete-popup/:popupId', catchAsyncErrors(async (req, res, next) => {
  const { popupId } = req.params;  // Get popup ID from request params

  try {
    // Find the popup by ID and delete it
    const popup = await Popup.findByIdAndDelete(popupId);
    if (!popup) {
      return res.status(404).json({ message: 'Popup not found' });
    }

    res.status(200).json({ message: 'Popup deleted successfully' });
  } catch (error) {
    console.error('Error deleting popup:', error);
    res.status(500).json({ message: 'Server error' });
  }
}));


module.exports = router;
