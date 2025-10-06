const btn = document.getElementById("theme-toggle");
const html = document.documentElement;
const saved = localStorage.getItem("theme");
if (saved) html.dataset.theme = saved;

btn.addEventListener("click", () => {
  const newTheme = html.dataset.theme === "dark" ? "light" : "dark";
  html.dataset.theme = newTheme;
  localStorage.setItem("theme", newTheme);
});

document.getElementById("year").textContent = new Date().getFullYear();
