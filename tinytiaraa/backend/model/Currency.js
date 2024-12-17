// models/Currency.js
const mongoose = require("mongoose");

const CurrencySchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  country: {
    type: String,
    required: true,
  },
  flag: {
    type: String,
    required: true,
  },
  exchangeRate: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Currency", CurrencySchema);
