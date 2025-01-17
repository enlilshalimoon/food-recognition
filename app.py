from flask import Flask, request, jsonify
from google.cloud import vision
import io

# Initialize Flask app
app = Flask(__name__)

# Initialize the Google Cloud Vision API client
client = vision.ImageAnnotatorClient()

@app.route('/identify-food', methods=['POST'])
def identify_food():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    image_file = request.files['file']
    content = image_file.read()
    image = vision.Image(content=content)

    response = client.label_detection(image=image)
    labels = response.label_annotations

    predefined_foods = ["pizza", "burger", "salad", "apple", "banana"]  # Add more food items as needed
    food_labels = [label.description for label in labels if label.description.lower() in predefined_foods]

    return jsonify({"food_items": food_labels})

@app.route('/')
def home():
    return '''
    <h1>Food Recognition API</h1>
    <form action="/identify-food" method="POST" enctype="multipart/form-data">
        <input type="file" name="file" />
        <button type="submit">Identify Food</button>
    </form>
    '''

if __name__ == '__main__':
    app.run(debug=True)
