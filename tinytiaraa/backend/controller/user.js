const express = require('express')
const path = require('path')
const { upload } = require('../multer')
const router = express.Router()
const User = require('../model/user')
const ErrorHandler = require('../utils/Errorhandler')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const sendMail = require('../utils/sendMail')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')
const { isAuthenticated } = require('../middleware/auth')
const cloudinary = require("cloudinary");
const crypto = require('crypto');

// Function to generate a unique ID for image names
const generateRandomString = (length) => {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
};

// Function to process base64 images and store them locally
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
        const extension = mimeType.split('/')[1]; // e.g., 'png', 'jpeg'
        const imageBuffer = Buffer.from(base64Data, 'base64');

        const uniqueId = generateRandomString(20);
        const publicId = `products/${uniqueId}`;
        const imagePath = path.join(__dirname, '../uploads/images/products', `${uniqueId}.${extension}`);

        // Save image to local file system
        fs.writeFileSync(imagePath, imageBuffer);

        // Add the image data to the array
        imageLinksArray.push({
            public_id: publicId,
            url: `/uploads/images/products/${uniqueId}.${extension}`
        });
    }
};

router.post("/create-user", async (req, res, next) => {
    try {
        const { name, email, password, avatar } = req.body;

        const userEmail = await User.findOne({ email })

        if (userEmail) {
            // const filename = req.file.filename

            // const filePath = `uploads/${filename}`

           

            // fs.unlink(filePath, (err) => {
            //     if (err) {
            //         console.log(err)
            //         res.status(500).json({
            //             message: "Error while deleteing file"
            //         })
            //     }

            // })
            return next(new ErrorHandler("User already Exists", 400))
        }
         // Initialize avatar object
         let avatarData = {
            public_id: null,
            url: null,
        };


         // If avatar is provided, upload to Cloudinary
         if (avatar) {
            const avatarLinks = [];
            processBase64Images([avatar], avatarLinks); // Convert avatar to local storage format
            avatarData = avatarLinks[0] || avatarData; // Use the processed image if available
        }


        // const filename = req.file.filename;
        // const fileUrl = path.join(filename)


        const user = {
            name: name,
            email: email,
            password: password,
            avatar: avatarData
        }
        const activationToken = createActivationToken(user)
        const activationUrl = `https://www.tinytiaraa.com/activation/${activationToken}`

        try {
            await sendMail({
                email: user.email,
                subject: "Activate your Account",
                message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`
            })
            res.status(201).json({
                success: true,
                message: `please check your email:- ${user.email} to activate your account!`,
            });

        } catch (error) {
            return next(new ErrorHandler(error.message, 500));

        }
    }
    catch (error) {
        return next(new ErrorHandler(error.message, 400));

    }
})


//ceate token


const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m"
    })

}


//activation user

router.post("/activation", catchAsyncErrors(async (req, res, next) => {
    try {
        const { activation_token } = req.body;
        const newUser = jwt.verify(
            activation_token,
            process.env.ACTIVATION_SECRET
        );
        if (!newUser) {
            return next(new ErrorHandler("Invalid token", 400));

        }
        const { name, email, password, avatar } = newUser;

        let user = await User.findOne({ email });
        if (user) {
            return next(new ErrorHandler("User already exists", 400));
        }
        user = await User.create({
            name,
            email,
            avatar,
            password,
        });
        sendToken(user, 201, res)
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));

    }
}))

//login user


router.post("/login-user", catchAsyncErrors(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new ErrorHandler("Please provide the all fields", 400));

        }
        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return next(new ErrorHandler("User doesn't exists", 400));

        }
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return next(
                new ErrorHandler("Please provide the correct information", 400)
            );
        }
        sendToken(user, 201, res);

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));

    }
}))


// load users 

router.get(
    "/getuser",
    isAuthenticated,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const user = await User.findById(req.user.id);

            if (!user) {
                return next(new ErrorHandler("User doesn't exists", 400));
            }

            res.status(200).json({
                success: true,
                user,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);



// logout

// router.get("/logout", isAuthenticated, catchAsyncErrors(async (req, res, next) => {
//     try {
//         res.cookie("token", null, {
//             expires: new Date(Date.now()),
//             httpOnly: true,

//         });
//         res.status(201).json({
//             success: true,
//             message: "Log out successful!",
//         });

//     } catch (error) {
//         return next(new ErrorHandler(error.message, 500));

//     }
// }))

router.get("/logout", isAuthenticated, catchAsyncErrors(async (req, res, next) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            sameSite: "None",  // Ensure consistency with login cookie
            secure: true, 
        });

        res.status(201).json({
            success: true,
            message: "Log out successful!",
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));


// update user 
router.put("/update-user-info", isAuthenticated, catchAsyncErrors(async () => {
    try {
        const { name, email, phoneNumber, password } = req.body;
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorHandler("User not found", 400));
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return next(
                new ErrorHandler("Please provide the correct information", 400)
            );
        }
        user.name = name;
        user.email = email;
        user.phoneNumber = phoneNumber;

        await user.save();

        res.status(201).json({
            success: true,
            user,
        });

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}))


// update user avatar

router.post("/update-avatar", isAuthenticated, upload.single("image"), catchAsyncErrors(async (req, res, next) => {
    try {
        const existsUser = await User.findById(req.user.id);

        const existAvatarPath = `uploads/${existsUser.avatar}`

        fs.unlinkSync(existAvatarPath)

        const fileUrl = path.join(req.file.filename)
        const user = await User.findByIdAndUpdate(req.user.id, { avatar: fileUrl })

        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));

    }
}))


// update user addresses
router.put(
    "/update-user-addresses",
    isAuthenticated,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const user = await User.findById(req.user.id);

            const sameTypeAddress = user.addresses.find(
                (address) => address.addressType === req.body.addressType
            );
            if (sameTypeAddress) {
                return next(
                    new ErrorHandler(`${req.body.addressType} address already exists`)
                );
            }

            const existsAddress = user.addresses.find(
                (address) => address._id === req.body._id
            );

            if (existsAddress) {
                Object.assign(existsAddress, req.body);
            } else {
                // add the new address to the array
                user.addresses.push(req.body);
            }

            await user.save();

            res.status(200).json({
                success: true,
                user,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);


//delete user address 
router.delete(
    "/delete-user-address/:id",
    isAuthenticated,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const userId = req.user._id;
            const addressId = req.params.id;

            await User.updateOne(
                {
                    _id: userId,
                },
                { $pull: { addresses: { _id: addressId } } }
            );

            const user = await User.findById(userId);

            res.status(200).json({ success: true, user });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);


//update user password
router.put(
    "/update-user-password",
    isAuthenticated,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const user = await User.findById(req.user.id).select("+password");

            const isPasswordMatched = await user.comparePassword(
                req.body.oldPassword
            );

            if (!isPasswordMatched) {
                return next(new ErrorHandler("Old password is incorrect!", 400));
            }

            if (req.body.newPassword !== req.body.confirmPassword) {
                return next(
                    new ErrorHandler("Password doesn't matched with each other!", 400)
                );
            }
            user.password = req.body.newPassword;

            await user.save();

            res.status(200).json({
                success: true,
                message: "Password updated successfully!",
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);



router.get(
    "/user-info/:id",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id);

            res.status(201).json({
                success: true,
                user,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

//testing
router.get("/user-details/:id", isAuthenticated, catchAsyncErrors(async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('name email');
        
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }
        
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));


//all users 
router.get("/get-all-users", catchAsyncErrors(async (req, res, next) => {
    try {
        const users = await User.find(); // Fetch all users from the database

        res.status(200).json({
            success: true,
            users, // Return the users
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

module.exports = router
