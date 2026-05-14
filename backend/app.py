@app.route("/api/upload", methods=["POST"])
def upload_file():
    title = request.form.get("title")
    category = request.form.get("category")
    level = request.form.get("level")
    description = request.form.get("description")

    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if not file.filename.lower().endswith(".pdf"):
        return jsonify({"error": "Only PDF files are allowed"}), 400

    file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
    file.save(file_path)

    with open(RESOURCES_FILE, "r") as resource_file:
        resources = json.load(resource_file)

    new_resource = {
        "title": title,
        "category": category,
        "level": level,
        "description": description,
        "file": file.filename
    }

    resources.append(new_resource)

    with open(RESOURCES_FILE, "w") as resource_file:
        json.dump(resources, resource_file, indent=4)

    return jsonify({
        "message": "PDF resource uploaded successfully",
        "resource": new_resource
    })