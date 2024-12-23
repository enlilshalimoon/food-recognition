const express = require("express");
const multer = require("multer");
const { v1: vision } = require("@google-cloud/vision");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const upload = multer();
const client = new vision.ImageAnnotatorClient();

// Endpoint to process food images
app.post("/analyze", upload.single("image"), async (req, res) => {
    if (!req.file) {
        return res.status(400).send({ error: "No file uploaded" });
    }

    try {
        console.log("Processing image...");

        // Use Google Vision API to detect labels
        const [result] = await client.labelDetection({
            image: { content: req.file.buffer },
        });

        const foodLabels = result.labelAnnotations
            .filter(label => label.score >= 0.85) // Only include high-confidence labels
            .map(label => label.description);

        console.log("Detected food items:", foodLabels);

        // Fetch calorie data for each detected food item
        const calorieData = await Promise.all(
            foodLabels.map(async label => {
                try {
                    const response = await axios.get(`https://api.nutritionix.com/v1_1/search/${label}`, {
                        params: {
                            appId: process.env.NUTRITION_APP_ID,
                            appKey: process.env.NUTRITION_API_KEY,
                        },
                    });

                    const foodInfo = response.data.hits[0]?.fields;
                    return foodInfo ? { item: label, calories: foodInfo.nf_calories } : { item: label, calories: "Data not available" };
                } catch (error) {
                    console.error(`Error fetching calories for ${label}:`, error.message);
                    return { item: label, calories: "Error fetching data" };
                }
            })
        );

        res.status(200).json({
            foodLabels,
            calorieEstimates: calorieData,
        });
    } catch (err) {
        console.error("Error processing image:", err);
        res.status(500).send({ error: "An error occurred during image processing" });
    }
});

// Server configuration
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
