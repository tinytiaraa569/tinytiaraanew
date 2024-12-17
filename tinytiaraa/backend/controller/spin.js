const Spin = require('../model/spin');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/Errorhandler');
const express = require("express")
const router = express.Router()
const spinmail = require('../utils/spinmail');

// Initialize Twilio client using environment variables



// Initialize router


// POST /customise/detail - Create a new customisation request
router.post('/spin', catchAsyncErrors(async (req, res, next) => {
  
    try {
        // Extract fields from the request body
        const { name, email, mobile, couponCode } = req.body;

        const htmlContent = `
        <html>
        
        <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap"
        rel="stylesheet">
        <style>
        * {
            margin: 0;
            padding: 0;
            font-family: "Poppins", sans-serif;
            box-sizing: border-box;
        }
        
        .emailconfirm {
            width: 70%;
            margin: auto;
            border: 1px solid #eee;
            padding: 20px 40px;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px !important;
        }
        
        .headeremail {
            padding-bottom: 10px;
            display: inline-block;
            width: 100%;
        }
        
        h2 {
            font-size: 24px;
            font-weight: 600;
            color: #333;
        }
        
        p {
            font-size: 14px;
            color: #666;
            padding-bottom: 10px;
        }
        
        .copy-btn {
            padding: 10px 22px;
            background-color: black;
            color: white !important;
            text-decoration: none;
            font-size: 17px;
            border-radius: 2px;
            display: inline-block;
            text-align: center;
            cursor: pointer;
        }
        
        .copy-code {
            font-size: 18px;
            font-weight: bold;
            padding: 10px;
            background-color: #f0f0f0;
            border: 1px dashed #ccc;
            margin: 10px 5px;
            text-align: center;
            display: inline-block;
        }

        /* New styling for Shop Now button */
        .view-order-btn {
           
            display: inline-block;
            
            text-align: center;
                margin-top: 15px;
                background-color: #006039;
               color: white !important;
                padding: 8px 16px;
                border-radius: 10px;
                font-weight: 400 ;
                font-size: 15px;
                text-decoration: none;

        }
        
        .view-order-btn:hover {
            background-color: #006039;
            color: rgb(255, 255, 255);
        }

        
        img {
            max-width: 150px;
            height: auto;
        }

        a {
            color: #000;
            text-decoration: none;
            font-size: 14px;
        }
        
        @media (max-width: 1000px) {
            .emailconfirm {
                width: 85%;
            }
        }
        
        @media (max-width: 650px) {
            .emailconfirm {
                width: 90%;
            }
        
            h2 {
                font-size: 20px;
            }
        
            .copy-btn {
                font-size: 15px;
            }
        }
        </style>
        </head>
        
        <body>
        <div class="emailconfirm">
            <div class="headeremail" style="text-align: center;">
                <img class="a2adjustimg" src="https://backend.tinytiaraa.com:8000/uploads/images/logowebsite/duvdwbtbmyr8ipqrevot.png" alt="Logo">
                <h2>Congratulations, You've Won a Reward!</h2>
            </div>
        
            <div style="clear: both; margin-top: 25px;">
                <h3>Hi ${name},</h3>
                <p>We are excited to inform you that you have won a spin and received a special reward. Use the coupon code below to claim your discount on your next order.</p>
            </div>
        
            <div class="coupon-section" style="text-align: center;">
                <p>Here is your coupon code:</p>
                <div class="copy-code" id="coupon-code">${couponCode}</div>
                <button class="copy-btn" onclick="copyCoupon()">Copy Code</button>

                 <p><strong>Copy the code and apply it at checkout to claim your reward!</strong></p>
            </div>
        
            <div style="text-align: center; padding: 20px 0;">
                <a href="https://www.tinytiaraa.com" class="view-order-btn">Shop Now</a>
            </div>
        
            <div style="padding: 20px 0;">
                <h4>Thanks for playing and shopping with us!</h4>
                <p>If you need assistance, please email us at <a href="mailto:care@tinytiaraa.com">care@tinytiaraa.com</a>.</p>
                <p>Sincerely, Tiny Tiaraa Team</p>
            </div>
        
            <div style="color: #888; font-size: 12px; text-align: center; padding-top: 20px;">
                <p>© Tiny Tiaraa</p>
                <p>Ru- Brama Retail Private Limited, Plot F-11 & 12-1, Second Floor, Admin Bldg., MIDC (Marol), Central Road, Opp. Seepz Main Gate, WICEL, Andheri(East), Mumbai, 400093, Maharashtra, India</p>
                <p>GST registration number: 27AAKCR3049R1ZL</p>
            </div>
        </div>
        
        <script>
        function copyCoupon() {
            var couponText = document.getElementById("coupon-code").innerText;
            navigator.clipboard.writeText(couponText).then(function() {
                alert("Coupon code copied!");
            }, function() {
                alert("Failed to copy coupon code.");
            });
        }
        </script>
        
        </body>
        
        </html>
        `;

        // Validate required fields
        if (!name || !email || !mobile || !couponCode) {
            return next(new ErrorHandler("All fields are required", 400));
        }

        // Check if the email is already registered
        const existingSpin = await Spin.findOne({ email });
        if (existingSpin) {
            return next(new ErrorHandler("This email has already been used to claim a reward.", 400));
        }

        // Create a new spin document
        const spin = await Spin.create({
            name,
            email,
            mobile,
            couponCode,
        });
          // Send WhatsApp message using Twilio
          // Send WhatsApp message using Twilio
          await spinmail({
            email: email,
            subject: "Your Reward and Coupon Code",
            html: htmlContent,
        });
         


        // Send a success response
        res.status(201).json({
            success: true,
            message: "Thank you for participating! Your coupon code has been recorded.",
            spin,
        });
    } catch (error) {
        // Handle errors
        return next(new ErrorHandler(error.message || "Internal Server Error", 500));
    }
}));


// GET /all/spin - Get all spin entries
router.get("/all/spin", catchAsyncErrors(async (req, res, next) => {
    try {
        const spins = await Spin.find().sort({ CreatedAt: -1 }); // Adjust the sorting field as necessary

        res.status(200).json({
            success: true,
            spins,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message || "Internal Server Error", 500));
    }
}));





// Export the router
module.exports = router;