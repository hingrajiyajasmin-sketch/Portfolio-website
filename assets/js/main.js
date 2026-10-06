"use strict";

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

const resumeButton = document.getElementById("resume-button");
const resumeDialog = document.getElementById("resume-dialog");
if (resumeButton && resumeDialog) {
  resumeButton.addEventListener("click", () => resumeDialog.showModal());
  resumeDialog.addEventListener("click", (event) => {
    if (event.target !== resumeDialog) return;
    const bounds = resumeDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) resumeDialog.close();
  });
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
