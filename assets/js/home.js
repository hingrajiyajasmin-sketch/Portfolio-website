"use strict";

(() => {
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

  function initializeProcess() {
    const board = document.querySelector(".process-board");
    if (!board || !("IntersectionObserver" in window)) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;

    function update() {
      board.classList.toggle("motion-enabled", !reducedMotion.matches);
      board.classList.toggle("is-process-running", visible && !document.hidden && !reducedMotion.matches);
    }

    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    }, { threshold: 0.12 }).observe(board);
    document.addEventListener("visibilitychange", update);
    reducedMotion.addEventListener("change", update);
    update();
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

  initializeBanner();
  initializeToolkit();
  initializeProcess();
})();
