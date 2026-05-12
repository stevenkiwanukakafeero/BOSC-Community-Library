let resources = [];

async function loadResources() {
    try {
        const response = await fetch("./data/resources.json");

        if (!response.ok) {
            throw new Error("Could not load resources.json");
        }

        resources = await response.json();

    } catch (error) {
        console.error("Resource loading error:", error);

        const results = document.getElementById("results");
        if (results) {
            results.innerHTML =
                "<p>Failed to load resources. Check resources.json path or JSON format.</p>";
        }

        return;
    }

    displayStats();
    displayDashboard();
    displayResources(resources);
}

function displayResources(resourceList) {
    const results = document.getElementById("results");

    if (!results) {
        return;
    }

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
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");

    const input = searchInput ? searchInput.value.toLowerCase() : "";
    const selectedCategory = categoryFilter ? categoryFilter.value : "all";

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

    if (!stats) {
        return;
    }

    const totalResources = resources.length;

    const categories = [
        ...new Set(resources.map(resource => resource.category))
    ];

    stats.innerHTML = `
        <p><strong>Total Resources:</strong> ${totalResources}</p>
        <p><strong>Categories:</strong> ${categories.length}</p>
    `;
}

function displayDashboard() {
    const dashboard = document.getElementById("dashboardCards");

    if (!dashboard) {
        return;
    }

    const totalResources = resources.length;

    const categories = [
        ...new Set(resources.map(resource => resource.category))
    ];

    const beginnerResources = resources.filter(
        resource => resource.level === "Beginner"
    ).length;

    const intermediateResources = resources.filter(
        resource => resource.level === "Intermediate"
    ).length;

    dashboard.innerHTML = `
        <div class="dashboard-card">
            <h3>${totalResources}</h3>
            <p>Total Resources</p>
        </div>

        <div class="dashboard-card">
            <h3>${categories.length}</h3>
            <p>Categories</p>
        </div>

        <div class="dashboard-card">
            <h3>${beginnerResources}</h3>
            <p>Beginner Resources</p>
        </div>

        <div class="dashboard-card">
            <h3>${intermediateResources}</h3>
            <p>Intermediate Resources</p>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", loadResources);