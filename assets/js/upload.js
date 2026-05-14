const uploadForm = document.getElementById("uploadForm");

uploadForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append("title", document.getElementById("title").value);
    formData.append("category", document.getElementById("category").value);
    formData.append("level", document.getElementById("level").value);
    formData.append("description", document.getElementById("description").value);
    formData.append("file", document.getElementById("pdfFile").files[0]);

    try {
        const response = await fetch("http://127.0.0.1:5000/api/upload", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        const message = document.getElementById("uploadMessage");

        if (response.ok) {
            message.innerHTML = `<p>${result.message}</p>`;
            uploadForm.reset();
        } else {
            message.innerHTML = `<p>${result.error}</p>`;
        }

    } catch (error) {
        document.getElementById("uploadMessage").innerHTML =
            "<p>Upload failed. Make sure the Flask backend is running.</p>";
    }
});