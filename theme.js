function toggleTheme() {
  const isDark = document.body.classList.contains("bg-dark");

  if (isDark) {
    document.body.className = "bg-light text-dark";
    localStorage.setItem("theme", "light");
  } else {
    document.body.className = "bg-dark text-light";
    localStorage.setItem("theme", "dark");
  }
}

function applySavedTheme() {
  const theme = localStorage.getItem("theme") || "light";
  document.body.className = theme === "dark" ? "bg-dark text-light" : "bg-light text-dark";
}

document.addEventListener("DOMContentLoaded", () => {
  applySavedTheme();
  document.getElementById("toggle-theme")?.addEventListener("click", toggleTheme);
});
