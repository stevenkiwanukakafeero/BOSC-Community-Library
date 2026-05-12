function toggleTheme() {

    document.body.classList.toggle("dark-mode");

    const button = document.getElementById("themeToggle");

    if (document.body.classList.contains("dark-mode")) {

        if (button) {
            button.textContent = "Light Mode";
        }

        localStorage.setItem("theme", "dark");

    } else {

        if (button) {
            button.textContent = "Dark Mode";
        }

        localStorage.setItem("theme", "light");
    }
}

function loadTheme() {

    const savedTheme = localStorage.getItem("theme");

    const button = document.getElementById("themeToggle");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        if (button) {
            button.textContent = "Light Mode";
        }

    } else {

        document.body.classList.remove("dark-mode");

        if (button) {
            button.textContent = "Dark Mode";
        }
    }
}

document.addEventListener("DOMContentLoaded", loadTheme);