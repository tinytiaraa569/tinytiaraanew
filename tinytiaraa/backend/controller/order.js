const express = require('express')
const router = express.Router()
const ErrorHandler = require('../utils/Errorhandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const { isAuthenticated, isSeller } = require('../middleware/auth')

const Order = require("../model/order")
const Product = require("../model/product")
const sendOrder = require('../utils/sendOrder');
const Referral = require('../model/referralModel');
const User = require('../model/user');

// const pdf = require('html-pdf');
const path = require('path');
const { render } = require("@react-email/components")
const shippingMail = require('../utils/shippingMail')



const pdf = require('html-pdf-node');
const puppeteer = require('puppeteer')
const chromium = require('chrome-aws-lambda')
const Welcome = require("@react-email/components").default;
// const { Welcome } = require("@react-email/components");


//create new order 


// router.post("/create-order" ,catchAsyncErrors(async (req, res, next) => {

//     try {

//         const { cart, shippingAddress, user, totalPrice, paymentInfo, couponDiscount, referralCode } = req.body;
//         const metalColors = {
//             0: "Yellow Gold",
//             1: "Rose Gold",
//             2: "White Gold",
//         };
//         const backend_url = "http://localhost:8000/"

//         const htmlContent = `
//         <html>

// <head>
//     <link
//         href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
//         rel="stylesheet">
//     <style>
//         * {
//             margin: 0;
//             padding: 0;
//             font-family: "Poppins", sans-serif;
//             box-sizing: border-box;
//         }

//         .headeremail {
//             padding-bottom: 10px;
//         }

//         .emailconfirm {
//             padding-top: 50px;
//             width: 50%;
//             margin: auto;

//         }

//         .yourorder {
//             padding: 30px 0;
//         }

//         .orderdetails {
//             height: 230px;
//             padding: 20px;

//         }

//         .totalcost {
//             margin-top: 10px !important;
//             padding: 15px 0;
//             border-top: 1px solid grey;
//         }

//         .totalcost {
//             text-align: end;
//         }

//         .shippingaddress {
//             padding: 10px 0;
//         }

//         .adjustw {
//             width: 30% !important;
//             float: left !important;
//         }

//         .adjustw1 {
//             width: 65% !important;
//             float: left !important;
//         }

//         @media (max-width:1100px) {
//             .emailconfirm {
//                 width: 65%;

//             }
//         }

//         @media (max-width:800px) {
//             .emailconfirm {
//                 width: 80%;

//             }
//         }

//         @media (max-width:650px) {
//             .emailconfirm {
//                 width: 80%;
//             }

//             .orderdetails {
//                     height: auto;
//                     padding: 0px;

//             }

//             .headeremail {
//                 align-items: center;
//             }

//             .adj {
//                 font-size: 25px;
//             }

//             .a1adjust {
//                 width: 75% !important;
//             }

//             .a2adjust {
//                 width: 25% !important;

//             }

//             .adjustw {
//                 width: 100% !important;
//             }

//             .adjustw1 {
//                 width: 100% !important;
//             }


//         }
//     </style>
// </head>

// <body>
//     <div class="emailconfirm">
//         <div>


//             <div class="headeremail">
//                 <div style="width: 90%;float: left;" class="a1adjust">
//                     <h1 class="adj" style="font-weight: 600;">Order Confirmation</h1>
//                     <p style="font-size: 14px;color: #000000c0;">OrderId :- ${cart[0]._id}</p>
//                 </div>
//                 <div style="width: 10%;float: left;" class="a2adjust">
//                     <img style="width: 100px; height: 100px; object-fit: contain;"
//                         src="https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4185711157.png" alt="">
//                 </div>
//             </div>

//             <div style="clear: both;">
//                 <p>Dear ${shippingAddress.name},</p>
//                 <p>We have received your Tiny Tiaraa order! Thank you for your purchase.</p>
//             </div>


//             <div class="yourorder">
//                 <div>
//                     <!-- <div style="width: 75%;float: left;" class="adjust4">
//                     </div> -->
//                     <h3>Order Summary </h3>


//                 </div>

//                 ${cart.map(item => `

//                     <div class="orderdetails" style="clear: both;">
//                     <div style="width: 200px; height: 200px;margin-top: 8px;" class="adjustw">
//                         <img style="width: 200px; height: 200px;"
//                         src="https://d11s7fcxy18ubx.cloudfront.net/node/static/2024/2024-33032-g1a1225a3b57fe3/icons/notification_yoda.jpg"
//                             // src="${backend_url}${item.images[0]}"
//                             alt="">
//                     </div>
//                     <div style="padding-left: 20px;padding-bottom: 20px;" class="adjustw1">
//                         <h3 style="font-size: 15px;">${item.name}</h3>
//                         <p style="font-size: 13px;color: #0000008b;"><span>${item.skuid}</span></p>
//                         <p style="font-size: 14px;">Metal Color :- ${metalColors[item.selectedColor]}</p>
//                         <p style="font-size: 14px;">Chain :- ${item.showWithChain ? 'With Chain' : 'Without Chain'}</p>
//                         <p style="font-size: 14px;">Enamel Color :- Red</p>

//                         <div style="padding-top: 5px;">
//                             <p> ${item.qty} x ${item.discountPrice}</p>
//                         </div>

//                     </div>

//                 </div>`).join('')}



//                 <div class="totalcost" style="clear: both;">
//                     <div>
//                         <p style="text-align: end;"><span style="font-weight: 600;padding-right: 5x;">SubTotal :</span>
//                             ₹${totalPrice}</p>
//                         <p style="text-align: end;"><span style="font-weight: 600;padding-right: 5x;"> shipping :
//                             </span>Free </p>
//                         <p style="text-align: end;"><span style="font-weight: 600;padding-right: 5x;">Coupon :</span> ₹${couponDiscount ? couponDiscount : 'No coupon applied'} </p>
//                         <p style="text-align: end;"> <span style="font-weight: 600;padding-right: 5x;">Total :</span> ₹${totalPrice}</p>

//                     </div>
//                 </div>
//                 <div class="shippingaddress">
//                     <h3>Shiping Address </h3>
//                     <div style="padding-top: 10px;">
//                         <p>${shippingAddress.name}</p>
//                         <p>Email: ${shippingAddress.email}</p>
//                         <p>${shippingAddress.address1}</p>
//                         <p>${shippingAddress.address2}</p>
//                         <p>${shippingAddress.city} ${shippingAddress.country} ${shippingAddress.zipCode}</p>
//                         <p>${shippingAddress.phoneNumber}</p>
//                     </div>



//                 </div>
//                 <div style="padding-top: 15px;">
//                     <h3>Payment Method </h3>
//                     <div style="padding-top: 5px;">
//                         <p>Status : <span>${paymentInfo.status ? paymentInfo.status : "Not Paid"}</span></p>
//                         <p>Payment Type :- ${paymentInfo.type}</p>
//                     </div>

//                 </div>
//                 <div style="text-align: center; padding: 15px 0;">
//                     <button
//                         style="padding: 10px 22px;background-color: black;color: white;border: none;font-size: 17px;border-radius: 2px;cursor: pointer;">View
//                         Order Details</button>
//                 </div>


//                 <div style="padding: 10px 4px;">
//                     <h4 style="padding: 6px 0;font-size: 18px; font-weight: 500;">Thanks for shopping with us!</h4>
//                     <p style="padding-top: 7px;">You can check the status of your orders at any time on our Orders
//                         History Page.</p>
//                     <p style="padding-top: 7px;">We welcome you to our store anytime. If you need assistance or have any
//                         questions, please email us at <span><a style="color: rgb(42, 42, 226);"
//                                 href="mailto:care@tinytiaraa.com">care@tinytiaraa.com</a></span> or call +91 86570
//                         62511. We are happy to help!</p>

//                     <p style="padding-top: 10px;">Sincerely,</p>
//                     <p>Tiny Tiaraa</p>

//                 </div>

//             </div>


//             <div style="color: #3535358b;font-size: 12px;padding-bottom: 20px;">
//                 <p>© Tiny Tiaraa</p>
//                 <p>Ru- Brama Retail Private Limited, Plot F-11 & 12-1, Second Floor, Admin Bldg., MIDC (Marol), Central
//                     Road, Opp. Seepz Main Gate,, WICEL,Andheri(East),, Mumbai, 400093, Maharashtra, India</p>
//                 <p>GST registration number: 27AAKCR3049R1ZL</p>
//             </div>

//         </div>
//     </div>
// </body>

// </html>

//         `

//         const shopItemsMap = new Map();

//         for (const item of cart) {
//             const shopId = item.shopId;
//             if (!shopItemsMap.has(shopId)) {
//                 shopItemsMap.set(shopId, [])
//             }
//             shopItemsMap.get(shopId).push(item)
//         }

//         //order for 1 shop

//         const orders = []

//         for (const [shopId, items] of shopItemsMap) {
//             const order = await Order.create({ cart: items, shippingAddress, user, totalPrice, paymentInfo, couponDiscount });
//             orders.push(order)
//         }

//         // Debugging: Check if referral code is present
//         console.log('Referral code:', referralCode);

//         if (referralCode) {
//             const referral = await Referral.findOne({ referralCode });

//             // Debugging: Check if referral is found
//             console.log('Referral found:', referral);

//             if (!referral) {
//                 return next(new ErrorHandler('Invalid referral code', 400));
//             }

//             if (referral.referralUsed) {
//                 console.log('Referral code already used');
//                 return res.status(400).json({ success: false, message: 'Referral code already used' });
//             }

//             try {
//                 for (const order of orders) {
//                     order.referralCodeUsed = referralCode;
//                     order.referredUser = req.user.id;
//                     await order.save();

//                     // Debugging: Check if order is updated with referral code
//                     console.log('Order updated with referral code:', order._id);
//                 }

//                 // const referrer = await User.findById(referral.referrer);
//                 const referrer = referral.referrer;

//                 // Debugging: Check if referrer is found
//                 console.log('Referrer found:', referrer);

//                 if (!referrer) {
//                     return next(new ErrorHandler('Referrer not found', 404));
//                 }

//                 referrer.referralBalance += referral.rewardAmount;
//                 await referrer.save();

//                 referral.referralUsed = true;
//                 referral.referredUser = req.user.id;
//                 await referral.save();

//                 // Debugging: Log updated referrer balance
//                 console.log('Updated referrer balance:', referrer.referralBalance);

//             } catch (error) {
//                 console.error('Error applying referral:', error.message);
//                 console.error('Stack trace:', error.stack);
//                 console.error('Referral Code:', referralCode);
//                 console.error('Referral:', referral);
//                 console.error('Orders:', orders);
//                 console.error('Error applying referral:', error);
//                 return next(new ErrorHandler('An error occurred while applying the referral', 500));
//             }
//         }
//         try {
//             await sendOrder({
//                 email: user.email,
//                 subject: "Order Confirmation mail",
//                 html: htmlContent

//             })


//         } catch (error) {
//             return next(new ErrorHandler(error.message, 500));

//         }


//         res.status(201).json({
//             success: true,
//             orders
//         })


//     } catch (error) {
//         return next(new ErrorHandler(error.message, 500));


//     }
// }))

// router.post(
//     "/create-order",
//     catchAsyncErrors(async (req, res, next) => {
//         const { cart, shippingAddress, totalPrice, paymentInfo, couponDiscount, referralCode } = req.body;

//         try {
//             // Determine the user or guest email
//             const userId = req.user ? req.user._id : null;
//             const guestEmail = shippingAddress.email; // Assuming shippingAddress contains email
//             const guestName = shippingAddress.name;
//             // Create order object
//             const orderData = {
//                 cart,
//                 shippingAddress,
//                 user: userId, // Store user ID if authenticated
//                 totalPrice,
//                 paymentInfo,
//                 couponDiscount,
//                 referralCodeUsed: referralCode || null,
//                 guestEmail: userId ? null : guestEmail, // Store guest email if user is not authenticated
//                 guestName: userId ? null : guestName, // Store guest email if user is not authenticated

//             };

//             const order = await Order.create(orderData);

//             // Handle referral code if provided
//             if (referralCode) {
//                 const referral = await Referral.findOne({ referralCode }).populate("referrer");

//                 if (!referral) {
//                     return next(new ErrorHandler("Invalid referral code", 400));
//                 }

//                 if (referral.referralUsed) {
//                     return res.status(400).json({ success: false, message: "Referral code already used" });
//                 }

//                 // Update referral and referrer
//                 referral.referralUsed = true;
//                 referral.referredUsers = userId || null; // Set referredUser if user is authenticated
//                 referral.referredGuestEmails = userId ? null : guestEmail; // Set guest email if user is not authenticated
//                 referral.referredGuestNames = userId ? null : guestName;
//                 await referral.save();

//                 const referrer = referral.referrer;

//                 if (!referrer) {
//                     return next(new ErrorHandler("Referrer not found", 404));
//                 }

//                 referrer.referralBalance += referral.rewardAmount;
//                 await referrer.save();
//             }

//             res.status(201).json({
//                 success: true,
//                 order,
//             });
//         } catch (error) {
//             return next(new ErrorHandler(error.message, 500));
//         }
//     })
// );



// router.post(
//     "/create-order",
//     catchAsyncErrors(async (req, res, next) => {
//         const { cart, shippingAddress, totalPrice, paymentInfo, couponDiscount, referralCode, referralPointsApplied } = req.body;

//         try {
//             // Determine the user or guest details
//             const userId = req.user ? req.user._id : null;
//             const guestEmail = shippingAddress.email;
//             const guestName = shippingAddress.name;

//             // Calculate the updated total price considering referral points applied
//             const updatedTotalPrice = totalPrice - (referralPointsApplied || 0);
//             console.log('Updated Total Price:', updatedTotalPrice);

//             // Create the order object
//             const orderData = {
//                 cart,
//                 shippingAddress,
//                 user: userId,
//                 totalPrice: updatedTotalPrice,
//                 paymentInfo,
//                 couponDiscount,
//                 referralCodeUsed: referralCode || null,
//                 guestEmail: userId ? null : guestEmail,
//                 guestName: userId ? null : guestName,
//                 rewardAmount: 200, // Assume a fixed reward amount
//                 referralPointsApplied: referralPointsApplied || 0,
//             };

//             // Create the order in the database
//             const order = await Order.create(orderData);
//             console.log('Order Data:', orderData);

//             // Handle referral code if provided
//             if (referralCode) {
//                 const referral = await Referral.findOne({ referralCode }).populate('referrer');

//                 // Check if the referral code is valid and not used
//                 if (!referral) {
//                     return next(new ErrorHandler('Invalid referral code', 400));
//                 }

//                 let rewardGranted = false;

//                 // Check if the referral is valid for a new user or guest
//                 if (userId && !referral.referredUsers.includes(userId)) {
//                     referral.referredUsers.push(userId);
//                     rewardGranted = true;
//                 } else if (guestEmail && !referral.referredGuestEmails.includes(guestEmail)) {
//                     referral.referredGuestEmails.push(guestEmail);
//                     referral.referredGuestNames.push(guestName || 'Unknown');
//                     rewardGranted = true;
//                 }

//                 // Grant referral reward if applicable
//                 if (rewardGranted) {
//                     const referrer = referral.referrer;
//                     console.log('Referrer:', referrer);

//                     if (referrer) {
//                         const rewardAmount = 200;
//                         referrer.referralBalance = (referrer.referralBalance || 0) + rewardAmount;
//                         await referrer.save();
//                         console.log('Referrer Balance Updated:', referrer.referralBalance);

//                         referral.referralUsed = true;
//                         await referral.save();
//                         console.log('Referral Marked as Used:', referral);
//                     } else {
//                         return next(new ErrorHandler('Referrer not found', 404));
//                     }
//                 }
//             }

//             // Deduct referral points if applicable
//             if (userId && referralPointsApplied > 0) {
//                 const user = await User.findById(userId);
//                 if (!user) {
//                     return next(new ErrorHandler('User not found', 404));
//                 }

//                 if (user.referralBalance < referralPointsApplied) {
//                     return next(new ErrorHandler('Insufficient referral balance', 400));
//                 }

//                 user.referralBalance -= referralPointsApplied;
//                 await user.save();
//                 console.log('User Referral Balance Updated:', user.referralBalance);
//             }

//             // Respond with order details
//             res.status(201).json({
//                 success: true,
//                 order,
//             });
//         } catch (error) {
//             console.error('Error creating order:', error);
//             return next(new ErrorHandler(error.message, 500));
//         }
//     })
// );


// HTML Template for Invoice

function numberToWords(num) {
    console.log(num ,"num to see in word")
    const belowTwenty = [
        "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
        "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
        "Seventeen", "Eighteen", "Nineteen"
    ];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const aboveHundred = ["", "Thousand", "Million", "Billion", "Trillion"];

    if (num === 0) return "Zero";

    function helper(num) {
        if (num < 20) return belowTwenty[num];
        if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? " " + belowTwenty[num % 10] : "");
        if (num < 1000) return belowTwenty[Math.floor(num / 100)] + " Hundred" + (num % 100 !== 0 ? " " + helper(num % 100) : "");
        return "";
    }

    let thousandIndex = 0;
    let result = "";

    while (num > 0) {
        const part = num % 1000;
        if (part !== 0) {
            result = helper(part) + (thousandIndex > 0 ? " " + aboveHundred[thousandIndex] : "") + " " + result;
        }
        num = Math.floor(num / 1000);
        thousandIndex++;
    }

    return result.trim();
}

function numberToWordsWithCurrency(num) {
    return numberToWords(num) ;
}


const generateInvoiceTemplate = (order) => {
    const invoiceDate = new Date(order.createdAt).toLocaleDateString();
    console.log(order,"order for email ")
    let grandTotal = 0;
   
    const totalPriceInWords = numberToWordsWithCurrency(order.totalPrice);
    return `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Arial", sans-serif; 
           
        }
        .invoice { 
            border: 1px solid #ccc; 
            padding: 20px 30px;
            margin: 20px;
         }
         .invoicehead{
            text-align: center;
         }
         .invoicehead h4{
            padding-top: 4px;
         }
         .companydetail{
            margin-top: 15px;
            padding: 10px 50px;
            width: 100%;
            border: 1px solid #ccc; 
            font-size: 11px;


         }
         .companydetail p{
            padding: 2px 0;
         }
         .companydetailleft{
            width: 60%;
            display: inline-block;
         }
         .companydetailright{
            width: 35%;
            display: inline-block;
         }

         .receiverdetail{
            margin-top: 20px;
            padding: 10px 50px;
            width: 100%;
            border: 1px solid #ccc;
            font-size: 11px;


         }
         .receiverdetail p{
            padding: 2px 0;
         }
         .bankdetails{
            margin-top: 20px;
            padding: 15px 50px;
            width: 100%;
            border: 1px solid #ccc;
            font-size: 11px;
         }
         .bankdetails p{
            padding: 2px 0;
         }
         .sign{
            margin-top: 20px;
            padding: 10px 50px;
            width: 100%;
            border: 1px solid #ccc;
            font-size: 12px;
         }
         .receiverdetailleft{
            width: 50%;
            display: inline-block;
         }
         .receiverdetailright{
            width: 45%;
            display: inline-block;
         }
         .ordersumtable{
            margin-top: 20px;
            padding: 10px 0px;
            width: 100%;
            font-size: 9px;
         }
         table{
            width: 100%;
            border: 1px solid #ccc;
            border-collapse: collapse;

         }
         th{
            border: 1px solid #ccc;
            padding: 5px;
         }
         td{
            border: 1px solid #ccc;
            padding: 5px;

         }
         .signing{
            height: 100px;
         }
         
    </style>
</head>
<body>

    <div class="invoice">
        <div class="invoicehead">
            <p>SUBJECT TO MUMBAI JURISDICTION</p>
            <h4>TAX  INVOICE</h4>
        </div>


        <div class="companydetail">
            <div class="companydetailleft">
                <p>GSTIN : 27AAKCR3049R1ZL</p>
                <p>RU-BRAMA RETAIL PVT. LTD.</p>
                <p>WICEL ADMINSTRATION BUILDING 2ND FLOOR,</p>
                <p>PLOT NO.2, F - 11 & 12, MIDC CENTRAL ROAD,</p>
                <p>MAROL, ANDHERI (EAST),</p>
                <p>MUMBAI 400093</p>
                <p>Email : care@tinytiaraa.com </p>


                <p style="margin-top: 15px;">PAN : AAKCR3049R</p>

            </div>

            <div class="companydetailright">
                <p>Invoice No : ${order._id}</p>
                <p>Invoice Date : ${invoiceDate}</p>


                <p>M.O.T : Sequel</p>
                <p>Tracking ID : ${order.docketno}</p>

                
                <p>Place of Supply : </p>
                <p>Tax is Payable on Reverse charges : No</p>

            </div>

        </div>

        <div class="receiverdetail">

            <div class="receiverdetailleft">
                
            <p style="font-weight: 600;">Detail of Consignee (Shipped To)</p>

                <div class="receiverdetailadddresss">
                    <p>To,</p>
                    <p>Dear. ${order.shippingAddress.name}</p>
                    <p>${order.shippingAddress.email},</p>
                    <p>${order.shippingAddress.address1} </p>
                    <p>${order.shippingAddress.address2}</p>
                    <p>${order.shippingAddress.city}, ${order.shippingAddress.country} ${order.shippingAddress.zipCode}</p>
                    <p>GSTIN: </p>

                </div>

            </div>

            <div class="receiverdetailright">
                
                <p style="font-weight: 600;">Detail of Receiverdetail (Billed To)</p>

                <div class="receiverdetailadddresss">
                    <p>To,</p>
                    <p>Dear. ${order?.billingAddress?.name}</p>
                    <p>${order?.billingAddress?.email},</p>
                    <p>${order?.billingAddress?.address1} </p>
                    <p>${order?.billingAddress?.address2}</p>
                    <p>${order?.billingAddress?.city}, ${order?.billingAddress?.country} ${order?.billingAddress?.zipCode}</p>
                    <p>Pan :</p>

                </div>

            </div>
            

        </div>

       <div class="ordersumtable" style="overflow: hidden;">
  <table cellpadding="10px" style="font-size: 9px !important;overflow: hidden !important;">
    <thead>
      <tr style="background-color: rgb(238, 238, 238);">
        <th>Sr <br> nos</th>
        <th>Product Name <br>HSN / SAC Code</th>
        <th>Carat</th>
        <th>Gross <br>Wt.</th>
        <th>Net <br>Wt.</th>
        <th>Rate <br>Per Unit</th>
        <th>Taxable <br>Value</th>
        <th>CGST (1.5%) <br>Amt & Rate</th>
        <th>SGST (1.5%) <br>Amt & Rate</th>
        <th>IGST (3%) <br>Amt & Rate</th>
        <th>Amount <br>(Rs)</th>
      </tr>
    </thead>
    <tbody>
      ${order.cart
        .map((item, index) => {
          const discountPrice = item.chainPrice > 0 ? item.discountPrice + item.chainPrice : item.discountPrice;
          const cgst = (discountPrice * 0.015).toFixed(2);
          const sgst = (discountPrice * 0.015).toFixed(2);
          const igst = (discountPrice * 0.03).toFixed(2);
          
          grandTotal += discountPrice;
          return `
            <tr style="text-align: center;">
              <td rowspan="4">${index + 1}</td>
              <td rowspan="${item?.selectedEnamelColor ? 1 : 2}">${item.name} ${item.showWithChain ? '& chain': ''}</td>
              <td rowspan="${item?.selectedEnamelColor ? 1 : 2}"></td>
               <td rowspan="4">
                ${item.showWithChain 
                    ? (item.selectedChainSize === '13inch' 
                        ? (parseFloat(item.goldWeight.weight) + 1).toFixed(2)  // Add 1g for 13inch chain
                        : item.selectedChainSize === '18inch' 
                        ? (parseFloat(item.goldWeight.weight) + 2).toFixed(2)  // Add 2g for 18inch chain
                        : parseFloat(item.goldWeight.weight).toFixed(2))        // If no chain, show original weight
                    : parseFloat(item.goldWeight.weight).toFixed(2)               // If showWithChain is false, use original weight
                }
                </td>
              <td rowspan="4">
                ${item.showWithChain 
                    ? (item.selectedChainSize === '13inch' 
                        ? (parseFloat(item.goldWeight.weight) + 1).toFixed(2) 
                        : item.selectedChainSize === '18inch' 
                        ? (parseFloat(item.goldWeight.weight) + 2).toFixed(2) 
                        : parseFloat(item.goldWeight.weight).toFixed(2)) 
                    : parseFloat(item.goldWeight.weight).toFixed(2)
                }
                </td>
              <td rowspan="4">${item.qty}</td>
              <td rowspan="4">${discountPrice}</td>
              <td rowspan="4">${cgst}</td>
              <td rowspan="4">${sgst}</td>
              <td rowspan="4">Amt & Rate</td>
              <td rowspan="4">${discountPrice}</td>
            </tr>
            <tr style="text-align: center;">
              ${item?.selectedEnamelColor ? `<td>Enamel (${item.selectedEnamelColor})</td>` : `<td></td>`}
            </tr>
            <tr style="text-align: center;">
              <td>Diamond</td>
              <td>${item.diamondWeight.weight}</td>
            </tr>
            <tr style="text-align: center;">
              <td>HSN CODE: 71081300</td>
            </tr>`;
        })
        .join('')}
    </tbody>
    <tfoot>
      <tr style="text-align: center;">
        <td>Total</td>
        <td></td>
        <td>${order.cart.reduce((acc, item) => acc + parseFloat(item.diamondWeight.weight) || 0, 0).toFixed(2)} ct</td>
        <td>
            ${order.cart.reduce((acc, item) => {
                let additionalWeight = 0;
                if (item.showWithChain) {
                    additionalWeight = item.selectedChainSize === '13inch' ? 1 : 
                                        item.selectedChainSize === '18inch' ? 2 : 0;
                }
                return acc + parseFloat(item.goldWeight.weight) + additionalWeight;
            }, 0).toFixed(2)}
            </td>

            <td>
            ${order.cart.reduce((acc, item) => {
                let additionalWeight = 0;
                if (item.showWithChain) {
                    additionalWeight = item.selectedChainSize === '13inch' ? 1 : 
                                        item.selectedChainSize === '18inch' ? 2 : 0;
                }
                return acc + parseFloat(item.goldWeight.weight) + additionalWeight;
            }, 0).toFixed(2)}
            </td>
        <td></td>
        <td>${grandTotal}</td>
        <td>${order.cart.reduce((acc, item) => acc + parseFloat((item.chainPrice > 0 ? (item.discountPrice + item.chainPrice) * 0.015 : item.discountPrice * 0.015).toFixed(2)), 0)}</td>
        <td>${order.cart.reduce((acc, item) => acc + parseFloat((item.chainPrice > 0 ? (item.discountPrice + item.chainPrice) * 0.015 : item.discountPrice * 0.015).toFixed(2)), 0)}</td>
        <td></td>
        <td>${order.totalPrice}</td>
      </tr>
      <tr>
        <td colspan="8" rowspan="2">Rupees in Words: ${totalPriceInWords.toUpperCase()}.</td>
        <td colspan="2">Total Invoice Value</td>
        <td>Rs. ${order.totalPrice}</td>
      </tr>
      <tr style="text-align: center;">
        <td colspan="2">Total Amount Payable</td>
        <td>Rs. ${order.totalPrice}</td>
      </tr>
    </tfoot>
  </table>
</div>

        <div class="bankdetails">
            <p style="margin-top: 6px;">Remark : PAYMENT MODE - ${order?.paymentInfo?.type} (${order?.paymentInfo?.status ? order?.paymentInfo?.status : "Not Paid"}) </p>
        </div>
        <div class="bankdetails">
        <p style="margin-top: 1px;">Return Policy: Returns accepted within 7 days of delivery, with the product in original condition, undamaged.</p>

        <p style="margin-top: 1px;">ID Verification: Delivery may require ID verification. Have your government-issued ID ready.</p>

        <p style="margin-top: 1px;">Refunds: Refunds will be issued to the original payment method after product verification.</p>

        <p style="margin-top: 1px;">Conditions: Returns and refunds depend on receiving the product in its original state with packaging and certifications intact.</p>
        </div>

        <div class="sign">
            <div style="text-align: end;">
                <p style="font-weight: 500;">For RU-BRAMA RETAIL PRIVATE LIMITED</p>
            </div>

            <div class="signing">
                <div style="display: inline-block;width: 35%;vertical-align: sub;">
                    <p style="padding-top: 70px;">Receiver's Sign</p>
                </div>
                <div style="display: inline-block;width: 30%;vertical-align: sub;">
                    <p style="padding-top: 70px;">E&OE.</p>
                </div>
                <div style="display: inline-block;width: 30%;vertical-align: sub;">
                    <p style="padding-top: 70px;">Authorised Signatory</p>
                </div>

            </div>

        </div>

    </div>

    
</body>
</html>
    `;
};






// Generate PDF Invoice
// const generateInvoicePDF = async (order) => {
//     const invoiceHTML = generateInvoiceTemplate(order);
//     return new Promise((resolve, reject) => {
//         pdf.create(invoiceHTML).toBuffer((err, buffer) => {
//             if (err) return reject(err);

//             // Convert the PDF buffer to Base64
//             const base64PDF = buffer.toString('base64');
//             resolve(base64PDF);
//         });
//     });
// };

// const generateInvoicePDF = async (order) => {
//     const invoiceHTML = generateInvoiceTemplate(order);

//     // Launch a Puppeteer browser instance
//     const browser = await puppeteer.launch({
//         headless: true, // Run in headless mode
//         args: ['--no-sandbox', '--disable-setuid-sandbox'], // For security
//     });

//     const page = await browser.newPage();

//     // Set the HTML content
//     await page.setContent(invoiceHTML, {
//         waitUntil: 'networkidle0', // Wait until the page has finished loading
//     });

//     // Generate the PDF as a buffer
//     const pdfBuffer = await page.pdf({
//         format: 'A4',
//         printBackground: true, // Include background styles (optional)
//     });

//     // Close the browser
//     await browser.close();

//     // Convert the PDF buffer to Base64
//     const base64PDF = pdfBuffer.toString('base64');

//     return base64PDF;
// };


// correct code 
const generateInvoicePDF = async (order) => {
    const invoiceHTML = generateInvoiceTemplate(order);

    return new Promise((resolve, reject) => {
        // Create options for PDF generation
        const options = { format: 'A4' };

        // Convert HTML string into a PDF buffer using html-pdf-node
        const file = { content: invoiceHTML };

        pdf.generatePdf(file, options)
            .then(buffer => {
                // Convert the PDF buffer to Base64
                const base64PDF = buffer.toString('base64');
                resolve(base64PDF);
            })
            .catch(err => reject(err));
    });
};


router.post(
    "/create-order",
    catchAsyncErrors(async (req, res, next) => {
        const { cart, user, shippingAddress, billingAddress , totalPrice, paymentInfo, couponDiscount, referralCode } = req.body;
        const metalColors = {
            0: "Yellow Gold",
            1: "Rose Gold",
            2: "White Gold",
        };
        const imgdburl = "https://backend.tinytiaraa.com:8000"

        console.log(user,"user details from backend ")

        try {
            const userId = req.user ? req.user._id : null;
            const guestEmail = shippingAddress?.email;
            const guestName = shippingAddress?.name;
            const referredRewardAmount = totalPrice * 0.05

            const orderData = {
                cart,
                shippingAddress,
                billingAddress,
                user,
                totalPrice,
                paymentInfo,
                couponDiscount,
                referralCodeUsed: referralCode || null,
                referredGuestEmail: userId ? null : guestEmail,
                referredGuestName: userId ? null : guestName,
                rewardAmount:  referredRewardAmount
            };

            const order = await Order.create(orderData);

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

        .orderdetails {
            padding: 20px 0;
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
        }

        .totalcost {
            text-align: right;
            padding: 15px 0;
            
        }

        .shippingaddress {
            padding: 20px 0;
        }

        .adj {
            font-size: 24px;
            font-weight: 600;
            color: #333;
        }

        h3 {
            font-size: 18px;
            font-weight: 500;
            color: #444;
            margin-bottom: 10px;
        }

        p {
            font-size: 14px;
            color: #666;
        }

        .adjustw {
            width: 25%;
            display: inline-block;
            vertical-align: top;
        }
        .adjustw img{
            width: 150px !important;
             height: 130px !important;
                object-fit: contain !important;
            border: 1px solid #eee !important;
        }
            .a2adjustimg{
            transform: scale(1.2) !important;

            }

        .adjustw1 {
            width: 70%;
            display: inline-block;
        }

        img {
            width: 100px;
            height: 100px;
            object-fit: contain;
        }

        a {
            color: #000;
            text-decoration: none;
            font-size: 14px;
        }

        .view-order-btn {
            padding: 10px 22px;
            background-color: black;
            color: white !important;
            text-decoration: none;
            font-size: 17px;
            border-radius: 2px;
            display: inline-block;
            text-align: center;
        }
        .ordersum{
        margin-top:10px !important;
        }

        @media (max-width: 1100px) {
            .emailconfirm {
                width: 75%;
            }
        }

        @media (max-width: 1000px) {
            .emailconfirm {
                width: 85%;
            }
                   
            .adjustw, .adjustw1 {
                width: 100%;
                display: block;
            }
            .adjustw img{
            width: 170px !important;
            height: 150px !important;
                object-fit: contain !important;
            border: 1px solid #eee !important;
            }
        }

        @media (max-width: 650px) {
            .emailconfirm {
                width: 90%;
            }

            .adjustw, .adjustw1 {
                width: 100%;
                display: block;
            }
            .adjustw img{
            width: 170px !important;
             height: 150px !important;
                object-fit: contain !important;
            border: 1px solid #eee !important;
            }

            img {
                width: 100px;
                height: auto;
            }
            .adjusttnview{
                margin-top:10px !important;
                }

            .adj {
            font-size: 20px ;
            
        }
        }
    </style>
</head>

<body>
    <div class="emailconfirm">
        <div class="headeremail">
        <div class="a2adjust" style="text-align: center;">
                <img src="https://backend.tinytiaraa.com:8000/uploads/images/logowebsite/duvdwbtbmyr8ipqrevot.png"
                    alt="Logo">
            </div>
            <div class="a1adjust" style="text-align: center;">
                <h1 class="adj">Order Confirmation</h1>
                <p>OrderId: ${order._id}</p>
            </div>
            
        </div>

        <div style="clear: both;margin-top: 25px;">
            <p>Dear <span style="text-transform: capitalize;">${shippingAddress.name}</span>,</p>
            <p>We have received your Tiny Tiaraa order! Thank you for your purchase.</p>
        </div>

        <div class="yourorder">
            <h3 class="ordersum">Order Summary</h3>

            ${cart.map(item => `
            <div class="orderdetails">
                <div class="adjustw">
                              <img 
                src="${item.images && item.images[1]?.url?.match(/https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/)
                    ? item.images[1].url.replace(
                        /https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/,
                        `${imgdburl}/uploads/images`
                    )
                    : `${imgdburl}${item.images[1]?.url}`}" 
                alt="${item.name}"
            >

                </div>
                <div class="adjustw1">
                    <h4>${item.name}</h4>
                    <p>${item.skuid}</p>

                    ${item.selectedColor !== null ? `<p>Metal Color: ${metalColors[item.selectedColor]}</p>` : ''}
                    ${item?.showWithChain !== null ? `<p>Chain: ${item.showWithChain ? 'With Chain' : 'Without Chain'} ${item.showWithChain && item.selectedChainSize ? `(${item.selectedChainSize})` : ''}</p>` : ''}
                    ${item?.selectedEnamelColor ? `<p>Enamel Color: ${item.selectedEnamelColor}</p>` : ''}

                    <p>${item.qty} x ₹${item.chainPrice > 0 ? item.discountPrice + item.chainPrice : item.discountPrice}</p>
                </div>
            </div>`).join('')}
        </div>

        <div class="totalcost">
            <p>Subtotal: ₹${totalPrice}</p>
            <p>Shipping: Free</p>
            <p>Coupon: ₹${couponDiscount ? couponDiscount : 'No coupon applied'}</p>
            <p>Total: ₹${totalPrice}</p>
        </div>

        <div class="shippingaddress">
            <h3>Shipping Address</h3>
            <p>${shippingAddress.name}</p>
            <p>Email: ${shippingAddress.email}</p>
            <p>${shippingAddress.address1}</p>
            <p>${shippingAddress.address2}</p>
            <p>${shippingAddress.city}, ${shippingAddress.country} ${shippingAddress.zipCode}</p>
            <p>${shippingAddress.phoneNumber}</p>
        </div>

        <div>
            <h3>Payment Method</h3>
            <p>Status: ${paymentInfo.status ? paymentInfo.status : 'Not Paid'}</p>
            <p>Payment Type: ${paymentInfo.type}</p>
        </div>

        <div class="adjusttnview" style="text-align: center;">
            <a href="https://www.tinytiaraa.com/user/order/${order._id}" class="view-order-btn">View Order Details</a>
        </div>

        
        <div style="padding: 20px 0;">
            <h4>Thanks for shopping with us!</h4>
            <p>You can check the status of your orders at any time on our Orders History Page.</p>
            <p>If you need assistance, please email us at <a href="mailto:care@tinytiaraa.com">care@tinytiaraa.com</a> or call +91 86570 62511.</p>
            <p>Sincerely, Tiny Tiaraa</p>
        </div>

        <div style="color: #888; font-size: 12px; text-align: center; padding-top: 20px;">
            <p>© Tiny Tiaraa</p>
            <p>Ru- Brama Retail Private Limited, Plot F-11 & 12-1, Second Floor, Admin Bldg., MIDC (Marol), Central Road, Opp. Seepz Main Gate, WICEL, Andheri(East), Mumbai, 400093, Maharashtra, India</p>
            <p>GST registration number: 27AAKCR3049R1ZL</p>
        </div>
    </div>
</body>

</html>

            
            `



            if (referralCode) {
                const referral = await Referral.findOne({ referralCode }).populate('referrer');
                if (!referral) {
                    return next(new ErrorHandler('Invalid referral code', 400));
                }

                let rewardGranted = false;

                if (userId && !referral.referredUsers.includes(userId)) {
                    referral.referredUsers.push(userId);
                    rewardGranted = true;
                } else if (guestEmail && !referral.referredGuestEmails.includes(guestEmail)) {
                    referral.referredGuestEmails.push(guestEmail);
                    referral.referredGuestNames.push(guestName || 'Unknown');
                    referral.referredRewardAmounts.push(referredRewardAmount);
                    
                    rewardGranted = true;
                }

                if (rewardGranted) {
                    const referrer = referral.referrer;

                    if (referrer) {
                        
                        const rewardAmount = totalPrice * 0.05;

                        referrer.referralBalance = (referrer.referralBalance || 0) + rewardAmount;
                        await referrer.save();

                        referral.referralUsed = true;
                        await referral.save();
                    } else {
                        return next(new ErrorHandler('Referrer not found', 404));
                    }
                }
            }

            try {
                await sendOrder({
                    email: user ? user.email : shippingAddress.email,
                    subject: "Order Confirmation mail",
                    html: htmlContent,
                     cc: "orders@tinytiaraa.com"

                })


            } catch (error) {
                return next(new ErrorHandler(error.message, 500));

            }

            res.status(201).json({ success: true, order });
        } catch (error) {
            console.error('Error creating order:', error);
            return next(new ErrorHandler(error.message, 500));
        }
    })
);





// get all orders of users

// router.get("/get-all-orders/:userId", catchAsyncErrors(async (req, res, next) => {
//     try {
//         const orders = await Order.find({ "user": req.params.userId }).sort({
//             createdAt: -1,
//         })
//         res.status(200).json({
//             success: true,
//             orders
//         })
//     } catch (error) {
//         return next(new ErrorHandler(error.message, 500));

//     }
// }))

router.get("/get-all-orders", catchAsyncErrors(async (req, res, next) => {
    const { email } = req.query;

    try {
        const orders = await Order.find({ "shippingAddress.email": email }).sort({
            createdAt: -1,
        });

        if (orders.length === 0) {
            return next(new ErrorHandler('No orders found for this email', 404));
        }

        res.status(200).json({
            success: true,
            orders,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

// get all orders of seller

router.get(
    "/get-seller-all-orders/:shopId",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const orders = await Order.find({
                "cart.shopId": req.params.shopId,
            }).sort({
                createdAt: -1,
            });

            res.status(200).json({
                success: true,
                orders,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);


//order update details status


// router.put("/update-order-status/:id", isSeller, catchAsyncErrors(async (req, res, next) => {
//     try {

//         const order = await Order.findById(req.params.id);

//         if (!order) {
//             return next(new ErrorHandler("Order not found with this id", 400));
//         }
//         if (req.body.status === "Shipping") {
//             order.cart.forEach(async (o) => {
//                 await updateOrder(o._id, o.qty);
//             });
//         }
//         order.status = req.body.status;

//         if (req.body.status === "Delivered") {
//             order.deliveredAt = Date.now();
//             order.paymentInfo.status = "Succeeded";

//         }

//         await order.save({ validateBeforeSave: false });

//         res.status(200).json({
//             success: true,
//             order,
//         });

//         async function updateOrder(id, qty) {
//             const product = await Product.findById(id);

//             product.stock -= qty;
//             product.sold_out += qty;

//             await product.save({ validateBeforeSave: false });
//         }

//     } catch (error) {
//         return next(new ErrorHandler(error.message, 500));

//     }
// }))

// router.put("/update-order-status/:id", isSeller, catchAsyncErrors(async (req, res, next) => {
//     try {
//         const order = await Order.findById(req.params.id);

//         if (!order) {
//             return next(new ErrorHandler("Order not found with this id", 400));
//         }

//         if (req.body.status === "Shipping") {
//             for (const o of order.cart) {
//                 await updateOrder(o);
//             }
//         }

//         order.status = req.body.status;

//         if (req.body.status === "Delivered") {
//             order.deliveredAt = Date.now();
//             order.paymentInfo.status = "Succeeded";
//         }

//         await order.save({ validateBeforeSave: false });

//         res.status(200).json({
//             success: true,
//             order,
//         });

//         async function updateOrder(cartItem) {
//             const product = await Product.findById(cartItem._id);

//             // Log the cart item being processed
//             console.log("Processing cart item:", cartItem);
//             const metalColors = {
//                 0: "YellowGold",
//                 1: "RoseGold",
//                 2: "WhiteGold",
//             };

//             // Check if the product has enamel and metal color options
//             const selectedMetalColor = metalColors[cartItem.selectedColor];
//             const selectedEnamelColor = cartItem.selectedEnamelColor;

//             if (selectedEnamelColor) {
//                 // Clean the selectedEnamelColor key to match the data format
//                 const cleanedEnamelColor = selectedEnamelColor.toLowerCase().replace(/_/g, '');

//                 // Construct the key to access the specific enamel color stock
//                 const enamelKey = `${cleanedEnamelColor}${selectedMetalColor.replace(/ /g, '')}clrStock`;

//                 // Decrement stock for the specific enamel color and metal color
//                 product.Enamelcolorstock[cleanedEnamelColor][enamelKey] -= cartItem.qty;

//                 // Log which stocks are being updated
//                 // console.log(`Decrementing stock for ${selectedEnamelColor} with ${selectedMetalColor}: -${cartItem.qty}`);
//             } else if (selectedMetalColor) {
//                 // Construct the key to access the specific metal color stock
//                 const metalKey = `${selectedMetalColor}clrStock`;

//                 // Decrement stock for the specific metal color
//                 product.Metalcolorstock[metalKey] -= cartItem.qty;

//                 // Log which metal color stock is being updated
//                 // console.log(`Decrementing stock for ${selectedMetalColor}: -${cartItem.qty}`);

//                 // console.log(`Decrementing stock for ${ product.Metalcolorstock[metalKey]}: -${cartItem.qty}`);

//             } else {
//                 // Decrement general stock
//                 product.stock -= cartItem.qty;

//                 // Log which general stock is being updated
//                 // console.log(`Decrementing general stock: -${cartItem.qty}`);
//             }


//             // Increment sold_out based on the quantity ordered
//             product.sold_out += cartItem.qty;

//             // Log the updated product state
//             // console.log("Updated product state:", product);

//             await product.save({ validateBeforeSave: false });
//         }

//     } catch (error) {
//         return next(new ErrorHandler(error.message, 500));
//     }
// }));

//new code 

router.put("/update-order-status/:id", isSeller, catchAsyncErrors(async (req, res, next) => {
    const metalColors = {
        0: "Yellow Gold",
        1: "Rose Gold",
        2: "White Gold",
    };
    const imgdburl = "https://backend.tinytiaraa.com:8000"

    try {
        const order = await Order.findById(req.params.id);
        console.log(order,"order from backend")

        if (!order) {
            return next(new ErrorHandler("Order not found with this id", 400));
        }

        // Update the docket number if the status is "Shipping"
        if (req.body.status === "Shipping") {
            // Make sure the docket number is provided in the request body
            if (!req.body.docketNumber) {
                return next(new ErrorHandler("Docket number is required for shipping", 400));
            }
            order.docketno = req.body.docketNumber;

            const base64PDF = await generateInvoicePDF(order);
    
            order.invoice = base64PDF;   // Store the path of the invoice in the order


            // Update cart items
            for (const o of order.cart) {
                await updateOrder(o);
            }
//             const htmlContent = `
//             <html>
    
//     <head>
//         <link
//             href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
//             rel="stylesheet">
//         <style>
//             * {
//                 margin: 0;
//                 padding: 0;
//                 font-family: "Poppins", sans-serif;
//                 box-sizing: border-box;
//             }
    
//             .headeremail {
//                 padding-bottom: 10px;
//             }
    
//             .emailconfirm {
//                 padding-top: 50px;
//                 width: 50%;
//                 margin: auto;
    
//             }
    
//             .yourorder {
//                 padding: 30px 0;
//             }
    
//             .orderdetails {
//                 height: 230px;
//                 padding: 20px;
    
//             }
    
//             .totalcost {
//                 margin-top: 10px !important;
//                 padding: 15px 0;
//                 border-top: 1px solid grey;
//             }
    
//             .totalcost {
//                 text-align: end;
//             }
    
//             .shippingaddress {
//                 padding: 10px 0;
//             }
    
//             .adjustw {
//                 width: 30% !important;
//                 float: left !important;
//             }
    
//             .adjustw1 {
//                 width: 65% !important;
//                 float: left !important;
//             }
    
//             @media (max-width:1100px) {
//                 .emailconfirm {
//                     width: 65%;
    
//                 }
//             }
    
//             @media (max-width:800px) {
//                 .emailconfirm {
//                     width: 80%;
    
//                 }
//             }
    
//             @media (max-width:650px) {
//                 .emailconfirm {
//                     width: 80%;
//                 }
    
//                 .orderdetails {
//                         height: auto;
//                         padding: 0px;
    
//                 }
    
//                 .headeremail {
//                     align-items: center;
//                 }
    
//                 .adj {
//                     font-size: 25px;
//                 }
    
//                 .a1adjust {
//                     width: 75% !important;
//                 }
    
//                 .a2adjust {
//                     width: 25% !important;
    
//                 }
    
//                 .adjustw {
//                     width: 100% !important;
//                 }
    
//                 .adjustw1 {
//                     width: 100% !important;
//                 }
    
    
//             }
//         </style>
//     </head>
    
//     <body>
//     <div class="emailconfirm">
//         <div>
//             <div class="headeremail">
//                 <div style="width: 90%;float: left;" class="a1adjust">
//                     <h1 class="adj" style="font-weight: 600;">Order Shipped</h1>
//                     <p style="font-size: 14px;color: #000000c0;">OrderId :- ${order._id}</p>
//                 </div>
//                 <div style="width: 10%;float: left;" class="a2adjust">
//                     <img style="width: 100px; height: 100px; object-fit: contain;"
//                         src="https://res.cloudinary.com/ddaef5aw1/image/upload/v1725949453/duvdwbtbmyr8ipqrevot.png" alt="">
//                 </div>
//             </div>

//             <div style="clear: both;">
//                 <p>Dear <span style="text-transform: capitalize;font-weight: 400;">${order.shippingAddress.name},</span></p>
//                 <p>Your order has been shipped!</p>
//                 <p>We are excited to let you know that your Tiny Tiaraa order has been shipped!</p>
//                 <p>Your docket number is: <strong>${order.docketno}</strong>. Your order is being shipped through Sequel, our shipping partner.</p>
//             </div>

//             <div class="yourorder">
//                 <div>
//                     <h3>Order Summary</h3>
//                 </div>

//                 ${order.cart.map(item => `
//                     <div class="orderdetails" style="clear: both;">
//                         <div style="width: 200px; height: 180px; margin-top: 8px; margin-right: 7px;" class="adjustw">
//                             <img style="width: 100%; height: 160px; object-fit: contain; transform: scale(1.2); border: 1px solid #80808036;"
//                                 src="${item.images && item.images[1]?.url}" alt="">
//                         </div>
//                         <div style="padding-left: 20px; padding-bottom: 20px;" class="adjustw1">
//                             <h4 style="font-size: 14px;">${item.name}</h4>
//                             <p style="font-size: 11px; color: #0000008b;"><span>${item.skuid}</span></p>
                
//                             ${item.selectedColor !== null ? `<p style="font-size: 13px;">Metal Color :- ${metalColors[item.selectedColor]}</p>` : ''}
//                             ${item?.showWithChain !== null ? `<p style="font-size: 13px;">Chain :- ${item.showWithChain ? 'With Chain' : 'Without Chain'} ${item.showWithChain && item.selectedChainSize ? `(${item.selectedChainSize})` : ''}</p>` : ''}
//                             ${item?.selectedEnamelColor ? `<p style="font-size: 13px;">Enamel Color :- ${item.selectedEnamelColor}</p>` : ''}
                
//                             <div style="padding-top: 5px;">
//                                 <p>${item.qty} x ${item.chainPrice > 0 ? item.discountPrice + item.chainPrice : item.discountPrice}</p>
//                             </div>
//                         </div>
//                     </div>
//                 `).join('')}

//                 <div class="totalcost" style="clear: both;">
//                     <div>
//                         <p style="text-align: end;"><span style="font-weight: 600;padding-right: 5px;">SubTotal :</span> ₹${order.totalPrice}</p>
//                         <p style="text-align: end;"><span style="font-weight: 600;padding-right: 5px;"> Shipping : </span>Free</p>
//                         <p style="text-align: end;"><span style="font-weight: 600;padding-right: 5px;">Coupon :</span> ₹${order.couponDiscount ? order.couponDiscount : 'No coupon applied'}</p>
//                         <p style="text-align: end;"><span style="font-weight: 600;padding-right: 5px;">Total :</span> ₹${order.totalPrice}</p>
//                     </div>
//                 </div>

//                 <div class="shippingaddress">
//                     <h3>Shipping Address</h3>
//                     <div style="padding-top: 10px;">
//                         <p>${order.shippingAddress.name}</p>
//                         <p>Email: ${order.shippingAddress.email}</p>
//                         <p>${order.shippingAddress.address1}</p>
//                         <p>${order.shippingAddress.address2}</p>
//                         <p>${order.shippingAddress.city} ${order.shippingAddress.country} ${order.shippingAddress.zipCode}</p>
//                         <p>${order.shippingAddress.phoneNumber}</p>
//                     </div>
//                 </div>

//                 <div style="padding-top: 15px;">
//                     <h3>Payment Method</h3>
//                     <div style="padding-top: 5px;">
//                         <p>Status : <span>${order.paymentInfo.status ? order.paymentInfo.status : "Not Paid"}</span></p>
//                         <p>Payment Type :- ${order.paymentInfo.type}</p>
//                     </div>
//                 </div>

//                 <div style="text-align: center; padding: 15px 0;">
//                     <a href="http://localhost:5173/user/order/${order._id}"
//                         style="padding: 10px 22px;background-color: black;color: white;text-decoration: none;font-size: 17px;border-radius: 2px;cursor: pointer;">
//                         View Order Details
//                     </a>
//                 </div>

//                 <div style="padding: 10px 4px;">
//                     <h4 style="padding: 6px 0;font-size: 18px; font-weight: 500;">Thanks for shopping with us!</h4>
//                     <p style="padding-top: 7px;">If you need assistance or have any questions, please email us at <span><a style="color: rgb(42, 42, 226);" href="mailto:care@tinytiaraa.com">care@tinytiaraa.com</a></span> or call +91 86570 62511. We are happy to help!</p>
//                 </div>
//             </div>

//             <div style="color: #3535358b;font-size: 12px;padding-bottom: 20px;">
//                 <p>© Tiny Tiaraa</p>
//                 <p>Ru- Brama Retail Private Limited, Plot F-11 & 12-1, Second Floor, Admin Bldg., MIDC (Marol), Central Road, Opp. Seepz Main Gate, WICEL, Andheri(East), Mumbai, 400093, Maharashtra, India</p>
//                 <p>GST registration number: 27AAKCR3049R1ZL</p>
//             </div>
//         </div>
//     </div>
// </body>

    
//     </html>
    
//             `

// const htmlContent = `
// <html lang="en">

// <head>
//     <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
//     <style>
//         body {
//             margin: 0;
//             padding: 0;
//             font-family: 'Poppins', sans-serif;
//             background-color: #f4f4f4;
//         }

//         .container {
//             max-width: 700px;
//             margin: 30px auto;
//             background-color: #ffffff;
//             box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
//             border-radius: 10px;
//             overflow: hidden;
//         }

//         .header {
//             background-color: #1f1f1f;
//             padding: 20px;
//             color: white;
//             text-align: center;
//         }

//         .header h1 {
//             margin: 0;
//             font-weight: 600;
//             font-size: 28px;
//         }

//         .content {
//             padding: 30px;
//         }

//         .content h2 {
//             font-size: 24px;
//             font-weight: 600;
//             color: #333;
//             margin-bottom: 15px;
//         }

//         .content p {
//             font-size: 16px;
//             color: #666;
//             margin-bottom: 20px;
//         }

//         .order-summary {
//             border-top: 2px solid #eeeeee;
//             padding-top: 20px;
//             margin-top: 20px;
//         }

//         .order-summary h3 {
//             font-size: 20px;
//             font-weight: 600;
//             color: #444;
//             margin-bottom: 10px;
//         }

//         .order-details {
//             margin-top: 20px;
//         }

//         .order-details img {
//             width: 120px;
//             height: auto;
//             border-radius: 8px;
//             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//         }

//         .order-details .item {
//             display: flex;
//             align-items: center;
//             margin-bottom: 15px;
//         }

//         .order-details .info {
//             margin-left: 20px;
//         }

//         .order-details .info h4 {
//             margin: 0;
//             font-size: 18px;
//             font-weight: 500;
//             color: #444;
//         }

//         .order-details .info p {
//             margin: 5px 0;
//             font-size: 14px;
//             color: #888;
//         }

//         .total {
//             margin-top: 30px;
//             text-align: right;
//             font-size: 18px;
//             font-weight: 600;
//         }

//         .shipping-info, .payment-info {
//             margin-top: 40px;
//         }

//         .shipping-info h3, .payment-info h3 {
//             font-size: 20px;
//             color: #333;
//             margin-bottom: 15px;
//         }

//         .shipping-info p, .payment-info p {
//             font-size: 16px;
//             color: #666;
//             margin-bottom: 5px;
//         }

//         .footer {
//             background-color: #f8f8f8;
//             padding: 15px;
//             text-align: center;
//             font-size: 12px;
//             color: #999;
//             border-top: 1px solid #eeeeee;
//         }

//         .footer p {
//             margin: 5px 0;
//         }

//         .footer a {
//             color: #444;
//             text-decoration: none;
//         }

//         .footer .social-icons img {
//             width: 24px;
//             margin: 0 5px;
//         }
//     </style>
// </head>

// <body>
//     <div class="container">
//         <!-- Header Section -->
//         <div class="header">
//             <h1>Order Shipped!</h1>
//         </div>

//         <!-- Main Content Section -->
//         <div class="content">
//             <h2>Hi ${order.shippingAddress.name},</h2>
//             <p>Your order has been shipped! We are thrilled to let you know that your Tiny Tiaraa order is on its way.</p>
//             <p>Tracking Number: <strong>${order.docketno}</strong></p>
//             <p>Your order is being shipped via <strong>Sequel</strong>. You can expect to receive it soon!</p>

//             <!-- Order Summary Section -->
//             <div class="order-summary">
//                 <h3>Order Summary</h3>
//                 <div class="order-details">
//                     ${order.cart.map(item => `
//                         <div class="item">
//                             <img src="${item.images && item.images[1]?.url}" alt="${item.name}">
//                             <div class="info">
//                                 <h4>${item.name}</h4>
//                                 <p>SKU: ${item.skuid}</p>
//                                 ${item.selectedColor ? `<p>Metal Color: ${metalColors[item.selectedColor]}</p>` : ''}
//                                 ${item.showWithChain ? `<p>Chain: ${item.showWithChain ? 'With Chain' : 'Without Chain'} ${item.selectedChainSize ? `(${item.selectedChainSize})` : ''}</p>` : ''}
//                                 ${item.selectedEnamelColor ? `<p>Enamel Color: ${item.selectedEnamelColor}</p>` : ''}
//                                 <p>Quantity: ${item.qty} x ₹${item.chainPrice > 0 ? item.discountPrice + item.chainPrice : item.discountPrice}</p>
//                             </div>
//                         </div>
//                     `).join('')}
//                 </div>

//                 <div class="total">
//                     <p>Subtotal: ₹${order.totalPrice}</p>
//                     <p>Shipping: Free</p>
//                     <p>Coupon Discount: ₹${order.couponDiscount || 'No coupon applied'}</p>
//                     <p>Total: ₹${order.totalPrice}</p>
//                 </div>
//             </div>

//             <!-- Shipping Info Section -->
//             <div class="shipping-info">
//                 <h3>Shipping Address</h3>
//                 <p>${order.shippingAddress.name}</p>
//                 <p>${order.shippingAddress.address1}, ${order.shippingAddress.address2}</p>
//                 <p>${order.shippingAddress.city}, ${order.shippingAddress.country} - ${order.shippingAddress.zipCode}</p>
//                 <p>Email: ${order.shippingAddress.email}</p>
//                 <p>Phone: ${order.shippingAddress.phoneNumber}</p>
//             </div>

//             <!-- Payment Info Section -->
//             <div class="payment-info">
//                 <h3>Payment Method</h3>
//                 <p>Status: <strong>${order.paymentInfo.status || "Not Paid"}</strong></p>
//                 <p>Payment Type: ${order.paymentInfo.type}</p>
//             </div>

//             <!-- Call to Action -->
//             <div style="text-align: center; margin-top: 40px;">
//                 <a href="http://localhost:5173/user/order/${order._id}" style="padding: 12px 24px; background-color: #1f1f1f; color: white; text-decoration: none; font-size: 16px; border-radius: 5px;">View Order Details</a>
//             </div>
//         </div>

//         <!-- Footer Section -->
//         <div class="footer">
//             <p>Thanks for shopping with Tiny Tiaraa!</p>
//             <p>If you have any questions, feel free to <a href="mailto:care@tinytiaraa.com">email us</a> or call us at +91 86570 62511.</p>
//             <p>Follow us on social media:</p>
//             <div class="social-icons">
//                 <a href="#"><img src="https://res.cloudinary.com/ddaef5aw1/image/upload/v1725949453/social-icons/facebook.png" alt="Facebook"></a>
//                 <a href="#"><img src="https://res.cloudinary.com/ddaef5aw1/image/upload/v1725949453/social-icons/instagram.png" alt="Instagram"></a>
//                 <a href="#"><img src="https://res.cloudinary.com/ddaef5aw1/image/upload/v1725949453/social-icons/twitter.png" alt="Twitter"></a>
//             </div>
//             <p>© 2024 Tiny Tiaraa. All rights reserved.</p>
//         </div>
//     </div>
// </body>

// </html>
// `


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

                .orderdetails {
                padding: 20px 0;
                border-top: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
                }

                .totalcost {
                text-align: right;
                padding: 15px 0;

                }

                .shippingaddress {
                padding: 20px 0;
                }

                .adj {
                font-size: 24px;
                font-weight: 600;
                color: #333;
                }

                h3 {
                font-size: 18px;
                font-weight: 500;
                color: #444;
                margin-bottom: 10px;
                }

                p {
                font-size: 14px;
                color: #666;
                }

                .adjustw {
                width: 25%;
                display: inline-block;
                vertical-align: top;
                }
                .a2adjustimg{
                    transform: scale(1.2) !important;

                }
                .adjustw img{
                width: 150px !important;
                height: 130px !important;
                    object-fit: contain !important;
                border: 1px solid #eee !important;
                }

                .adjustw1 {
                width: 70%;
                display: inline-block;
                }
                .adjusttnview{
                    margin-top:13px !important;
                    }

                img {
                width: 100px;
                height: 100px;
                object-fit: contain;
                }

                a {
                color: #000;
                text-decoration: none;
                font-size: 14px;
                }

                .view-order-btn {
                padding: 10px 22px;
                background-color: black;
                color: white !important;
                text-decoration: none;
                font-size: 17px;
                border-radius: 2px;
                display: inline-block;
                text-align: center;
                }
                .ordersum{
                margin-top:10px !important;
                }

                @media (max-width: 1100px) {
                .emailconfirm {
                    width: 75%;
                }
                }

                @media (max-width: 1000px) {
                .emailconfirm {
                    width: 85%;
                }
                    
                .adjustw, .adjustw1 {
                    width: 100%;
                    display: block;
                }
                .adjustw img{
                width: 170px !important;
                height: 150px !important;
                    object-fit: contain !important;
                border: 1px solid #eee !important;
                }
                .downloadinvoice{
                    margin-top:10px !important;
                }
                }

                @media (max-width: 650px) {
                .emailconfirm {
                    width: 90%;
                }

                .adjustw, .adjustw1 {
                    width: 100%;
                    display: block;
                }
                .adjustw img{
                width: 170px !important;
                height: 150px !important;
                    object-fit: contain !important;
                border: 1px solid #eee !important;
                }

                img {
                    width: 100px;
                    height: auto;
                }
                .adjusttnview{
                    margin-top:20px !important;
                    }

                .adj {
                font-size: 20px ;

                }
                }
                </style>
                </head>

                <body>
                <div class="emailconfirm" >
                <div class="headeremail">
                <div class="a2adjust" style="text-align: center;">
                    <img class="a2adjustimg" src="https://backend.tinytiaraa.com:8000/uploads/images/logowebsite/duvdwbtbmyr8ipqrevot.png"
                        alt="Logo">
                </div>
                <div class="a1adjust" style="text-align: center;">
                    <h1 class="adj">Order Shipped!</h1>
                    <p>OrderId: ${order._id}</p>
                </div>

                </div>

                <div style="clear: both;margin-top: 25px;">
                <h2>Hi ${order.shippingAddress.name},</h2>
                <p>Your order has been shipped! We are thrilled to let you know that your Tiny Tiaraa order is on its way.</p>
                <p style="padding: 4px 0;">Tracking Number: <strong>${order.docketno}</strong></p>
                <p>Your order is being shipped via <strong>Sequel</strong>. You can expect to receive it soon!</p>
                </div>

                <div class="yourorder" style="margin-top: 20px;">
                <h3 class="ordersum">Order Summary</h3>

                ${order.cart.map(item => `
                <div class="orderdetails">
                    <div class="adjustw">
                      <img 
                            src="${item.images && item.images[1]?.url?.match(/https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/)
                                ? item.images[1].url.replace(
                                    /https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/,
                                    `${imgdburl}/uploads/images`
                                )
                                : `${imgdburl}${item.images[1]?.url}`}" 
                            alt="${item.name}"
                        >
                    </div>
                    <div class="adjustw1">
                        <h4>${item.name}</h4>
                        <p>${item.skuid}</p>

                        ${item.selectedColor !== null ? `<p>Metal Color: ${metalColors[item.selectedColor]}</p>` : ''}
                        ${item?.showWithChain !== null ? `<p>Chain: ${item.showWithChain ? 'With Chain' : 'Without Chain'} ${item.showWithChain && item.selectedChainSize ? `(${item.selectedChainSize})` : ''}</p>` : ''}
                        ${item?.selectedEnamelColor ? `<p>Enamel Color: ${item.selectedEnamelColor}</p>` : ''}

                        <p>${item.qty} x ₹${item.chainPrice > 0 ? item.discountPrice + item.chainPrice : item.discountPrice}</p>
                    </div>
                </div>`).join('')}
                </div>

                <div class="totalcost">
                <p>Subtotal: ₹${order.totalPrice}</p>
                <p style="padding: 4px 0;">Shipping: Free</p>
                <p>Coupon: ₹${order.couponDiscount ? order.couponDiscount : '500 off'}</p>
                <p style="padding: 4px 0;">Total: ₹${order.totalPrice}</p>
                </div>

                <div class="shippingaddress">
                <h3>Shipping Address</h3>
                <p>${order.shippingAddress.name}</p>
                <p>Email: ${order.shippingAddress.email}</p>
                <p>${order.shippingAddress.address1}</p>
                <p>${order.shippingAddress.address2}</p>
                <p>${order.shippingAddress.city}, ${order.shippingAddress.country} ${order.shippingAddress.zipCode}</p>
                <p>${order.shippingAddress.phoneNumber}</p>
                </div>

                <div>
                <h3>Payment Method</h3>
                <p>Status: ${order.paymentInfo.status ? order.paymentInfo.status : 'Not Paid'}</p>
                <p>Payment Type: ${order.paymentInfo.type}</p>
                </div>

                <div class="adjusttnview" style="text-align: center;">
                <a href="https://www.tinytiaraa.com/user/order/${order._id}" class="view-order-btn">View Order Details</a>
                <a href="https://backend.tinytiaraa.com:8000/invoices/${order._id}" class="view-order-btn downloadinvoice" style="margin-left: 10px;" download>Download Invoice</a>
                </div>

                <div style="padding: 20px 0;">
                <h4>Thanks for shopping with us!</h4>
                <p>You can check the status of your orders at any time on our Orders History Page.</p>
                <p>If you need assistance, please email us at <a href="mailto:care@tinytiaraa.com">care@tinytiaraa.com</a> or call +91 86570 62511.</p>
                <p>Sincerely, Tiny Tiaraa</p>
                </div>

                <div style="color: #888; font-size: 12px; text-align: center; padding-top: 20px;">
                <p>© Tiny Tiaraa</p>
                <p>Ru- Brama Retail Private Limited, Plot F-11 & 12-1, Second Floor, Admin Bldg., MIDC (Marol), Central Road, Opp. Seepz Main Gate, WICEL, Andheri(East), Mumbai, 400093, Maharashtra, India</p>
                <p>GST registration number: 27AAKCR3049R1ZL</p>
                </div>
                </div>
                </body>

                </html>


                `


            await shippingMail({
                email: order.shippingAddress?.email, // Assuming you have the user's email in order object
                subject: "Your Order Has Been Shipped",
                html: htmlContent,
                cc: "orders@tinytiaraa.com"

            });
        }

        // Update the status of the order
        order.status = req.body.status;

        // Set deliveredAt and paymentInfo status if the status is "Delivered"
        if (req.body.status === "Delivered") {
            order.deliveredAt = Date.now();
            order.paymentInfo.status = "Succeeded";

//             const htmlContentDelivered = `
// <html>
// <head>
//     <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
//     <style>
//         * {
//             margin: 0;
//             padding: 0;
//             font-family: 'Poppins', sans-serif;
//             box-sizing: border-box;
//         }
//         body {
//             background-color: #f4f4f4;
//             color: #333;
//             font-size: 14px;
//             line-height: 1.6;
//         }
//         .email-container {
//             max-width: 700px;
//             margin: 20px auto;
//             background-color: #fff;
//             padding: 20px;
//             box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//             border-radius: 8px;
//         }
//         .header {
//             text-align: center;
//             padding-bottom: 20px;
//             border-bottom: 2px solid #eee;
//         }
//         .header img {
//             width: 120px;
//             margin-bottom: 10px;
//         }
//         .header h1 {
//             font-size: 28px;
//             font-weight: 600;
//             color: #333;
//         }
//         .content {
//             margin: 20px 0;
//         }
//         .content p {
//             margin: 10px 0;
//         }
//         .order-summary, .shipping-info, .payment-info {
//             margin: 20px 0;
//             padding: 20px;
//             background-color: #f9f9f9;
//             border-radius: 5px;
//         }
//         .order-summary h3, .shipping-info h3, .payment-info h3 {
//             font-size: 18px;
//             margin-bottom: 10px;
//         }
//         .order-item {
//             display: flex;
//             padding: 10px 0;
//             border-bottom: 1px solid #eee;
//         }
//         .order-item img {
//             width: 120px;
//             margin-right: 20px;
//         }
//         .order-item-details {
//             flex: 1;
//         }
//         .total {
//             text-align: right;
//             font-weight: 600;
//             font-size: 18px;
//             margin-top: 20px;
//         }
//         .btn {
//             display: inline-block;
//             padding: 12px 20px;
//             background-color: #333;
//             color: #fff;
//             text-decoration: none;
//             font-size: 16px;
//             margin-top: 20px;
//             border-radius: 5px;
//             text-align: center;
//         }
//         .footer {
//             text-align: center;
//             font-size: 12px;
//             color: #999;
//             margin-top: 30px;
//             border-top: 1px solid #eee;
//             padding-top: 10px;
//         }
//     </style>
// </head>
// <body>
//     <div class="email-container">
//         <div class="header">
//             <img src="https://res.cloudinary.com/ddaef5aw1/image/upload/v1725949453/duvdwbtbmyr8ipqrevot.png" alt="Tiny Tiaraa Logo">
//             <h1>Order Delivered!</h1>
//         </div>
//         <div class="content">
//             <p>Dear <span style="text-transform: capitalize;">${order.shippingAddress.name},</span></p>
//             <p>Your Tiny Tiaraa order <strong>Order ID: ${order._id}</strong> has been successfully delivered!</p>
//             <p>We hope you love your purchase. Thank you for shopping with Tiny Tiaraa!</p>
//         </div>
//         <div class="order-summary">
//             <h3>Order Summary</h3>
//             ${order.cart.map(item => `
//             <div class="order-item">
//                 <img src="${item.images && item.images[1]?.url}" alt="${item.name}">
//                 <div class="order-item-details">
//                     <h4>${item.name}</h4>
//                     <p>SKU: ${item.skuid}</p>
//                     ${item.selectedColor ? `<p>Metal Color: ${metalColors[item.selectedColor]}</p>` : ''}
//                     ${item.selectedEnamelColor ? `<p>Enamel Color: ${item.selectedEnamelColor}</p>` : ''}
//                     ${item.showWithChain ? `<p>Chain: ${item.showWithChain ? 'With Chain' : 'Without Chain'} ${item.showWithChain && item.selectedChainSize ? `(${item.selectedChainSize})` : ''}</p>` : ''}
//                     <p>Quantity: ${item.qty}</p>
//                     <p>Price: ₹${item.chainPrice > 0 ? item.discountPrice + item.chainPrice : item.discountPrice}</p>
//                 </div>
//             </div>
//             `).join('')}
//             <div class="total">
//                 <p>Subtotal: ₹${order.totalPrice}</p>
//                 <p>Shipping: Free</p>
//                 <p>Discount: ₹${order.couponDiscount ? order.couponDiscount : 'No coupon applied'}</p>
//                 <p><strong>Total: ₹${order.totalPrice}</strong></p>
//             </div>
//         </div>
//         <div class="shipping-info">
//             <h3>Shipping Address</h3>
//             <p>${order.shippingAddress.name}</p>
//             <p>${order.shippingAddress.address1}, ${order.shippingAddress.address2}</p>
//             <p>${order.shippingAddress.city}, ${order.shippingAddress.country}, ${order.shippingAddress.zipCode}</p>
//             <p>Email: ${order.shippingAddress.email}</p>
//             <p>Phone: ${order.shippingAddress.phoneNumber}</p>
//         </div>
//         <div class="payment-info">
//             <h3>Payment Information</h3>
//             <p>Payment Status: ${order.paymentInfo.status ? order.paymentInfo.status : "Not Paid"}</p>
//             <p>Payment Type: ${order.paymentInfo.type}</p>
//         </div>
//         <div style="text-align: center;">
//             <a href="http://localhost:5173/user/order/${order._id}" class="btn">View Order Details</a>
//         </div>
//         <div class="footer">
//             <p>© Tiny Tiaraa</p>
//             <p>Ru- Brama Retail Private Limited, Plot F-11 & 12-1, Second Floor, Admin Bldg., MIDC (Marol), Central Road, Opp. Seepz Main Gate, WICEL, Andheri(East), Mumbai, 400093, Maharashtra, India</p>
//             <p>GST registration number: 27AAKCR3049R1ZL</p>
//         </div>
//     </div>
// </body>
// </html>
// `;

// const htmlContentDelivered = `<html>
// <head>
//     <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
//     <style>
//         * {
//             margin: 0;
//             padding: 0;
//             font-family: 'Poppins', sans-serif;
//             box-sizing: border-box;
//         }
//         body {
//             background-color: #f4f4f4;
//             color: #333;
//             font-size: 14px;
//             line-height: 1.6;
//         }
//         .email-container {
//             max-width: 700px;
//             margin: 20px auto;
//             background-color: #fff;
//             padding: 30px;
//             box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
//             border-radius: 12px;
//             font-size: 15px;
//         }
//         .header {
//             text-align: center;
//             padding-bottom: 20px;
//             border-bottom: 2px solid #eee;
//         }
//         .header img {
//             width: 130px;
//             margin-bottom: 15px;
//         }
//         .header h1 {
//             font-size: 26px;
//             font-weight: 600;
//             color: 	#006039; /* Stylish, elegant color */
//         }
//         .content {
//             margin: 20px 0;
//         }
//         .content p {
//             margin: 10px 0;
//             font-size: 16px;
//         }
//         .order-summary, .shipping-info, .payment-info {
//             margin: 20px 0;
//             padding: 20px;
//             background-color: #fafafa;
//             border-radius: 8px;
//             border-left: 4px solid 	#006039;
//         }
//         .order-summary h3, .shipping-info h3, .payment-info h3 {
//             font-size: 20px;
//             color: 	#006039;
//             margin-bottom: 15px;
//         }
//         .order-item {
//             display: flex;
//             padding: 10px 0;
//             border-bottom: 1px solid #eee;
//             align-items: center;
//         }
//         .order-item img {
//             width: 120px;
//             height: auto;
//             margin-right: 20px;
//             border-radius: 8px;
//         }
//         .order-item-details {
//             flex: 1;
//         }
//         .order-item-details h4 {
//             font-size: 18px;
//             font-weight: 600;
//             margin-bottom: 5px;
//         }
//         .order-item-details p {
//             font-size: 14px;
//             color: #555;
//         }
//         .total {
//             text-align: right;
//             font-weight: 600;
//             font-size: 18px;
//             margin-top: 20px;
//             color:	#006039;
//         }
//         .btn {
//             display: inline-block;
//             padding: 12px 30px;
//             background-color: #006039;
//             color: #fff !important;
//             text-decoration: none;
//             font-size: 16px;
//             margin-top: 20px;
//             border-radius: 8px;
//             text-align: center;
//             box-shadow: 0 3px 10px rgba(90, 103, 216, 0.2);
//             transition: background-color 0.3s ease;
//         }
//         .btn:hover {
//             background-color: #098d58;
//         }
//         .footer {
//             text-align: center;
//             font-size: 12px;
//             color: #999;
//             margin-top: 30px;
//             border-top: 1px solid #eee;
//             padding-top: 20px;
//         }
//         .footer p {
//             margin: 4px 0;
//         }
//         @media only screen and (max-width: 600px) {
//             .email-container {
//                 padding: 20px;
//             }
//             .order-item {
//                 flex-direction: column;
//             }
//             .order-item img {
//                 margin-bottom: 10px;
//                 margin-right: 0;
//             }
//             .btn {
//                 padding: 12px 20px;
//             }
//         }
//     </style>
// </head>
// <body>
//     <div class="email-container">
//         <div class="header">
//             <img src="https://res.cloudinary.com/ddaef5aw1/image/upload/v1725949453/duvdwbtbmyr8ipqrevot.png" alt="Tiny Tiaraa Logo">
//             <h1>Order Delivered!</h1>
//         </div>
//         <div class="content">
//             <p>Dear <span style="text-transform: capitalize;">${order.shippingAddress.name},</span></p>
//             <p>Your Tiny Tiaraa order <strong>Order ID: ${order._id}</strong> has been successfully delivered!</p>
//             <p>We hope you love your purchase. Thank you for shopping with Tiny Tiaraa!</p>
//         </div>
//         <div class="order-summary">
//             <h3>Order Summary</h3>
//             ${order.cart.map(item => `
//             <div class="order-item">
//                 <img src="${item.images && item.images[1]?.url}" alt="${item.name}">
//                 <div class="order-item-details">
//                     <h4>${item.name}</h4>
//                     <p>SKU: ${item.skuid}</p>
//                     ${item.selectedColor ? `<p>Metal Color: ${metalColors[item.selectedColor]}</p>` : ''}
//                     ${item.selectedEnamelColor ? `<p>Enamel Color: ${item.selectedEnamelColor}</p>` : ''}
//                     ${item.showWithChain ? `<p>Chain: ${item.showWithChain ? 'With Chain' : 'Without Chain'} ${item.showWithChain && item.selectedChainSize ? `(${item.selectedChainSize})` : ''}</p>` : ''}
//                     <p>Quantity: ${item.qty}</p>
//                     <p>Price: ₹${item.chainPrice > 0 ? item.discountPrice + item.chainPrice : item.discountPrice}</p>
//                 </div>
//             </div>
//             `).join('')}
//             <div class="total">
//                 <p>Subtotal: ₹${order.totalPrice}</p>
//                 <p>Shipping: Free</p>
//                 <p>Discount: ₹${order.couponDiscount ? order.couponDiscount : 'No coupon applied'}</p>
//                 <p><strong>Total: ₹${order.totalPrice}</strong></p>
//             </div>
//         </div>
//         <div class="shipping-info">
//             <h3>Shipping Address</h3>
//             <p>${order.shippingAddress.name}</p>
//             <p>${order.shippingAddress.address1}, ${order.shippingAddress.address2}</p>
//             <p>${order.shippingAddress.city}, ${order.shippingAddress.country}, ${order.shippingAddress.zipCode}</p>
//             <p>Email: ${order.shippingAddress.email}</p>
//             <p>Phone: ${order.shippingAddress.phoneNumber}</p>
//         </div>
//         <div class="payment-info">
//             <h3>Payment Information</h3>
//             <p>Payment Status: ${order.paymentInfo.status ? order.paymentInfo.status : "Not Paid"}</p>
//             <p>Payment Type: ${order.paymentInfo.type}</p>
//         </div>
//         <div style="text-align: center;">
//             <a href="http://localhost:5173/user/order/${order._id}" class="btn">View Order Details</a>
//         </div>
//         <div class="footer">
//             <p>© Tiny Tiaraa</p>
//             <p>Ru- Brama Retail Private Limited, Plot F-11 & 12-1, Second Floor, Admin Bldg., MIDC (Marol), Central Road, Opp. Seepz Main Gate, WICEL, Andheri(East), Mumbai, 400093, Maharashtra, India</p>
//             <p>GST registration number: 27AAKCR3049R1ZL</p>
//         </div>
//     </div>
// </body>
// </html>
// `


// const htmlContentDelivered = `<html>
// <head>
//     <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
//     <style>
//         * {
//             margin: 0;
//             padding: 0;
//             font-family: 'Poppins', sans-serif;
//             box-sizing: border-box;
//         }
//         body {
//             background-color: #f4f4f4;
//             color: #333;
//             font-size: 14px;
//             line-height: 1.6;
//         }
//         .email-container {
//             max-width: 700px;
//             margin: 20px auto;
//             background-color: #fff;
//             padding: 30px;
//             box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
//             border-radius: 12px;
//             font-size: 15px;
//         }
//         .header {
//             text-align: center;
//             padding-bottom: 20px;
//             border-bottom: 2px solid #eee;
//         }
//         .header img {
//             width: 130px;
//             margin-bottom: 15px;
//         }
//         .header h1 {
//             font-size: 26px;
//             font-weight: 600;
//             color: #006039; /* Stylish, elegant color */
//         }
//         .content {
//             margin: 20px 0;
//         }
//         .content p {
//             margin: 10px 0;
//             font-size: 16px;
//         }
//         .order-summary, .shipping-info, .payment-info {
//             margin: 20px 0;
//             padding: 20px;
//             background-color: #fafafa;
//             border-radius: 8px;
//             border-left: 4px solid #006039;
//         }
//         .order-summary h3, .shipping-info h3, .payment-info h3 {
//             font-size: 20px;
//             color: #006039;
//             margin-bottom: 15px;
//             font-weight: 600; /* Ensure consistent weight for all headings */
//         }
//         .order-item {
//             display: flex;
//             padding: 10px 0;
//             border-bottom: 1px solid #eee;
//             align-items: center;
//         }
//         .order-item img {
//             width: 120px;
//             height: auto;
//             margin-right: 20px;
//             border-radius: 8px;
//         }
//         .order-item-details {
//             flex: 1;
//         }
//         .order-item-details h4 {
//             font-size: 18px;
//             font-weight: 600;
//             margin-bottom: 5px;
//             color: #333; /* Uniform color for item names */
//         }
//         .order-item-details p {
//             font-size: 14px;
//             color: #555;
//         }
//         .total {
//             text-align: right;
//             font-weight: 600;
//             font-size: 18px;
//             margin-top: 20px;
//             color: #006039;
//         }
//         .btn {
//             display: inline-block;
//             padding: 12px 30px;
//             background-color: #006039;
//             color: #fff !important;
//             text-decoration: none;
//             font-size: 16px;
//             margin-top: 20px;
//             border-radius: 8px;
//             text-align: center;
//             box-shadow: 0 3px 10px rgba(90, 103, 216, 0.2);
//             transition: background-color 0.3s ease;
//         }
//         .btn:hover {
//             background-color: #098d58;
//         }
//         .footer {
//             text-align: center;
//             font-size: 12px;
//             color: #999;
//             margin-top: 30px;
//             border-top: 1px solid #eee;
//             padding-top: 20px;
//         }
//         .footer p {
//             margin: 4px 0;
//         }
//         @media only screen and (max-width: 600px) {
//             .email-container {
//                 padding: 20px;
//             }
//             .order-item {
//                 flex-direction: column;
//             }
//             .order-item img {
//                 margin-bottom: 10px;
//                 margin-right: 0;
//             }
//             .btn {
//                 padding: 12px 20px;
//             }
//         }
//     </style>
// </head>
// <body>
//     <div class="email-container">
//         <div class="header">
//             <img src="https://res.cloudinary.com/ddaef5aw1/image/upload/v1725949453/duvdwbtbmyr8ipqrevot.png" alt="Tiny Tiaraa Logo">
//             <h1>Order Delivered!</h1>
//         </div>
//         <div class="content">
//             <p>Dear <span style="text-transform: capitalize;">${order.shippingAddress.name},</span></p>
//             <p>Your Tiny Tiaraa order <strong>Order ID: ${order._id}</strong> has been successfully delivered!</p>
//             <p>We hope you love your purchase. Thank you for shopping with Tiny Tiaraa!</p>
//         </div>
//         <div class="order-summary">
//             <h3>Order Summary</h3>
//             ${order.cart.map(item => `
//             <div class="order-item">
//                 <img src="${item.images && item.images[1]?.url}" alt="${item.name}">
//                 <div class="order-item-details">
//                     <h4>${item.name}</h4>
//                     <p>SKU: ${item.skuid}</p>
//                     ${item.selectedColor ? `<p>Metal Color: ${metalColors[item.selectedColor]}</p>` : ''}
//                     ${item.selectedEnamelColor ? `<p>Enamel Color: ${item.selectedEnamelColor}</p>` : ''}
//                     ${item.showWithChain ? `<p>Chain: ${item.showWithChain ? 'With Chain' : 'Without Chain'} ${item.showWithChain && item.selectedChainSize ? `(${item.selectedChainSize})` : ''}</p>` : ''}
//                     <p>Quantity: ${item.qty}</p>
//                     <p>Price: ₹${item.chainPrice > 0 ? item.discountPrice + item.chainPrice : item.discountPrice}</p>
//                 </div>
//             </div>
//             `).join('')}
//             <div class="total">
//                 <p>Subtotal: ₹${order.totalPrice}</p>
//                 <p>Shipping: Free</p>
//                 <p>Discount: ₹${order.couponDiscount ? order.couponDiscount : 'No coupon applied'}</p>
//                 <p><strong>Total: ₹${order.totalPrice}</strong></p>
//             </div>
//         </div>
//         <div class="shipping-info">
//             <h3>Shipping Address</h3>
//             <p>${order.shippingAddress.name}</p>
//             <p>${order.shippingAddress.address1}, ${order.shippingAddress.address2}</p>
//             <p>${order.shippingAddress.city}, ${order.shippingAddress.country}, ${order.shippingAddress.zipCode}</p>
//             <p>Email: ${order.shippingAddress.email}</p>
//             <p>Phone: ${order.shippingAddress.phoneNumber}</p>
//         </div>
//         <div class="payment-info">
//             <h3>Payment Information</h3>
//             <p>Payment Status: ${order.paymentInfo.status ? order.paymentInfo.status : "Not Paid"}</p>
//             <p>Payment Type: ${order.paymentInfo.type}</p>
//         </div>
//         <div style="text-align: center;">
//             <a href="http://localhost:5173/user/order/${order._id}" class="btn">View Order Details</a>
//         </div>
//         <div class="footer">
//             <p>© Tiny Tiaraa</p>
//             <p>Ru- Brama Retail Private Limited, Plot F-11 & 12-1, Second Floor, Admin Bldg., MIDC (Marol), Central Road, Opp. Seepz Main Gate, WICEL, Andheri(East), Mumbai, 400093, Maharashtra, India</p>
//             <p>GST registration number: 27AAKCR3049R1ZL</p>
//         </div>
//     </div>
// </body>
// </html>
// `

            const htmlContentDelivered = `
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

            .orderdetails {
            padding: 20px 0;
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            }

            .totalcost {
            text-align: right;
            padding: 15px 0;

            }

            .shippingaddress {
            padding: 20px 0;
            }

            .adj {
            font-size: 24px;
            font-weight: 600;
            color: #333;
            }

            h3 {
            font-size: 18px;
            font-weight: 500;
            color: #444;
            margin-bottom: 10px;
            }

            p {
            font-size: 14px;
            color: #666;
            }

            .adjustw {
            width: 25%;
            display: inline-block;
            vertical-align: top;
            }
            .adjustw img{
            width: 150px !important;
            height: 130px !important;
                object-fit: contain !important;
            border: 1px solid #eee !important;
            }

            .adjustw1 {
            width: 70%;
            display: inline-block;
            }

            img {
            width: 100px;
            height: 100px;
            object-fit: contain;
            }

            a {
            color: #000;
            text-decoration: none;
            font-size: 14px;
            }

            .view-order-btn {
            padding: 10px 22px;
            background-color: black;
            color: white !important;
            text-decoration: none;
            font-size: 17px;
            border-radius: 2px;
            display: inline-block;
            text-align: center;
            }
            .ordersum{
            margin-top:10px !important;
            }

            @media (max-width: 1100px) {
            .emailconfirm {
                width: 75%;
            }
            }

            @media (max-width: 800px) {
            .emailconfirm {
                width: 85%;
            }
            }

            @media (max-width: 650px) {
            .emailconfirm {
                width: 90%;
            }

            .adjustw, .adjustw1 {
                width: 100%;
                display: block;
            }
            .adjustw img{
            width: 170px !important;
            height: 150px !important;
                object-fit: contain !important;
            border: 1px solid #eee !important;
            }

            img {
                width: 100px;
                height: auto;
            }
            .adjusttnview{
                margin-top:10px !important;
                }

            .adj {
            font-size: 20px ;

            }
            }
            </style>
            </head>

            <body>
            <div class="emailconfirm">
            <div class="headeremail">
            <div class="a2adjust" style="text-align: center;">
                <img src="https://backend.tinytiaraa.com:8000/uploads/images/logowebsite/duvdwbtbmyr8ipqrevot.png"
                    alt="Logo">
            </div>
            <div class="a1adjust" style="text-align: center;">
                <h1 class="adj">Order Delivered!</h1>
                <p>OrderId: ${order._id}</p>
            </div>

            </div>

            <div style="clear: both;">
            <p>Dear <span style="text-transform: capitalize;">${order.shippingAddress.name},</span></p>
            <p style="padding: 4px 0;">Your Tiny Tiaraa order <strong>Order ID: ${order._id}</strong> has been successfully delivered!</p>
            <p>We hope you love your purchase. Thank you for shopping with Tiny Tiaraa!</p>
            </div>

            <div class="yourorder">
            <h3 class="ordersum">Order Summary</h3>

            ${order.cart.map(item => `
            <div class="orderdetails">
                <div class="adjustw">
                    <img 
                            src="${item.images && item.images[1]?.url?.match(/https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/)
                                ? item.images[1].url.replace(
                                    /https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/,
                                    `${imgdburl}/uploads/images`
                                )
                                : `${imgdburl}${item.images[1]?.url}`}" 
                            alt="${item.name}"
                        >
                </div>
                <div class="adjustw1">
                    <h4>${item.name}</h4>
                    <p>${item.skuid}</p>

                    ${item.selectedColor !== null ? `<p>Metal Color: ${metalColors[item.selectedColor]}</p>` : ''}
                    ${item?.showWithChain !== null ? `<p>Chain: ${item.showWithChain ? 'With Chain' : 'Without Chain'} ${item.showWithChain && item.selectedChainSize ? `(${item.selectedChainSize})` : ''}</p>` : ''}
                    ${item?.selectedEnamelColor ? `<p>Enamel Color: ${item.selectedEnamelColor}</p>` : ''}

                    <p>${item.qty} x ₹${item.chainPrice > 0 ? item.discountPrice + item.chainPrice : item.discountPrice}</p>
                </div>
            </div>`).join('')}
            </div>

            <div class="totalcost">
            <p>Subtotal: ₹${order.totalPrice}</p>
            <p style="padding: 4px 0;">Shipping: Free</p>
            <p>Coupon: ₹${order.couponDiscount ? order.couponDiscount : 'No coupon applied'}</p>
            <p style="padding: 4px 0;">Total: ₹${order.totalPrice}</p>
            </div>

            <div class="shippingaddress">
            <h3>Shipping Address</h3>
            <p>${order.shippingAddress.name}</p>
            <p>Email: ${order.shippingAddress.email}</p>
            <p>${order.shippingAddress.address1}</p>
            <p>${order.shippingAddress.address2}</p>
            <p>${order.shippingAddress.city}, ${order.shippingAddress.country} ${order.shippingAddress.zipCode}</p>
            <p>${order.shippingAddress.phoneNumber}</p>
            </div>

            <div>
            <h3>Payment Method</h3>
            <p>Status: ${order.paymentInfo.status ? order.paymentInfo.status : 'Not Paid'}</p>
            <p>Payment Type: ${order.paymentInfo.type}</p>
            </div>

            <div class="adjusttnview" style="text-align: center;">
            <a href="https://www.tinytiaraa.com/user/order/${order._id}" class="view-order-btn">View Order Details</a>
            </div>

            <div style="padding: 20px 0;">
            <h4>Thanks for shopping with us!</h4>
            <p>You can check the status of your orders at any time on our Orders History Page.</p>
            <p>If you need assistance, please email us at <a href="mailto:care@tinytiaraa.com">care@tinytiaraa.com</a> or call +91 86570 62511.</p>
            <p>Sincerely, Tiny Tiaraa</p>
            </div>

            <div style="color: #888; font-size: 12px; text-align: center; padding-top: 20px;">
            <p>© Tiny Tiaraa</p>
            <p>Ru- Brama Retail Private Limited, Plot F-11 & 12-1, Second Floor, Admin Bldg., MIDC (Marol), Central Road, Opp. Seepz Main Gate, WICEL, Andheri(East), Mumbai, 400093, Maharashtra, India</p>
            <p>GST registration number: 27AAKCR3049R1ZL</p>
            </div>
            </div>
            </body>

            </html>


            `



            await shippingMail({
                email: order.shippingAddress?.email, // Assuming you have the user's email in order object
                subject: "Your Order Has Been Delivered",
                html: htmlContentDelivered,
                cc: "orders@tinytiaraa.com"

            });

        }

        // Save the order with the new status and docket number
        await order.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            order,
        });

        async function updateOrder(cartItem) {
            const product = await Product.findById(cartItem._id);

            // Log the cart item being processed
            console.log("Processing cart item:", cartItem);
            const metalColors = {
                0: "YellowGold",
                1: "RoseGold",
                2: "WhiteGold",
            };

            // Check if the product has enamel and metal color options
            const selectedMetalColor = metalColors[cartItem.selectedColor];
            const selectedEnamelColor = cartItem.selectedEnamelColor;

            if (selectedEnamelColor) {
                // Clean the selectedEnamelColor key to match the data format
                const cleanedEnamelColor = selectedEnamelColor.toLowerCase().replace(/_/g, '');

                // Construct the key to access the specific enamel color stock
                const enamelKey = `${cleanedEnamelColor}${selectedMetalColor.replace(/ /g, '')}clrStock`;

                // Decrement stock for the specific enamel color and metal color
                product.Enamelcolorstock[cleanedEnamelColor][enamelKey] -= cartItem.qty;

                // Log which stocks are being updated
                // console.log(`Decrementing stock for ${selectedEnamelColor} with ${selectedMetalColor}: -${cartItem.qty}`);
            } else if (selectedMetalColor) {
                // Construct the key to access the specific metal color stock
                const metalKey = `${selectedMetalColor}clrStock`;

                // Decrement stock for the specific metal color
                product.Metalcolorstock[metalKey] -= cartItem.qty;

                // Log which metal color stock is being updated
                // console.log(`Decrementing stock for ${selectedMetalColor}: -${cartItem.qty}`);

                // console.log(`Decrementing stock for ${ product.Metalcolorstock[metalKey]}: -${cartItem.qty}`);

            } else {
                // Decrement general stock
                product.stock -= cartItem.qty;

                // Log which general stock is being updated
                // console.log(`Decrementing general stock: -${cartItem.qty}`);
            }

            // Increment sold_out based on the quantity ordered
            product.sold_out += cartItem.qty;

            // Log the updated product state
            // console.log("Updated product state:", product);

            await product.save({ validateBeforeSave: false });
        }

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

//give a refund 

router.put(
    "/order-refund/:id",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const order = await Order.findById(req.params.id);

            if (!order) {
                return next(new ErrorHandler("Order not found with this id", 400));
            }

            order.status = req.body.status;

            await order.save({ validateBeforeSave: false });

            res.status(200).json({
                success: true,
                order,
                message: "Order Refund Request successfully!",
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

// accept the refund

router.put(
    "/order-refund-success/:id",
    isSeller,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const order = await Order.findById(req.params.id);

            if (!order) {
                return next(new ErrorHandler("Order not found with this id", 400));
            }

            order.status = req.body.status;

            await order.save();

            res.status(200).json({
                success: true,
                message: "Order Refund successfull!",
            });

            if (req.body.status === "refund Success") {
                order.cart.forEach(async (o) => {
                    await updateOrder(o._id, o.qty);
                });
            }

            async function updateOrder(id, qty) {
                const product = await Product.findById(id);

                product.stock += qty;
                product.sold_out -= qty;

                await product.save({ validateBeforeSave: false });
            }
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

//cancel of order

router.put("/cancel-order/:id", isSeller, catchAsyncErrors(async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return next(new ErrorHandler("Order not found with this id", 400));
        }

        // Check if the order is eligible for cancellation
        if (order.status === "Shipping" || order.status === "Delivered" || order.status === "Received" || order.status === "On the way" ||  order.status === "Processing Refund" || order.status === "refund Success" ) {
            return next(new ErrorHandler("Order cannot be cancelled as it has already been shipped or delivered.", 400));
        }

        // Set order status to "Cancelled"
        order.status = "Cancelled";

        // Restore the stock for each item in the order
        for (const cartItem of order.cart) {
            await restoreStock(cartItem);
        }

        // If payment was made, process the refund (optional, depending on your payment gateway)
        // if (order.paymentInfo && order.paymentInfo.status === "Succeeded") {
        //     // Add logic for refunding the customer, e.g. via Stripe or PayPal
        //     // await processRefund(order.paymentInfo); // Custom function to handle refund
        // }

        // Save the order after updating the status and restoring stock
        await order.save({ validateBeforeSave: false });

        // Notify the customer about the cancellation
        // await cancellationMail({
        //     email: order.shippingAddress?.email, // Assuming email is in the order object
        //     subject: "Your Order Has Been Cancelled",
        //     html: `Your order with ID: ${order._id} has been cancelled. If you have any questions, please contact support.`, // Customize this as needed
        // });

        res.status(200).json({
            success: true,
            message: "Order has been cancelled successfully.",
        });

        async function restoreStock(cartItem) {
            const product = await Product.findById(cartItem._id);

            const metalColors = {
                0: "YellowGold",
                1: "RoseGold",
                2: "WhiteGold",
            };

            // Restore stock for enamel and metal colors
            const selectedMetalColor = metalColors[cartItem.selectedColor];
            const selectedEnamelColor = cartItem.selectedEnamelColor;

            if (selectedEnamelColor) {
                const cleanedEnamelColor = selectedEnamelColor.toLowerCase().replace(/_/g, '');
                const enamelKey = `${cleanedEnamelColor}${selectedMetalColor.replace(/ /g, '')}clrStock`;
                product.Enamelcolorstock[cleanedEnamelColor][enamelKey] += cartItem.qty;
            } else if (selectedMetalColor) {
                const metalKey = `${selectedMetalColor}clrStock`;
                product.Metalcolorstock[metalKey] += cartItem.qty;
            } else {
                product.stock += cartItem.qty;
            }

            // Decrement the sold_out field since the items are being returned to stock
            product.sold_out -= cartItem.qty;

            // Save the product after restoring stock
            await product.save({ validateBeforeSave: false });
        }

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));


module.exports = router
