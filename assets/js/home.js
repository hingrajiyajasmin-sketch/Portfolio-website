"use strict";

(() => {
  function initializeNavigation() {
    if (!("IntersectionObserver" in window)) return;
    const links = [...document.querySelectorAll("nav a[href^='#']")];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        links.forEach((link) => {
          const active = link.getAttribute("href") === `#${target.id}`;
          link.classList.toggle("is-active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-20% 0px -50% 0px" });

    document.querySelectorAll("main > section[id]").forEach((section) => observer.observe(section));
  }

  function initializeResume() {
    const dialog = document.getElementById("resume-dialog");
    if (!dialog) return;
    document.querySelectorAll("#resume-button, [data-open-resume]").forEach((button) => {
      button.addEventListener("click", () => dialog.showModal());
    });
  }

  function initializeBanner() {
    const hero = document.getElementById("home");
    if (!hero || !("IntersectionObserver" in window)) return;
    let visible = true;
    const update = () => hero.classList.toggle("is-motion-paused", !visible || document.hidden);

    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    }).observe(hero);
    document.addEventListener("visibilitychange", update);
  }

  function initializeToolkit() {
    const data = document.getElementById("toolkit-data");
    const buttons = [...document.querySelectorAll("[data-tool]")];
    if (!data || !buttons.length) return;
    const tools = JSON.parse(data.textContent);
    const inspector = document.querySelector(".tool-inspector");
    const icon = document.getElementById("inspector-icon");
    const name = document.getElementById("tool-name");
    const purpose = document.getElementById("tool-purpose");
    const note = document.getElementById("tool-note");

    function select(button) {
      const tool = tools[button.dataset.tool];
      if (!tool) return;
      buttons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle("is-selected", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      name.textContent = tool.name;
      note.textContent = tool.description;
      purpose.textContent = button.querySelector("small").textContent;
      inspector.dataset.selectedTool = button.dataset.tool;
      icon.replaceChildren(button.querySelector(".tool-mark").cloneNode(true));
    }

    buttons.forEach((button) => button.addEventListener("click", () => select(button)));
    select(buttons.find((button) => button.classList.contains("is-selected")) || buttons[0]);
  }

  initializeNavigation();
  initializeResume();
  initializeBanner();
  initializeToolkit();
})();
