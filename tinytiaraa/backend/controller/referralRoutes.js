const express = require('express');
const router = express.Router();
const { isAuthenticated, isSeller } = require('../middleware/auth');
const { generateReferralCode, handleReferral, validateReferralCode, getReferrals, updateReferralBalances, getUserReferralBalance, deductReferralPoints, deductUserPoints, getAllReferrals, getReferralById, getUserReferralBalanceById, getUserReferralCode } = require('./referralController');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

router.post('/generate-referral-code', isAuthenticated, generateReferralCode);
router.post('/handle-referral',handleReferral);
router.post('/validate-referral-code', validateReferralCode);
router.get('/user-referrals', isAuthenticated, getReferrals);
router.post('/update-referral-balances' ,updateReferralBalances);
router.get('/referral-balance', isAuthenticated ,getUserReferralBalance);
router.post('/deduct-points',isAuthenticated, catchAsyncErrors(deductReferralPoints));

router.put('/user/update-referral-balance', isAuthenticated ,deductUserPoints);

router.get('/all-referrals', isSeller, getAllReferrals);
router.get('/referral/:id', isSeller, getReferralById);
router.get('/referral-balance/:userId', getUserReferralBalanceById);

router.get('/user-referral-code', isAuthenticated, getUserReferralCode);






module.exports = router;