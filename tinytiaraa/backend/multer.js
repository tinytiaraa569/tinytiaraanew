const multer= require("multer")

const storage = multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,"uploads/")
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now()+"-"+Math.round(Math.random() * 1e9)
        const filename = file.originalname.split(".")[0]
        cb(null,filename + "-" + uniqueSuffix + ".png")

    },
})


 exports.upload = multer({storage:storage})

// const multer = require("multer");
// const path = require("path");

// // Set up storage for multer
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "uploads/images/products/"); // Ensure this directory exists
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//         const extension = path.extname(file.originalname); // Get the file extension
//         cb(null, file.fieldname + "-" + uniqueSuffix + extension); // Save with original extension
//     },
// });

// // Export the multer upload function
// exports.upload = multer({ storage: storage });