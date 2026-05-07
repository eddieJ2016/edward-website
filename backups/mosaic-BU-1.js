// mosaic.js
(() => {
  const mosaic = document.getElementById("mosaic");
  if (!mosaic) return;

  const DEFAULT_THUMB = "assets/mosaic-1.gif";

  // ===== DATA =====
  // Add new projects here; tiles will auto-render in ORDER below.
  const DETAILS = {
    "black-as-u-r": {
      title: "BLACK AS U R",
      thumb: DEFAULT_THUMB, // later: "assets/gifs/black-as-u-r.gif"
     
broadcasterLogo: "",          // e.g. "assets/logos/pbs.png"
broadcasterAlt: "PBS",        // alt text for accessibility
broadcasterText: "—",         // fallback if no logo (or if you want both)


      year: "2022",
      duration: "84 min",
      credits: [
        { label: "Director", value: "Micheal Rice" },
        { label: "Producer", value: "Edward Radford p.g.a." },
        { label: "Executive Producers", value: ["Billy Porter", "Gerald Oxford"] },
      ],
      awards: [
        { festival: "46th Frameline International Film Festival", award: "Out In The Silence Award" },
        { festival: "4th Micheaux Film Festival", award: "Panavision Award for Outstanding Feature" },
        { festival: "4th Micheaux Film Festival", award: "Outstanding Documentary (Feature)" },
        { festival: "34th NewFest Film Festival", award: "Chevrolet Changemaker Award" },
        { festival: "34th NewFest Film Festival", award: "Documentary (Feature) Jury Award | Special Mention" },
      ],
      press: [
        { outlet: "goldenglobes.com", date: "June 29, 2023", url: "#" },
        { outlet: "Deadline", date: "February 15, 2023", url: "#" },
        { outlet: "Atlanta News First", date: "December 9, 2024", url: "#" },
      ],
    },


    "bloomberg": {
  title: "Bloomberg",
  thumb: DEFAULT_THUMB,
  broadcasterLogo: "",
  broadcasterAlt: "",
  broadcasterText: "Bloomberg",
  year: "—",
  duration: "—",
  credits: [],
  awards: [],
  press: [],
},

"party-boi": {
  title: "Party Boi: Black Diamonds in Ice Castles",
  thumb: DEFAULT_THUMB,
  broadcasterLogo: "",
  broadcasterAlt: "",
  broadcasterText: "—",
  year: "—",
  duration: "—",
  credits: [],
  awards: [],
  press: [],
},

"shark": {
  title: "Shark Harbour",
  thumb: "assets/SharkTile.gif",
  
 broadcasterLogo: 
  [
  { src: "assets/natgeo-logo.png", alt: "National Geographic" },
  { src: "assets/abc-australia.png", alt: "ABC Australia" }
],
  
  broadcasterAlt: "",
  broadcasterText: "—",
  year: "2011",
  duration: "59 mins",
  credits: [

        { label: "Director", value: "Michael Lynch" },
        { label: "Producer", value: ["Edward Radford", "Michael Lynch"] },

  ],
  awards: [],
  press: [],
},

"gaddafi": {
  title: "Mad Dog: Gaddafi’s Secret World",
  thumb: "assets/gaddafi.gif",
  broadcasterLogo: 
  [
  { src: "assets/showtime.png", alt: "Showtime" },
  { src: "assets/BBC_logo.png", alt: "BBC", className: "logo--sm"  }
],
  
  broadcasterAlt: "Showtime - BBC4",
  broadcasterText: "—",
  year: "2014",
  duration: "85 min",
  credits: [

        { label: "Director", value: "Christopher Olgiati" },
        { label: "Executive Producer", value: "Nick Fraser" },
        { label: "Director of Photography", value: ["Edward Radford", "Christopher Olgiati"] },
        { label: "Editor", value: "Edward Radford"},
  ],
  awards: [],
  pressWide: true,
  press: [

        { outlet: "The New Yorker", date: "Spring, 2014", url: "#" },
        { outlet: "Variety", date: "April 9, 2014", url: "#" },
        { outlet: "The Telegraph", date: "February 4, 2014", url: "#" },
        { outlet: "The Guardian", date: ", 2014", url: "#" },
        { outlet: "Fox News", date: "April 6, 2014", url: "#" },
        { outlet: "IndieWire", date: "February 19, 2014", url: "#" },

  ],
},

"endgames": {
  title: "Endgames of a Psychopath",
  thumb: "assets/endgames.gif",
  broadcasterLogo: "assets/channel-4-logo.png",
  broadcasterAlt: "Channel 4",
  broadcasterText: "Channel 4",
  year: "2012",
  duration: "48 mins",
  credits: [

        { label: "Director", value: "Paddy Wivell" },
        { label: "Executive Producer", value: "Emma Loach" },
        { label: "Director of Photography", value: "Edward Radford" },
        { label: "Editor", value: "Edward Radford"},
  ],
  awards: [],
  press:  [

        { outlet: "The Times", date: "August 21, 2012", url: "#" },
        { outlet: "The Telegraph", date: "August 20, 2012", url: "#" }, 
        { outlet: "The Guardian", date: "August 21, 2012", url: "#" },
        { outlet: "The Guardian", date: "August 20, 2012", url: "#" },
        { outlet: "Huffington Post", date: "August 20, 2012", url: "#" },
        { outlet: "Metro", date: "August 20, 2012", url: "#" },

  ],
},


  };

  // Controls tile order on the page
  const ORDER = [
  "bloomberg",
  "black-as-u-r",
  "party-boi",
  "gaddafi",
  "endgames",
  "shark",
];

  // ===== HELPERS =====
  function escapeHtml(str) {
    return String(str ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function removeDrawer() {
    const d = mosaic.querySelector(".drawer");
    if (d) {
      d.classList.remove("is-open");
      const removeNow = () => d.remove();
      d.addEventListener("transitionend", removeNow, { once: true });
      // fallback
      setTimeout(() => {
        if (document.body.contains(d)) d.remove();
      }, 450);
    }

    mosaic
      .querySelectorAll(".tile[aria-expanded='true']")
      .forEach((t) => t.setAttribute("aria-expanded", "false"));
  }

function renderCredits(credits) {
  if (!Array.isArray(credits) || credits.length === 0) return "";

  return `
    <div class="credits">
      ${credits.map(c => {
        const lines = Array.isArray(c.value) ? c.value : [c.value];
        const linesHtml = lines
          .filter(Boolean)
          .map(line => `<div class="credit-line">${escapeHtml(line)}</div>`)
          .join("");

        return `
          <div class="credit">
            <div class="credit-k">${escapeHtml(c.label)}</div>
            <div class="credit-v">${linesHtml}</div>
          </div>
        `;
      }).join("")}
    </div>
  `;
}


function renderAwardsGrouped(awards) {
  if (!Array.isArray(awards) || awards.length === 0) return `<div class="drawer-empty">—</div>`;

  // Group by festival
  const map = new Map();
  awards.forEach(a => {
    const fest = a.festival || "—";
    if (!map.has(fest)) map.set(fest, []);
    map.get(fest).push(a.award || "—");
  });

  // Render: festival once + sub-list of awards
  return `
    <ul class="drawer-list">
      ${Array.from(map.entries()).map(([festival, awardList]) => `
        <li>
          <div class="list-top">${escapeHtml(festival)}</div>
          <ul class="sublist">
            ${awardList.map(x => `<li>${escapeHtml(x)}</li>`).join("")}
          </ul>
        </li>
      `).join("")}
    </ul>
  `;
}



  function buildDrawer(id) {
    const p = DETAILS[id] || { title: id, broadcaster: "—", year: "—", duration: "—", credits: [], awards: [], press: [] };

   const awardsHtml = renderAwardsGrouped(p.awards);    

    const pressHtml =
      Array.isArray(p.press) && p.press.length
        ? `<ul class="drawer-list">
            ${p.press
              .map((x) => {
                const outlet = escapeHtml(x.outlet);
                const date = escapeHtml(x.date);
                const url = x.url ? escapeHtml(x.url) : "#";
                return `
                  <li>
                    <a class="drawer-link" href="${url}" target="_blank" rel="noopener">
                      <div class="list-top">${outlet}</div>
                      <div class="list-sub">${date}</div>
                    </a>
                  </li>`;
              })
              .join("")}
          </ul>`
        : `<div class="drawer-empty">—</div>`;

    const drawer = document.createElement("div");
    drawer.className = "drawer";
    drawer.dataset.drawerFor = id;


const hasAwards = Array.isArray(p.awards) && p.awards.length > 0;
const hasPress  = Array.isArray(p.press)  && p.press.length > 0;

// either manual flag OR auto rule:
const pressWide = !hasAwards && hasPress && (p.pressWide === true || p.press.length >= 6);

const optionalPanels = [];

if (hasAwards) {
  optionalPanels.push(`
    <div class="drawer-panel">
      <div class="panel-title">Awards</div>
      ${renderAwardsGrouped(p.awards)}
    </div>
  `);
}

if (hasPress) {
  optionalPanels.push(`
    <div class="drawer-panel press-panel ${pressWide ? "press-wide" : ""}">
      <div class="panel-title">Press</div>
      ${pressHtml}
    </div>
  `);
}

// Force 3-col grid when press needs to span 2 cols
const colCount = pressWide ? 3 : (1 + optionalPanels.length);
const colsClass = `cols-${colCount}`;

// ----- LEFT COLUMN: broadcaster logos + year/duration + credits -----
const broadcasterHtml = (() => {
  const b = p.broadcasterLogo;

  // multiple logos
  if (Array.isArray(b) && b.length) {
    return `
      <div class="broadcaster-logo">
        ${b
          .map(
            (logo) =>
              `<img class="broadcaster-logo${extra}"
         src="${escapeHtml(logo.src)}"
         alt="${escapeHtml(logo.alt || "")}">`
          )
          .join("")}
      </div>
    `;
  }

  // single logo
  if (typeof b === "string" && b.trim()) {
    return `<img class="broadcaster-logo" src="${escapeHtml(b)}" alt="${escapeHtml(p.broadcasterAlt || p.broadcasterText || "Broadcaster")}">`;
  }

  // fallback text
  if (p.broadcasterText && p.broadcasterText !== "—") {
    return `<div class="meta-item">${escapeHtml(p.broadcasterText)}</div>`;
  }

  return "";
})();

const ydParts = [];
if (p.year && p.year !== "—") ydParts.push(`<span class="meta-item">${escapeHtml(p.year)}</span>`);
if (p.duration && p.duration !== "—") ydParts.push(`<span class="meta-item">${escapeHtml(p.duration)}</span>`);

const yearDurationHtml = ydParts.length
  ? `<div class="meta-row">${ydParts.join(`<span class="meta-dot">&middot;</span>`)}</div>`
  : "";

const metaHtml = `
  <div class="meta-stack">
    ${broadcasterHtml}
    ${yearDurationHtml}
  </div>
  ${renderCredits(p.credits)}
`;



drawer.innerHTML = `
  <div class="drawer-inner">
    <h4 class="drawer-title">${escapeHtml(p.title)}</h4>

    <div class="drawer-cols ${colsClass} ${pressWide ? "press-wide-layout" : ""}">
      <div class="drawer-panel">
        <!-- meta + credits -->
        ${metaHtml}
      </div>

      ${optionalPanels.join("")}
    </div>

    <div class="drawer-footer">
      <button class="drawer-close" type="button" aria-label="Close" data-close-drawer>X</button>
    </div>
  </div>
`;

    const closeBtn = drawer.querySelector("[data-close-drawer]");
    if (closeBtn) closeBtn.addEventListener("click", removeDrawer);

    return drawer;
  }

  function toggleDrawer(tile) {
    const id = tile.dataset.id;
    if (!id) return;

    const existing = mosaic.querySelector(".drawer");
    if (existing && existing.dataset.drawerFor === id) {
      removeDrawer();
      return;
    }

    // auto-close previous
    removeDrawer();

    tile.setAttribute("aria-expanded", "true");

    // Insert drawer BETWEEN rows so it pushes down everything below
    const tiles = Array.from(mosaic.querySelectorAll(".tile"));
    const rowTop = tile.offsetTop;
    const nextRowFirst = tiles.find((t) => t.offsetTop > rowTop);

    const drawer = buildDrawer(id);
    if (nextRowFirst) mosaic.insertBefore(drawer, nextRowFirst);
    else mosaic.appendChild(drawer);

    requestAnimationFrame(() => drawer.classList.add("is-open"));
    drawer.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function renderTiles() {
    mosaic.innerHTML = "";

    ORDER.forEach((id) => {
      const p = DETAILS[id];
      if (!p) return;

      const a = document.createElement("a");
      a.className = "tile";
      a.href = "#";
      a.dataset.id = id;
      a.setAttribute("aria-expanded", "false");
      a.setAttribute("aria-label", p.title || id);

      const img = document.createElement("div");
      img.className = "tile-img";
      img.style.backgroundImage = `url("${p.thumb || DEFAULT_THUMB}")`;

      const shade = document.createElement("div");
      shade.className = "tile-shade";

      // Keep for later hover titles (your CSS can hide it for now)
      const meta = document.createElement("div");
      meta.className = "tile-meta";
      meta.innerHTML = `<h3>${escapeHtml(p.title || id)}</h3><p></p>`;

      a.appendChild(img);
      a.appendChild(shade);
      a.appendChild(meta);

      mosaic.appendChild(a);
    });
  }

  // Tile click handler
  mosaic.addEventListener("click", (e) => {
    const tile = e.target.closest(".tile");
    if (!tile) return;
    e.preventDefault();
    toggleDrawer(tile);
  });

  // ESC closes drawer
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") removeDrawer();
  });

  renderTiles();
})();