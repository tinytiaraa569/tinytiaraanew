const express = require("express")
const router = express.Router()

const Product = require("../model/product")
// const { upload } = require("../multer")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const ErrorHandler = require("../utils/Errorhandler")
const Shop = require("../model/shop")
const { isSeller, isAuthenticated } = require("../middleware/auth");
const crypto = require('crypto');
const fs = require('fs')
const Order = require("../model/order")
const cloudinary = require("cloudinary");
const multer = require("multer");
const path = require("path");
//create Product

const generateRandomString = (length) => {
    return crypto.randomBytes(length).toString('hex').slice(0, length); // Generate random bytes and convert to hex
};

router.post("/create-product", catchAsyncErrors(async (req, res, next) => {
    console.log(req.files, 'Uploaded files');  
    console.log(req.body, 'Uploaded body');  

    try {
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId);

        if (!shop) {
            return next(new ErrorHandler("Shop ID is invalid", 400));
        }

        let images = [];
        let withchainimages = [];
        let withchainoutimages = [];

        // metal color 
        let YellowGoldclr = [];
        let RoseGoldclr = [];
        let WhiteGoldclr = [];



        // images 
        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }
        //withchain

        if (typeof req.body.withchainimages === "string") {
            withchainimages.push(req.body.withchainimages);
        } else {
            withchainimages = req.body.withchainimages;
        }
        //without chain
        if (typeof req.body.withchainoutimages === "string") {
            withchainoutimages.push(req.body.withchainoutimages);
        } else {
            withchainoutimages = req.body.withchainoutimages;
        }


        // Metal color
        //yellow clr
        if (typeof req.body.YellowGoldclr === "string") {
            YellowGoldclr.push(req.body.YellowGoldclr);
        } else {
            YellowGoldclr = req.body.YellowGoldclr;
        }

        //RoseGoldclr 
        if (typeof req.body.RoseGoldclr === "string") {
            RoseGoldclr.push(req.body.RoseGoldclr);
        } else {
            RoseGoldclr = req.body.RoseGoldclr;
        }

        //WhiteGoldclr 
        if (typeof req.body.WhiteGoldclr === "string") {
            WhiteGoldclr.push(req.body.WhiteGoldclr);
        } else {
            WhiteGoldclr = req.body.WhiteGoldclr;
        }







        const imagesLinks = [];
        const withchainimagesLinks = [];
        const withchainoutimagesLinks = [];

        //meatl color links
        const YellowGoldclrLinks = [];
        const RoseGoldclrLinks = [];
        const WhiteGoldclrLinks = [];

        const processBase64Images = (imageArray, imageLinksArray) => {
            for (let i = 0; i < imageArray.length; i++) {
                const base64Image = imageArray[i];
                const matches = base64Image.match(/^data:(.+);base64,(.+)$/);
                if (!matches) {
                    console.error('Invalid image format:', base64Image);
                    continue; 
                }
        
                const mimeType = matches[1]; 
                const base64Data = matches[2]; 
        
                const extension = mimeType.split('/')[1]; // e.g., 'png', 'jpeg', etc.
                const imageBuffer = Buffer.from(base64Data, 'base64');
        
                const uniqueId = generateRandomString(20); // Adjust length as needed
                const publicId = `products/${uniqueId}`; // Create the public_id
        
                const imagePath = path.join(__dirname, '../uploads/images/products', `${uniqueId}.${extension}`);
                fs.writeFileSync(imagePath, imageBuffer); // Save the image to the file system
        
                imageLinksArray.push({
                    public_id: publicId,
                    url: `/uploads/images/products/${uniqueId}.${extension}`
                });
            }
        };


            // Process general images
        processBase64Images(images, imagesLinks);

        // Process with chain images
        processBase64Images(withchainimages, withchainimagesLinks);

        // Process without chain images
        processBase64Images(withchainoutimages, withchainoutimagesLinks);

                // Function to save image to server and return URL(working)
                // for (let i = 0; i < req.body.images.length; i++) {
                //     const base64Image = req.body.images[i];

                //     // Decode base64 string and save the image
                //     const imageBuffer = Buffer.from(base64Image.split(",")[1], 'base64'); // Get the base64 part after the comma
                //     const uniqueId = Date.now() + '-' + Math.round(Math.random() * 1E9);
                //     const imagePath = path.join(__dirname, '../uploads/images/products', `${uniqueId}.png`);

                //     // Save the image
                //     fs.writeFileSync(imagePath, imageBuffer);

                //     // Prepare image link to return or save to database
                //     imagesLinks.push({
                //         public_id: `products/${uniqueId}`,
                //         url: `/uploads/images/products/${uniqueId}.png`
                //     });
                // }

                // Now imagesLinks will contain the saved image paths
                // console.log(imagesLinks, "Image links");


       


        // yellow gold clr
        processBase64Images(YellowGoldclr, YellowGoldclrLinks);

        // RoseGoldclr clr
        processBase64Images(RoseGoldclr, RoseGoldclrLinks);

        // WhiteGoldclr clr
        processBase64Images(WhiteGoldclr, WhiteGoldclrLinks);


        // Enamel colors

        //deep blue
        let deepblueYellowGoldclr = [];
        let deepblueRoseGoldclr = [];
        let deepblueWhiteGoldclr = [];

        // Metal color
        //deepblueyellow clr
        if (typeof req.body.deepblueYellowGoldclr === "string") {
            deepblueYellowGoldclr.push(req.body.deepblueYellowGoldclr);
        } else {
            deepblueYellowGoldclr = req.body.deepblueYellowGoldclr;
        }

        //deepblueRoseGoldclr 
        if (typeof req.body.deepblueRoseGoldclr === "string") {
            deepblueRoseGoldclr.push(req.body.deepblueRoseGoldclr);
        } else {
            deepblueRoseGoldclr = req.body.deepblueRoseGoldclr;
        }

        //WhiteGoldclr 
        if (typeof req.body.deepblueWhiteGoldclr === "string") {
            deepblueWhiteGoldclr.push(req.body.deepblueWhiteGoldclr);
        } else {
            deepblueWhiteGoldclr = req.body.deepblueWhiteGoldclr;
        }


        const deepblueYellowGoldclrLinks = [];
        const deepblueRoseGoldclrLinks = [];
        const deepblueWhiteGoldclrLinks = [];

        // yellow gold clr
        processBase64Images(deepblueYellowGoldclr, deepblueYellowGoldclrLinks);



        // RoseGoldclr clr
        processBase64Images(deepblueRoseGoldclr, deepblueRoseGoldclrLinks);


      
        // WhiteGoldclr clr
        processBase64Images(deepblueWhiteGoldclr, deepblueWhiteGoldclrLinks);


     
        // Pink
        let pinkYellowGoldclr = [];
        let pinkRoseGoldclr = [];
        let pinkWhiteGoldclr = [];

        // Metal color
        // pinkYellow clr
        if (typeof req.body.pinkYellowGoldclr === "string") {
            pinkYellowGoldclr.push(req.body.pinkYellowGoldclr);
        } else {
            pinkYellowGoldclr = req.body.pinkYellowGoldclr;
        }

        // pinkRoseGoldclr
        if (typeof req.body.pinkRoseGoldclr === "string") {
            pinkRoseGoldclr.push(req.body.pinkRoseGoldclr);
        } else {
            pinkRoseGoldclr = req.body.pinkRoseGoldclr;
        }

        // pinkWhiteGoldclr
        if (typeof req.body.pinkWhiteGoldclr === "string") {
            pinkWhiteGoldclr.push(req.body.pinkWhiteGoldclr);
        } else {
            pinkWhiteGoldclr = req.body.pinkWhiteGoldclr;
        }

        const pinkYellowGoldclrLinks = [];
        const pinkRoseGoldclrLinks = [];
        const pinkWhiteGoldclrLinks = [];

        // yellow gold clr

        processBase64Images(pinkYellowGoldclr, pinkYellowGoldclrLinks);

      

        // RoseGoldclr clr
        processBase64Images(pinkRoseGoldclr, pinkRoseGoldclrLinks);

       

        // WhiteGoldclr clr
        processBase64Images(pinkWhiteGoldclr, pinkWhiteGoldclrLinks);

      

        // Turquoise
        let turquoiseYellowGoldclr = [];
        let turquoiseRoseGoldclr = [];
        let turquoiseWhiteGoldclr = [];

        // Metal color
        // turquoiseYellow clr
        if (typeof req.body.turquoiseYellowGoldclr === "string") {
            turquoiseYellowGoldclr.push(req.body.turquoiseYellowGoldclr);
        } else {
            turquoiseYellowGoldclr = req.body.turquoiseYellowGoldclr;
        }

        // turquoiseRoseGoldclr
        if (typeof req.body.turquoiseRoseGoldclr === "string") {
            turquoiseRoseGoldclr.push(req.body.turquoiseRoseGoldclr);
        } else {
            turquoiseRoseGoldclr = req.body.turquoiseRoseGoldclr;
        }

        // turquoiseWhiteGoldclr
        if (typeof req.body.turquoiseWhiteGoldclr === "string") {
            turquoiseWhiteGoldclr.push(req.body.turquoiseWhiteGoldclr);
        } else {
            turquoiseWhiteGoldclr = req.body.turquoiseWhiteGoldclr;
        }

        const turquoiseYellowGoldclrLinks = [];
        const turquoiseRoseGoldclrLinks = [];
        const turquoiseWhiteGoldclrLinks = [];

        // yellow gold clr
        processBase64Images(turquoiseYellowGoldclr, turquoiseYellowGoldclrLinks);

        // RoseGoldclr clr
        processBase64Images(turquoiseRoseGoldclr, turquoiseRoseGoldclrLinks);

        // WhiteGoldclr clr
        processBase64Images(turquoiseWhiteGoldclr, turquoiseWhiteGoldclrLinks);

        // Red
        let redYellowGoldclr = [];
        let redRoseGoldclr = [];
        let redWhiteGoldclr = [];

        // Metal color
        // redYellow clr
        if (typeof req.body.redYellowGoldclr === "string") {
            redYellowGoldclr.push(req.body.redYellowGoldclr);
        } else {
            redYellowGoldclr = req.body.redYellowGoldclr;
        }

        // redRoseGoldclr
        if (typeof req.body.redRoseGoldclr === "string") {
            redRoseGoldclr.push(req.body.redRoseGoldclr);
        } else {
            redRoseGoldclr = req.body.redRoseGoldclr;
        }

        // redWhiteGoldclr
        if (typeof req.body.redWhiteGoldclr === "string") {
            redWhiteGoldclr.push(req.body.redWhiteGoldclr);
        } else {
            redWhiteGoldclr = req.body.redWhiteGoldclr;
        }

        const redYellowGoldclrLinks = [];
        const redRoseGoldclrLinks = [];
        const redWhiteGoldclrLinks = [];

        // yellow gold clr
        processBase64Images(redYellowGoldclr, redYellowGoldclrLinks);


        // RoseGoldclr clr
        processBase64Images(redRoseGoldclr, redRoseGoldclrLinks);

  

        // WhiteGoldclr clr
        processBase64Images(redWhiteGoldclr, redWhiteGoldclrLinks);

 

        // Black
        let blackYellowGoldclr = [];
        let blackRoseGoldclr = [];
        let blackWhiteGoldclr = [];

        // Metal color
        // blackYellow clr
        if (typeof req.body.blackYellowGoldclr === "string") {
            blackYellowGoldclr.push(req.body.blackYellowGoldclr);
        } else {
            blackYellowGoldclr = req.body.blackYellowGoldclr;
        }

        // blackRoseGoldclr
        if (typeof req.body.blackRoseGoldclr === "string") {
            blackRoseGoldclr.push(req.body.blackRoseGoldclr);
        } else {
            blackRoseGoldclr = req.body.blackRoseGoldclr;
        }

        // blackWhiteGoldclr
        if (typeof req.body.blackWhiteGoldclr === "string") {
            blackWhiteGoldclr.push(req.body.blackWhiteGoldclr);
        } else {
            blackWhiteGoldclr = req.body.blackWhiteGoldclr;
        }

        const blackYellowGoldclrLinks = [];
        const blackRoseGoldclrLinks = [];
        const blackWhiteGoldclrLinks = [];

        // yellow gold clr

        processBase64Images(blackYellowGoldclr, blackYellowGoldclrLinks);

     

        // RoseGoldclr clr
        processBase64Images(blackRoseGoldclr, blackRoseGoldclrLinks);


        // WhiteGoldclr clr
        processBase64Images(blackWhiteGoldclr, blackWhiteGoldclrLinks);

 
        // stocks for metal color


        // Deep Green
        let deepgreenYellowGoldclr = [];
        let deepgreenRoseGoldclr = [];
        let deepgreenWhiteGoldclr = [];

        // Metal color
        // deepgreenYellow clr
        if (typeof req.body.deepgreenYellowGoldclr === "string") {
            deepgreenYellowGoldclr.push(req.body.deepgreenYellowGoldclr);
        } else {
            deepgreenYellowGoldclr = req.body.deepgreenYellowGoldclr;
        }

        // deepgreenRoseGoldclr
        if (typeof req.body.deepgreenRoseGoldclr === "string") {
            deepgreenRoseGoldclr.push(req.body.deepgreenRoseGoldclr);
        } else {
            deepgreenRoseGoldclr = req.body.deepgreenRoseGoldclr;
        }

        // deepgreenWhiteGoldclr
        if (typeof req.body.deepgreenWhiteGoldclr === "string") {
            deepgreenWhiteGoldclr.push(req.body.deepgreenWhiteGoldclr);
        } else {
            deepgreenWhiteGoldclr = req.body.deepgreenWhiteGoldclr;
        }

        const deepgreenYellowGoldclrLinks = [];
        const deepgreenRoseGoldclrLinks = [];
        const deepgreenWhiteGoldclrLinks = [];

        // yellow gold clr
        processBase64Images(deepgreenYellowGoldclr, deepgreenYellowGoldclrLinks);

      

        // RoseGoldclr clr
        processBase64Images(deepgreenRoseGoldclr, deepgreenRoseGoldclrLinks);

    

        // WhiteGoldclr clr
        processBase64Images(deepgreenWhiteGoldclr, deepgreenWhiteGoldclrLinks);

     
        // Lotus green
        let lotusgreenYellowGoldclr = [];
        let lotusgreenRoseGoldclr = [];
        let lotusgreenWhiteGoldclr = [];

        // Metal color
        // lotusgreenYellow clr
        if (typeof req.body.lotusgreenYellowGoldclr === "string") {
            lotusgreenYellowGoldclr.push(req.body.lotusgreenYellowGoldclr);
        } else {
            lotusgreenYellowGoldclr = req.body.lotusgreenYellowGoldclr;
        }

        // lotusgreenRoseGoldclr
        if (typeof req.body.lotusgreenRoseGoldclr === "string") {
            lotusgreenRoseGoldclr.push(req.body.lotusgreenRoseGoldclr);
        } else {
            lotusgreenRoseGoldclr = req.body.lotusgreenRoseGoldclr;
        }

        // lotusgreenWhiteGoldclr
        if (typeof req.body.lotusgreenWhiteGoldclr === "string") {
            lotusgreenWhiteGoldclr.push(req.body.lotusgreenWhiteGoldclr);
        } else {
            lotusgreenWhiteGoldclr = req.body.lotusgreenWhiteGoldclr;
        }

        const lotusgreenYellowGoldclrLinks = [];
        const lotusgreenRoseGoldclrLinks = [];
        const lotusgreenWhiteGoldclrLinks = [];

        // yellow gold clr

        processBase64Images(lotusgreenYellowGoldclr, lotusgreenYellowGoldclrLinks);

     
        // RoseGoldclr clr
        processBase64Images(lotusgreenRoseGoldclr, lotusgreenRoseGoldclrLinks);

    
        // WhiteGoldclr clr
        processBase64Images(lotusgreenWhiteGoldclr, lotusgreenWhiteGoldclrLinks);


          // Handle combinations and combinationmetalImages
          const combinationImagesData = req.body.combinationmetalImages;
          const combinationMetalImages = {};
  
          // Iterate through each combination
          for (const combination of Object.keys(combinationImagesData)) {
              combinationMetalImages[combination] = {};
  
              // Iterate through each metal type for the combination
              for (const metalType of ["yellowGold", "roseGold", "whiteGold"]) {
                  const metalImages = combinationImagesData[combination][metalType] || [];
                  const metalImageLinks = [];
  
                  processBase64Images(metalImages, metalImageLinks);
                  combinationMetalImages[combination][metalType] = metalImageLinks;
              }
          }
  
          
  



        const {
            YellowGoldclrStock,
            RoseGoldclrStock,
            WhiteGoldclrStock,
            // other fields...
        } = req.body;

        const {
            deepblueYellowGoldclrStock,
            deepblueRoseGoldclrStock,
            deepblueWhiteGoldclrStock,

            pinkYellowGoldclrStock,
            pinkRoseGoldclrStock,
            pinkWhiteGoldclrStock,

            turquoiseYellowGoldclrStock,
            turquoiseRoseGoldclrStock,
            turquoiseWhiteGoldclrStock,

            redYellowGoldclrStock,
            redRoseGoldclrStock,
            redWhiteGoldclrStock,

            blackYellowGoldclrStock,
            blackRoseGoldclrStock,
            blackWhiteGoldclrStock,


            deepgreenYellowGoldclrStock,
            deepgreenRoseGoldclrStock,
            deepgreenWhiteGoldclrStock,

            lotusgreenYellowGoldclrStock,
            lotusgreenRoseGoldclrStock,
            lotusgreenWhiteGoldclrStock,

            // other fields...
        } = req.body;

        const {
            combinationStocks
        } = req.body


        const {gender,ageGroup} = req.body;


        const productData = req.body;
        productData.images = imagesLinks;
        productData.withchainimages = withchainimagesLinks;
        productData.withchainoutimages = withchainoutimagesLinks;
        productData.shop = shop;
        productData.Metalcolorstock = {
            YellowGoldclrStock,
            RoseGoldclrStock,
            WhiteGoldclrStock
        }
        productData.combinations = Object.keys(combinationMetalImages);
        productData.combinationmetalImages = combinationMetalImages;
        productData.combinationStocks=combinationStocks

        

        productData.Enamelcolorstock = {
            deepblue: {
                deepblueYellowGoldclrStock,
                deepblueRoseGoldclrStock,
                deepblueWhiteGoldclrStock,
            },
            pink: {
                pinkYellowGoldclrStock,
                pinkRoseGoldclrStock,
                pinkWhiteGoldclrStock
            },
            turquoise: {
                turquoiseYellowGoldclrStock,
                turquoiseRoseGoldclrStock,
                turquoiseWhiteGoldclrStock,

            },
            red: {
                redYellowGoldclrStock,
                redRoseGoldclrStock,
                redWhiteGoldclrStock,
            },
            black: {
                blackYellowGoldclrStock,
                blackRoseGoldclrStock,
                blackWhiteGoldclrStock,
            },
            deepgreen: {
                deepgreenYellowGoldclrStock,
                deepgreenRoseGoldclrStock,
                deepgreenWhiteGoldclrStock,

            },
            lotusgreen: {
                lotusgreenYellowGoldclrStock,
                lotusgreenRoseGoldclrStock,
                lotusgreenWhiteGoldclrStock,

            }






        }



        productData.MetalColor = {
            YellowGoldclr: YellowGoldclrLinks,
            RoseGoldclr: RoseGoldclrLinks,
            WhiteGoldclr: WhiteGoldclrLinks,
        }
        productData.enamelColors = {
            Deep_Blue: {
                deepblueYellowGoldclr: deepblueYellowGoldclrLinks,
                deepblueRoseGoldclr: deepblueRoseGoldclrLinks,
                deepblueWhiteGoldclr: deepblueWhiteGoldclrLinks,
            },
            Deep_Green: {
                deepgreenYellowGoldclr: deepgreenYellowGoldclrLinks,
                deepgreenRoseGoldclr: deepgreenRoseGoldclrLinks,
                deepgreenWhiteGoldclr: deepgreenWhiteGoldclrLinks,
            },
            Lotus_Green: {
                lotusgreenYellowGoldclr: lotusgreenYellowGoldclrLinks,
                lotusgreenRoseGoldclr: lotusgreenRoseGoldclrLinks,
                lotusgreenWhiteGoldclr: lotusgreenWhiteGoldclrLinks,
            },
            Pink: {
                pinkYellowGoldclr: pinkYellowGoldclrLinks,
                pinkRoseGoldclr: pinkRoseGoldclrLinks,
                pinkWhiteGoldclr: pinkWhiteGoldclrLinks,
            },
            Turquoise: {
                turquoiseYellowGoldclr: turquoiseYellowGoldclrLinks,
                turquoiseRoseGoldclr: turquoiseRoseGoldclrLinks,
                turquoiseWhiteGoldclr: turquoiseWhiteGoldclrLinks,
            },
            Red: {
                redYellowGoldclr: redYellowGoldclrLinks,
                redRoseGoldclr: redRoseGoldclrLinks,
                redWhiteGoldclr: redWhiteGoldclrLinks,
            },
            Black: {
                blackYellowGoldclr: blackYellowGoldclrLinks,
                blackRoseGoldclr: blackRoseGoldclrLinks,
                blackWhiteGoldclr: blackWhiteGoldclrLinks,
            },
          
        
            

        };


        productData.gender = gender;
        productData.ageGroup = ageGroup;




        const product = await Product.create(productData);

        res.status(201).json({
            success: true,
            product,
            enamelColors: product.enamelColors
        });
    } catch (error) {
        return next(new ErrorHandler(error.message || "Internal Server Error", 400));
    }
}));



// router.post("/create-product", catchAsyncErrors(async (req, res, next) => {
//     try {
//         const shopId = req.body.shopId;
//         const shop = await Shop.findById(shopId);

//         if (!shop) {
//             return next(new ErrorHandler("Shop ID is invalid", 400));
//         }

//         let images = [];
//         let withchainimages = [];
//         let withchainoutimages = [];

//         // metal color 
//         let YellowGoldclr = [];
//         let RoseGoldclr = [];
//         let WhiteGoldclr = [];



//         // images 
//         if (typeof req.body.images === "string") {
//             images.push(req.body.images);
//         } else {
//             images = req.body.images;
//         }
//         //withchain

//         if (typeof req.body.withchainimages === "string") {
//             withchainimages.push(req.body.withchainimages);
//         } else {
//             withchainimages = req.body.withchainimages;
//         }
//         //without chain
//         if (typeof req.body.withchainoutimages === "string") {
//             withchainoutimages.push(req.body.withchainoutimages);
//         } else {
//             withchainoutimages = req.body.withchainoutimages;
//         }


//         // Metal color
//         //yellow clr
//         if (typeof req.body.YellowGoldclr === "string") {
//             YellowGoldclr.push(req.body.YellowGoldclr);
//         } else {
//             YellowGoldclr = req.body.YellowGoldclr;
//         }

//         //RoseGoldclr 
//         if (typeof req.body.RoseGoldclr === "string") {
//             RoseGoldclr.push(req.body.RoseGoldclr);
//         } else {
//             RoseGoldclr = req.body.RoseGoldclr;
//         }

//         //WhiteGoldclr 
//         if (typeof req.body.WhiteGoldclr === "string") {
//             WhiteGoldclr.push(req.body.WhiteGoldclr);
//         } else {
//             WhiteGoldclr = req.body.WhiteGoldclr;
//         }







//         const imagesLinks = [];
//         const withchainimagesLinks = [];
//         const withchainoutimagesLinks = [];

//         //meatl color links
//         const YellowGoldclrLinks = [];
//         const RoseGoldclrLinks = [];
//         const WhiteGoldclrLinks = [];




//         for (let i = 0; i < images.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(images[i], {
//                 folder: "products",
//             });

//             imagesLinks.push({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             });
//         }

//         //with chain
//         for (let i = 0; i < withchainimages.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(withchainimages[i], {
//                 folder: "products",
//             });

//             withchainimagesLinks.push({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             });
//         }
//         //wihtout chian
//         for (let i = 0; i < withchainoutimages.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(withchainoutimages[i], {
//                 folder: "products",
//             });

//             withchainoutimagesLinks.push({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             });
//         }


//         // yellow gold clr

//         for (let i = 0; i < YellowGoldclr.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(YellowGoldclr[i], {
//                 folder: "products",
//             });

//             YellowGoldclrLinks.push({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             });
//         }

//         // RoseGoldclr clr

//         for (let i = 0; i < RoseGoldclr.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(RoseGoldclr[i], {
//                 folder: "products",
//             });

//             RoseGoldclrLinks.push({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             });
//         }

//         // WhiteGoldclr clr

//         for (let i = 0; i < WhiteGoldclr.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(WhiteGoldclr[i], {
//                 folder: "products",
//             });

//             WhiteGoldclrLinks.push({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             });
//         }




//         // Enamel colors

//         //deep blue
//         let deepblueYellowGoldclr = [];
//         let deepblueRoseGoldclr = [];
//         let deepblueWhiteGoldclr = [];

//         // Metal color
//         //deepblueyellow clr
//         if (typeof req.body.deepblueYellowGoldclr === "string") {
//             deepblueYellowGoldclr.push(req.body.deepblueYellowGoldclr);
//         } else {
//             deepblueYellowGoldclr = req.body.deepblueYellowGoldclr;
//         }

//         //deepblueRoseGoldclr 
//         if (typeof req.body.deepblueRoseGoldclr === "string") {
//             deepblueRoseGoldclr.push(req.body.deepblueRoseGoldclr);
//         } else {
//             deepblueRoseGoldclr = req.body.deepblueRoseGoldclr;
//         }

//         //WhiteGoldclr 
//         if (typeof req.body.deepblueWhiteGoldclr === "string") {
//             deepblueWhiteGoldclr.push(req.body.deepblueWhiteGoldclr);
//         } else {
//             deepblueWhiteGoldclr = req.body.deepblueWhiteGoldclr;
//         }


//         const deepblueYellowGoldclrLinks = [];
//         const deepblueRoseGoldclrLinks = [];
//         const deepblueWhiteGoldclrLinks = [];

//         // yellow gold clr

//         for (let i = 0; i < deepblueYellowGoldclr.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(deepblueYellowGoldclr[i], {
//                 folder: "products",
//             });

//             deepblueYellowGoldclrLinks.push({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             });
//         }

//         // RoseGoldclr clr

//         for (let i = 0; i < deepblueRoseGoldclr.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(deepblueRoseGoldclr[i], {
//                 folder: "products",
//             });

//             deepblueRoseGoldclrLinks.push({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             });
//         }

//         // WhiteGoldclr clr

//         for (let i = 0; i < deepblueWhiteGoldclr.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(deepblueWhiteGoldclr[i], {
//                 folder: "products",
//             });

//             deepblueWhiteGoldclrLinks.push({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             });
//         }


//         // Pink
//         let pinkYellowGoldclr = [];
//         let pinkRoseGoldclr = [];
//         let pinkWhiteGoldclr = [];

//         // Metal color
//         // pinkYellow clr
//         if (typeof req.body.pinkYellowGoldclr === "string") {
//             pinkYellowGoldclr.push(req.body.pinkYellowGoldclr);
//         } else {
//             pinkYellowGoldclr = req.body.pinkYellowGoldclr;
//         }

//         // pinkRoseGoldclr
//         if (typeof req.body.pinkRoseGoldclr === "string") {
//             pinkRoseGoldclr.push(req.body.pinkRoseGoldclr);
//         } else {
//             pinkRoseGoldclr = req.body.pinkRoseGoldclr;
//         }

//         // pinkWhiteGoldclr
//         if (typeof req.body.pinkWhiteGoldclr === "string") {
//             pinkWhiteGoldclr.push(req.body.pinkWhiteGoldclr);
//         } else {
//             pinkWhiteGoldclr = req.body.pinkWhiteGoldclr;
//         }

//         const pinkYellowGoldclrLinks = [];
//         const pinkRoseGoldclrLinks = [];
//         const pinkWhiteGoldclrLinks = [];

//         // yellow gold clr
//         for (let i = 0; i < pinkYellowGoldclr.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(pinkYellowGoldclr[i], {
//                 folder: "products",
//             });

//             pinkYellowGoldclrLinks.push({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             });
//         }

//         // RoseGoldclr clr
//         for (let i = 0; i < pinkRoseGoldclr.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(pinkRoseGoldclr[i], {
//                 folder: "products",
//             });

//             pinkRoseGoldclrLinks.push({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             });
//         }

//         // WhiteGoldclr clr
//         for (let i = 0; i < pinkWhiteGoldclr.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(pinkWhiteGoldclr[i], {
//                 folder: "products",
//             });

//             pinkWhiteGoldclrLinks.push({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             });
//         }


//         // Turquoise
//         let turquoiseYellowGoldclr = [];
//         let turquoiseRoseGoldclr = [];
//         let turquoiseWhiteGoldclr = [];

//         // Metal color
//         // turquoiseYellow clr
//         if (typeof req.body.turquoiseYellowGoldclr === "string") {
//             turquoiseYellowGoldclr.push(req.body.turquoiseYellowGoldclr);
//         } else {
//             turquoiseYellowGoldclr = req.body.turquoiseYellowGoldclr;
//         }

//         // turquoiseRoseGoldclr
//         if (typeof req.body.turquoiseRoseGoldclr === "string") {
//             turquoiseRoseGoldclr.push(req.body.turquoiseRoseGoldclr);
//         } else {
//             turquoiseRoseGoldclr = req.body.turquoiseRoseGoldclr;
//         }

//         // turquoiseWhiteGoldclr
//         if (typeof req.body.turquoiseWhiteGoldclr === "string") {
//             turquoiseWhiteGoldclr.push(req.body.turquoiseWhiteGoldclr);
//         } else {
//             turquoiseWhiteGoldclr = req.body.turquoiseWhiteGoldclr;
//         }

//         const turquoiseYellowGoldclrLinks = [];
//         const turquoiseRoseGoldclrLinks = [];
//         const turquoiseWhiteGoldclrLinks = [];

//         // yellow gold clr
//         for (let i = 0; i < turquoiseYellowGoldclr.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(turquoiseYellowGoldclr[i], {
//                 folder: "products",
//             });

//             turquoiseYellowGoldclrLinks.push({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             });
//         }

//         // RoseGoldclr clr
//         for (let i = 0; i < turquoiseRoseGoldclr.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(turquoiseRoseGoldclr[i], {
//                 folder: "products",
//             });

//             turquoiseRoseGoldclrLinks.push({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             });
//         }

//         // WhiteGoldclr clr
//         for (let i = 0; i < turquoiseWhiteGoldclr.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(turquoiseWhiteGoldclr[i], {
//                 folder: "products",
//             });

//             turquoiseWhiteGoldclrLinks.push({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             });
//         }


//         // Red
//         let redYellowGoldclr = [];
//         let redRoseGoldclr = [];
//         let redWhiteGoldclr = [];

//         // Metal color
//         // redYellow clr
//         if (typeof req.body.redYellowGoldclr === "string") {
//             redYellowGoldclr.push(req.body.redYellowGoldclr);
//         } else {
//             redYellowGoldclr = req.body.redYellowGoldclr;
//         }

//         // redRoseGoldclr
//         if (typeof req.body.redRoseGoldclr === "string") {
//             redRoseGoldclr.push(req.body.redRoseGoldclr);
//         } else {
//             redRoseGoldclr = req.body.redRoseGoldclr;
//         }

//         // redWhiteGoldclr
//         if (typeof req.body.redWhiteGoldclr === "string") {
//             redWhiteGoldclr.push(req.body.redWhiteGoldclr);
//         } else {
//             redWhiteGoldclr = req.body.redWhiteGoldclr;
//         }

//         const redYellowGoldclrLinks = [];
//         const redRoseGoldclrLinks = [];
//         const redWhiteGoldclrLinks = [];

//         // yellow gold clr
//         for (let i = 0; i < redYellowGoldclr.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(redYellowGoldclr[i], {
//                 folder: "products",
//             });

//             redYellowGoldclrLinks.push({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             });
//         }

//         // RoseGoldclr clr
//         for (let i = 0; i < redRoseGoldclr.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(redRoseGoldclr[i], {
//                 folder: "products",
//             });

//             redRoseGoldclrLinks.push({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             });
//         }

//         // WhiteGoldclr clr
//         for (let i = 0; i < redWhiteGoldclr.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(redWhiteGoldclr[i], {
//                 folder: "products",
//             });

//             redWhiteGoldclrLinks.push({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             });
//         }


//         // Black
//         let blackYellowGoldclr = [];
//         let blackRoseGoldclr = [];
//         let blackWhiteGoldclr = [];

//         // Metal color
//         // blackYellow clr
//         if (typeof req.body.blackYellowGoldclr === "string") {
//             blackYellowGoldclr.push(req.body.blackYellowGoldclr);
//         } else {
//             blackYellowGoldclr = req.body.blackYellowGoldclr;
//         }

//         // blackRoseGoldclr
//         if (typeof req.body.blackRoseGoldclr === "string") {
//             blackRoseGoldclr.push(req.body.blackRoseGoldclr);
//         } else {
//             blackRoseGoldclr = req.body.blackRoseGoldclr;
//         }

//         // blackWhiteGoldclr
//         if (typeof req.body.blackWhiteGoldclr === "string") {
//             blackWhiteGoldclr.push(req.body.blackWhiteGoldclr);
//         } else {
//             blackWhiteGoldclr = req.body.blackWhiteGoldclr;
//         }

//         const blackYellowGoldclrLinks = [];
//         const blackRoseGoldclrLinks = [];
//         const blackWhiteGoldclrLinks = [];

//         // yellow gold clr
//         for (let i = 0; i < blackYellowGoldclr.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(blackYellowGoldclr[i], {
//                 folder: "products",
//             });

//             blackYellowGoldclrLinks.push({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             });
//         }

//         // RoseGoldclr clr
//         for (let i = 0; i < blackRoseGoldclr.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(blackRoseGoldclr[i], {
//                 folder: "products",
//             });

//             blackRoseGoldclrLinks.push({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             });
//         }

//         // WhiteGoldclr clr
//         for (let i = 0; i < blackWhiteGoldclr.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(blackWhiteGoldclr[i], {
//                 folder: "products",
//             });

//             blackWhiteGoldclrLinks.push({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             });
//         }

//         // stocks for metal color


//         // Deep Green
//         let deepgreenYellowGoldclr = [];
//         let deepgreenRoseGoldclr = [];
//         let deepgreenWhiteGoldclr = [];

//         // Metal color
//         // deepgreenYellow clr
//         if (typeof req.body.deepgreenYellowGoldclr === "string") {
//             deepgreenYellowGoldclr.push(req.body.deepgreenYellowGoldclr);
//         } else {
//             deepgreenYellowGoldclr = req.body.deepgreenYellowGoldclr;
//         }

//         // deepgreenRoseGoldclr
//         if (typeof req.body.deepgreenRoseGoldclr === "string") {
//             deepgreenRoseGoldclr.push(req.body.deepgreenRoseGoldclr);
//         } else {
//             deepgreenRoseGoldclr = req.body.deepgreenRoseGoldclr;
//         }

//         // deepgreenWhiteGoldclr
//         if (typeof req.body.deepgreenWhiteGoldclr === "string") {
//             deepgreenWhiteGoldclr.push(req.body.deepgreenWhiteGoldclr);
//         } else {
//             deepgreenWhiteGoldclr = req.body.deepgreenWhiteGoldclr;
//         }

//         const deepgreenYellowGoldclrLinks = [];
//         const deepgreenRoseGoldclrLinks = [];
//         const deepgreenWhiteGoldclrLinks = [];

//         // yellow gold clr
//         for (let i = 0; i < deepgreenYellowGoldclr.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(deepgreenYellowGoldclr[i], {
//                 folder: "products",
//             });

//             deepgreenYellowGoldclrLinks.push({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             });
//         }

//         // RoseGoldclr clr
//         for (let i = 0; i < deepgreenRoseGoldclr.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(deepgreenRoseGoldclr[i], {
//                 folder: "products",
//             });

//             deepgreenRoseGoldclrLinks.push({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             });
//         }

//         // WhiteGoldclr clr
//         for (let i = 0; i < deepgreenWhiteGoldclr.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(deepgreenWhiteGoldclr[i], {
//                 folder: "products",
//             });

//             deepgreenWhiteGoldclrLinks.push({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             });
//         }


//         // Lotus green
//         let lotusgreenYellowGoldclr = [];
//         let lotusgreenRoseGoldclr = [];
//         let lotusgreenWhiteGoldclr = [];

//         // Metal color
//         // lotusgreenYellow clr
//         if (typeof req.body.lotusgreenYellowGoldclr === "string") {
//             lotusgreenYellowGoldclr.push(req.body.lotusgreenYellowGoldclr);
//         } else {
//             lotusgreenYellowGoldclr = req.body.lotusgreenYellowGoldclr;
//         }

//         // lotusgreenRoseGoldclr
//         if (typeof req.body.lotusgreenRoseGoldclr === "string") {
//             lotusgreenRoseGoldclr.push(req.body.lotusgreenRoseGoldclr);
//         } else {
//             lotusgreenRoseGoldclr = req.body.lotusgreenRoseGoldclr;
//         }

//         // lotusgreenWhiteGoldclr
//         if (typeof req.body.lotusgreenWhiteGoldclr === "string") {
//             lotusgreenWhiteGoldclr.push(req.body.lotusgreenWhiteGoldclr);
//         } else {
//             lotusgreenWhiteGoldclr = req.body.lotusgreenWhiteGoldclr;
//         }

//         const lotusgreenYellowGoldclrLinks = [];
//         const lotusgreenRoseGoldclrLinks = [];
//         const lotusgreenWhiteGoldclrLinks = [];

//         // yellow gold clr
//         for (let i = 0; i < lotusgreenYellowGoldclr.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(lotusgreenYellowGoldclr[i], {
//                 folder: "products",
//             });

//             lotusgreenYellowGoldclrLinks.push({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             });
//         }

//         // RoseGoldclr clr
//         for (let i = 0; i < lotusgreenRoseGoldclr.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(lotusgreenRoseGoldclr[i], {
//                 folder: "products",
//             });

//             lotusgreenRoseGoldclrLinks.push({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             });
//         }

//         // WhiteGoldclr clr
//         for (let i = 0; i < lotusgreenWhiteGoldclr.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(lotusgreenWhiteGoldclr[i], {
//                 folder: "products",
//             });

//             lotusgreenWhiteGoldclrLinks.push({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             });
//         }


//         const {
//             YellowGoldclrStock,
//             RoseGoldclrStock,
//             WhiteGoldclrStock,
//             // other fields...
//         } = req.body;

//         const {
//             deepblueYellowGoldclrStock,
//             deepblueRoseGoldclrStock,
//             deepblueWhiteGoldclrStock,

//             pinkYellowGoldclrStock,
//             pinkRoseGoldclrStock,
//             pinkWhiteGoldclrStock,

//             turquoiseYellowGoldclrStock,
//             turquoiseRoseGoldclrStock,
//             turquoiseWhiteGoldclrStock,

//             redYellowGoldclrStock,
//             redRoseGoldclrStock,
//             redWhiteGoldclrStock,

//             blackYellowGoldclrStock,
//             blackRoseGoldclrStock,
//             blackWhiteGoldclrStock,


//             deepgreenYellowGoldclrStock,
//             deepgreenRoseGoldclrStock,
//             deepgreenWhiteGoldclrStock,

//             lotusgreenYellowGoldclrStock,
//             lotusgreenRoseGoldclrStock,
//             lotusgreenWhiteGoldclrStock,

//             // other fields...
//         } = req.body;


//         const {gender,ageGroup} = req.body;


//         const productData = req.body;
//         productData.images = imagesLinks;
//         productData.withchainimages = withchainimagesLinks;
//         productData.withchainoutimages = withchainoutimagesLinks;
//         productData.shop = shop;
//         productData.Metalcolorstock = {
//             YellowGoldclrStock,
//             RoseGoldclrStock,
//             WhiteGoldclrStock
//         }

//         productData.Enamelcolorstock = {
//             deepblue: {
//                 deepblueYellowGoldclrStock,
//                 deepblueRoseGoldclrStock,
//                 deepblueWhiteGoldclrStock,
//             },
//             pink: {
//                 pinkYellowGoldclrStock,
//                 pinkRoseGoldclrStock,
//                 pinkWhiteGoldclrStock
//             },
//             turquoise: {
//                 turquoiseYellowGoldclrStock,
//                 turquoiseRoseGoldclrStock,
//                 turquoiseWhiteGoldclrStock,

//             },
//             red: {
//                 redYellowGoldclrStock,
//                 redRoseGoldclrStock,
//                 redWhiteGoldclrStock,
//             },
//             black: {
//                 blackYellowGoldclrStock,
//                 blackRoseGoldclrStock,
//                 blackWhiteGoldclrStock,
//             },
//             deepgreen: {
//                 deepgreenYellowGoldclrStock,
//                 deepgreenRoseGoldclrStock,
//                 deepgreenWhiteGoldclrStock,

//             },
//             lotusgreen: {
//                 lotusgreenYellowGoldclrStock,
//                 lotusgreenRoseGoldclrStock,
//                 lotusgreenWhiteGoldclrStock,

//             }






//         }



//         productData.MetalColor = {
//             YellowGoldclr: YellowGoldclrLinks,
//             RoseGoldclr: RoseGoldclrLinks,
//             WhiteGoldclr: WhiteGoldclrLinks,
//         }
//         productData.enamelColors = {
//             Deep_Blue: {
//                 deepblueYellowGoldclr: deepblueYellowGoldclrLinks,
//                 deepblueRoseGoldclr: deepblueRoseGoldclrLinks,
//                 deepblueWhiteGoldclr: deepblueWhiteGoldclrLinks,
//             },
//             Deep_Green: {
//                 deepgreenYellowGoldclr: deepgreenYellowGoldclrLinks,
//                 deepgreenRoseGoldclr: deepgreenRoseGoldclrLinks,
//                 deepgreenWhiteGoldclr: deepgreenWhiteGoldclrLinks,
//             },
//             Lotus_Green: {
//                 lotusgreenYellowGoldclr: lotusgreenYellowGoldclrLinks,
//                 lotusgreenRoseGoldclr: lotusgreenRoseGoldclrLinks,
//                 lotusgreenWhiteGoldclr: lotusgreenWhiteGoldclrLinks,
//             },
//             Pink: {
//                 pinkYellowGoldclr: pinkYellowGoldclrLinks,
//                 pinkRoseGoldclr: pinkRoseGoldclrLinks,
//                 pinkWhiteGoldclr: pinkWhiteGoldclrLinks,
//             },
//             Turquoise: {
//                 turquoiseYellowGoldclr: turquoiseYellowGoldclrLinks,
//                 turquoiseRoseGoldclr: turquoiseRoseGoldclrLinks,
//                 turquoiseWhiteGoldclr: turquoiseWhiteGoldclrLinks,
//             },
//             Red: {
//                 redYellowGoldclr: redYellowGoldclrLinks,
//                 redRoseGoldclr: redRoseGoldclrLinks,
//                 redWhiteGoldclr: redWhiteGoldclrLinks,
//             },
//             Black: {
//                 blackYellowGoldclr: blackYellowGoldclrLinks,
//                 blackRoseGoldclr: blackRoseGoldclrLinks,
//                 blackWhiteGoldclr: blackWhiteGoldclrLinks,
//             },
//         };

//         productData.gender = gender;
//         productData.ageGroup = ageGroup;




//         const product = await Product.create(productData);

//         res.status(201).json({
//             success: true,
//             product,
//             enamelColors: product.enamelColors
//         });
//     } catch (error) {
//         return next(new ErrorHandler(error.message || "Internal Server Error", 400));
//     }
// }));



// router.post("/create-product", upload.fields([
//     { name: 'images' },
//     { name: 'withchainimages' },
//     { name: 'withchainoutimages' },
//     { name: 'YellowGoldclr' },
//     { name: 'RoseGoldclr' },
//     { name: 'WhiteGoldclr' },
//     { name: 'enamelColors[0].enamelColorImages' },
//     { name: 'enamelColors[0].enamelColorName' },
//     { name: 'enamelColors[1].enamelColorImages' },
//     { name: 'enamelColors[1].enamelColorName' },
//     { name: 'enamelColors[2].enamelColorImages' },
//     { name: 'enamelColors[2].enamelColorName' },
//     {name:'enamelColorImages'}




// ]), catchAsyncErrors(async (req, res, next) => {
//     try {
//         const shopId = req.body.shopId;
//         const shop = await Shop.findById(shopId);

//         if (!shop) {
//             return next(new ErrorHandler("Shop ID is invalid", 400));
//         }

//         const files = req.files;
//         const imageUrls = files.images.map((file) => file.filename);

//         const withChainFiles = files.withchainimages ? files.withchainimages.map((file) => file.filename) : [];
//         const withChainoutFiles = files.withchainoutimages ? files.withchainoutimages.map((file) => file.filename) : [];


//         const YellowGoldclrFiles = files.YellowGoldclr ? files.YellowGoldclr.map((file) => file.filename) : [];
//         const RoseGoldclrFiles = files.RoseGoldclr ? files.RoseGoldclr.map((file) => file.filename) : [];
//         const WhiteGoldclrFiles = files.WhiteGoldclr ? files.WhiteGoldclr.map((file) => file.filename) : [];

//         // Handle enamelColorImages


//         const enamelColors = [];

//         // Iterate through req.files.enamelColors
//         if (req.body.enamelColors && Array.isArray(req.body.enamelColors)) {
//             for (let i = 0; i < req.body.enamelColors.length; i++) {
//                 const enamelColorName = req.body.enamelColors[i].enamelColorName;
//                 const enamelColorImagesUrls = files[`enamelColors[${i}].enamelColorImages`]
//                     ? files[`enamelColors[${i}].enamelColorImages`].map(file => file.filename)
//                     : [];

//                 enamelColors.push({
//                     enamelColorName,
//                     enamelColorImages: enamelColorImagesUrls,
//                 });
//             }
//         }


//         // files.forEach((file, index) => {
//         //     enamelColors.push({
//         //         enamelColorImages: [file.filename], // Assuming only one image per color in this example
//         //         // Optionally include enamelColorName if you have it on the frontend
//         //     });
//         // });




//         const productData = req.body;
//         productData.images = imageUrls;
//         productData.withchainimages = withChainFiles;
//         productData.withchainoutimages = withChainoutFiles;
//         productData.shop = shop;
//         productData.MetalColor = {
//             YellowGoldclr: YellowGoldclrFiles,
//             RoseGoldclr: RoseGoldclrFiles,
//             WhiteGoldclr: WhiteGoldclrFiles,
//         }
//         productData.enamelColors = {enamelColors}


//         const product = await Product.create(productData);

//         res.status(201).json({
//             success: true,
//             product
//         });
//     } catch (error) {
//         return next(new ErrorHandler(error.message || "Internal Server Error", 400));
//     }
// }));


//get all Products of a shop

router.get("/get-all-products-shop/:id", catchAsyncErrors(async (req, res, next) => {
    try {
        const products = await Product.find({ shopId: req.params.id })

        res.status(201).json({
            success: true,
            products
        })

    } catch (error) {
        return next(new ErrorHandler(error, 400))

    }
}))


//delete product of a shop


router.delete("/delete-shop-product/:id", isSeller, catchAsyncErrors(async (req, res, next) => {
    try {
        const productId = req.params.id

        const productData = await Product.findById(productId)
        productData.images.forEach((imageUrl) => {
            const filename = imageUrl
            const filePath = `uploads/${filename}`

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err)
                }
            })
        })

        const product = await Product.findByIdAndDelete(productId)


        if (!product) {
            return next(new ErrorHandler('product Not Found with this Id !', 500))
        }

        res.status(201).json({
            success: true,
            message: "Product Deleted Successfully"
        })




    } catch (error) {
        return next(new ErrorHandler(error, 400))

    }
}))

// get all products
router.get("/get-all-products", catchAsyncErrors(async (req, res, next) => {
    const limit = parseInt(req.query.limit) || 20; // Default limit to fetch
    const offset = parseInt(req.query.offset) || 0; // Default offset for pagination

    console.log(`Incoming request with Limit: ${limit}, Offset: ${offset}`);

    try {
        const products = await Product.find()
            .sort({ createdAt: -1 }) // Sort by 'createdAt' field in descending order
            .limit(limit) // Limit the number of products returned
            .skip(offset); // Skip the first 'offset' number of products

        console.log(`Fetched ${products.length} products`); // Log the number of products fetched

        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        return next(new ErrorHandler(error, 400));
    }
}));



//review of a product

router.put("/create-new-review", isAuthenticated, catchAsyncErrors(async (req, res, next) => {

    try {
        const { user, rating, comment, productId, orderId } = req.body;



        const review = {
            user,
            rating,
            comment,
            productId,
        };
        // const files = req.files;
        // const reviewimages = files.reviewimages ? files.reviewimages.map((file) => file.filename) : [];
        // review.reviewimages = reviewimages

        const product = await Product.findById(productId)
        const isReviewed = product.reviews.find((rev) => rev.user._id === req.user._id)

        if (isReviewed) {
            product.reviews.forEach((rev) => {
                if (rev.user._id === req.user._id) {
                    (rev.rating = rating), (rev.comment = comment), (rev.user = user);
                }
            });
        } else {
            product.reviews.push(review);
        }

        let avg = 0;

        product.reviews.forEach((rev) => {
            avg += rev.rating;
        });

        product.ratings = avg / product.reviews.length;
        await product.save({ validateBeforeSave: false });

        await Order.findByIdAndUpdate(
            orderId,
            { $set: { "cart.$[elem].isReviewed": true } },
            { arrayFilters: [{ "elem._id": productId }], new: true }
        );


        res.status(200).json({
            success: true,
            message: "Reviwed succesfully Posted!",
        });



    } catch (error) {
        return next(new ErrorHandler(error, 400));

    }

}))


//update rate card with all prices 

router.post('/update-rate-card', async (req, res) => {
    const { goldRate, diamondRate, labourCharge, gstCharge, miscellaneous } = req.body;

    try {
        // Ensure all rate inputs are valid numbers
        const parsedGoldRate = parseFloat(goldRate);
        const parsedDiamondRate = parseFloat(diamondRate);
        const parsedLabourCharge = parseFloat(labourCharge);
        const parsedMiscellaneous = parseFloat(miscellaneous || 0);

        if (isNaN(parsedGoldRate) || isNaN(parsedDiamondRate) || isNaN(parsedLabourCharge) || isNaN(parsedMiscellaneous)) {
            throw new Error('Invalid rate card values provided.');
        }

        // Fetch all products
        const products = await Product.find();

        // Update each product's price based on the new rates
        for (const product of products) {
            const goldWeight = parseFloat(product.goldWeight.weight.replace("gm", "").trim());
            const diamondWeight = parseFloat(product.diamondWeight.weight.replace("Ct", "").trim());

            if (isNaN(goldWeight) || isNaN(diamondWeight)) {
                console.warn(`Invalid weights for product ID: ${product._id}`);
                continue; // Skip products with invalid weights
            }

            const goldCost = parsedGoldRate * goldWeight;
            const diamondCost = parsedDiamondRate * diamondWeight;
            const totalLabour = parsedLabourCharge;
            const miscCharge = parsedMiscellaneous;
            const gst = (goldCost + diamondCost + totalLabour + miscCharge) * (parseFloat(gstCharge) / 100 || 0.03); // Default 3% GST

            // Calculate new discount price
            const newDiscountPrice = goldCost + diamondCost + totalLabour + gst + miscCharge;

            // Ensure the discount price is a valid number
            if (isNaN(newDiscountPrice)) {
                console.warn(`Calculated NaN discount price for product ID: ${product._id}`);
                continue; // Skip saving this product if calculation fails
            }

            // Update the product's discount price
            product.discountPrice = newDiscountPrice.toFixed(2);
            // const hikePercentage = 11.111 / 100;
            // const newOriginalPrice = (newDiscountPrice * (1 + hikePercentage)).toFixed(2);

            // product.originalPrice = newOriginalPrice;
            await product.save();
        }

        res.json({ message: 'Rate card and product prices updated successfully!' });
    } catch (error) {
        console.error('Error updating rate card:', error);
        res.status(500).json({ error: 'Failed to update rate card.' });
    }
});



// Update product by ID
router.put("/update-product/:id", catchAsyncErrors(async (req, res, next) => {
    try {
        const productId = req.params.id;

        // Log any files attached to the request (if any)
        if (req.files) {
            console.log("Request Files:", req.files);
        }

       

        // let images = [];
        // if (typeof req.body.images === "string") {
        //     images.push(req.body.images); // Single image as a string
        // } else if (Array.isArray(req.body.images)) {
        //     images = req.body.images; // Array of images
        // }

        // const imagesLinks = []; // This will store only new uploaded images

        // for (let i = 0; i < images.length; i++) {
        //     const image = images[i];

        //     // Check if the image is an object with a URL or base64 string
        //     const isExistingImage = typeof image === "object" && image.url && image.public_id;

        //     if (isExistingImage) {
        //         // This is an existing image, so we just add it to the imagesLinks array
        //         imagesLinks.push({
        //             public_id: image.public_id,
        //             url: image.url,
        //         });
        //     } else {
        //         // This is a new image, either a base64 string or URL that needs to be uploaded
        //         const imagePath = typeof image === "object" && (image.url || image.path)
        //             ? image.url || image.path // Handle object case
        //             : typeof image === "string"
        //                 ? image // Handle plain string case
        //                 : null; // Invalid format

        //         if (!imagePath) {
        //             return next(new ErrorHandler('Invalid image format provided', 400));
        //         }

        //         // Upload to Cloudinary
        //         const result = await cloudinary.v2.uploader.upload(imagePath, {
        //             folder: "products",
        //         });

        //         imagesLinks.push({
        //             public_id: result.public_id,
        //             url: result.secure_url,
        //         });
        //     }
        // }



        //  with chain  or without chain 



        // Extract data from the request body
        // const {
        //     name,
        //     skuid,
        //     description,
        //     category,
        //     subcategory,
        //     tags,
        //     originalPrice,
        //     discountPrice,
        //     stock,
        //     designno,
        //     shopId,
        //     images,
        //     withchainimages,
        //     withchainoutimages,
        //     YellowGoldclr,
        //     RoseGoldclr,
        //     WhiteGoldclr,
        //     YellowGoldclrStock,
        //     RoseGoldclrStock,
        //     WhiteGoldclrStock,
        //     goldWeight,
        //     diamondWeight,
        //     dimension,
        //     enamelColors,
        //     deepblueYellowGoldclrStock,
        //     deepblueRoseGoldclrStock,
        //     deepblueWhiteGoldclrStock,
        //     pinkYellowGoldclrStock,
        //     pinkRoseGoldclrStock,
        //     pinkWhiteGoldclrStock,
        //     turquoiseYellowGoldclrStock,
        //     turquoiseRoseGoldclrStock,
        //     turquoiseWhiteGoldclrStock,
        //     redYellowGoldclrStock,
        //     redRoseGoldclrStock,
        //     redWhiteGoldclrStock,
        //     blackYellowGoldclrStock,
        //     blackRoseGoldclrStock,
        //     blackWhiteGoldclrStock,
        //     deepgreenYellowGoldclrStock,
        //     deepgreenRoseGoldclrStock,
        //     deepgreenWhiteGoldclrStock,
        //     lotusgreenYellowGoldclrStock,
        //     lotusgreenRoseGoldclrStock,
        //     lotusgreenWhiteGoldclrStock,
        //     gender,
        //     ageGroup
        // } = req.body;

        // // Log each extracted variable to see its value
        // console.log("Extracted Data:", {
        //     name,
        //     skuid,
        //     description,
        //     category,
        //     subcategory,
        //     tags,
        //     originalPrice,
        //     discountPrice,
        //     stock,
        //     designno,
        //     shopId,
        //     images,
        //     withchainimages,
        //     withchainoutimages,
        //     YellowGoldclr,
        //     RoseGoldclr,
        //     WhiteGoldclr,
        //     YellowGoldclrStock,
        //     RoseGoldclrStock,
        //     WhiteGoldclrStock,
        //     goldWeight,
        //     diamondWeight,
        //     dimension,
        //     enamelColors,
        //     deepblueYellowGoldclrStock,
        //     deepblueRoseGoldclrStock,
        //     deepblueWhiteGoldclrStock,
        //     pinkYellowGoldclrStock,
        //     pinkRoseGoldclrStock,
        //     pinkWhiteGoldclrStock,
        //     turquoiseYellowGoldclrStock,
        //     turquoiseRoseGoldclrStock,
        //     turquoiseWhiteGoldclrStock,
        //     redYellowGoldclrStock,
        //     redRoseGoldclrStock,
        //     redWhiteGoldclrStock,
        //     blackYellowGoldclrStock,
        //     blackRoseGoldclrStock,
        //     blackWhiteGoldclrStock,
        //     deepgreenYellowGoldclrStock,
        //     deepgreenRoseGoldclrStock,
        //     deepgreenWhiteGoldclrStock,
        //     lotusgreenYellowGoldclrStock,
        //     lotusgreenRoseGoldclrStock,
        //     lotusgreenWhiteGoldclrStock,
        //     gender,
        //     ageGroup
        // });


        // Prepare the update object
        // const updateData = {
        //     name,
        //     skuid,
        //     description,
        //     category,
        //     subcategory,
        //     tags,
        //     originalPrice,
        //     discountPrice,
        //     stock,
        //     designno,
        //     shopId,
        //     images,
        //     withchainimages,
        //     withchainoutimages,

        //     MetalColor: {
        //         YellowGoldclr: YellowGoldclr,
        //         RoseGoldclr: RoseGoldclr,
        //         WhiteGoldclr: WhiteGoldclr,
        //     },

        //     YellowGoldclrStock,
        //     RoseGoldclrStock,
        //     WhiteGoldclrStock,
        //     goldWeight,
        //     diamondWeight,
        //     dimension,
        //     enamelColors,
        //     deepblueYellowGoldclrStock,
        //     deepblueRoseGoldclrStock,
        //     deepblueWhiteGoldclrStock,
        //     pinkYellowGoldclrStock,
        //     pinkRoseGoldclrStock,
        //     pinkWhiteGoldclrStock,
        //     turquoiseYellowGoldclrStock,
        //     turquoiseRoseGoldclrStock,
        //     turquoiseWhiteGoldclrStock,
        //     redYellowGoldclrStock,
        //     redRoseGoldclrStock,
        //     redWhiteGoldclrStock,
        //     blackYellowGoldclrStock,
        //     blackRoseGoldclrStock,
        //     blackWhiteGoldclrStock,
        //     deepgreenYellowGoldclrStock,
        //     deepgreenRoseGoldclrStock,
        //     deepgreenWhiteGoldclrStock,
        //     lotusgreenYellowGoldclrStock,
        //     lotusgreenRoseGoldclrStock,
        //     lotusgreenWhiteGoldclrStock,
        //     gender,
        //     ageGroup
        // };
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
                const imageBuffer = Buffer.from(base64Data, 'base64');
                const uniqueId = generateRandomString(20);
                const localImagePath = path.join(__dirname, '../uploads/images/products', `${uniqueId}.${extension}`);
        
                fs.writeFileSync(localImagePath, imageBuffer);
                destinationArray.push({
                    public_id: `products/${uniqueId}`,
                    url: `/uploads/images/products/${uniqueId}.${extension}`
                });
            } else {
                destinationArray.push({ url: imagePath });
            }
        };
        const product = await Product.findById(productId);
        if (!product) {
            return next(new ErrorHandler('Product not found with this ID', 404));
        }
        let images = [];
        if (typeof req.body.images === "string") {
            images.push(req.body.images); // Single image as a string
        } else if (Array.isArray(req.body.images)) {
            images = req.body.images; // Array of images
        }

        const existingImages = product.images.map(img => img.url);
        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const image = images[i];

            // Extract the URL or base64 string
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
                EditprocessBase64Image(imagePath, imagesLinks)

             
            } else {
                // If the image already exists, just add the existing image info
                imagesLinks.push(product.images.find(img => img.url === imagePath));
            }
        }


        // Handle withchainimages
        let withchainimages = [];
        if (typeof req.body.withchainimages === "string") {
            withchainimages.push(req.body.withchainimages); // Single image as a string
        } else if (Array.isArray(req.body.withchainimages)) {
            withchainimages = req.body.withchainimages; // Array of images
        }

        const existingWithChainImages = product.withchainimages.map(img => img.url);
        const withchainimagesLinks = [];

        for (let i = 0; i < withchainimages.length; i++) {
            const image = withchainimages[i];

            const imagePath = typeof image === "object" && (image.url || image.path)
                ? image.url || image.path // Handle object case
                : typeof image === "string"
                    ? image // Handle plain string case
                    : null; // Invalid format

            if (!imagePath) {
                return next(new ErrorHandler('Invalid image format provided', 400));
            }

            // Only upload new images that are not already in the database
            if (!existingWithChainImages.includes(imagePath)) {

                EditprocessBase64Image(imagePath, withchainimagesLinks)
              
            } else {
                // If the image already exists, just add the existing image info
                withchainimagesLinks.push(product.withchainimages.find(img => img.url === imagePath));
            }
        }

        // Handle withchainoutimages
        let withchainoutimages = [];
        if (typeof req.body.withchainoutimages === "string") {
            withchainoutimages.push(req.body.withchainoutimages); // Single image as a string
        } else if (Array.isArray(req.body.withchainoutimages)) {
            withchainoutimages = req.body.withchainoutimages; // Array of images
        }

        const existingWithChainOutImages = product.withchainoutimages.map(img => img.url);
        const withchainoutimagesLinks = [];

        for (let i = 0; i < withchainoutimages.length; i++) {
            const image = withchainoutimages[i];

            const imagePath = typeof image === "object" && (image.url || image.path)
                ? image.url || image.path // Handle object case
                : typeof image === "string"
                    ? image // Handle plain string case
                    : null; // Invalid format

            if (!imagePath) {
                return next(new ErrorHandler('Invalid image format provided', 400));
            }

            // Only upload new images that are not already in the database
            if (!existingWithChainOutImages.includes(imagePath)) {
                EditprocessBase64Image(imagePath, withchainoutimagesLinks)
            } else {
                // If the image already exists, just add the existing image info
                withchainoutimagesLinks.push(product.withchainoutimages.find(img => img.url === imagePath));
            }
        }


        // metal color


        // Handle YellowGoldclr images
        // Handle YellowGoldclr images
        let YellowGoldclr = [];
        if (typeof req.body.YellowGoldclr === "string") {
            YellowGoldclr.push(req.body.YellowGoldclr); // Single image as a string
        } else if (Array.isArray(req.body.YellowGoldclr)) {
            YellowGoldclr = req.body.YellowGoldclr; // Array of image objects
        }

        const existingYellowGoldclr = product.MetalColor.YellowGoldclr.map(img => img.url);
        const YellowGoldclrLinks = [];

        for (const image of YellowGoldclr) {
            const imagePath = image.url || image.path; // Extract URL or path

            if (!imagePath) {
                return next(new ErrorHandler('Invalid image format provided', 400));
            }

            if (!existingYellowGoldclr.includes(imagePath)) {
                EditprocessBase64Image(imagePath, YellowGoldclrLinks)
            } else {
                YellowGoldclrLinks.push(product.MetalColor.YellowGoldclr.find(img => img.url === imagePath));
            }
        }

        // Handle RoseGoldclr images
        let RoseGoldclr = [];
        if (typeof req.body.RoseGoldclr === "string") {
            RoseGoldclr.push(req.body.RoseGoldclr); // Single image as a string
        } else if (Array.isArray(req.body.RoseGoldclr)) {
            RoseGoldclr = req.body.RoseGoldclr; // Array of image objects
        }

        const existingRoseGoldclr = product.MetalColor.RoseGoldclr.map(img => img.url);
        const RoseGoldclrLinks = [];

        for (const image of RoseGoldclr) {
            const imagePath = image.url || image.path; // Extract URL or path

            if (!imagePath) {
                return next(new ErrorHandler('Invalid image format provided', 400));
            }

            if (!existingRoseGoldclr.includes(imagePath)) {
                EditprocessBase64Image(imagePath, RoseGoldclrLinks)

            } else {
                RoseGoldclrLinks.push(product.MetalColor.RoseGoldclr.find(img => img.url === imagePath));
            }
        }

        // Handle WhiteGoldclr images
        let WhiteGoldclr = [];
        if (typeof req.body.WhiteGoldclr === "string") {
            WhiteGoldclr.push(req.body.WhiteGoldclr); // Single image as a string
        } else if (Array.isArray(req.body.WhiteGoldclr)) {
            WhiteGoldclr = req.body.WhiteGoldclr; // Array of image objects
        }

        const existingWhiteGoldclr = product.MetalColor.WhiteGoldclr.map(img => img.url);
        const WhiteGoldclrLinks = [];

        for (const image of WhiteGoldclr) {
            const imagePath = image.url || image.path; // Extract URL or path

            if (!imagePath) {
                return next(new ErrorHandler('Invalid image format provided', 400));
            }

            if (!existingWhiteGoldclr.includes(imagePath)) {
                EditprocessBase64Image(imagePath, WhiteGoldclrLinks)

            } else {
                WhiteGoldclrLinks.push(product.MetalColor.WhiteGoldclr.find(img => img.url === imagePath));
            }
        }



        // enamel color

        // Deep Blue

        // Deep Blue
        let deepblueYellowGoldclr = [];
        let deepblueRoseGoldclr = [];
        let deepblueWhiteGoldclr = [];

        // Handle deepblueYellowGoldclr images
        if (req.body.deepblueYellowGoldclr) {
            if (typeof req.body.deepblueYellowGoldclr === "string") {
                deepblueYellowGoldclr.push(req.body.deepblueYellowGoldclr); // Single image as a string
            } else if (Array.isArray(req.body.deepblueYellowGoldclr)) {
                deepblueYellowGoldclr = req.body.deepblueYellowGoldclr; // Array of image objects
            }
        }

        const existingDeepblueYellowGoldclr = product.enamelColors.Deep_Blue ? product.enamelColors.Deep_Blue.deepblueYellowGoldclr.map(img => img.url) : [];
        const deepblueYellowGoldclrLinks = [];

        for (const image of deepblueYellowGoldclr) {
            const imagePath = image.url || image.path; // Extract URL or path

            if (!imagePath) {
                return next(new ErrorHandler('Invalid image format provided', 400));
            }

            if (!existingDeepblueYellowGoldclr.includes(imagePath)) {
                EditprocessBase64Image(imagePath, deepblueYellowGoldclrLinks)

            } else {
                deepblueYellowGoldclrLinks.push(product.enamelColors.Deep_Blue.deepblueYellowGoldclr.find(img => img.url === imagePath));
            }
        }

        // Handle deepblueRoseGoldclr images
        if (req.body.deepblueRoseGoldclr) {
            if (typeof req.body.deepblueRoseGoldclr === "string") {
                deepblueRoseGoldclr.push(req.body.deepblueRoseGoldclr); // Single image as a string
            } else if (Array.isArray(req.body.deepblueRoseGoldclr)) {
                deepblueRoseGoldclr = req.body.deepblueRoseGoldclr; // Array of image objects
            }
        }

        const existingDeepblueRoseGoldclr = product.enamelColors.Deep_Blue ? product.enamelColors.Deep_Blue.deepblueRoseGoldclr.map(img => img.url) : [];
        const deepblueRoseGoldclrLinks = [];

        for (const image of deepblueRoseGoldclr) {
            const imagePath = image.url || image.path; // Extract URL or path

            if (!imagePath) {
                return next(new ErrorHandler('Invalid image format provided', 400));
            }

            if (!existingDeepblueRoseGoldclr.includes(imagePath)) {
                EditprocessBase64Image(imagePath, deepblueRoseGoldclrLinks)

            } else {
                deepblueRoseGoldclrLinks.push(product.enamelColors.Deep_Blue.deepblueRoseGoldclr.find(img => img.url === imagePath));
            }
        }

        // Handle deepblueWhiteGoldclr images
        if (req.body.deepblueWhiteGoldclr) {
            if (typeof req.body.deepblueWhiteGoldclr === "string") {
                deepblueWhiteGoldclr.push(req.body.deepblueWhiteGoldclr); // Single image as a string
            } else if (Array.isArray(req.body.deepblueWhiteGoldclr)) {
                deepblueWhiteGoldclr = req.body.deepblueWhiteGoldclr; // Array of image objects
            }
        }

        const existingDeepblueWhiteGoldclr = product.enamelColors.Deep_Blue ? product.enamelColors.Deep_Blue.deepblueWhiteGoldclr.map(img => img.url) : [];
        const deepblueWhiteGoldclrLinks = [];

        for (const image of deepblueWhiteGoldclr) {
            const imagePath = image.url || image.path; // Extract URL or path

            if (!imagePath) {
                return next(new ErrorHandler('Invalid image format provided', 400));
            }

            if (!existingDeepblueWhiteGoldclr.includes(imagePath)) {
                EditprocessBase64Image(imagePath, deepblueWhiteGoldclrLinks)

            } else {
                deepblueWhiteGoldclrLinks.push(product.enamelColors.Deep_Blue.deepblueWhiteGoldclr.find(img => img.url === imagePath));
            }
        }


        // Pink
        let pinkYellowGoldclr = [];
        let pinkRoseGoldclr = [];
        let pinkWhiteGoldclr = [];

        // Handle pinkYellowGoldclr images
        if (req.body.pinkYellowGoldclr) {
            if (typeof req.body.pinkYellowGoldclr === "string") {
                pinkYellowGoldclr.push(req.body.pinkYellowGoldclr); // Single image as a string
            } else if (Array.isArray(req.body.pinkYellowGoldclr)) {
                pinkYellowGoldclr = req.body.pinkYellowGoldclr; // Array of image objects
            }
        }

        const existingPinkYellowGoldclr = product.enamelColors.Pink ? product.enamelColors.Pink.pinkYellowGoldclr.map(img => img.url) : [];
        const pinkYellowGoldclrLinks = [];

        for (const image of pinkYellowGoldclr) {
            const imagePath = image.url || image.path; // Extract URL or path

            if (!imagePath) {
                return next(new ErrorHandler('Invalid image format provided', 400));
            }

            if (!existingPinkYellowGoldclr.includes(imagePath)) {
                EditprocessBase64Image(imagePath, pinkYellowGoldclrLinks)

            } else {
                pinkYellowGoldclrLinks.push(product.enamelColors.Pink.pinkYellowGoldclr.find(img => img.url === imagePath));
            }
        }

        // Handle pinkRoseGoldclr images
        if (req.body.pinkRoseGoldclr) {
            if (typeof req.body.pinkRoseGoldclr === "string") {
                pinkRoseGoldclr.push(req.body.pinkRoseGoldclr); // Single image as a string
            } else if (Array.isArray(req.body.pinkRoseGoldclr)) {
                pinkRoseGoldclr = req.body.pinkRoseGoldclr; // Array of image objects
            }
        }

        const existingPinkRoseGoldclr = product.enamelColors.Pink ? product.enamelColors.Pink.pinkRoseGoldclr.map(img => img.url) : [];
        const pinkRoseGoldclrLinks = [];

        for (const image of pinkRoseGoldclr) {
            const imagePath = image.url || image.path; // Extract URL or path

            if (!imagePath) {
                return next(new ErrorHandler('Invalid image format provided', 400));
            }

            if (!existingPinkRoseGoldclr.includes(imagePath)) {
                EditprocessBase64Image(imagePath, pinkRoseGoldclrLinks)

            } else {
                pinkRoseGoldclrLinks.push(product.enamelColors.Pink.pinkRoseGoldclr.find(img => img.url === imagePath));
            }
        }

        // Handle pinkWhiteGoldclr images
        if (req.body.pinkWhiteGoldclr) {
            if (typeof req.body.pinkWhiteGoldclr === "string") {
                pinkWhiteGoldclr.push(req.body.pinkWhiteGoldclr); // Single image as a string
            } else if (Array.isArray(req.body.pinkWhiteGoldclr)) {
                pinkWhiteGoldclr = req.body.pinkWhiteGoldclr; // Array of image objects
            }
        }

        const existingPinkWhiteGoldclr = product.enamelColors.Pink ? product.enamelColors.Pink.pinkWhiteGoldclr.map(img => img.url) : [];
        const pinkWhiteGoldclrLinks = [];

        for (const image of pinkWhiteGoldclr) {
            const imagePath = image.url || image.path; // Extract URL or path

            if (!imagePath) {
                return next(new ErrorHandler('Invalid image format provided', 400));
            }

            if (!existingPinkWhiteGoldclr.includes(imagePath)) {
                EditprocessBase64Image(imagePath, pinkWhiteGoldclrLinks)

            } else {
                pinkWhiteGoldclrLinks.push(product.enamelColors.Pink.pinkWhiteGoldclr.find(img => img.url === imagePath));
            }
        }



        // Turquoise
        let turquoiseYellowGoldclr = [];
        let turquoiseRoseGoldclr = [];
        let turquoiseWhiteGoldclr = [];

        // Handle turquoiseYellowGoldclr images
        if (req.body.turquoiseYellowGoldclr) {
            if (typeof req.body.turquoiseYellowGoldclr === "string") {
                turquoiseYellowGoldclr.push(req.body.turquoiseYellowGoldclr); // Single image as a string
            } else if (Array.isArray(req.body.turquoiseYellowGoldclr)) {
                turquoiseYellowGoldclr = req.body.turquoiseYellowGoldclr; // Array of image objects
            }
        }

        const existingTurquoiseYellowGoldclr = product.enamelColors.Turquoise ? product.enamelColors.Turquoise.turquoiseYellowGoldclr.map(img => img.url) : [];
        const turquoiseYellowGoldclrLinks = [];

        for (const image of turquoiseYellowGoldclr) {
            const imagePath = image.url || image.path; // Extract URL or path

            if (!imagePath) {
                return next(new ErrorHandler('Invalid image format provided', 400));
            }

            if (!existingTurquoiseYellowGoldclr.includes(imagePath)) {
                EditprocessBase64Image(imagePath, turquoiseYellowGoldclrLinks)

            } else {
                turquoiseYellowGoldclrLinks.push(product.enamelColors.Turquoise.turquoiseYellowGoldclr.find(img => img.url === imagePath));
            }
        }

        // Handle turquoiseRoseGoldclr images
        if (req.body.turquoiseRoseGoldclr) {
            if (typeof req.body.turquoiseRoseGoldclr === "string") {
                turquoiseRoseGoldclr.push(req.body.turquoiseRoseGoldclr); // Single image as a string
            } else if (Array.isArray(req.body.turquoiseRoseGoldclr)) {
                turquoiseRoseGoldclr = req.body.turquoiseRoseGoldclr; // Array of image objects
            }
        }

        const existingTurquoiseRoseGoldclr = product.enamelColors.Turquoise ? product.enamelColors.Turquoise.turquoiseRoseGoldclr.map(img => img.url) : [];
        const turquoiseRoseGoldclrLinks = [];

        for (const image of turquoiseRoseGoldclr) {
            const imagePath = image.url || image.path; // Extract URL or path

            if (!imagePath) {
                return next(new ErrorHandler('Invalid image format provided', 400));
            }

            if (!existingTurquoiseRoseGoldclr.includes(imagePath)) {
                EditprocessBase64Image(imagePath, turquoiseRoseGoldclrLinks)

            } else {
                turquoiseRoseGoldclrLinks.push(product.enamelColors.Turquoise.turquoiseRoseGoldclr.find(img => img.url === imagePath));
            }
        }

        // Handle turquoiseWhiteGoldclr images
        if (req.body.turquoiseWhiteGoldclr) {
            if (typeof req.body.turquoiseWhiteGoldclr === "string") {
                turquoiseWhiteGoldclr.push(req.body.turquoiseWhiteGoldclr); // Single image as a string
            } else if (Array.isArray(req.body.turquoiseWhiteGoldclr)) {
                turquoiseWhiteGoldclr = req.body.turquoiseWhiteGoldclr; // Array of image objects
            }
        }

        const existingTurquoiseWhiteGoldclr = product.enamelColors.Turquoise ? product.enamelColors.Turquoise.turquoiseWhiteGoldclr.map(img => img.url) : [];
        const turquoiseWhiteGoldclrLinks = [];

        for (const image of turquoiseWhiteGoldclr) {
            const imagePath = image.url || image.path; // Extract URL or path

            if (!imagePath) {
                return next(new ErrorHandler('Invalid image format provided', 400));
            }

            if (!existingTurquoiseWhiteGoldclr.includes(imagePath)) {
                EditprocessBase64Image(imagePath, turquoiseWhiteGoldclrLinks)

            } else {
                turquoiseWhiteGoldclrLinks.push(product.enamelColors.Turquoise.turquoiseWhiteGoldclr.find(img => img.url === imagePath));
            }
        }



        // Red
        let redYellowGoldclr = [];
        let redRoseGoldclr = [];
        let redWhiteGoldclr = [];

        // Handle redYellowGoldclr images
        if (req.body.redYellowGoldclr) {
            if (typeof req.body.redYellowGoldclr === "string") {
                redYellowGoldclr.push(req.body.redYellowGoldclr); // Single image as a string
            } else if (Array.isArray(req.body.redYellowGoldclr)) {
                redYellowGoldclr = req.body.redYellowGoldclr; // Array of image objects
            }
        }

        const existingRedYellowGoldclr = product.enamelColors.Red ? product.enamelColors.Red.redYellowGoldclr.map(img => img.url) : [];
        const redYellowGoldclrLinks = [];

        for (const image of redYellowGoldclr) {
            const imagePath = image.url || image.path; // Extract URL or path

            if (!imagePath) {
                return next(new ErrorHandler('Invalid image format provided', 400));
            }

            if (!existingRedYellowGoldclr.includes(imagePath)) {
                EditprocessBase64Image(imagePath, redYellowGoldclrLinks)

            } else {
                redYellowGoldclrLinks.push(product.enamelColors.Red.redYellowGoldclr.find(img => img.url === imagePath));
            }
        }

        // Handle redRoseGoldclr images
        if (req.body.redRoseGoldclr) {
            if (typeof req.body.redRoseGoldclr === "string") {
                redRoseGoldclr.push(req.body.redRoseGoldclr); // Single image as a string
            } else if (Array.isArray(req.body.redRoseGoldclr)) {
                redRoseGoldclr = req.body.redRoseGoldclr; // Array of image objects
            }
        }

        const existingRedRoseGoldclr = product.enamelColors.Red ? product.enamelColors.Red.redRoseGoldclr.map(img => img.url) : [];
        const redRoseGoldclrLinks = [];

        for (const image of redRoseGoldclr) {
            const imagePath = image.url || image.path; // Extract URL or path

            if (!imagePath) {
                return next(new ErrorHandler('Invalid image format provided', 400));
            }

            if (!existingRedRoseGoldclr.includes(imagePath)) {
                EditprocessBase64Image(imagePath, redRoseGoldclrLinks)

            } else {
                redRoseGoldclrLinks.push(product.enamelColors.Red.redRoseGoldclr.find(img => img.url === imagePath));
            }
        }

        // Handle redWhiteGoldclr images
        if (req.body.redWhiteGoldclr) {
            if (typeof req.body.redWhiteGoldclr === "string") {
                redWhiteGoldclr.push(req.body.redWhiteGoldclr); // Single image as a string
            } else if (Array.isArray(req.body.redWhiteGoldclr)) {
                redWhiteGoldclr = req.body.redWhiteGoldclr; // Array of image objects
            }
        }

        const existingRedWhiteGoldclr = product.enamelColors.Red ? product.enamelColors.Red.redWhiteGoldclr.map(img => img.url) : [];
        const redWhiteGoldclrLinks = [];

        for (const image of redWhiteGoldclr) {
            const imagePath = image.url || image.path; // Extract URL or path

            if (!imagePath) {
                return next(new ErrorHandler('Invalid image format provided', 400));
            }

            if (!existingRedWhiteGoldclr.includes(imagePath)) {
                EditprocessBase64Image(imagePath, redWhiteGoldclrLinks)

            } else {
                redWhiteGoldclrLinks.push(product.enamelColors.Red.redWhiteGoldclr.find(img => img.url === imagePath));
            }
        }




        // Black
        let blackYellowGoldclr = [];
        let blackRoseGoldclr = [];
        let blackWhiteGoldclr = [];

        // Handle blackYellowGoldclr images
        if (req.body.blackYellowGoldclr) {
            if (typeof req.body.blackYellowGoldclr === "string") {
                blackYellowGoldclr.push(req.body.blackYellowGoldclr); // Single image as a string
            } else if (Array.isArray(req.body.blackYellowGoldclr)) {
                blackYellowGoldclr = req.body.blackYellowGoldclr; // Array of image objects
            }
        }

        const existingBlackYellowGoldclr = product.enamelColors.Black ? product.enamelColors.Black.blackYellowGoldclr.map(img => img.url) : [];
        const blackYellowGoldclrLinks = [];

        for (const image of blackYellowGoldclr) {
            const imagePath = image.url || image.path; // Extract URL or path

            if (!imagePath) {
                return next(new ErrorHandler('Invalid image format provided', 400));
            }

            if (!existingBlackYellowGoldclr.includes(imagePath)) {
                EditprocessBase64Image(imagePath, blackYellowGoldclrLinks)

            } else {
                blackYellowGoldclrLinks.push(product.enamelColors.Black.blackYellowGoldclr.find(img => img.url === imagePath));
            }
        }

        // Handle blackRoseGoldclr images
        if (req.body.blackRoseGoldclr) {
            if (typeof req.body.blackRoseGoldclr === "string") {
                blackRoseGoldclr.push(req.body.blackRoseGoldclr); // Single image as a string
            } else if (Array.isArray(req.body.blackRoseGoldclr)) {
                blackRoseGoldclr = req.body.blackRoseGoldclr; // Array of image objects
            }
        }

        const existingBlackRoseGoldclr = product.enamelColors.Black ? product.enamelColors.Black.blackRoseGoldclr.map(img => img.url) : [];
        const blackRoseGoldclrLinks = [];

        for (const image of blackRoseGoldclr) {
            const imagePath = image.url || image.path; // Extract URL or path

            if (!imagePath) {
                return next(new ErrorHandler('Invalid image format provided', 400));
            }

            if (!existingBlackRoseGoldclr.includes(imagePath)) {
                EditprocessBase64Image(imagePath, blackRoseGoldclrLinks)

            } else {
                blackRoseGoldclrLinks.push(product.enamelColors.Black.blackRoseGoldclr.find(img => img.url === imagePath));
            }
        }

        // Handle blackWhiteGoldclr images
        if (req.body.blackWhiteGoldclr) {
            if (typeof req.body.blackWhiteGoldclr === "string") {
                blackWhiteGoldclr.push(req.body.blackWhiteGoldclr); // Single image as a string
            } else if (Array.isArray(req.body.blackWhiteGoldclr)) {
                blackWhiteGoldclr = req.body.blackWhiteGoldclr; // Array of image objects
            }
        }

        const existingBlackWhiteGoldclr = product.enamelColors.Black ? product.enamelColors.Black.blackWhiteGoldclr.map(img => img.url) : [];
        const blackWhiteGoldclrLinks = [];

        for (const image of blackWhiteGoldclr) {
            const imagePath = image.url || image.path; // Extract URL or path

            if (!imagePath) {
                return next(new ErrorHandler('Invalid image format provided', 400));
            }

            if (!existingBlackWhiteGoldclr.includes(imagePath)) {
                EditprocessBase64Image(imagePath, blackWhiteGoldclrLinks)

            } else {
                blackWhiteGoldclrLinks.push(product.enamelColors.Black.blackWhiteGoldclr.find(img => img.url === imagePath));
            }
        }



        // Deep Green
        let deepgreenYellowGoldclr = [];
        let deepgreenRoseGoldclr = [];
        let deepgreenWhiteGoldclr = [];

        // Handle deepgreenYellowGoldclr images
        if (req.body.deepgreenYellowGoldclr) {
            if (typeof req.body.deepgreenYellowGoldclr === "string") {
                deepgreenYellowGoldclr.push(req.body.deepgreenYellowGoldclr); // Single image as a string
            } else if (Array.isArray(req.body.deepgreenYellowGoldclr)) {
                deepgreenYellowGoldclr = req.body.deepgreenYellowGoldclr; // Array of image objects
            }
        }

        const existingDeepgreenYellowGoldclr = product.enamelColors.Deep_Green ? product.enamelColors.Deep_Green.deepgreenYellowGoldclr.map(img => img.url) : [];
        const deepgreenYellowGoldclrLinks = [];

        for (const image of deepgreenYellowGoldclr) {
            const imagePath = image.url || image.path; // Extract URL or path

            if (!imagePath) {
                return next(new ErrorHandler('Invalid image format provided', 400));
            }

            if (!existingDeepgreenYellowGoldclr.includes(imagePath)) {
                EditprocessBase64Image(imagePath, deepgreenYellowGoldclrLinks)

            } else {
                deepgreenYellowGoldclrLinks.push(product.enamelColors.Deep_Green.deepgreenYellowGoldclr.find(img => img.url === imagePath));
            }
        }

        // Handle deepgreenRoseGoldclr images
        if (req.body.deepgreenRoseGoldclr) {
            if (typeof req.body.deepgreenRoseGoldclr === "string") {
                deepgreenRoseGoldclr.push(req.body.deepgreenRoseGoldclr); // Single image as a string
            } else if (Array.isArray(req.body.deepgreenRoseGoldclr)) {
                deepgreenRoseGoldclr = req.body.deepgreenRoseGoldclr; // Array of image objects
            }
        }

        const existingDeepgreenRoseGoldclr = product.enamelColors.Deep_Green ? product.enamelColors.Deep_Green.deepgreenRoseGoldclr.map(img => img.url) : [];
        const deepgreenRoseGoldclrLinks = [];

        for (const image of deepgreenRoseGoldclr) {
            const imagePath = image.url || image.path; // Extract URL or path

            if (!imagePath) {
                return next(new ErrorHandler('Invalid image format provided', 400));
            }

            if (!existingDeepgreenRoseGoldclr.includes(imagePath)) {
                EditprocessBase64Image(imagePath, deepgreenRoseGoldclrLinks)

            } else {
                deepgreenRoseGoldclrLinks.push(product.enamelColors.Deep_Green.deepgreenRoseGoldclr.find(img => img.url === imagePath));
            }
        }

        // Handle deepgreenWhiteGoldclr images
        if (req.body.deepgreenWhiteGoldclr) {
            if (typeof req.body.deepgreenWhiteGoldclr === "string") {
                deepgreenWhiteGoldclr.push(req.body.deepgreenWhiteGoldclr); // Single image as a string
            } else if (Array.isArray(req.body.deepgreenWhiteGoldclr)) {
                deepgreenWhiteGoldclr = req.body.deepgreenWhiteGoldclr; // Array of image objects
            }
        }

        const existingDeepgreenWhiteGoldclr = product.enamelColors.Deep_Green ? product.enamelColors.Deep_Green.deepgreenWhiteGoldclr.map(img => img.url) : [];
        const deepgreenWhiteGoldclrLinks = [];

        for (const image of deepgreenWhiteGoldclr) {
            const imagePath = image.url || image.path; // Extract URL or path

            if (!imagePath) {
                return next(new ErrorHandler('Invalid image format provided', 400));
            }

            if (!existingDeepgreenWhiteGoldclr.includes(imagePath)) {
                EditprocessBase64Image(imagePath, deepgreenWhiteGoldclrLinks)

            } else {
                deepgreenWhiteGoldclrLinks.push(product.enamelColors.Deep_Green.deepgreenWhiteGoldclr.find(img => img.url === imagePath));
            }
        }



        // Lotus Green
        let lotusgreenYellowGoldclr = [];
        let lotusgreenRoseGoldclr = [];
        let lotusgreenWhiteGoldclr = [];

        // Handle lotusgreenYellowGoldclr images
        if (req.body.lotusgreenYellowGoldclr) {
            if (typeof req.body.lotusgreenYellowGoldclr === "string") {
                lotusgreenYellowGoldclr.push(req.body.lotusgreenYellowGoldclr); // Single image as a string
            } else if (Array.isArray(req.body.lotusgreenYellowGoldclr)) {
                lotusgreenYellowGoldclr = req.body.lotusgreenYellowGoldclr; // Array of image objects
            }
        }

        const existingLotusgreenYellowGoldclr = product.enamelColors.Lotus_Green ? product.enamelColors.Lotus_Green.lotusgreenYellowGoldclr.map(img => img.url) : [];
        const lotusgreenYellowGoldclrLinks = [];

        for (const image of lotusgreenYellowGoldclr) {
            const imagePath = image.url || image.path; // Extract URL or path

            if (!imagePath) {
                return next(new ErrorHandler('Invalid image format provided', 400));
            }

            if (!existingLotusgreenYellowGoldclr.includes(imagePath)) {
                EditprocessBase64Image(imagePath, lotusgreenYellowGoldclrLinks)

            } else {
                lotusgreenYellowGoldclrLinks.push(product.enamelColors.Lotus_Green.lotusgreenYellowGoldclr.find(img => img.url === imagePath));
            }
        }

        // Handle lotusgreenRoseGoldclr images
        if (req.body.lotusgreenRoseGoldclr) {
            if (typeof req.body.lotusgreenRoseGoldclr === "string") {
                lotusgreenRoseGoldclr.push(req.body.lotusgreenRoseGoldclr); // Single image as a string
            } else if (Array.isArray(req.body.lotusgreenRoseGoldclr)) {
                lotusgreenRoseGoldclr = req.body.lotusgreenRoseGoldclr; // Array of image objects
            }
        }

        const existingLotusgreenRoseGoldclr = product.enamelColors.Lotus_Green ? product.enamelColors.Lotus_Green.lotusgreenRoseGoldclr.map(img => img.url) : [];
        const lotusgreenRoseGoldclrLinks = [];

        for (const image of lotusgreenRoseGoldclr) {
            const imagePath = image.url || image.path; // Extract URL or path

            if (!imagePath) {
                return next(new ErrorHandler('Invalid image format provided', 400));
            }

            if (!existingLotusgreenRoseGoldclr.includes(imagePath)) {
                EditprocessBase64Image(imagePath, lotusgreenRoseGoldclrLinks)

            } else {
                lotusgreenRoseGoldclrLinks.push(product.enamelColors.Lotus_Green.lotusgreenRoseGoldclr.find(img => img.url === imagePath));
            }
        }

        // Handle lotusgreenWhiteGoldclr images
        if (req.body.lotusgreenWhiteGoldclr) {
            if (typeof req.body.lotusgreenWhiteGoldclr === "string") {
                lotusgreenWhiteGoldclr.push(req.body.lotusgreenWhiteGoldclr); // Single image as a string
            } else if (Array.isArray(req.body.lotusgreenWhiteGoldclr)) {
                lotusgreenWhiteGoldclr = req.body.lotusgreenWhiteGoldclr; // Array of image objects
            }
        }

        const existingLotusgreenWhiteGoldclr = product.enamelColors.Lotus_Green ? product.enamelColors.Lotus_Green.lotusgreenWhiteGoldclr.map(img => img.url) : [];
        const lotusgreenWhiteGoldclrLinks = [];

        for (const image of lotusgreenWhiteGoldclr) {
            const imagePath = image.url || image.path; // Extract URL or path

            if (!imagePath) {
                return next(new ErrorHandler('Invalid image format provided', 400));
            }

            if (!existingLotusgreenWhiteGoldclr.includes(imagePath)) {
                EditprocessBase64Image(imagePath, lotusgreenWhiteGoldclrLinks)

            } else {
                lotusgreenWhiteGoldclrLinks.push(product.enamelColors.Lotus_Green.lotusgreenWhiteGoldclr.find(img => img.url === imagePath));
            }
        }



        const updateData = req.body;
        const {
            YellowGoldclrStock,
            RoseGoldclrStock,
            WhiteGoldclrStock,
            // other fields...
        } = req.body;
        const { gender, ageGroup } = req.body;
        updateData.gender = gender;
        updateData.ageGroup = ageGroup;
        updateData.Metalcolorstock = {
            YellowGoldclrStock,
            RoseGoldclrStock,
            WhiteGoldclrStock
        }

        const {
            deepblueYellowGoldclrStock,
            deepblueRoseGoldclrStock,
            deepblueWhiteGoldclrStock,

            pinkYellowGoldclrStock,
            pinkRoseGoldclrStock,
            pinkWhiteGoldclrStock,

            turquoiseYellowGoldclrStock,
            turquoiseRoseGoldclrStock,
            turquoiseWhiteGoldclrStock,

            redYellowGoldclrStock,
            redRoseGoldclrStock,
            redWhiteGoldclrStock,

            blackYellowGoldclrStock,
            blackRoseGoldclrStock,
            blackWhiteGoldclrStock,


            deepgreenYellowGoldclrStock,
            deepgreenRoseGoldclrStock,
            deepgreenWhiteGoldclrStock,

            lotusgreenYellowGoldclrStock,
            lotusgreenRoseGoldclrStock,
            lotusgreenWhiteGoldclrStock,

            // other fields...
        } = req.body;
        updateData.Enamelcolorstock = {
            deepblue: {
                deepblueYellowGoldclrStock,
                deepblueRoseGoldclrStock,
                deepblueWhiteGoldclrStock,
            },
            pink: {
                pinkYellowGoldclrStock,
                pinkRoseGoldclrStock,
                pinkWhiteGoldclrStock
            },
            turquoise: {
                turquoiseYellowGoldclrStock,
                turquoiseRoseGoldclrStock,
                turquoiseWhiteGoldclrStock,

            },
            red: {
                redYellowGoldclrStock,
                redRoseGoldclrStock,
                redWhiteGoldclrStock,
            },
            black: {
                blackYellowGoldclrStock,
                blackRoseGoldclrStock,
                blackWhiteGoldclrStock,
            },
            deepgreen: {
                deepgreenYellowGoldclrStock,
                deepgreenRoseGoldclrStock,
                deepgreenWhiteGoldclrStock,

            },
            lotusgreen: {
                lotusgreenYellowGoldclrStock,
                lotusgreenRoseGoldclrStock,
                lotusgreenWhiteGoldclrStock,

            }






        }




        updateData.images = imagesLinks;
        updateData.withchainimages = withchainimagesLinks;
        updateData.withchainoutimages = withchainoutimagesLinks;
        updateData.MetalColor = {
            YellowGoldclr: YellowGoldclrLinks,
            RoseGoldclr: RoseGoldclrLinks,
            WhiteGoldclr: WhiteGoldclrLinks,
        }
        updateData.enamelColors = {
            Deep_Blue: {
                deepblueYellowGoldclr: deepblueYellowGoldclrLinks,
                deepblueRoseGoldclr: deepblueRoseGoldclrLinks,
                deepblueWhiteGoldclr: deepblueWhiteGoldclrLinks,
            },
            Deep_Green: {
                deepgreenYellowGoldclr: deepgreenYellowGoldclrLinks,
                deepgreenRoseGoldclr: deepgreenRoseGoldclrLinks,
                deepgreenWhiteGoldclr: deepgreenWhiteGoldclrLinks,
            },
            Lotus_Green: {
                lotusgreenYellowGoldclr: lotusgreenYellowGoldclrLinks,
                lotusgreenRoseGoldclr: lotusgreenRoseGoldclrLinks,
                lotusgreenWhiteGoldclr: lotusgreenWhiteGoldclrLinks,
            },
            Pink: {
                pinkYellowGoldclr: pinkYellowGoldclrLinks,
                pinkRoseGoldclr: pinkRoseGoldclrLinks,
                pinkWhiteGoldclr: pinkWhiteGoldclrLinks,
            },
            Turquoise: {
                turquoiseYellowGoldclr: turquoiseYellowGoldclrLinks,
                turquoiseRoseGoldclr: turquoiseRoseGoldclrLinks,
                turquoiseWhiteGoldclr: turquoiseWhiteGoldclrLinks,
            },
            Red: {
                redYellowGoldclr: redYellowGoldclrLinks,
                redRoseGoldclr: redRoseGoldclrLinks,
                redWhiteGoldclr: redWhiteGoldclrLinks,
            },
            Black: {
                blackYellowGoldclr: blackYellowGoldclrLinks,
                blackRoseGoldclr: blackRoseGoldclrLinks,
                blackWhiteGoldclr: blackWhiteGoldclrLinks,
            },
        };


        // Log the final updateData object to see what will be updated in the database
        console.log("Update Data:", updateData);

        // Find the product by ID and update
        const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, {
            new: true, // Return the updated document
            runValidators: true // Validate the update data
        });

        if (!updatedProduct) {
            return next(new ErrorHandler('Product Not Found with this Id!', 404));
        }

        res.status(200).json({
            success: true,
            product: updatedProduct
        });
    } catch (error) {
        console.log("Error Occurred:", error.message);
        return next(new ErrorHandler(error.message, 400));
    }
}));





module.exports = router