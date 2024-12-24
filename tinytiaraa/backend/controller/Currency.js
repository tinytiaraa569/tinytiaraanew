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



  // Get all currencies
router.get(
    "/get-all-currencies",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const currencies = await Currency.find();
        res.status(200).json(currencies);
      } catch (error) {
        res.status(400).json({ message: "Error fetching currencies", error });
      }
    })
  );
  
  // Edit an existing currency
  router.put(
    "/edit-currency/:id",
    catchAsyncErrors(async (req, res, next) => {
      const { code, country, flag, exchangeRate } = req.body;
      try {
        const updatedCurrency = await Currency.findByIdAndUpdate(
          req.params.id,
          { code, country, flag, exchangeRate },
          { new: true }
        );
  
        if (!updatedCurrency) {
          return res.status(404).json({ message: "Currency not found" });
        }
  
        res.status(200).json(updatedCurrency);
      } catch (error) {
        res.status(400).json({ message: "Error editing currency", error });
      }
    })
  );


  router.get("/get-currency-by-code/:code", catchAsyncErrors(async (req, res, next) => {
    try {
      const currency = await Currency.findOne({ code: req.params.code });
  
      if (!currency) {
        return res.status(404).json({ message: "Currency not found" });
      }
  
      res.status(200).json(currency);
    } catch (error) {
      res.status(400).json({ message: "Error fetching currency", error });
    }
  }));
  
  // Delete a currency
  router.delete("/delete-currency/:id", catchAsyncErrors(async (req, res, next) => {
    try {
      const deletedCurrency = await Currency.findByIdAndDelete(req.params.id);
  
      if (!deletedCurrency) {
        return res.status(404).json({ message: "Currency not found" });
      }
  
      res.status(200).json({ message: "Currency deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: "Error deleting currency", error });
    }
  }));

module.exports = router