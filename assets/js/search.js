const resources = [
    "Open Source Software",
    "Java Programming",
    "Python Development",
    "GitHub Collaboration",
    "Software Engineering",
    "Linux Administration"
];

function searchResources() {

    const input = document.getElementById("searchInput").value.toLowerCase();

    const results = document.getElementById("results");

    results.innerHTML = "";

    const filtered = resources.filter(resource =>
        resource.toLowerCase().includes(input)
    );

    if(filtered.length === 0) {
        results.innerHTML = "<p>No resources found.</p>";
    }

    filtered.forEach(resource => {
        results.innerHTML += `<p>${resource}</p>`;
    });
}