let resources = [];

async function loadResources() {
    try {
        const response = await fetch("data/resources.json");
        resources = await response.json();

        displayResources(resources);
        displayStats();
    } catch (error) {
        document.getElementById("results").innerHTML =
            "<p>Failed to load resources. Please run the website using localhost.</p>";
    }
}

function displayResources(resourceList) {
    const results = document.getElementById("results");
    results.innerHTML = "";

    if (resourceList.length === 0) {
        results.innerHTML = "<p>No resources found.</p>";
        return;
    }

    resourceList.forEach(resource => {
        results.innerHTML += `
            <div class="resource-card">
                <h3>${resource.title}</h3>
                <p><strong>Category:</strong> ${resource.category}</p>
                <p><strong>Level:</strong> ${resource.level}</p>
                <p>${resource.description}</p>
            </div>
        `;
    });
}

function searchResources() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const selectedCategory = document.getElementById("categoryFilter").value;

    const filtered = resources.filter(resource => {
        const matchesSearch =
            resource.title.toLowerCase().includes(input) ||
            resource.category.toLowerCase().includes(input) ||
            resource.description.toLowerCase().includes(input);

        const matchesCategory =
            selectedCategory === "all" || resource.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayResources(filtered);
}

function filterByCategory() {
    searchResources();
}

function displayStats() {
    const stats = document.getElementById("stats");
    const categories = [...new Set(resources.map(resource => resource.category))];

    stats.innerHTML = `
        <p><strong>Total Resources:</strong> ${resources.length}</p>
        <p><strong>Categories:</strong> ${categories.length}</p>
    `;
}

document.addEventListener("DOMContentLoaded", loadResources);