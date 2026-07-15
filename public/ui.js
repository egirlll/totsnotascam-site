const menuButton = document.getElementById("menuButton");
const menuOverlay = document.getElementById("menuOverlay");
const sidebar = document.getElementById("sidebar");

const PROGRAMS_DATA = {
  "autodrain": {
    description: "a chrome extension that drains ur wallet while u goon ~ tots safe i promise 💞 customisable intervals and amounts ~",
  },
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

// Download modal
const downloadModal = document.getElementById("downloadModal");
const downloadClose = document.getElementById("downloadClose");
const downloadForm = document.getElementById("downloadForm");
const downloadPassword = document.getElementById("downloadPassword");
const downloadStatus = document.getElementById("downloadStatus");
const downloadHint = document.getElementById("downloadHint");
const detailKicker = document.getElementById("detailKicker");
const detailTitle = document.getElementById("detailTitle");
const detailDesc = document.getElementById("detailDesc");

let selectedProgram = null;

const setStatus = (msg) => { if (downloadStatus) downloadStatus.textContent = msg; };

const closeModal = () => {
  if (!downloadModal) return;
  downloadModal.classList.remove("open");
  downloadModal.setAttribute("aria-hidden", "true");
  selectedProgram = null;
  downloadForm?.reset();
  if (downloadForm) downloadForm.hidden = false;
  setStatus("");
};

const openModal = (tile) => {
  if (!downloadModal || !detailTitle) return;
  const isComingSoon = "comingSoon" in tile.dataset;
  const slug = tile.dataset.program;
  const data = PROGRAMS_DATA[slug] || {};

  selectedProgram = slug;

  if (detailKicker) detailKicker.textContent = isComingSoon ? "coming soon" : "program";
  detailTitle.textContent = tile.dataset.title || "program";
  if (detailDesc) detailDesc.textContent = data.description || "";

  if (downloadHint) {
    downloadHint.textContent = isComingSoon
      ? "dm @totsnotascam on twitter to pre-order 💞"
      : "dm @totsnotascam on twitter for access 💞";
  }

  if (downloadForm) downloadForm.hidden = isComingSoon;

  downloadModal.classList.add("open");
  downloadModal.setAttribute("aria-hidden", "false");
  setStatus("");
  if (!isComingSoon) setTimeout(() => downloadPassword?.focus(), 0);
};

document.querySelectorAll("[data-program]").forEach((tile) => {
  tile.addEventListener("click", () => openModal(tile));
  tile.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(tile); }
  });
});

downloadClose?.addEventListener("click", closeModal);
downloadModal?.addEventListener("click", (e) => { if (e.target === downloadModal) closeModal(); });

downloadForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  setStatus("dm @totsnotascam for the password ~");
});

window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
