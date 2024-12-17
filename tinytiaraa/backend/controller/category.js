const express = require('express');
const router = express.Router();
const Category = require('../model/category'); // Import the Category model
const fs = require('fs');
const path = require('path');
const ErrorHandler = require('../utils/Errorhandler');
const crypto = require('crypto');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Function to generate a random string for public_id
const generateRandomString = (length) => {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
};

router.post('/create-category', catchAsyncErrors(async (req, res, next) => {
    const { title, subTitle, bannerimg, productbanner, image_Url , type } = req.body;

    // Check if title is provided
    if (!title) {
        return next(new ErrorHandler('Title is required', 400));
    }
    if (!type || !['gold', 'silver', 'coin'].includes(type.toLowerCase())) {
      return next(new ErrorHandler('Valid type is required (gold, silver, coin)', 400));
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
            const localImagePath = path.join(__dirname, '../uploads/images/categories', `${uniqueId}.${extension}`);

            fs.writeFileSync(localImagePath, Buffer.from(base64Data, 'base64'));
            return {
                public_id: `categories/${uniqueId}`,
                url: `/uploads/images/categories/${uniqueId}.${extension}`
            };
        } else {
            return { url: imagePath };
        }
    };

    // Process the images if provided
    const processedBannerImg = bannerimg ? processBase64Image(bannerimg.url || bannerimg.path || bannerimg) : null;
    const processedProductBanner = productbanner ? processBase64Image(productbanner.url || productbanner.path || productbanner) : null;
    const processedImageUrl = image_Url ? processBase64Image(image_Url.url || image_Url.path || image_Url) : null;

    // Fetch the current categories to determine the next order value
    const categories = await Category.find();
    const maxOrder = categories.length > 0 ? Math.max(...categories.map(cat => cat.order)) : 0;

    // Create a new category
    const category = new Category({
        title,
        subTitle,
        type: type.toLowerCase(), // Store type as lowercase
        bannerimg: processedBannerImg || {},
        productbanner: processedProductBanner || {},
        image_Url: processedImageUrl || {},
        order: maxOrder + 1
    });

    await category.save();

    res.status(201).json({
        success: true,
        message: 'Category created successfully',
        category
    });
}));


//get all catgeory 
router.get('/get-allcategories', catchAsyncErrors(async (req, res, next) => {
    try {
        // Fetch all categories from the database
        const categories = await Category.find();

        // Respond with the categories data
        res.status(200).json({
            success: true,
            categories
        });
    } catch (error) {
        // Log the error and pass it to the next middleware for error handling
        console.error('Error fetching categories:', error);
        return next(new ErrorHandler('Internal server error', 500));
    }
}));

// add subcategory
// router.post('/add-subcategory', async (req, res) => {
//     const { categoryId, name } = req.body;
//     try {
//       // Find the category and add the new subcategory to the subcategories array
//       const category = await Category.findById(categoryId);
//       category.subcategories.push({ name });
//       await category.save();
//       res.status(200).json({ message: 'Subcategory added successfully' });
//     } catch (error) {
//       res.status(500).json({ message: 'Failed to add subcategory' });
//     }
//   });

router.post('/add-subcategory', catchAsyncErrors(async (req, res) => {
  const { categoryId, name, subcategoryImage } = req.body;

  // Check if categoryId and name are provided
  if (!categoryId || !name) {
    return res.status(400).json({ message: 'Category ID and Subcategory name are required' });
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
      const uniqueId = generateRandomString(20);  // Generate unique ID for the image
      const localImagePath = path.join(__dirname, '../uploads/images/categories', `${uniqueId}.${extension}`);

      fs.writeFileSync(localImagePath, Buffer.from(base64Data, 'base64')); // Save image to local storage
      return {
        public_id: `categories/${uniqueId}`,
        url: `/uploads/images/categories/${uniqueId}.${extension}`
      };
    } else {
      return { url: imagePath };  // If it's not base64, return the URL directly
    }
  };

  try {
    // Find the category to add the subcategory
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Process the image if provided
    let processedSubcategoryImage = null;
    if (subcategoryImage) {
      processedSubcategoryImage = processBase64Image(subcategoryImage); // Process image
    }

    // Add the new subcategory to the category
    const newSubcategory = {
      name,
      image_Url: processedSubcategoryImage || {}  // Add the image if available
    };

    category.subcategories.push(newSubcategory);
    await category.save();

    res.status(200).json({
      success: true,
      message: 'Subcategory added successfully',
      subcategory: newSubcategory
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add subcategory' });
  }
}));


//edit subcategory 
  // router.put('/edit-subcategory/:subcategoryId', async (req, res) => {
  //   const { subcategoryId } = req.params;
  //   const { name } = req.body;
  
  //   try {
  //     // Find the category that contains the subcategory
  //     const category = await Category.findOne({ 'subcategories._id': subcategoryId });
  
  //     if (!category) {
  //       return res.status(404).json({ message: 'Category not found' });
  //     }
  
  //     // Find the subcategory and update its name
  //     const subcategory = category.subcategories.id(subcategoryId);
  //     subcategory.name = name;
  
  //     // Save the updated category
  //     await category.save();
  
  //     res.status(200).json({ message: 'Subcategory updated successfully', subcategory });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Server error' });
  //   }
  // });

  router.put('/edit-subcategory/:subcategoryId', catchAsyncErrors(async (req, res) => {
    const { subcategoryId } = req.params;
    const { name, imageUrl } = req.body;

    try {
        // Find the category containing the subcategory
        const category = await Category.findOne({ 'subcategories._id': subcategoryId });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Find the specific subcategory
        const subcategory = category.subcategories.id(subcategoryId);

        if (name) {
            subcategory.name = name; // Update subcategory name if provided
        }

        // Function to process the image URL or base64 image
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
                const uniqueId = generateRandomString(20); // Generate a unique ID for the image
                const localImagePath = path.join(__dirname, '../uploads/images/categories', `${uniqueId}.${extension}`);

                // Write the image to disk
                try {
                    fs.writeFileSync(localImagePath, Buffer.from(base64Data, 'base64'));
                } catch (err) {
                    console.error('Error saving image:', err);
                    return null;
                }

                // Return an object with public_id and url
                return {
                    public_id: `categories/${uniqueId}`,
                    url: `/uploads/images/categories/${uniqueId}.${extension}`
                };
            } else {
                // If the image is already a URL, return it as an object with url key
                return { url: imagePath };
            }
        };

        // Process and update the image URL if provided
        if (imageUrl) {
            const processedSubcategoryImage = processBase64Image(imageUrl);
            if (processedSubcategoryImage) {
                subcategory.image_Url = processedSubcategoryImage; // Set image_Url as an object
            }
        }

        // Save the updated category document
        await category.save();

        res.status(200).json({
            success: true,
            message: 'Subcategory updated successfully',
            subcategory
        });
    } catch (error) {
        console.error('Error updating subcategory:', error);
        res.status(500).json({ message: 'Failed to update subcategory' });
    }
  }));



  // Delete subcategory
router.delete('/delete-subcategory/:subcategoryId', async (req, res) => {
    const { subcategoryId } = req.params;
  
    try {
      // Find the category that contains the subcategory
      const category = await Category.findOne({ 'subcategories._id': subcategoryId });
  
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      // Remove the subcategory from the subcategories array
      category.subcategories = category.subcategories.filter(
        subcategory => subcategory._id.toString() !== subcategoryId
      );
  
      // Save the updated category
      await category.save();
  
      res.status(200).json({ message: 'Subcategory deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });



//   get specific catgeory 

router.get('/get-category/:categoryId', catchAsyncErrors(async (req, res, next) => {
    const { categoryId } = req.params;
  
    try {
      // Find the category by its ID
      const category = await Category.findById(categoryId);
  
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      // Respond with the category data
      res.status(200).json({
        success: true,
        category
      });
    } catch (error) {
      // Handle errors and pass them to the error handler
      console.error('Error fetching category:', error);
      return next(new ErrorHandler('Internal server error', 500));
    }
  }));


// edit for specific catgeory 


// Update specific category
// router.put('/update-category/:categoryId', catchAsyncErrors(async (req, res, next) => {
//   const { categoryId } = req.params;
//   const { title, subTitle, bannerimg, productbanner, image_Url ,type  } = req.body;

//   try {
//       // Find the category by its ID
//       const category = await Category.findById(categoryId);

//       if (!category) {
//           return res.status(404).json({ message: 'Category not found' });
//       }

//       // Update fields if provided in the request body
//       if (title !== undefined) category.title = title;
//       if (subTitle !== undefined) category.subTitle = subTitle;
//       if (type !== undefined) category.type = type; 

//       // Helper function to process base64 images, if needed
//       const processBase64Image = (imagePath) => {
//           if (typeof imagePath === "string" && imagePath.startsWith("data:")) {
//               const matches = imagePath.match(/^data:(.+);base64,(.+)$/);
//               if (!matches) {
//                   console.error('Invalid base64 format:', imagePath);
//                   return null;
//               }
//               const mimeType = matches[1];
//               const base64Data = matches[2];
//               const extension = mimeType.split('/')[1];
//               const uniqueId = generateRandomString(20);
//               const localImagePath = path.join(__dirname, '../uploads/images/categories', `${uniqueId}.${extension}`);

//               fs.writeFileSync(localImagePath, Buffer.from(base64Data, 'base64'));
//               return {
//                   public_id: `categories/${uniqueId}`,
//                   url: `/uploads/images/categories/${uniqueId}.${extension}`
//               };
//           } else {
//               return { url: imagePath };
//           }
//       };

//       // Process and update images if provided
//       if (bannerimg) {
//           category.bannerimg = processBase64Image(bannerimg.url || bannerimg.path || bannerimg) || category.bannerimg;
//       }
//       if (productbanner) {
//           category.productbanner = processBase64Image(productbanner.url || productbanner.path || productbanner) || category.productbanner;
//       }
//       if (image_Url) {
//           category.image_Url = processBase64Image(image_Url.url || image_Url.path || image_Url) || category.image_Url;
//       }

//       // Save the updated category
//       await category.save();

//       res.status(200).json({
//           success: true,
//           message: 'Category updated successfully',
//           category
//       });
//   } catch (error) {
//       console.error('Error updating category:', error);
//       return next(new ErrorHandler('Internal server error', 500));
//   }
// }));

// Update specific category
router.put('/update-category/:categoryId', catchAsyncErrors(async (req, res, next) => {
  const { categoryId } = req.params;
  const { title, subTitle, bannerimg, productbanner, image_Url, type, order } = req.body; // Include `order` in the request body

  try {
    // Find the category by its ID
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Update fields if provided in the request body
    if (title !== undefined) category.title = title;
    if (subTitle !== undefined) category.subTitle = subTitle;
    if (type !== undefined) category.type = type; 
    if (order !== undefined) category.order = order; // Update the order if provided

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
        const localImagePath = path.join(__dirname, '../uploads/images/categories', `${uniqueId}.${extension}`);

        fs.writeFileSync(localImagePath, Buffer.from(base64Data, 'base64'));
        return {
          public_id: `categories/${uniqueId}`,
          url: `/uploads/images/categories/${uniqueId}.${extension}`
        };
      } else {
        return { url: imagePath };
      }
    };

    // Process and update images if provided
    if (bannerimg) {
      category.bannerimg = processBase64Image(bannerimg.url || bannerimg.path || bannerimg) || category.bannerimg;
    }
    if (productbanner) {
      category.productbanner = processBase64Image(productbanner.url || productbanner.path || productbanner) || category.productbanner;
    }
    if (image_Url) {
      category.image_Url = processBase64Image(image_Url.url || image_Url.path || image_Url) || category.image_Url;
    }

    // Save the updated category
    await category.save();

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      category
    });
  } catch (error) {
    console.error('Error updating category:', error);
    return next(new ErrorHandler('Internal server error', 500));
  }
}));

// Delete a specific category by ID
router.delete('/delete-category/:categoryId', catchAsyncErrors(async (req, res, next) => {
  const { categoryId } = req.params;

  try {
    // Find the category by its ID
    const category = await Category.findById(categoryId);

    // If the category does not exist, respond with an error
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    // Optional: If your category contains image paths and you want to delete files locally
    // (Remove if unnecessary or replace with desired image deletion logic)
    if (category.bannerimg && category.bannerimg.url) {
      const filePath = path.join(__dirname, `../${category.bannerimg.url}`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    if (category.productbanner && category.productbanner.url) {
      const filePath = path.join(__dirname, `../${category.productbanner.url}`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    if (category.image_Url && category.image_Url.url) {
      const filePath = path.join(__dirname, `../${category.image_Url.url}`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Delete the category from the database
    await category.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    return next(new ErrorHandler('Internal server error', 500));
  }
}));






module.exports = router;
