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

const phases = {
  discover: { kicker: "The starting point", title: "Listen before drawing.", description: "Talk to people, explore the context, and challenge assumptions. The right question is often more valuable than the first answer.", output: "The outcome: a clearer understanding of people." },
  define: { kicker: "Making sense of the messy", title: "Find the problem worth solving.", description: "Connect patterns, map the journey, and turn observations into a focused direction. A shared understanding keeps the work intentional.", output: "The outcome: a focused brief and a clear direction." },
  design: { kicker: "From possibility to prototype", title: "Give the idea a little life.", description: "Sketch broadly, explore alternatives, and build something people can try. The details matter, but the experience comes first.", output: "The outcome: a tangible, testable prototype." },
  deliver: { kicker: "A beginning, not an ending", title: "Make it work. Then make it better.", description: "Test with people, refine the interactions, and collaborate on the final experience. Keep learning after the first version ships.", output: "The outcome: a considered experience, ready to evolve." }
};
const phaseTabs = [...document.querySelectorAll(".process-tab")];
function selectPhase(tab, focus = false) {
  const phase = phases[tab.dataset.phase];
  if (!phase) return;
  phaseTabs.forEach((item) => {
    const selected = item === tab;
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
    item.classList.toggle("is-selected", selected);
  });
  document.getElementById("process-panel").setAttribute("aria-labelledby", tab.id);
  document.querySelector(".phase-kicker").textContent = phase.kicker;
  document.getElementById("phase-title").textContent = phase.title;
  document.getElementById("phase-description").textContent = phase.description;
  document.getElementById("phase-output").textContent = phase.output;
  document.querySelector(".phase-visual").dataset.stage = tab.dataset.phase;
  const number = phaseTabs.indexOf(tab) + 1;
  document.querySelector(".canvas-number").textContent = `0${number}`;
  document.getElementById("phase-count").textContent = `0${number} / 04`;
  const track = document.querySelector(".process-track");
  track.setAttribute("aria-valuenow", String(number * 25));
  track.querySelector("span").style.width = `${number * 25}%`;
  const next = phaseTabs[number % phaseTabs.length];
  document.getElementById("phase-next").textContent = number === phaseTabs.length
    ? "Explore again →" : `Next: ${next.querySelector("b").textContent} →`;
  if (focus) tab.focus();
}
document.getElementById("phase-next").addEventListener("click", () => {
  const current = phaseTabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true");
  selectPhase(phaseTabs[(current + 1) % phaseTabs.length]);
});
phaseTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectPhase(tab));
  tab.addEventListener("keydown", (event) => {
    let target;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") target = (index + 1) % phaseTabs.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") target = (index - 1 + phaseTabs.length) % phaseTabs.length;
    if (event.key === "Home") target = 0;
    if (event.key === "End") target = phaseTabs.length - 1;
    if (target !== undefined) { event.preventDefault(); selectPhase(phaseTabs[target], true); }
  });
});

const filterButtons = document.querySelectorAll("[data-filter]");
filterButtons.forEach((button) => button.addEventListener("click", () => {
  document.querySelector(".project-grid").classList.toggle("is-filtered", button.dataset.filter !== "all");
  filterButtons.forEach((item) => {
    item.classList.toggle("is-selected", item === button);
    item.setAttribute("aria-pressed", String(item === button));
  });
  document.querySelectorAll(".project-card").forEach((card) => {
    card.hidden = button.dataset.filter !== "all" && card.dataset.category !== button.dataset.filter;
  });
}));

const concepts = {
  flow: { title: "Less friction. More flow.", summary: "A concept for a clearer, more human everyday banking experience.", idea: "Give people one calm place to understand their balance, see recent activity, and make everyday decisions without unnecessary friction.", direction: "Warm neutrals, a clear visual hierarchy, and a simplified dashboard put the essentials first. The preview explores information design rather than a live banking service." },
  space: { title: "A little space to focus.", summary: "A concept workspace that helps the day feel less crowded.", idea: "Bring ideas and priorities into a quiet, approachable interface that encourages one meaningful next step.", direction: "Soft lavender, generous spacing, and restrained task states create a calmer visual rhythm. The preview is a design exploration rather than a working task manager." },
  daily: { title: "Everyday, a little better.", summary: "An interaction concept for discovering fresh food with a little more personality.", idea: "Make everyday shopping feel welcoming, with seasonal discoveries and a friendly path from browsing to a clear choice.", direction: "Sage green, playful produce illustrations, and compact mobile layouts explore a lighter shopping experience. No checkout or ordering service is connected." }
};
const projectDialog = document.getElementById("project-dialog");
if (projectDialog) {
  document.querySelectorAll("[data-project]").forEach((button) => button.addEventListener("click", () => {
    const project = concepts[button.dataset.project];
    document.getElementById("case-study-title").textContent = project.title;
    document.getElementById("case-study-summary").textContent = project.summary;
    document.getElementById("case-study-idea").textContent = project.idea;
    document.getElementById("case-study-direction").textContent = project.direction;
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
