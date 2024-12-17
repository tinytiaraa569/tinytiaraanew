const Messages = require("../model/messages")
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ErrorHandler = require('../utils/Errorhandler')
const express = require('express')
const { upload } = require("../multer")
const router = express.Router()
const path = require("path")


//create new messages

router.post("/create-new-message", upload.single("images"), catchAsyncErrors(async (req, res, next) => {
    try {
        const messageData = req.body
        if (req.file) {

          const filename = req.file.filename
          const fileUrl = path.join(filename)
            // const files = req.files
            // const imageUrls = files.map((file) => `${file.fileName}`)

            messageData.images = fileUrl

        }
        messageData.conversationId = req.body.conversationId;
        messageData.sender = req.body.sender;
        messageData.text = req.body.text;

        const message = new Messages({
            conversationId: messageData.conversationId,
            text: messageData.text,
            sender: messageData.sender,
            images:messageData.images ? messageData.images : undefined,
        });

        await message.save();

        res.status(201).json({
            success: true,
            message,
        });


    } catch (error) {
        return next(new ErrorHandler(error.response.message), 500);

    }
}))

// get all messages with conversation id
router.get(
    "/get-all-messages/:id",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const messages = await Messages.find({
          conversationId: req.params.id,
        });
  
        res.status(201).json({
          success: true,
          messages,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message), 500);
      }
    })
  );
module.exports = router