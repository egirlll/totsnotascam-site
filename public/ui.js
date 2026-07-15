const menuButton = document.getElementById("menuButton");
const menuOverlay = document.getElementById("menuOverlay");
const sidebar = document.getElementById("sidebar");

const PROGRAMS_DATA = {
  "egirl-casino": {
    description: "gamble ur savings for pretty egirls ~ multiple modes coming soon 🤭",
  },
  "porn-lock": {
    description: "locks ur pc for egirl content ~ u tots won't regret it 💕",
  },
};

if (menuButton && menuOverlay && sidebar) {
  const closeMenu = () => {
    document.body.classList.remove("sidebar-open");
    menuButton.setAttribute("aria-label", "Open menu");
    menuButton.textContent = "☰";
  };

  const openMenu = () => {
    document.body.classList.add("sidebar-open");
    menuButton.setAttribute("aria-label", "Close menu");
    menuButton.textContent = "✕";
  };

  menuButton.addEventListener("click", () => {
    document.body.classList.contains("sidebar-open") ? closeMenu() : openMenu();
  });

  menuOverlay.addEventListener("click", closeMenu);

  sidebar.addEventListener("click", (e) => {
    if (e.target.closest(".sidebar-link") && !e.target.closest(".muted")) closeMenu();
  });

  window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
}

// Heart rain
document.querySelectorAll(".heart-rain").forEach((heartRain) => {
  for (let i = 0; i < 28; i++) {
    const heart = document.createElement("span");
    heart.className = "heart-drop";
    heart.textContent = Math.random() > 0.25 ? "♡" : "♥";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.setProperty("--size", `${Math.random() * 18 + 12}px`);
    heart.style.setProperty("--duration", `${Math.random() * 5 + 6}s`);
    heart.style.setProperty("--delay", `${Math.random() * -10}s`);
    heart.style.setProperty("--drift", `${Math.random() * 120 - 60}px`);
    heart.style.setProperty("--spin", `${(Math.random() > 0.5 ? 1 : -1) * (Math.random() * 220 + 120)}deg`);
    heartRain.appendChild(heart);
  }
});

// Info modal for coming soon programs
const downloadModal = document.getElementById("downloadModal");
const downloadClose = document.getElementById("downloadClose");
const downloadHint = document.getElementById("downloadHint");
const detailKicker = document.getElementById("detailKicker");
const detailTitle = document.getElementById("detailTitle");
const detailDesc = document.getElementById("detailDesc");

const closeModal = () => {
  if (!downloadModal) return;
  downloadModal.classList.remove("open");
  downloadModal.setAttribute("aria-hidden", "true");
};

const openModal = (tile) => {
  if (!downloadModal || !detailTitle) return;
  const slug = tile.dataset.program;
  const data = PROGRAMS_DATA[slug] || {};

  if (detailKicker) detailKicker.textContent = "coming soon";
  detailTitle.textContent = tile.dataset.title || "program";
  if (detailDesc) detailDesc.textContent = data.description || "";
  if (downloadHint) downloadHint.textContent = "dm @totsnotascam on twitter for updates 💞";

  downloadModal.classList.add("open");
  downloadModal.setAttribute("aria-hidden", "false");
};

document.querySelectorAll("[data-program]").forEach((tile) => {
  tile.addEventListener("click", () => openModal(tile));
  tile.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(tile); }
  });
});

downloadClose?.addEventListener("click", closeModal);
downloadModal?.addEventListener("click", (e) => { if (e.target === downloadModal) closeModal(); });
window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
