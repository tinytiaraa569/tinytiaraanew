// models/Referral.js
const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema({
  referralCode: {
    type: String,
    required: true,
    unique: true,
  },
  referrer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // referredUser: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   default: null,
  // },
  // referredGuestName: {
  //   type: String,
  //   default: null // Make sure this field is optional
  // },
  // referredUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  referredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Track users who used the code
  referredGuestEmails: [String], // Track guest emails who used the code
  referredGuestNames: [String], // Track guest names who used the code (optional)
  referredRewardAmounts:[String],
  rewardAmount: {
    type: Number,
    required: true,
    // default: 200, // Reward amount for using the referral
  },
  referralBalance: {
    type: Number,
    default: 0,
  },
  referralUsed: {
    type: Boolean,
    default: false,
  },
  referralUsedAmount: { type: Number, default: 0 },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Referral", referralSchema);
