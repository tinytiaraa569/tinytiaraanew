const Referral = require('../model/referralModel');
const User = require('../model/user');
const Order = require('../model/order');
const ErrorHandler = require('../utils/Errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Generate Referral Code
exports.generateReferralCode = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user) return next(new ErrorHandler('User not found', 404));

    const referralCode = `REF-${user._id.toString().slice(-6).toUpperCase()}`;
    // Update the user with the generated referral code
    // user.referralCode = referralCode;
    // await user.save();

    // Create a new referral entry
    const newReferral = await Referral.create({
        referralCode,
        referrer: user._id,
        rewardAmount: 200, // Example reward amount, adjust as necessary
    });

    res.status(200).json({ success: true, referralCode: newReferral.referralCode });
});

// Handle Referral During Purchase

// old code 
// exports.handleReferral = catchAsyncErrors(async (req, res, next) => {
//     const { referralCode, orderIds } = req.body;

//     if (!referralCode || !orderIds || !Array.isArray(orderIds)) {
//         return next(new ErrorHandler('Invalid input data', 400));
//     }

//     // Find the referral by code
//     const referral = await Referral.findOne({ referralCode });
//     if (!referral) {
//         return next(new ErrorHandler('Invalid referral code', 400));
//     }

//     if (referral.referralUsed) {
//         return next(new ErrorHandler('Referral code already used', 400));
//     }

//     try {
//         // Process each order
//         for (const orderId of orderIds) {
//             const order = await Order.findById(orderId);
//             if (!order) {
//                 console.error(`Order not found for ID: ${orderId}`);
//                 continue; // Skip if the order is not found
//             }

//             if (order.referralCode === referralCode) {
//                 console.warn(`Referral code ${referralCode} already applied to order ${orderId}`);
//                 continue; // Skip if the referral code is already applied
//             }

//             order.referralCode = referralCode;
//             await order.save();
//         }

//         // Update referrer's balance
//         const referrer = await User.findById(referral.referrer);
//         if (!referrer) {
//             console.error('Referrer not found');
//             return next(new ErrorHandler('Referrer not found', 404));
//         }

//         const currentBalance = referrer.referralBalance || 0;
//         const rewardAmount = referral.rewardAmount || 0;
//         const newBalance = currentBalance + rewardAmount;

//         if (isNaN(newBalance)) {
//             console.error('Computed referral balance is NaN');
//             return next(new ErrorHandler('Invalid referral balance', 500));
//         }

//         referrer.referralBalance = newBalance;
//         await referrer.save();

//         // Mark referral as used
//         referral.referralUsed = true;
//         await referral.save();

//         res.status(200).json({ success: true, message: 'Referral applied successfully' });

//     } catch (err) {
//         console.error('Error applying referral:', err);
//         return next(new ErrorHandler('An error occurred while applying the referral', 500));
//     }
// });

// new code 
exports.handleReferral = catchAsyncErrors(async (req, res, next) => {
    const { referralCode, orderIds } = req.body;

    if (!referralCode || !orderIds || !Array.isArray(orderIds)) {
        return next(new ErrorHandler('Invalid input data', 400));
    }

    // Find the referral by code
    const referral = await Referral.findOne({ referralCode });
    if (!referral) {
        return next(new ErrorHandler('Invalid referral code', 400));
    }

    if (referral.referralUsed) {
        return next(new ErrorHandler('Referral code already used', 400));
    }

    try {
        // Process each order
        for (const orderId of orderIds) {
            const order = await Order.findById(orderId);
            if (!order) {
                console.error(`Order not found for ID: ${orderId}`);
                continue; // Skip if the order is not found
            }

            if (order.referralCode === referralCode) {
                console.warn(`Referral code ${referralCode} already applied to order ${orderId}`);
                continue; // Skip if the referral code is already applied
            }

            // Calculate 5% of the total order value
            const orderValue = order.totalPrice; // Assuming order.totalPrice is the total value
            const rewardAmount = orderValue * 0.05; // 5% reward

            order.referralCode = referralCode;
            await order.save();

            // Update referrer's balance
            const referrer = await User.findById(referral.referrer);
            if (!referrer) {
                console.error('Referrer not found');
                return next(new ErrorHandler('Referrer not found', 404));
            }

            const currentBalance = referrer.referralBalance || 0;
            const newBalance = currentBalance + rewardAmount;

            if (isNaN(newBalance)) {
                console.error('Computed referral balance is NaN');
                return next(new ErrorHandler('Invalid referral balance', 500));
            }

            referrer.referralBalance = newBalance;
            await referrer.save();
        }

        // Mark referral as used
        referral.referralUsed = true;
        await referral.save();

        res.status(200).json({ success: true, message: 'Referral applied successfully' });

    } catch (err) {
        console.error('Error applying referral:', err);
        return next(new ErrorHandler('An error occurred while applying the referral', 500));
    }
});


// exports.handleReferral = catchAsyncErrors(async (req, res, next) => {
//     const { referralCode, orderIds } = req.body;

//     if (!referralCode || !orderIds || !Array.isArray(orderIds)) {
//         return next(new ErrorHandler('Invalid input data', 400));
//     }

//     // Find the referral by code
//     const referral = await Referral.findOne({ referralCode }).populate('referrer');
//     if (!referral) {
//         return next(new ErrorHandler('Invalid referral code', 400));
//     }

//     const userId = req.user ? req.user._id : null;

//     if (userId && referral.usedBy.includes(userId)) {
//         return next(new ErrorHandler('Referral code already used by this user', 400));
//     }

//     if (referral.referralUsed && !userId) {
//         return next(new ErrorHandler('Referral code already used', 400));
//     }

//     try {
//         for (const orderId of orderIds) {
//             const order = await Order.findById(orderId);
//             if (!order) {
//                 console.error(`Order not found for ID: ${orderId}`);
//                 continue;
//             }

//             if (order.referralCode === referralCode) {
//                 console.warn(`Referral code ${referralCode} already applied to order ${orderId}`);
//                 continue;
//             }

//             order.referralCode = referralCode;
//             await order.save();
//         }

//         const referrer = await User.findById(referral.referrer);
//         if (!referrer) {
//             console.error('Referrer not found');
//             return next(new ErrorHandler('Referrer not found', 404));
//         }

//         const currentBalance = referrer.referralBalance || 0;
//         const rewardAmount = referral.rewardAmount || 0;
//         const newBalance = currentBalance + rewardAmount;

//         if (isNaN(newBalance)) {
//             console.error('Computed referral balance is NaN');
//             return next(new ErrorHandler('Invalid referral balance', 500));
//         }

//         referrer.referralBalance = newBalance;
//         await referrer.save();

//         if (userId) {
//             referral.usedBy.push(userId);
//             referral.referralUsed = true;
//             await referral.save();
//         }

//         res.status(200).json({ success: true, message: 'Referral applied successfully' });

//     } catch (err) {
//         console.error('Error applying referral:', err);
//         return next(new ErrorHandler('An error occurred while applying the referral', 500));
//     }
// });




exports.validateReferralCode = catchAsyncErrors(async (req, res, next) => {
    const { referralCode } = req.body;

    const referral = await Referral.findOne({ referralCode });
    if (referral) {
        return res.status(200).json({ success: true, referral });
    } else {
        return res.status(404).json({ success: false, message: 'Referral code not found' });
    }
});



exports.getReferrals = catchAsyncErrors(async (req, res, next) => {
    try {
        // Fetch referrals for the logged-in user
        const referrals = await Referral.find({ referrer: req.user.id })
            .populate('referrer', 'name email')
            .populate('referredUsers', 'name email') // Populate referred user details
            .lean(); // Convert to plain JavaScript object for manipulation

        // Calculate total reward amount for each referral
        const enrichedReferrals = await Promise.all(referrals.map(async (referral) => {
            const totalRewardAmount = await Order.aggregate([
                { $match: { referralCode: referral.referralCode } },
                { $group: { _id: null, total: { $sum: "$rewardAmount" } } }
            ]);

            // Update referral balance
            referral.referralBalance = totalRewardAmount[0] ? totalRewardAmount[0].total : 0;

            return {
                ...referral,
                totalRewardAmount: referral.referralBalance
            };
        }));

        res.status(200).json({
            success: true,
            referrals: enrichedReferrals,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});


// exports.updateReferralBalances = catchAsyncErrors(async (req, res, next) => {
//     try {
//         // Fetch all active referrals
//         const referrals = await Referral.find({ referralUsed: false }).populate('referrer');

//         if (referrals.length === 0) {
//             return res.status(200).json({ success: true, message: 'No active referrals to update' });
//         }

//         // Process each referral
//         for (const referral of referrals) {
//             if (referral.referrer) {
//                 // Aggregate total reward amount for the current referral
//                 const totalRewardAmount = await Order.aggregate([
//                     { $match: { referralCodeUsed: referral.referralCode } },
//                     { $group: { _id: null, total: { $sum: "$rewardAmount" } } }
//                 ]);

//                 const rewardAmount = totalRewardAmount[0] ? totalRewardAmount[0].total : 0;

//                 // Update the referrer's balance
//                 referral.referrer.referralBalance += rewardAmount; // Add to existing balance
//                 await referral.referrer.save();

//                 // Mark referral as used
//                 referral.referralUsed = true;
//                 await referral.save();
//                 console.log('Referral:', referral);
//                 console.log('Total Reward Amount:', totalRewardAmount);
//             }
//         }

//         res.status(200).json({ success: true, message: 'Referral balances updated successfully' });
//     } catch (error) {
//         console.error('Error updating referral balances:', error);
//         return next(new ErrorHandler(error.message, 500));
//     }
// });

exports.updateReferralBalances = catchAsyncErrors(async (req, res, next) => {
    try {
        // Fetch all active referrals
        const referrals = await Referral.find({ referralUsed: false }).populate('referrer');

        if (referrals.length === 0) {
            return res.status(200).json({ success: true, message: 'No active referrals to update' });
        }

        // Process each referral
        for (const referral of referrals) {
            if (referral.referrer) {
                // Aggregate total reward amount for the current referral
                const totalRewardAmount = await Order.aggregate([
                    { $match: { referralCodeUsed: referral.referralCode, status: 'Completed' } },
                    { $group: { _id: null, totalReward: { $sum: "$rewardAmount" } } }
                ]);

                const rewardAmount = totalRewardAmount[0] ? totalRewardAmount[0].totalReward : 0;

                // Aggregate total referral points applied by the user for the current referral
                const totalPointsApplied = await Order.aggregate([
                    { $match: { referralCodeUsed: referral.referralCode, status: 'Completed' } },
                    { $group: { _id: null, totalPoints: { $sum: "$referralPointsApplied" } } }
                ]);

                const pointsApplied = totalPointsApplied[0] ? totalPointsApplied[0].totalPoints : 0;

                // Update the referrer's balance
                referral.referrer.referralBalance += rewardAmount; // Add reward
                referral.referrer.referralBalance -= pointsApplied; // Deduct points

                // Ensure balance is not negative
                referral.referrer.referralBalance = Math.max(referral.referrer.referralBalance, 0);

                // Save the updated referrer balance
                await referral.referrer.save();

                // Mark referral as used
                referral.referralUsed = true;
                await referral.save();

                console.log('Referral:', referral);
                console.log('Total Reward Amount:', rewardAmount);
                console.log('Points Applied:', pointsApplied);
            }
        }

        res.status(200).json({ success: true, message: 'Referral balances updated successfully' });
    } catch (error) {
        console.error('Error updating referral balances:', error);
        return next(new ErrorHandler(error.message, 500));
    }
});



// exports.getUserReferralBalance = catchAsyncErrors(async (req, res, next) => {
//     try {
//         // Check if the user is authenticated
//         if (!req.user) {
//             return next(new ErrorHandler('User not authenticated', 401));
//         }

//         // Fetch user from the database
//         const user = await User.findById(req.user._id);

//         if (!user) {
//             return next(new ErrorHandler('User not found', 404));
//         }

//         // Return the referral balance
//         res.status(200).json({
//             success: true,
//             referralBalance: user.referralBalance ,
//         });
//     } catch (error) {
//         return next(new ErrorHandler(error.message, 500));
//     }
// });

// exports.getUserReferralBalance = catchAsyncErrors(async (req, res, next) => {
//     try {
//         const user = await User.findById(req.user._id);
//         if (!user) {
//             return next(new ErrorHandler('User not found', 404));
//         }

//         res.status(200).json({
//             success: true,
//             referralBalance: user.referralBalance || 0,
//         });
//     } catch (error) {
//         return next(new ErrorHandler(error.message, 500));
//     }
// });

exports.getUserReferralBalance = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id); // or req.userId if you pass it
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }

    res.status(200).json({
        success: true,
        userId: user._id,
        referralBalance: user.referralBalance
    });
});


exports.deductReferralPoints = catchAsyncErrors(async (req, res, next) => {
    const { userId, points } = req.body;

    console.log('Received userId:', userId); // Debugging line
    console.log('Received points:', points); // Debugging line

    if (!userId || points === undefined) {
        return res.status(400).json({
            success: false,
            message: 'Invalid input data'
        });
    }

    // Check if user exists
    const user = await User.findById(userId);
    console.log('User found:', user); // Debugging line

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }

    // Check and deduct referral balance
    if (user.referralBalance < points) {
        return res.status(400).json({
            success: false,
            message: 'Insufficient referral balance'
        });
    }

    user.referralBalance -= points;
    await user.save();

    res.status(200).json({
        success: true,
        message: 'Referral points deducted successfully',
        newBalance: user.referralBalance
    });
});


exports.deductUserPoints = catchAsyncErrors(async (req, res, next) => {
    const { userId, referralBalance } = req.body;

    if (!userId || referralBalance === undefined) {
        return res.status(400).json({ message: 'User ID and referral balance are required.' });
    }

    try {
        // Update the user's referral balance in the database
        const user = await User.findByIdAndUpdate(
            userId,
            { referralBalance },
            { new: true } // Return the updated user document
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.json({ message: 'Referral balance updated successfully.', user });
    } catch (error) {
        console.error('Error updating referral balance:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


exports.getAllReferrals = catchAsyncErrors(async (req, res, next) => {
    try {
        const referrals = await Referral.find()
            .populate('referrer', 'name email') // Populate referrer details
            .populate('referredUsers', 'name email') // Populate referred user details
            .lean(); // Convert to plain JavaScript object for manipulation

        // Calculate total reward amount for each referral
        const enrichedReferrals = await Promise.all(referrals.map(async (referral) => {
            const totalRewardAmount = await Order.aggregate([
                { $match: { referralCode: referral.referralCode } },
                { $group: { _id: null, total: { $sum: "$rewardAmount" } } }
            ]);

            // Update referral balance
            referral.referralBalance = totalRewardAmount[0] ? totalRewardAmount[0].total : 0;

            return {
                ...referral,
                totalRewardAmount: referral.referralBalance
            };
        }));

        res.status(200).json({
            success: true,
            referrals: enrichedReferrals,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

exports.getReferralById = catchAsyncErrors(async (req, res, next) => {
    try {
        const referralId = req.params.id;
        const referral = await Referral.findById(referralId)
            .populate('referrer', 'name email')
            .populate('referredUsers', 'name email') // Populate referred user details
            .lean(); // Convert to plain JavaScript object for manipulation

        if (!referral) {
            return res.status(404).json({
                success: false,
                message: 'Referral not found'
            });
        }

        res.status(200).json({
            success: true,
            referral,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

exports.getUserReferralBalanceById = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.userId); // Get user by ID
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }
    res.status(200).json({
        success: true,
        userId: user._id,
        referralBalance: user.referralBalance
    });
});
// exports.deductReferralPoints = async (req, res, next) => {

//     const { userId, points } = req.body;

//     if (!userId || points === undefined) {
//         return next(new ErrorHandler('Invalid input data', 400));
//     }

//     try {
//         const user = await User.findById(userId);
//         if (!user) {
//             return next(new ErrorHandler('User not found', 404));
//         }

//         // Check if the user has enough balance
//         if (user.referralBalance < points) {
//             return next(new ErrorHandler('Insufficient referral balance', 400));
//         }

//         // Deduct points from the user's balance
//         user.referralBalance -= points;
//         await user.save();

//         res.status(200).json({
//             success: true,
//             message: 'Referral points deducted successfully',
//             newBalance: user.referralBalance
//         });
//     } catch (error) {
//         console.error('Error deducting referral points:', error);
//         return next(new ErrorHandler('Failed to deduct referral points', 500));
//     }
// };
exports.getUserReferralCode = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id); // or req.userId if using JWT

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found',
        });
    }

    const referral = await Referral.findOne({ referrer: user._id });

    if (!referral) {
        return res.status(404).json({
            success: false,
            message: 'Referral code not found',
        });
    }

    res.status(200).json({
        success: true,
        referralCode: referral.referralCode,
    });
});