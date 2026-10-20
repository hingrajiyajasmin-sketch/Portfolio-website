"use strict";

(() => {
  const catalog = document.getElementById("portfolio-catalog");
  if (!catalog || !window.ResizeObserver || !window.IntersectionObserver || !Element.prototype.animate) return;
  const projects = new Map(JSON.parse(catalog.textContent).map(project => [project.id, project]));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const hoverCapable = matchMedia("(hover: hover)");
  const entries = new Map();
  const dialog = document.getElementById("project-dialog");
  // One screenful every four seconds, regardless of project length or preview size.
  const SECONDS_PER_SCREEN = 4;
  const END_HOLD_SECONDS = 2.5;
  let paused = false;
  try { paused = sessionStorage.getItem("portfolio-previews-paused") === "true"; } catch { /* Storage is optional. */ }

  function update(entry) {
    const active = entry.inView && !paused && !reduced.matches && !document.hidden &&
      (!dialog?.open || dialog.contains(entry.host));
    if (active && !entry.animation) measure(entry);
    if (!entry.animation) return;
    const interacting = (hoverCapable.matches && entry.interaction.matches(":hover")) || entry.interaction.matches(":focus-within");
    if (active && !interacting) entry.animation.play();
    else entry.animation.pause();
  }
  function updateAll() { entries.forEach(update); }

  function measure(entry) {
    const { content, screen } = entry;
    if (!content.complete || !content.naturalWidth || !screen.clientHeight || reduced.matches) return;
    const bounds = screen.getBoundingClientRect();
    const renderedHeight = content.getBoundingClientRect().height;
    const travel = Math.max(0, renderedHeight - bounds.height);
    const speed = bounds.height / SECONDS_PER_SCREEN;
    if (travel < 1) return;
    if (entry.animation && Math.abs(entry.travel - travel) < .1 && Math.abs(entry.speed - speed) < .1) return;
    const phase = entry.animation ? Number(entry.animation.currentTime || 0) / entry.animation.effect.getTiming().duration : 0;
    entry.animation?.cancel();
    entry.travel = travel;
    entry.speed = speed;
    // Short acceleration/deceleration ramps; the middle travels at a constant rate.
    const ramp = Math.min(1.2, travel / speed / 3);
    const rampDistance = speed * ramp / 2;
    const leg = travel / speed + ramp;
    const hold = END_HOLD_SECONDS;
    const total = 2 * (hold + leg);
    const accelerate = "cubic-bezier(.333333,0,.666667,.333333)";
    const decelerate = "cubic-bezier(.333333,.666667,.666667,1)";
    const frame = (seconds, offset, easing="linear") => ({
      offset: seconds / total, transform: `translateY(${-offset}px)`, easing
    });
    const back = hold + leg + hold;
    entry.animation = content.animate([
      frame(0, 0), frame(hold, 0, accelerate),
      frame(hold + ramp, rampDistance),
      frame(hold + leg - ramp, travel - rampDistance, decelerate),
      frame(hold + leg, travel), frame(back, travel, accelerate),
      frame(back + ramp, travel - rampDistance),
      frame(back + leg - ramp, rampDistance, decelerate),
      frame(total, 0)
    ], { duration: total * 1000, iterations: Infinity });
    entry.animation.pause();
    entry.animation.currentTime = phase * total * 1000;
  }

  const resize = new ResizeObserver(records => records.forEach(({target}) => {
    const entry = entries.get(target);
    if (entry) { measure(entry); update(entry); }
  }));
  const visibility = new IntersectionObserver(records => records.forEach(({target,isIntersecting}) => {
    const entry = entries.get(target);
    if (entry) { entry.inView = isIntersecting; update(entry); }
  }), { threshold: .08 });

  function register(host, project) {
    const content = host.querySelector(".device-scroll-content");
    const screen = host.querySelector(".device-scroll-window");
    if (!project?.deviceScreen || !content || !screen) return;
    const previous = entries.get(host);
    previous?.animation?.cancel();
    const entry = { host, project, content, screen, inView: false,
      interaction: host.closest(".catalog-art, .project-art") || host };
    entries.set(host, entry);
    resize.observe(host);
    visibility.unobserve(host);
    visibility.observe(host);
    if (!previous) {
      content.addEventListener("load", () => {
        const current = entries.get(host);
        if (current) update(current);
      });
      ["pointerenter","pointerleave","focusin","focusout"].forEach(event => entry.interaction.addEventListener(event, () => {
        const current = entries.get(host);
        if (current) update(current);
      }));
    }
  }

  document.querySelectorAll("[data-device-project]").forEach(host => register(host, projects.get(host.dataset.deviceProject)));
  document.addEventListener("project-preview-open", ({detail}) => {
    const host = document.getElementById("case-study-device-preview");
    if (host) register(host, detail.project);
    updateControls();
    updateAll();
  });
  dialog?.addEventListener("close", updateAll);
  document.addEventListener("visibilitychange", updateAll);

  function updateControls() {
    document.querySelectorAll(".device-preview-toolbar").forEach(toolbar => toolbar.hidden = reduced.matches);
    document.querySelectorAll(".device-motion-toggle").forEach(button => {
      button.hidden = reduced.matches || (button.closest("dialog") && dialog?.dataset.projectType === "mobile");
      button.setAttribute("aria-label", paused ? "Play scrolling previews" : "Pause scrolling previews");
      button.setAttribute("aria-pressed", String(paused));
      button.querySelector("span").textContent = paused ? "Play previews" : "Pause previews";
      button.querySelector("path").setAttribute("d", paused ? "M7 3v18l14-9z" : "M6 4h4v16H6zm8 0h4v16h-4z");
    });
  }
  document.querySelectorAll(".device-motion-toggle").forEach(button => button.addEventListener("click", () => {
    paused = !paused;
    try { sessionStorage.setItem("portfolio-previews-paused", String(paused)); } catch { /* Continue without persistence. */ }
    updateControls(); updateAll();
  }));
  reduced.addEventListener("change", () => {
    if (reduced.matches) entries.forEach(entry => {
      entry.animation?.cancel(); entry.animation = null;
    });
    updateControls(); updateAll();
  });
  updateControls();
})();
