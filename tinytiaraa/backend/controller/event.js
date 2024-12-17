const express = require("express")
const router = express.Router()

const Product = require("../model/product")
const { upload } = require("../multer")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const ErrorHandler = require("../utils/Errorhandler")
const Shop = require("../model/shop")
const { isSeller } = require("../middleware/auth");
const Event = require("../model/event")
const fs = require('fs')

//create event

router.post("/create-event", upload.array("images"), catchAsyncErrors(async (req, res, next) => {
    try {
        const shopId = req.body.shopId
        const shop = await Shop.findById(shopId)

        if (!shop) {
            return next(new ErrorHandler("ID is invalid", 400))

        } else {
            const files = req.files

            const imageUrls = files.map((file) => `${file.filename}`)
            const eventData = req.body
            eventData.images = imageUrls
            eventData.shop = shop


            const product = await Event.create(eventData)

            res.status(201).json({
                success: true,
                product
            })

        }
    } catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}))



//get all events

router.get("/get-all-events/:id", catchAsyncErrors(async (req, res, next) => {
    try {
        const events = await Event.find({ shopId: req.params.id })

        res.status(201).json({
            success: true,
            events
        })

    } catch (error) {
        return next(new ErrorHandler(error, 400))

    }
}))


//delete product of a shop


router.delete("/delete-shop-event/:id", isSeller, catchAsyncErrors(async (req, res, next) => {
    try {
        const productId = req.params.id

        const eventData = await Event.findById(productId)



        
        
        eventData.images.forEach((imageUrl) => {
            const filename = imageUrl
            const filePath = `uploads/${filename}`

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err)
                }
            })
        })

        const event = await Event.findByIdAndDelete(productId)
        if (!event) {
            return next(new ErrorHandler('event Not Found with this Id !', 500))
        }



        res.status(201).json({
            success: true,
            message: "event Deleted Successfully"
        })



    } catch (error) {
        return next(new ErrorHandler(error, 400))

    }
}))


// get all events
router.get("/get-all-events", async (req, res, next) => {
    try {
      const events = await Event.find();
      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  });
  



module.exports = router

