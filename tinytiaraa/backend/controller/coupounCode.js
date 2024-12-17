const express = require("express")
const router = express.Router()
const Product = require("../model/product")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const ErrorHandler = require("../utils/Errorhandler")
const Shop = require("../model/shop")
const { isSeller } = require("../middleware/auth");
const CoupounCode = require("../model/coupounCode")
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
// Secret key to sign the JWT
const JWT_SECRET = "ewjdgss372547ydj";

const hashedKey = crypto.createHash('sha256').update(JWT_SECRET).digest(); // Generate a 32-byte key

const encryptDiscount = (discount) => {
  const iv = crypto.randomBytes(16); // Generate a random IV
  const cipher = crypto.createCipheriv('aes-256-cbc', hashedKey, iv); // Use the hashed key
  let encrypted = cipher.update(discount.toString(), 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Return IV and encrypted data as a single string
  return iv.toString('hex') + ':' + encrypted; 
};

//create Coupoun code

// router.post("/create-coupon-code", isSeller, catchAsyncErrors(async (req, res, next) => {

//   try {

//     const isCoupounCodeExists = await CoupounCode.find({ name: req.body.name })

//     if (isCoupounCodeExists.length !== 0) {
//       return next(new ErrorHandler("Coupoun code Already Exists", 400))


//     }
//     const coupounCode = await CoupounCode.create(req.body)
//     res.status(201).json({
//       success: true,
//       coupounCode
//     })


//   } catch (error) {
//     return next(new ErrorHandler(error, 400))


//   }
// }))

router.post("/create-coupon-code", isSeller, catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, value, percentageDiscount, minAmount, maxAmount, selectedProducts, shop } = req.body;

    // Check if coupon code with the same name already exists
    const isCouponCodeExists = await CoupounCode.findOne({ name });
    if (isCouponCodeExists) {
      return next(new ErrorHandler("Coupon code already exists", 400));
    }

    // Create the coupon code based on the provided data
    const couponCodeData = {
      name,
      value: value || null, // Store value if provided
      percentageDiscount: percentageDiscount || null, // Store percentage discount if provided
      minAmount: minAmount || null,
      maxAmount: maxAmount || null,
      selectedProducts: selectedProducts || null,
      shop
    };

    const couponCode = await CoupounCode.create(couponCodeData);

    res.status(201).json({
      success: true,
      couponCode
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
}));


//get all coupon codes

router.get("/get-coupon/:id", isSeller, catchAsyncErrors(async (req, res, next) => {
  try {

    const couponCodes = await CoupounCode.find({ shop: req.params.id });


    res.status(201).json({
      success: true,
      couponCodes
    })

  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
}))

//get all coupon codes

router.get("/get-coupons/:id", catchAsyncErrors(async (req, res, next) => {
  try {

    const couponCodes = await CoupounCode.find({ shop: req.params.id });


    res.status(201).json({
      success: true,
      couponCodes
    })

  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
}))


// delete coupoun code

router.delete(
  "/delete-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CoupounCode.findByIdAndDelete(req.params.id);

      if (!couponCode) {
        return next(new ErrorHandler("Coupon code dosen't exists!", 400));
      }
      res.status(201).json({
        success: true,
        message: "Coupon code deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get couponcode value

router.get(
  "/get-coupon-value/:name",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CoupounCode.findOne({ name: req.params.name });
      if (!couponCode) {
        return next(new ErrorHandler("Coupon code not found", 404));
      }

      res.status(200).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);


// router.post(
//   "/apply-coupon",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const { name, cartItems } = req.body; // Receive the coupon code and cart items from the frontend
//       const couponCode = await CoupounCode.findOne({ name });

//       if (!couponCode) {
//         return next(new ErrorHandler("Coupon code not found", 404));
//       }

//       // Find eligible cart items that belong to the shop the coupon applies to
//       const isCouponValid = cartItems.filter(item => item.shopId === couponCode.shop);

//       if (isCouponValid.length === 0) {
//         return res.status(400).json({
//           success: false,
//           message: "Coupon code is not valid for items in your cart."
//         });
//       }

//       const eligiblePrice = isCouponValid.reduce(
//         (acc, item) => acc + item.qty * item.discountPrice,
//         0
//       );

//       let calculatedDiscount = 0;

//       if (couponCode.percentageDiscount) {
//         calculatedDiscount = (eligiblePrice * (couponCode.percentageDiscount / 100)).toFixed(2);
//       } else if (couponCode.value) {
//         calculatedDiscount = Math.min(eligiblePrice, couponCode.value).toFixed(2);
//       }

//       res.status(200).json({
//         success: true,
//         discount: calculatedDiscount,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 400));
//     }
//   })
// );

// router.post(
//   "/apply-coupon",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const { name, cartItems } = req.body;  // Receive the coupon code and cart items from the frontend
//       const couponCode = await CoupounCode.findOne({ name });

//       if (!couponCode) {
//         return next(new ErrorHandler("Coupon code not found", 404));
//       }

//       // Filter cart items that belong to the shop the coupon applies to
//       const isCouponValid = cartItems.filter((item) => item.shopId === couponCode.shop);

//       if (isCouponValid.length === 0) {
//         return res.status(400).json({
//           success: false,
//           message: "Coupon code is not valid for items in your cart."
//         });
//       }

//       // Calculate eligible cart value
//       const eligiblePrice = isCouponValid.reduce(
//         (acc, item) => acc + item.qty * item.discountPrice,
//         0
//       );

//       // Check if eligible price falls between minAmount and maxAmount (if specified)
//       if (couponCode.minAmount && eligiblePrice < couponCode.minAmount) {
//         return res.status(400).json({
//           success: false,
//           message: `Minimum order amount should be ${couponCode.minAmount} to apply this coupon.`,
//         });
//       }

//       if (couponCode.maxAmount && eligiblePrice > couponCode.maxAmount) {
//         return res.status(400).json({
//           success: false,
//           message: `Maximum order amount to apply this coupon is ${couponCode.maxAmount}.`,
//         });
//       }

//       // Calculate discount
//       let calculatedDiscount = 0;

//       if (couponCode.percentageDiscount) {
//         calculatedDiscount = (eligiblePrice * (couponCode.percentageDiscount / 100)).toFixed(2);
//       } else if (couponCode.value) {
//         calculatedDiscount = Math.min(eligiblePrice, couponCode.value).toFixed(2);
//       }

//       // Create a JWT token with discount info
//       const token = jwt.sign(
//         { discount: calculatedDiscount, couponName: couponCode.name }, // Payload
//         JWT_SECRET, // Secret key
//         { expiresIn: "1h" } // Token expires in 1 hour
//       );

//       // Respond with discount amount and JWT token
//       res.status(200).json({
//         success: true,
//         discount: calculatedDiscount,
//         token, // Send the token to the frontend
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 400));
//     }
//   })
// );

router.post(
  "/apply-coupon",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, cartItems } = req.body; // Receive the coupon code and cart items from the frontend
      console.log(cartItems,"cartitems")
      const couponCode = await CoupounCode.findOne({ name });

      if (!couponCode) {
        return next(new ErrorHandler("Coupon code not found", 404));
      }

      // Filter cart items that belong to the shop the coupon applies to
      const isCouponValid = cartItems.filter((item) => item.shopId === couponCode.shop);

      if (isCouponValid.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Coupon code is not valid for items in your cart."
        });
      }

      // Calculate eligible cart value
      const eligiblePrice = isCouponValid.reduce((acc, item) => {
        // Calculate base price, adding chain price if showWithChain is true and selectedChainSize is set
        const basePrice = item.discountPrice + (item.showWithChain && item.selectedChainSize ? item.chainPrice : 0);
        // Multiply by quantity and add to accumulator
        return acc + item.qty * basePrice;
    }, 0);

      // Check if eligible price falls between minAmount and maxAmount (if specified)
      if (couponCode.minAmount && eligiblePrice < couponCode.minAmount) {
        return res.status(400).json({
          success: false,
          message: `Minimum order amount should be ${couponCode.minAmount} to apply this coupon.`,
        });
      }

      if (couponCode.maxAmount && eligiblePrice > couponCode.maxAmount) {
        return res.status(400).json({
          success: false,
          message: `Maximum order amount to apply this coupon is ${couponCode.maxAmount}.`,
        });
      }

      // Calculate discount
      let calculatedDiscount = 0;
      console.log(eligiblePrice,"see coupon discount price")

      if (couponCode.percentageDiscount) {
        calculatedDiscount = (eligiblePrice * (couponCode.percentageDiscount / 100)).toFixed(2);
      } else if (couponCode.value) {
        calculatedDiscount = Math.min(eligiblePrice, couponCode.value).toFixed(2);
      }

      // Encrypt the discount value
      const encryptedDiscount = encryptDiscount(calculatedDiscount);

      // Create a JWT token with discount info
      const token = jwt.sign(
        { discount: encryptedDiscount, couponName: couponCode.name }, // Payload
        JWT_SECRET, // Secret key
        { expiresIn: "1h" } // Token expires in 1 hour
      );

      // Respond with encrypted discount and JWT token
      res.status(200).json({
        success: true,
        discount: encryptedDiscount,
        token, // Send the token to the frontend
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// router.get('/get-coupon-value/:code', async (req, res) => {
//   const { code } = req.params;

//   try {
//     const coupon = await CoupounCode.findOne({ name: code });
//     if (!coupon) {
//       return res.status(404).json({ success: false, message: 'Coupon code does not exist.' });
//     }

//     // Return the coupon object with shop ID and relevant fields
//     return res.status(200).json({
//       success: true,
//       couponCode: {
//         value: coupon.value, // Only return value from the database
//         percentageDiscount: coupon.percentageDiscount,
//         shop: coupon.shop, // Ensure the shop ID is included
//         // Exclude any fields that you don't want exposed
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: 'Server error.' });
//   }
// });

module.exports = router