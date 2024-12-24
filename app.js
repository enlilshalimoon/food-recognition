// Updated app.js for GCP
const express = require("express");
const multer = require("multer");
const { v1: vision } = require("@google-cloud/vision");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const upload = multer();
const client = new vision.ImageAnnotatorClient();

// Refine food labels dynamically
function refineFoodLabels(labels) {
    const irrelevantKeywords = ["Food", "Close-up", "Natural foods", "Staple food"];
    // Filter out irrelevant labels dynamically
    const refinedLabels = labels.filter(label => !irrelevantKeywords.includes(label));
    return refinedLabels;
}

// Fetch calorie data dynamically for refined labels
async function getCaloriesForLabels(labels) {
    const apiKey = process.env.NUTRITION_API_KEY;
    const appId = process.env.NUTRITION_APP_ID;
    const results = [];

    for (const label of labels) {
        const url = `https://api.nutritionix.com/v1_1/search/${encodeURIComponent(label)}?fields=item_name,nf_calories&appId=${appId}&appKey=${apiKey}`;
        try {
            const response = await axios.get(url);
            if (response.data.hits && response.data.hits.length > 0) {
                const calorieData = response.data.hits[0].fields.nf_calories;
                results.push({ item: label, calories: calorieData });
            } else {
                results.push({ item: label, calories: "No data found" });
            }
        } catch (error) {
            console.error(`Error fetching data for ${label}:`, error.message);
            results.push({ item: label, calories: "Error fetching data" });
        }
    }

    return results;
}

// Serve an HTML form for image upload
app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Food Recognition</title>
        </head>
        <body>
            <h1>Upload an image to analyze food items</h1>
            <form action="/analyze" method="POST" enctype="multipart/form-data">
                <input type="file" name="image" accept="image/*" required />
                <button type="submit">Analyze</button>
            </form>
        </body>
        </html>
    `);
});

// Endpoint to process food images
app.post("/analyze", upload.single("image"), async (req, res) => {
    if (!req.file) {
        return res.status(400).send({ error: "No file uploaded" });
    }

    try {
        console.log("Processing image...");

        // Step 1: Use Google Vision API to detect labels
        const [result] = await client.labelDetection({
            image: { content: req.file.buffer },
        });
        const labels = result.labelAnnotations.map(label => label.description);

        // Step 2: Refine labels dynamically
        const refinedLabels = refineFoodLabels(labels);

        // Step 3: Fetch calorie estimates dynamically
        const calorieEstimates = await getCaloriesForLabels(refinedLabels);

        // Step 4: Respond with combined results
        res.status(200).json({
            foodLabels: refinedLabels,
            calorieEstimates: calorieEstimates,
        });
    } catch (err) {
        console.error("Error processing image:", err);
        res.status(500).send({ error: "An error occurred during image processing" });
    }
});

// Server configuration
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
