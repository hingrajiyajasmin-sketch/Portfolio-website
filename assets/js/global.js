"use strict";

(() => {
  function updateCopyright() {
    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  function initializeReveals() {
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        target.classList.add("is-visible");
        observer.unobserve(target);
      });
    }, { threshold: 0.08 });

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    document.body.classList.add("motion-ready");
  }

  function initializeDialogs() {
    document.querySelectorAll("dialog").forEach((dialog) => {
      dialog.addEventListener("click", (event) => {
        if (event.target !== dialog) return;
        const { left, right, top, bottom } = dialog.getBoundingClientRect();
        const outside = event.clientX < left || event.clientX > right ||
          event.clientY < top || event.clientY > bottom;
        if (outside) dialog.close();
      });
    });

    const dialog = document.getElementById("project-dialog");
    const catalog = document.getElementById("portfolio-catalog");
    if (!dialog || !catalog) return;

    const projects = new Map(JSON.parse(catalog.textContent).map((project) => [project.id, project]));
    const fields = {
      title: document.getElementById("case-study-title"),
      summary: document.getElementById("case-study-summary"),
      idea: document.getElementById("case-study-idea"),
      direction: document.getElementById("case-study-direction")
    };

    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-project]");
      if (!button) return;
      const project = projects.get(button.dataset.project);
      if (!project) return;

      Object.entries(fields).forEach(([key, element]) => {
        element.textContent = project[key];
      });
      dialog.querySelector(".sample-note").hidden = project.sample === false;
      dialog.showModal();
    });

    document.getElementById("case-study-contact").addEventListener("click", () => dialog.close());
  }

  function initializePreviewCues() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    document.querySelectorAll(".project-preview").forEach((button) => {
      const cue = button.querySelector(".cover-action");
      if (!cue) return;

      button.addEventListener("pointermove", (event) => {
        if (reducedMotion.matches || event.pointerType !== "mouse") return;
        const bounds = button.getBoundingClientRect();
        const clamp = (value, maximum) => Math.min(maximum - 48, Math.max(48, value));
        cue.style.left = `${clamp(event.clientX - bounds.left, bounds.width)}px`;
        cue.style.top = `${clamp(event.clientY - bounds.top, bounds.height)}px`;
        cue.classList.add("follows-pointer");
      });

      button.addEventListener("pointerleave", () => {
        cue.classList.remove("follows-pointer");
        cue.style.removeProperty("left");
        cue.style.removeProperty("top");
      });
    });
  }

  updateCopyright();
  initializeReveals();
  initializeDialogs();
  initializePreviewCues();
})();
