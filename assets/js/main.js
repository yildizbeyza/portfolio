// filename: assets/js/main.js
/* ---------- Site Configuration ---------- */
const SITE = {
  EMAIL: "yildizbeyzax@gmail.com",
  LINKEDIN_URL: "https://www.linkedin.com/in/beyzanur-yildiz/",
  GITHUB_URL: "https://github.com/yildizbeyza",
  ABOUT_TEXT: `Hi, I’m Beyza, a computer engineer. For me, engineering is not just a job title. It is a way of thinking and living.

The Turkish word “mühendis” comes from hendese, a term that originally meant “geometry.” Hendese itself is derived from the Greek geōmetría, “measuring the earth.” Over time, the word evolved to describe someone skilled in mathematics and problem-solving, a person capable of applying logical structures to practical challenges. In this sense, mühendis has always carried the meaning of more than a profession. It denotes a mindset shaped by precision, analysis, and the ability to create solutions.

That is also how I see myself. To me, being an engineer is not just a line on paper, it is part of who I am. I approach the world with curiosity, use logic to make sense of problems, and rely on creativity to shape solutions. For me, engineering is not only something I do; it is the way I live and think.`,
  STEM_DESC: "A place for STEM, but the real details on my CV.",
  PRISM_DESC: "Things that actually came into focus. Some with artifacts, some still in motion; they wander in and out of Echo.",
  ECHO_DESC: "Same shelf, still in the blur: sparks and half-ideas I chase at odd hours; some stay as a hum, and some eventually show up in Prism."
};

/* ---------- Utilities ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ---------- Theme ---------- */
const THEME_KEY = "theme";
function loadTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
}
function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem(THEME_KEY, next);
}

/* ---------- Navbar Active State ---------- */
function setActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  const map = {
    "index.html": "About",
    "cv.html": "Curriculum Vitae",
    "portfolio.html": "Portfolio",
    "stem.html": "Portfolio",
    "prism.html": "Portfolio",
    "echo.html": "Portfolio",
    "turkish.html": "Turkish"
  };

  const activeSection = map[path] || "About";
  $$("#site-nav a").forEach(a => {
    const text = a.textContent.trim();
    const isCV = a.querySelector(".cv-label-full") || a.querySelector(".cv-label-short");
    const label = isCV ? "Curriculum Vitae" : text;
    if (label === activeSection) {
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
    } else {
      a.classList.remove("active");
      a.removeAttribute("aria-current");
    }
  });
}

/* ---------- Hamburger (mobile) ---------- */
function setupHamburger() {
  const button = $(".hamburger");
  const nav = $("#site-nav");
  if (!button || !nav) return;
  const close = () => {
    nav.style.display = "";
    button.setAttribute("aria-expanded", "false");
  };
  const open = () => {
    nav.style.display = "flex";
    button.setAttribute("aria-expanded", "true");
  };
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    expanded ? close() : open();
  });
  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

/* ---------- Page Content Wiring ---------- */
function wireAbout() {
  const about = $("#about-text");
  if (about) {
    // Preserve paragraphs
    about.innerHTML = "";
    SITE.ABOUT_TEXT.split("\n\n").forEach(p => {
      const el = document.createElement("p");
      el.textContent = p;
      about.appendChild(el);
    });
  }
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();

  const email = $("#btn-email");
  if (email) email.href = `mailto:${SITE.EMAIL}`;

  const li = $("#btn-linkedin");
  if (li) li.href = SITE.LINKEDIN_URL;

  const gh = $("#btn-github");
  if (gh) gh.href = SITE.GITHUB_URL;
}

function wirePortfolioDescriptions() {
  const s = $("#desc-stem");
  const p = $("#desc-prism");
  const e = $("#desc-echo");
  if (s) s.textContent = SITE.STEM_DESC;
  if (p) p.textContent = SITE.PRISM_DESC;
  if (e) e.textContent = SITE.ECHO_DESC;
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  loadTheme();
  setActiveNav();
  setupHamburger();

  const toggleBtn = document.querySelector('[data-toggle-theme]');
  if (toggleBtn) toggleBtn.addEventListener("click", toggleTheme);

  wireAbout();
  wirePortfolioDescriptions();
});
