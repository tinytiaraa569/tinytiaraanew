const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/calculateEDD", async (req, res) => {
    const { origin_pincode, destination_pincode, pickup_date } = req.body;
    const token = "dc1b1181290fc5c34e1f4434f84b033b"; // Sequel API token

    try {
        const response = await axios.post(
            " https://sequel247.com/api/shipment/calculateEDD",
            {
                origin_pincode,
                destination_pincode,
                pickup_date,
                token,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        // Return the calculated EDD to the frontend
        res.json(response.data);
    } catch (error) {
        console.error("Error calculating EDD:", error.response?.data || error.message);
        res.status(500).json({
            message: "Error calculating EDD",
            error: error.response?.data || error.message,
        });
    }
});

router.post("/track", async (req, res) => {
    const { docket } = req.body; // The docket number is passed from the frontend
    const token = "dc1b1181290fc5c34e1f4434f84b033b"; // Sequel API token
    // const docket = "0661237829"

    try {
        const response = await axios.post(
            " https://sequel247.com/api/track",
            {
                token,
                docket, // Include the docket number in the body
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        // Return the tracking details to the frontend
        res.json(response.data);
    } catch (error) {
        console.error("Error tracking shipment:", error.response?.data || error.message);
        res.status(500).json({
            message: "Error tracking shipment",
            error: error.response?.data || error.message,
        });
    }
});

module.exports = router;
