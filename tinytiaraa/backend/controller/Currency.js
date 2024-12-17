const Currency = require("../model/Currency");
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const express = require('express')
const router = express.Router()

router.post(
    "/create-new-currency",
    catchAsyncErrors(async (req, res, next) => {
        const { code, country, flag, exchangeRate } = req.body;
        try {
            const currency = new Currency({
            code,
            country,
            flag,
            exchangeRate,
            });

            const savedCurrency = await currency.save();
            res.status(201).json(savedCurrency);
        } catch (error) {
            res.status(400).json({ message: "Error adding currency", error });
        }
     
    })
  );


module.exports = router