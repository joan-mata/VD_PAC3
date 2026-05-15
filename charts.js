// ============================================================
// charts.js — Animaciones y gráficos · importa data.js
// ============================================================

import {
  ACT1_SEGMENTS, ACT1_MAX_REVENUE,
  ACT2_CHANNELS,
  ACT3_CLIENTS,
  ACT4_DATA,
} from "./data.js";

// ─── Utility: counter animation ──────────────────────────────
function animateCounter(el, target, duration = 1200, decimals = 0, prefix = "", suffix = "") {
  const start     = performance.now();
  const startVal  = 0;

  function tick(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current  = startVal + (target - startVal) * eased;

    el.textContent = prefix + current.toFixed(decimals).replace(".", ",") + suffix;

    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

// ─── Utility: counter animation with locale thousands separator ─
function animateCounterLocale(el, target, duration = 1200, prefix = "", suffix = "") {
  const start = performance.now();

  function tick(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = Math.round(target * eased);

    el.textContent = prefix + current.toLocaleString("es-ES") + suffix;

    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

// ─── ACT 1 — Bar chart ────────────────────────────────────────
function buildAct1Chart() {
  const container = document.getElementById("act1-bars");
  if (!container) return;

  container.innerHTML = "";

  ACT1_SEGMENTS.forEach(seg => {
    const pct = (seg.totalRevenue / ACT1_MAX_REVENUE) * 100;

    const row = document.createElement("div");
    row.className = "bar-row reveal";

    row.innerHTML = `
      <div class="bar-label">${seg.label}</div>
      <div class="bar-track">
        <div
          class="bar-fill ${seg.highlight ? "bar-fill--highlight" : ""}"
          data-pct="${pct}"
          style="background:${seg.color}"
        >
        </div>
      </div>
      <div class="bar-value">
        <span class="counter" data-target="${seg.totalRevenue}" data-suffix="€">0€</span>
      </div>
    `;

    // Sub-meta line
    const meta = document.createElement("div");
    meta.style.gridColumn = "2 / 4";
    meta.style.marginTop  = "-18px";
    meta.innerHTML = `<div class="bar-meta">ADR ${seg.adr}€/noche · ${seg.nights} noches · ${seg.bookings.toLocaleString("es-ES")} reservas</div>`;

    container.appendChild(row);
    container.appendChild(meta);
  });

  observeAndAnimateBars("#act1");
}

// ─── ACT 2 — Channel cards ────────────────────────────────────
function buildAct2Chart() {
  ACT2_CHANNELS.forEach(ch => {
    const card = document.getElementById(`channel-${ch.id}`);
    if (!card) return;

    // Confirmation rate bar (inside cards)
    const fillEl = card.querySelector(".confirm-bar-fill");
    if (fillEl) {
      fillEl.dataset.pct   = ch.confirmationRate;
      fillEl.style.background = ch.color;
    }

    // Counter elements
    card.querySelectorAll("[data-counter]").forEach(el => {
      const key  = el.dataset.counter;
      const decs = parseInt(el.dataset.decimals || "0");
      const suf  = el.dataset.suffix || "";
      const pre  = el.dataset.prefix || "";
      el.dataset.target   = ch[key];
      el.dataset.decimals = decs;
      el.dataset.suffix   = suf;
      el.dataset.prefix   = pre;
      el.textContent      = pre + "0" + suf;
    });
  });

  // Animates the new large confirmation-rate bars (.bar-fill) and their counters
  observeAndAnimateBars("#act2");
}

// ─── ACT 3 — Client cards ─────────────────────────────────────
function buildAct3Chart() {
  ACT3_CLIENTS.forEach(cl => {
    const card = document.getElementById(`client-${cl.id}`);
    if (!card) return;

    card.querySelectorAll("[data-counter]").forEach(el => {
      const key  = el.dataset.counter;
      const decs = parseInt(el.dataset.decimals || "0");
      const suf  = el.dataset.suffix || "";
      const pre  = el.dataset.prefix || "";
      el.dataset.target   = cl[key];
      el.dataset.decimals = decs;
      el.dataset.suffix   = suf;
      el.dataset.prefix   = pre;
      el.textContent      = pre + "0" + suf;
    });
  });
}

// ─── ACT 4 — Donut SVG ───────────────────────────────────────
function buildAct4Donut() {
  const svg   = document.getElementById("donut-svg");
  if (!svg) return;

  const R          = 80;
  const cx         = 110;
  const cy         = 110;
  const circumf    = 2 * Math.PI * R;
  const upgradePct = ACT4_DATA.upgrades.percentage / 100; // 0.956
  const downPct    = ACT4_DATA.downgrades.percentage / 100;

  // Background circle
  const bg = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  bg.setAttribute("cx", cx);
  bg.setAttribute("cy", cy);
  bg.setAttribute("r", R);
  bg.setAttribute("class", "donut-bg");
  svg.appendChild(bg);

  // Upgrade arc
  const upArc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  upArc.setAttribute("cx", cx);
  upArc.setAttribute("cy", cy);
  upArc.setAttribute("r", R);
  upArc.setAttribute("class", "donut-upgrade");
  upArc.setAttribute("transform", `rotate(-90 ${cx} ${cy})`);
  upArc.dataset.circumf    = circumf;
  upArc.dataset.targetPct  = upgradePct;
  svg.appendChild(upArc);

  // Downgrade arc (offset by upgrade arc)
  const downArc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  downArc.setAttribute("cx", cx);
  downArc.setAttribute("cy", cy);
  downArc.setAttribute("r", R);
  downArc.setAttribute("class", "donut-downgrade");
  downArc.setAttribute("transform", `rotate(${-90 + upgradePct * 360} ${cx} ${cy})`);
  downArc.dataset.circumf   = circumf;
  downArc.dataset.targetPct = downPct;
  svg.appendChild(downArc);

  // Center text
  const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
  txt.setAttribute("x", cx);
  txt.setAttribute("y", cy);
  txt.setAttribute("class", "donut-center");
  txt.textContent = "95,6%";
  svg.appendChild(txt);
}

// ─── Generic observer: triggers bars + counters ───────────────
function observeAndAnimateBars(sectionSelector) {
  const section = document.querySelector(sectionSelector);
  if (!section) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        // Animate bar fills (act1 + act2 new large bars)
        section.querySelectorAll(".bar-fill[data-pct]").forEach(bar => {
          bar.style.width = bar.dataset.pct + "%";
        });

        // Animate confirm-bar fills (inside channel cards)
        section.querySelectorAll(".confirm-bar-fill[data-pct]").forEach(bar => {
          bar.style.width = bar.dataset.pct + "%";
        });

        // Animate donut arcs
        section.querySelectorAll(".donut-upgrade[data-circumf], .donut-downgrade[data-circumf]").forEach(arc => {
          const c   = parseFloat(arc.dataset.circumf);
          const pct = parseFloat(arc.dataset.targetPct);
          const dash = pct * c;
          arc.style.strokeDasharray = `${dash} ${c - dash}`;
        });

        // Animate counters
        section.querySelectorAll("[data-counter], .counter[data-target]").forEach(el => {
          const target   = parseFloat(el.dataset.target);
          const decimals = parseInt(el.dataset.decimals || "0");
          const suffix   = el.dataset.suffix   || "";
          const prefix   = el.dataset.prefix   || "";
          if (!isNaN(target)) {
            animateCounter(el, target, 1400, decimals, prefix, suffix);
          }
        });

        observer.disconnect();
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(section);
}

// ─── Tooltip smart vertical positioning ──────────────────────
function initTooltips() {
  document.querySelectorAll(".tooltip-btn-wrap").forEach(wrap => {
    const btn = wrap.querySelector(".tooltip-btn");
    const tip = wrap.querySelector(".tooltip-content");
    if (!btn || !tip) return;

    btn.addEventListener("mouseenter", () => {
      const rect = wrap.getBoundingClientRect();
      // If the button is in the upper 260px of the viewport, show tooltip below
      if (rect.top < 260) {
        tip.classList.add("tooltip--below");
      } else {
        tip.classList.remove("tooltip--below");
      }
    });

    // Keyboard: toggle on Enter/Space for accessibility
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        wrap.classList.toggle("tooltip--open");
      }
      if (e.key === "Escape") {
        wrap.classList.remove("tooltip--open");
        btn.blur();
      }
    });
  });
}

// ─── Section-level observers (one per act) ────────────────────
function initSectionObservers() {
  // EXPLORE — counter animation for the exploratory section
  const exploreObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll(".counter[data-target]").forEach(el => {
        const target   = parseFloat(el.dataset.target);
        const decimals = parseInt(el.dataset.decimals || "0");
        const suffix   = el.dataset.suffix   || "";
        const prefix   = el.dataset.prefix   || "";
        const fmt      = el.dataset.format   || "";
        if (!isNaN(target)) {
          if (fmt === "thousands") {
            animateCounterLocale(el, target, 1400, prefix, suffix);
          } else {
            animateCounter(el, target, 1400, decimals, prefix, suffix);
          }
        }
      });
      exploreObserver.disconnect();
    });
  }, { threshold: 0.2 });
  const explore = document.getElementById("explore");
  if (explore) exploreObserver.observe(explore);

  // ACT 1
  observeAndAnimateBars("#act1");

  // ACT 2
  const act2Observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll(".confirm-bar-fill[data-pct]").forEach(bar => {
        bar.style.width = bar.dataset.pct + "%";
      });
      e.target.querySelectorAll(".counter[data-target]").forEach(el => {
        const target   = parseFloat(el.dataset.target);
        const decimals = parseInt(el.dataset.decimals || "0");
        const suffix   = el.dataset.suffix   || "";
        const prefix   = el.dataset.prefix   || "";
        if (!isNaN(target)) animateCounter(el, target, 1400, decimals, prefix, suffix);
      });
      act2Observer.disconnect();
    });
  }, { threshold: 0.2 });
  const act2 = document.getElementById("act2");
  if (act2) act2Observer.observe(act2);

  // ACT 3 counters
  const act3Observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll(".counter[data-target]").forEach(el => {
        const target   = parseFloat(el.dataset.target);
        const decimals = parseInt(el.dataset.decimals || "0");
        const suffix   = el.dataset.suffix   || "";
        const prefix   = el.dataset.prefix   || "";
        if (!isNaN(target)) animateCounter(el, target, 1400, decimals, prefix, suffix);
      });
      act3Observer.disconnect();
    });
  }, { threshold: 0.2 });
  const act3 = document.getElementById("act3");
  if (act3) act3Observer.observe(act3);

  // ACT 4 donut
  const act4Observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;

      e.target.querySelectorAll(".donut-upgrade[data-circumf], .donut-downgrade[data-circumf]").forEach(arc => {
        const c   = parseFloat(arc.dataset.circumf);
        const pct = parseFloat(arc.dataset.targetPct);
        const dash = pct * c;
        arc.style.strokeDasharray = `${dash} ${c - dash}`;
      });

      e.target.querySelectorAll(".counter[data-target]").forEach(el => {
        const target   = parseFloat(el.dataset.target);
        const decimals = parseInt(el.dataset.decimals || "0");
        const suffix   = el.dataset.suffix   || "";
        const prefix   = el.dataset.prefix   || "";
        if (!isNaN(target)) animateCounter(el, target, 1600, decimals, prefix, suffix);
      });

      act4Observer.disconnect();
    });
  }, { threshold: 0.25 });
  const act4 = document.getElementById("act4");
  if (act4) act4Observer.observe(act4);

  // Conclusion profile value counters
  const concObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll(".counter[data-target]").forEach(el => {
        const target   = parseFloat(el.dataset.target);
        const decimals = parseInt(el.dataset.decimals || "0");
        const suffix   = el.dataset.suffix   || "";
        const prefix   = el.dataset.prefix   || "";
        if (!isNaN(target)) animateCounter(el, target, 1400, decimals, prefix, suffix);
      });
      concObserver.disconnect();
    });
  }, { threshold: 0.2 });
  const conc = document.getElementById("conclusion");
  if (conc) concObserver.observe(conc);
}

// ─── Init ─────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  buildAct1Chart();
  buildAct2Chart();
  buildAct3Chart();
  buildAct4Donut();
  initSectionObservers();
  initTooltips();
});
