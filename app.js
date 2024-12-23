const express = require("express");
const multer = require("multer");
const vision = require("@google-cloud/vision");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
const upload = multer();

// Initialize the Google Cloud Vision API client
const client = new vision.ImageAnnotatorClient();

// Middleware
app.use(cors()); // Enable cross-origin requests
app.use(helmet()); // Add security headers

// Home Route
app.get("/", (req, res) => {
  res.send(`
    <h1>Food Logging API</h1>
    <form action="/identify-food" method="POST" enctype="multipart/form-data">
        <input type="file" name="file" accept="image/*" required />
        <button type="submit">Identify Food</button>
    </form>
  `);
});

// Endpoint to handle food recognition
app.post("/identify-food", upload.single("file"), async (req, res) => {
  try {
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).send({ error: "No file uploaded" });
    }

    console.log("Processing image...");

    // Send the image buffer to the Vision API
    const [result] = await client.labelDetection({ image: { content: imageFile.buffer } });
    const labels = result.labelAnnotations.map((label) => label.description);

    console.log("Detected labels:", labels);

    res.send({ detected_labels: labels });
  } catch (err) {
    console.error("Error during image processing:", err);
    res.status(500).send({ error: "An error occurred during processing" });
  }
});

// Server Configuration
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://0.0.0.0:${PORT}`));

