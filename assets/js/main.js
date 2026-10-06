"use strict";

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

const resumeDialog = document.getElementById("resume-dialog");
if (resumeDialog) {
  document.querySelectorAll("#resume-button, [data-open-resume]").forEach((button) => {
    button.addEventListener("click", () => resumeDialog.showModal());
  });
  resumeDialog.addEventListener("click", (event) => {
    if (event.target !== resumeDialog) return;
    const bounds = resumeDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) resumeDialog.close();
  });
}

const linkedInButton = document.getElementById("linkedin-button");
const linkedInDialog = document.getElementById("linkedin-dialog");
if (linkedInButton && linkedInDialog) {
  linkedInButton.addEventListener("click", () => linkedInDialog.showModal());
}

const navigationLinks = document.querySelectorAll("nav a[href^='#']");
const sections = document.querySelectorAll("main > section[id]");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const link of navigationLinks) {
        const active = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }
    }
  }, { rootMargin: "-20% 0px -50% 0px" });
  sections.forEach((section) => observer.observe(section));
}

// Reveal progressively: all content stays visible without JavaScript or motion.
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
  document.body.classList.add("motion-ready");
}

const concepts = {
  flow: { title: "Less friction. More flow.", summary: "A concept for a clearer, more human everyday banking experience.", idea: "Give people one calm place to understand their balance, see recent activity, and make everyday decisions without unnecessary friction.", direction: "Warm neutrals, a clear visual hierarchy, and a simplified dashboard put the essentials first. The preview explores information design rather than a live banking service." },
  space: { title: "A little space to focus.", summary: "A concept workspace that helps the day feel less crowded.", idea: "Bring ideas and priorities into a quiet, approachable interface that encourages one meaningful next step.", direction: "Soft lavender, generous spacing, and restrained task states create a calmer visual rhythm. The preview is a design exploration rather than a working task manager." },
  daily: { title: "Everyday, a little better.", summary: "An interaction concept for discovering fresh food with a little more personality.", idea: "Make everyday shopping feel welcoming, with seasonal discoveries and a friendly path from browsing to a clear choice.", direction: "Sage green, playful produce illustrations, and compact mobile layouts explore a lighter shopping experience. No checkout or ordering service is connected." }
};
const catalogElement = document.getElementById("portfolio-catalog");
const catalogProjects = catalogElement ? JSON.parse(catalogElement.textContent) : [];
const projectCatalog = new Map(catalogProjects.map(project => [project.id, project]));
const projectDialog = document.getElementById("project-dialog");
if (projectDialog) {
  document.querySelectorAll("[data-project]").forEach((button) => button.addEventListener("click", () => {
    const project = projectCatalog.get(button.dataset.project) || concepts[button.dataset.project];
    if (!project) return;
    document.getElementById("case-study-title").textContent = project.title;
    document.getElementById("case-study-summary").textContent = project.summary;
    document.getElementById("case-study-idea").textContent = project.idea;
    document.getElementById("case-study-direction").textContent = project.direction;
    projectDialog.querySelector(".sample-note").hidden = project.sample === false;
    projectDialog.showModal();
  }));
  document.getElementById("case-study-contact").addEventListener("click", () => projectDialog.close());
}

const tools = {
  figma: ["Figma", "A space to explore interfaces, build reusable components, and connect the details."],
  framer: ["Framer", "Bring interfaces to life with motion, responsive layouts, and interactive prototypes."],
  webflow: ["Webflow", "Turn visual ideas into responsive web experiences with a visual development workflow."],
  illustrator: ["Illustrator", "Explore identities, vector illustrations, and the little details that give a project character."],
  notion: ["Notion", "Keep research, notes, decisions, and project direction in one thoughtful workspace."],
  html: ["HTML & CSS", "Shape accessible structure and responsive presentation for the web."],
  javascript: ["JavaScript", "Connect the interface with meaningful interactions and responsive behavior."],
  github: ["GitHub", "Track changes, collaborate on the code, and give each idea room to evolve."]
};
document.querySelectorAll("[data-tool]").forEach((button) => button.addEventListener("click", () => {
  document.querySelectorAll("[data-tool]").forEach((item) => {
    item.classList.toggle("is-selected", item === button);
    item.setAttribute("aria-pressed", String(item === button));
  });
  const [name, description] = tools[button.dataset.tool];
  const note = document.getElementById("tool-note");
  note.textContent = description;
  document.getElementById("tool-name").textContent = name;
  document.getElementById("tool-purpose").textContent = button.querySelector("small").textContent;
  document.querySelector(".tool-inspector").dataset.selectedTool = button.dataset.tool;
  document.getElementById("inspector-icon").replaceChildren(button.querySelector(".tool-mark").cloneNode(true));
}));

const initialTool = document.querySelector(".tool-card.is-selected .tool-mark");
if (initialTool) document.getElementById("inspector-icon").replaceChildren(initialTool.cloneNode(true));

// The preview cue follows a mouse without affecting keyboard or touch controls.
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
document.querySelectorAll(".project-preview").forEach((button) => {
  button.addEventListener("pointermove", (event) => {
    if (motionPreference.matches || event.pointerType !== "mouse") return;
    const box = button.getBoundingClientRect();
    const cue = button.querySelector(".cover-action");
    cue.style.left = `${Math.min(box.width - 48, Math.max(48, event.clientX - box.left))}px`;
    cue.style.top = `${Math.min(box.height - 48, Math.max(48, event.clientY - box.top))}px`;
    cue.classList.add("follows-pointer");
  });
  button.addEventListener("pointerleave", () => {
    const cue = button.querySelector(".cover-action");
    cue.classList.remove("follows-pointer");
    cue.style.removeProperty("left");
    cue.style.removeProperty("top");
  });
});

// Pause the banner off screen or in a hidden tab; resume without resetting it.
const hero = document.getElementById("home");
if (hero && "IntersectionObserver" in window) {
  let heroVisible = true;
  const updateHeroMotion = () => hero.classList.toggle("is-motion-paused", !heroVisible || document.hidden);
  new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
    updateHeroMotion();
  }, { threshold: 0 }).observe(hero);
  document.addEventListener("visibilitychange", updateHeroMotion);
}

// Filter a large collection without changing source or keyboard order.
const portfolioGrid = document.getElementById("portfolio-grid");
if (portfolioGrid) {
  const cards = [...portfolioGrid.querySelectorAll(".catalog-card")];
  const filters = [...document.querySelectorAll(".industry-filter")];
  const search = document.getElementById("portfolio-search");
  const more = document.getElementById("load-projects");
  const results = document.getElementById("portfolio-results");
  const pageSize = 12;
  let activeIndustry = "all";
  let limit = pageSize;
  let searchTimer;
  function updateCollection() {
    const query = search.value.trim().toLocaleLowerCase();
    const matched = cards.filter(card => (activeIndustry === "all" || card.dataset.industry === activeIndustry) && card.dataset.search.includes(query));
    const visible = matched.slice(0, limit);
    const visibleCards = new Set(visible);
    cards.forEach(card => {
      card.hidden = !visibleCards.has(card);
      card.classList.remove("is-staggered");
    });
    visible.forEach((card, index) => card.classList.toggle("is-staggered", index % 2 === 1));
    filters.forEach(button => {
      const selected = button.dataset.industry === activeIndustry;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    results.textContent = matched.length ? `Showing ${visible.length} of ${matched.length} projects${activeIndustry === "all" ? "" : ` · ${activeIndustry}`}` : "No matching projects";
    document.getElementById("portfolio-empty").hidden = matched.length !== 0;
    more.hidden = visible.length >= matched.length;
    document.getElementById("portfolio-pagination-note").textContent = matched.length && more.hidden ? "You’ve reached the end of this collection." : "";
    return visible;
  }
  filters.forEach(button => button.addEventListener("click", () => {
    activeIndustry = button.dataset.industry;
    limit = pageSize;
    updateCollection();
  }));
  search.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { limit = pageSize; updateCollection(); }, 150);
  });
  more.addEventListener("click", () => {
    const previousCount = cards.filter(card => !card.hidden).length;
    limit += pageSize;
    const visible = updateCollection();
    const firstNew = visible[previousCount];
    if (firstNew) firstNew.querySelector(".project-preview").focus();
  });
  document.getElementById("reset-portfolio").addEventListener("click", () => {
    clearTimeout(searchTimer);
    search.value = "";
    activeIndustry = "all";
    limit = pageSize;
    updateCollection();
    search.focus();
  });
  document.getElementById("portfolio-controls").hidden = false;
  updateCollection();
}
