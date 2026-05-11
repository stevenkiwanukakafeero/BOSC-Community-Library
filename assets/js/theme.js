function toggleTheme() {
    document.body.classList.toggle("dark-mode");

    const button = document.getElementById("themeToggle");

    if (document.body.classList.contains("dark-mode")) {
        button.textContent = "Light Mode";
        localStorage.setItem("theme", "dark");
    } else {
        button.textContent = "Dark Mode";
        localStorage.setItem("theme", "light");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    const button = document.getElementById("themeToggle");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");

        if (button) {
            button.textContent = "Light Mode";
        }
    }
});