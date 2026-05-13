from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
RESOURCES_FILE = "resources.json"

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


@app.route("/")
def home():
    return jsonify({
        "message": "BOSC Community Library Backend API is running"
    })


@app.route("/api/resources", methods=["GET"])
def get_resources():
    with open(RESOURCES_FILE, "r") as file:
        resources = json.load(file)

    return jsonify(resources)


@app.route("/api/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if not file.filename.endswith(".pdf"):
        return jsonify({"error": "Only PDF files are allowed"}), 400

    file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
    file.save(file_path)

    return jsonify({
        "message": "PDF uploaded successfully",
        "filename": file.filename
    })


if __name__ == "__main__":
    app.run(debug=True)