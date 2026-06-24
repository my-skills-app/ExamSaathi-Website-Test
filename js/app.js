/**
 * ExamSaathi Apps — naya app add karne ke liye is array me entry daalo
 */
const SITE_LOGO = "https://i.ibb.co/Rp0q18d5/photo-6070892408855006758-c.jpg";

const APPS = [
  {
    id: "testpass",
    name: "TestPass",
    url: "https://testpass.examsaathi.site/",
    description: "TestPass se scrape kiye gaye mock tests — categories, subjects aur free practice papers.",
    badges: ["Free", "Mock Tests", "HI + EN"],
    tags: ["testpass", "mock", "ssc", "banking", "railway", "upsc", "practice"]
  },
  {
    id: "testbook",
    name: "Testbook",
    url: "https://testbook.examsaathi.site/",
    description: "Testbook live mock tests — real exam feel ke saath suggested aur popular exams.",
    badges: ["Free", "Live Mock", "Testbook API"],
    tags: ["testbook", "live", "mock", "exam", "api", "ssc", "banking"]
  },
  {
    id: "testranking",
    name: "Test Ranking",
    url: "https://testranking.examsaathi.site/",
    description: "Test series practice karo aur apna performance track karo — ranking aur result review.",
    badges: ["Free", "Test Series", "Ranking"],
    tags: ["ranking", "test series", "score", "result", "review", "competitive"]
  },
  {
    id: "bhagavatgita",
    name: "Bhagavat Gita",
    url: "https://bhagavatgita.examsaathi.site/",
    logo: "https://i.ibb.co/Z6B0vCbS/bhagavat-gita-logo-jpg.jpg",
    description: "Bhagavad Gita episodes, full audio playback, watchlist aur spiritual learning — calm, focused app.",
    badges: ["Spiritual", "Audio", "Android"],
    tags: ["bhagavat gita", "gita", "spiritual", "audio", "episodes", "bhagavad", "hindu"],
    titleTag: "Official App"
  }
];

const grid = document.getElementById("appGrid");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const appCountEl = document.getElementById("appCount");

function renderApps(list) {
  grid.innerHTML = "";

  if (!list.length) {
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");

  list.forEach((app) => {
    const card = document.createElement("a");
    card.className = "app-card";
    card.href = app.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.setAttribute("role", "listitem");
    card.setAttribute("title", `${app.name} — ${app.titleTag || "Free Mock Test Online"}`);
    card.setAttribute("aria-label", `${app.name} — ${app.description}`);

    const badges = app.badges
      .map((b) => {
        const cls = b.toLowerCase() === "free" ? "badge badge-free" : "badge badge-live";
        return `<span class="${cls}">${b}</span>`;
      })
      .join("");

    const host = new URL(app.url).host;
    const logo = app.logo || SITE_LOGO;

    card.innerHTML = `
      <div class="app-card-top">
        <div class="logo-box logo-box-lg app-icon">
          <img src="${logo}" alt="${app.name} — ExamSaathi App" width="52" height="52" loading="lazy">
        </div>
        <div class="app-info">
          <h3 class="app-name">${app.name}</h3>
          <p class="app-desc">${app.description}</p>
          <div class="app-badges">${badges}</div>
        </div>
      </div>
      <div class="app-card-footer">
        <span class="app-url">${host}</span>
        <span class="app-cta">
          Open App
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
        </span>
      </div>
    `;

    grid.appendChild(card);
  });
}

function filterApps(query) {
  const q = query.trim().toLowerCase();
  if (!q) return APPS;

  return APPS.filter((app) => {
    const haystack = [
      app.name,
      app.description,
      app.url,
      ...app.badges,
      ...app.tags
    ].join(" ").toLowerCase();
    return haystack.includes(q);
  });
}

function init() {
  appCountEl.textContent = String(APPS.length);
  renderApps(APPS);

  searchInput.addEventListener("input", (e) => {
    renderApps(filterApps(e.target.value));
  });
}

init();
