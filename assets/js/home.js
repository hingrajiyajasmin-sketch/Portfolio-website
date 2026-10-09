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

  function initializeHeadlines() {
    const hero = document.getElementById("home");
    const text = document.querySelector(".headline-role");
    const toggle = document.querySelector(".headline-toggle");
    if (!hero || !text || !toggle) return;
    const roles = JSON.parse(text.dataset.roles);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let paused = false;
    let current = 0;
    let length = roles[0].length;
    let deleting = true;
    let timer;
    let delay = 2200;

    function schedule() {
      clearTimeout(timer);
      toggle.hidden = reducedMotion.matches;
      toggle.classList.toggle("is-paused", paused);
      const label = paused ? "Resume changing headline" : "Pause changing headline";
      toggle.setAttribute("aria-label", label);
      toggle.title = label;
      const running = visible && !document.hidden && !paused && !reducedMotion.matches;
      text.classList.toggle("is-typing", running);
      if (reducedMotion.matches) {
        text.textContent = roles[current];
        length = roles[current].length;
        deleting = true;
        delay = 2200;
      }
      if (running) timer = setTimeout(tick, delay);
    }

    function tick() {
      length += deleting ? -1 : 1;
      text.textContent = roles[current].slice(0, length);
      delay = deleting ? 45 : 85;
      if (deleting && length === 0) {
        current = (current + 1) % roles.length;
        deleting = false;
        delay = 300;
      } else if (!deleting && length === roles[current].length) {
        deleting = true;
        delay = 2200;
      }
      schedule();
    }

    toggle.addEventListener("click", () => { paused = !paused; schedule(); });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); }).observe(hero);
    }
    document.addEventListener("visibilitychange", schedule);
    reducedMotion.addEventListener("change", schedule);
    schedule();
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
  initializeHeadlines();
  initializeToolkit();
  initializeProcess();
})();
