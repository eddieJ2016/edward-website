// mosaic.js
(() => {
  const mosaic = document.getElementById("mosaic");
  if (!mosaic) return;

  const DEFAULT_THUMB = "assets/mosaic-1.gif";

  // ===== DATA =====
  const DETAILS = {
    "black-as-u-r": {
      title: "BLACK AS U R",
      thumb: "assets/black-as-u-r.jpg",

      broadcasterLogo: "assets/RiceCreative-logo.png",          // e.g. "assets/logos/pbs.png" OR array of logo objects
      broadcasterAlt: "Rice Creative",
      broadcasterText: "Rice Creative",

      year: "2022",
      duration: "84 min",
      credits: [
        { label: "Director", value: "Micheal Rice" },
        { label: "Producer + Editor", value: "Edward Radford p.g.a." },
        { label: "Executive Producers", value: ["Billy Porter", "Gerald Oxford"] },
         { label: "Director of Photography", value: "Holly Fischer" },
      ],
      awards: [
        { festival: "46th Frameline International Film Festival", award: "Out In The Silence Award" },
        { festival: "4th Micheaux Film Festival", award: "Panavision Award for Outstanding Feature" },
        { festival: "4th Micheaux Film Festival", award: "Outstanding Documentary (Feature)" },
        { festival: "34th NewFest Film Festival", award: "Chevrolet Changemaker Award" },
        { festival: "34th NewFest Film Festival", award: "Documentary (Feature) Jury Award | Special Mention" },
      ],
      press: [
        { outlet: "Golden Globes", date: "June 29, 2023", url: "#" },
        { outlet: "Deadline", date: "February 15, 2023", url: "#" },
        { outlet: "Atlanta News First", date: "December 9, 2024", url: "#" },
      ],
    },

    "bloomberg": {
      title: "Bloomberg",
      thumb: "assets/bloomberg.jpg",
      broadcasterLogo: "assets/bloomberg-media-studios-logo.png",
      broadcasterAlt: "Bloomberg Media Studios",
      broadcasterText: "Bloomberg Media Studios",
      year: "2024",
      duration: "—",
      credits: [
        { label: "Creative & Edit", value: "Edward Radford" },
      ],
      awards: [
        { festival: "Financial Communications Society — 30th Portfolio Awards, May 2024", award: "Best Branded Content · Gold Award" },
      ],
      press: [],
    },

    "party-boi": {
      title: "Party Boi: Black Diamonds in Ice Castles",
      thumb: "assets/partyboi.png",
      broadcasterLogo: "assets/RiceCreative-logo.png",
      broadcasterAlt: "Rice Creative",
      broadcasterText: "Rice Creative",
      year: "2018",
      duration: "58 mins",
      credits: [
        { label: "Director", value: "Micheal Rice" },
        { label: "Producer + Editor", value: "Edward Radford" },
      ],
      awards: [

        { festival: "28th Pan-African Arts & Film Festival", award: "Best Documentary (Programmers’ Award)" },
        { festival: "25th American Black Film Festival", award: "Official Selection" },

      ],
      press: [],
    },

    "shark": {
      title: "Shark Harbour",
      thumb: "assets/SharkTile.gif",
      broadcasterLogo: [
        { src: "assets/natgeo-logo.png", alt: "National Geographic" },
        { src: "assets/abc-australia.png", alt: "ABC Australia", className: "logo--sm" },
      ],
      broadcasterAlt: "",
      broadcasterText: "—",
      year: "2011",
      duration: "59 min",
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
      broadcasterLogo: [
        // Add className to shrink a specific logo, e.g. { ..., className: "logo--sm" }
        { src: "assets/showtime.png", alt: "Showtime", className: "logo--sm" },
        { src: "assets/BBC_logo.png", alt: "BBC", className: "logo--xs" },
      ],
      broadcasterAlt: "Showtime - BBC4",
      broadcasterText: "—",
      year: "2014",
      duration: "85 min",
      credits: [
        { label: "Director", value: "Christopher Olgiati" },
        { label: "Executive Producer", value: "Nick Fraser" },
        { label: "Director of Photography", value: ["Edward Radford", "Christopher Olgiati"] },
        { label: "Editor", value: "Edward Radford" },
      ],
      awards: [],
      pressWide: true,
      press: [
        { outlet: "The New Yorker", date: "Spring, 2014", url: "#" },
        { outlet: "The Telegraph", date: "February 4, 2014", url: "#", quote: "… thrillingly revelatory …" },
        { outlet: "The Guardian", date: "February 4, 2014", url: "#", quote: "A masterful portrait of the man and of his rise and downfall …" },
        { outlet: "The Spectator", date: "February 6, 2014", url: "#", quote: "… fascinating, supremely well-researched …" },
        { outlet: "IndieWire", date: "February 19, 2014", url: "#" },
        { outlet: "Fox News", date: "April 6, 2014", url: "#" },
        { outlet: "Variety", date: "April 9, 2014", url: "#" },
      ],
      
    },

    "endgames": {
      title: "Endgames of a Psychopath",
      thumb: "assets/endgames.gif",
      broadcasterLogo: "assets/channel-4-logo.png",
      broadcasterAlt: "Channel 4",
      broadcasterText: "Channel 4",
      year: "2012",
      duration: "48 min",
      credits: [
        { label: "Director", value: "Paddy Wivell" },
        { label: "Executive Producer", value: "Emma Loach" },
        { label: "Director of Photography", value: "Edward Radford" },
        { label: "Editor", value: "Edward Radford" },
      ],
      awards: [],
      press: [
        { outlet: "The Times", date: "August 21, 2012", url: "#", quote: "… one of the best researched, revealing documentaries of the year …" },

        { outlet: "The Telegraph", date: "August 20, 2012", url: "#", quote: "Compelling … a troubling experience …" },
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

  // Safe for class attr (letters/numbers/_/- and spaces)
  function safeClassName(str) {
    return String(str ?? "")
      .trim()
      .split(/\s+/)
      .map((t) => t.replace(/[^a-zA-Z0-9_-]/g, ""))
      .filter(Boolean)
      .join(" ");
  }

  function removeDrawer() {
    const d = mosaic.querySelector(".drawer");
    if (d) {
      d.classList.remove("is-open");
      const removeNow = () => d.remove();
      d.addEventListener("transitionend", removeNow, { once: true });
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
        ${credits.map((c) => {
          const lines = Array.isArray(c.value) ? c.value : [c.value];
          const linesHtml = lines
            .filter(Boolean)
            .map((line) => `<div class="credit-line">${escapeHtml(line)}</div>`)
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

    const map = new Map();
    awards.forEach((a) => {
      const fest = a.festival || "—";
      if (!map.has(fest)) map.set(fest, []);
      map.get(fest).push(a.award || "—");
    });

    return `
      <ul class="drawer-list">
        ${Array.from(map.entries()).map(([festival, awardList]) => `
          <li>
            <div class="list-top">${escapeHtml(festival)}</div>
            <ul class="sublist">
              ${awardList.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}
            </ul>
          </li>
        `).join("")}
      </ul>
    `;
  }

  function buildDrawer(id) {
    const p = DETAILS[id] || {
      title: id,
      broadcasterLogo: "",
      broadcasterAlt: "",
      broadcasterText: "—",
      year: "—",
      duration: "—",
      credits: [],
      awards: [],
      press: [],
    };

    const hasAwards = Array.isArray(p.awards) && p.awards.length > 0;
    const hasPress  = Array.isArray(p.press)  && p.press.length > 0;
    const pressWide = !hasAwards && hasPress && (p.pressWide === true || p.press.length >= 6);


    const renderPressItems = (arr) => arr.map((x) => {
  const outlet = escapeHtml(x.outlet);
  const date = escapeHtml(x.date);
  const url = x.url ? escapeHtml(x.url) : "#";

  return `
    <li>
      <a class="drawer-link${x.quote ? " has-quote" : ""}" href="${url}" target="_blank" rel="noopener">
        <div class="list-top">${outlet}</div>
        <div class="list-sub">${date}</div>
        ${x.quote ? `<div class="press-quote">${escapeHtml(x.quote)}</div>` : ``}
      </a>
    </li>`;
}).join("");

const splitPress = (arr) => {
  const left = [], right = [];
  let lw = 0, rw = 0;

  arr.forEach((x) => {
    const w = x.quote ? 1.7 : 1; // heuristic so quotes don't all clump
    if (lw <= rw) { left.push(x); lw += w; }
    else { right.push(x); rw += w; }
  });

  return [left, right];
};

const pressHtml =
  hasPress
    ? (pressWide
        ? (() => {
            const [c1, c2] = splitPress(p.press);
            return `
              <div class="press-cols">
                <ul class="drawer-list press-col">${renderPressItems(c1)}</ul>
                <ul class="drawer-list press-col">${renderPressItems(c2)}</ul>
              </div>`;
          })()
        : `<ul class="drawer-list">${renderPressItems(p.press)}</ul>`)
    : `<div class="drawer-empty">—</div>`;

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

    const colCount = pressWide ? 3 : (1 + optionalPanels.length);
    const colsClass = `cols-${colCount}`;

    // ----- LEFT COLUMN: broadcaster logos + year/duration + credits -----
    const broadcasterHtml = (() => {
      const b = p.broadcasterLogo;

      // multiple logos
      if (Array.isArray(b) && b.length) {
        return `
          <div class="broadcaster-logos">
            ${b.map((logo) => {
              const extra = logo.className ? ` ${safeClassName(logo.className)}` : "";
              return `
                <img class="broadcaster-logo${extra}"
                     src="${escapeHtml(logo.src)}"
                     alt="${escapeHtml(logo.alt || "")}">
              `;
            }).join("")}
          </div>
        `;
      }

      // single logo
      if (typeof b === "string" && b.trim()) {
        return `<img class="broadcaster-logo"
                     src="${escapeHtml(b)}"
                     alt="${escapeHtml(p.broadcasterAlt || p.broadcasterText || "Broadcaster")}">`;
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

    const drawer = document.createElement("div");
    drawer.className = "drawer";
    drawer.dataset.drawerFor = id;

    drawer.innerHTML = `
      <div class="drawer-inner">
        <h4 class="drawer-title">${escapeHtml(p.title)}</h4>

        <div class="drawer-cols ${colsClass} ${pressWide ? "press-wide-layout" : ""}">
          <div class="drawer-panel">
            ${metaHtml}
          </div>

          ${optionalPanels.join("")}
        </div>

    <div class="drawer-footer">
       
        ${Array.isArray(p.clips) && p.clips.length ? `
    <div class="clip-btns">
    ${p.clips.map((c, i) => `
      <button class="clip-btn" type="button"
              data-open-clip="${escapeHtml(id)}"
              data-clip-index="${i}">
        ▶ ${escapeHtml(c.label || `Clip ${i+1}`)}
      </button>
    `).join("")}
      </div>
      ` : ``}


        <button class="drawer-close" type="button" aria-label="Close" data-close-drawer>X</button>
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

    // Insert drawer between rows so it pushes down everything below
    const tiles = Array.from(mosaic.querySelectorAll(".tile"));
    const rowTop = tile.offsetTop;
    const nextRowFirst = tiles.find((t) => t.offsetTop > rowTop);

    const drawer = buildDrawer(id);
    if (nextRowFirst) mosaic.insertBefore(drawer, nextRowFirst);
    else mosaic.appendChild(drawer);

    requestAnimationFrame(() => drawer.classList.add("is-open"));
    setTimeout(() => drawer.classList.add("is-settled"), 320);
    drawer.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }


// ===== CLIP LIGHTBOX =====
const clipModal = document.getElementById("clipModal");
const clipMedia = document.getElementById("clipMedia");

function openClip(clip){
  if (!clipModal || !clipMedia || !clip) return;

  let html = "";

  if (clip.kind === "youtube") {
    html = `<iframe src="https://www.youtube.com/embed/${encodeURIComponent(clip.id)}?autoplay=1&rel=0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowfullscreen></iframe>`;
  } else if (clip.kind === "vimeo") {
    html = `<iframe src="https://player.vimeo.com/video/${encodeURIComponent(clip.id)}?autoplay=1"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowfullscreen></iframe>`;
  } else if (clip.kind === "mp4") {
    html = `<video src="${escapeHtml(clip.src)}" controls autoplay playsinline></video>`;
  }

  clipMedia.innerHTML = html;
  clipModal.classList.add("is-open");
  clipModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeClip(){
  if (!clipModal || !clipMedia) return;
  clipModal.classList.remove("is-open");
  clipModal.setAttribute("aria-hidden", "true");
  clipMedia.innerHTML = ""; // stops playback
  document.body.style.overflow = "";
}

// Handle clip button clicks + modal close clicks
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-open-clip]");
  if (btn) {
    e.preventDefault();
    const id = btn.getAttribute("data-open-clip");
    const idx = Number(btn.getAttribute("data-clip-index") || 0);
    const p = DETAILS[id];
    const clip = p?.clips?.[idx];
    if (clip) openClip(clip);
    return;
  }

  if (e.target.closest("[data-clip-close]")) {
    closeClip();
  }
});

// ESC closes clip first, otherwise closes drawer
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (clipModal?.classList.contains("is-open")) closeClip();
});


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