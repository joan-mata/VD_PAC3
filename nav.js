// ============================================================
// nav.js — Barra de progreso superior y puntos de navegación lateral
// ============================================================

const SECTIONS = [
  { id: "cover",      label: "Portada" },
  { id: "explore",    label: "Exploración" },
  { id: "act1",       label: "Acto 1 · Familias" },
  { id: "act2",       label: "Acto 2 · Canales" },
  { id: "act3",       label: "Acto 3 · Fidelización" },
  { id: "act4",       label: "Acto 4 · Upgrades" },
  { id: "conclusion", label: "Conclusión" },
];

// ─── Progress bar ────────────────────────────────────────────
function updateProgressBar() {
  const bar = document.getElementById("progress-bar");
  if (!bar) return;
  const scrollTop    = window.scrollY;
  const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
  const pct          = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  bar.style.width    = `${Math.min(pct, 100)}%`;
}

// ─── Side nav dots ───────────────────────────────────────────
function buildNavDots() {
  const nav = document.getElementById("side-nav");
  if (!nav) return;

  SECTIONS.forEach(({ id, label }) => {
    const dot = document.createElement("div");
    dot.className   = "nav-dot";
    dot.dataset.target = id;

    const lbl = document.createElement("span");
    lbl.className = "dot-label";
    lbl.textContent = label;
    dot.appendChild(lbl);

    dot.addEventListener("click", () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    });

    nav.appendChild(dot);
  });
}

function updateActiveDot() {
  const dots = document.querySelectorAll(".nav-dot");
  const midY = window.innerHeight * 0.45;

  let closest    = null;
  let closestDist = Infinity;

  SECTIONS.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    const dist   = Math.abs(center - midY);
    if (dist < closestDist) {
      closestDist = dist;
      closest     = id;
    }
  });

  dots.forEach(dot => {
    dot.classList.toggle("active", dot.dataset.target === closest);
  });
}

// ─── Scroll-reveal via IntersectionObserver ──────────────────
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

// ─── Init ─────────────────────────────────────────────────────
function initNav() {
  buildNavDots();

  window.addEventListener("scroll", () => {
    updateProgressBar();
    updateActiveDot();
  }, { passive: true });

  // Initial state
  updateProgressBar();
  updateActiveDot();
  initReveal();
}

document.addEventListener("DOMContentLoaded", initNav);
