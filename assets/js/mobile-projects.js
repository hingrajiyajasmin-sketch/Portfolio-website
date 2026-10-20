"use strict";

(() => {
  // The source PNG stays intact. These windows reveal its original screen pixels.
  function device(project, screen, interactive = false) {
    const presentation = project.mobilePresentation;
    const [x, y, width, height] = screen.rect;
    const hardware = document.createElement("div");
    hardware.className = `mobile-hardware mobile-hardware--${presentation.device}`;
    hardware.dataset.screenLabel = screen.label;
    hardware.dataset.nativeWidth = String(width);
    hardware.style.setProperty("--native-screen-width", `${width}px`);
    const sideKeys = document.createElement("span");
    sideKeys.className = "mobile-hardware-keys";
    sideKeys.setAttribute("aria-hidden", "true");
    const window = document.createElement("div");
    window.className = "mobile-screen-window";
    window.style.aspectRatio = `${width} / ${screen.viewportHeight}`;
    if (interactive && height > screen.viewportHeight + 1) {
      window.classList.add("is-scrollable");
      window.tabIndex = 0;
      window.setAttribute("role", "region");
      window.setAttribute("aria-label", `${screen.label}: scroll to explore the full screen`);
    }
    const crop = document.createElement("div");
    crop.className = "mobile-screen-crop";
    crop.style.aspectRatio = `${width} / ${height}`;
    const image = document.createElement("img");
    image.src = project.originalDesign;
    image.alt = interactive ? `${project.brand}: ${screen.label}, original supplied interface.` : "";
    image.width = presentation.sourceWidth;
    image.height = presentation.sourceHeight;
    image.decoding = "async";
    image.loading = interactive ? "lazy" : "eager";
    image.draggable = false;
    image.style.width = `${presentation.sourceWidth / width * 100}%`;
    image.style.left = `${-x / width * 100}%`;
    image.style.top = `${-y / height * 100}%`;
    crop.append(image);
    window.append(crop);
    hardware.append(sideKeys, window);
    return hardware;
  }

  function renderCover(project) {
    const presentation = project.mobilePresentation;
    const cover = document.createElement("article");
    cover.className = `mobile-cover mobile-cover--${presentation.device}`;
    cover.style.setProperty("--app-background", presentation.background);
    cover.style.setProperty("--app-ink", presentation.ink);
    const header = document.createElement("header");
    header.className = "mobile-cover-header";
    const brand = document.createElement("p");
    brand.className = "mobile-cover-brand";
    brand.textContent = project.brand;
    const category = document.createElement("p");
    category.className = "mobile-cover-category";
    category.textContent = project.industry;
    const title = document.createElement("h1");
    title.textContent = presentation.headline;
    const number = document.createElement("span");
    number.className = "mobile-cover-number";
    number.textContent = `${String(presentation.index).padStart(2, "0")} / APP DESIGN`;
    header.append(brand, category, title, number);
    const devices = document.createElement("div");
    devices.className = "mobile-cover-devices";
    devices.dataset.deviceCount = String(presentation.coverScreens.length);
    presentation.coverScreens.forEach(index => devices.append(device(project, presentation.screens[index])));
    const footer = document.createElement("footer");
    footer.className = "mobile-cover-footer";
    project.scope.forEach(item => {
      const tag = document.createElement("span");
      tag.textContent = item;
      footer.append(tag);
    });
    cover.append(header, devices, footer);
    return cover;
  }

  function renderPreview(project, host) {
    host.replaceChildren();
    if (!project.mobilePresentation) return;
    const introduction = document.createElement("p");
    introduction.className = "mobile-study-note";
    introduction.textContent = "Explore the original screens. Scroll inside a device for longer views; swipe across on a small screen.";
    const gallery = document.createElement("div");
    gallery.className = "mobile-study-gallery";
    gallery.setAttribute("role", "region");
    gallery.setAttribute("aria-label", `${project.brand} app screens`);
    gallery.tabIndex = 0;
    project.mobilePresentation.screens.forEach((screen, index) => {
      const figure = document.createElement("figure");
      figure.className = "mobile-study-screen";
      const caption = document.createElement("figcaption");
      caption.textContent = `${String(index + 1).padStart(2, "0")} / ${screen.label}`;
      figure.append(caption, device(project, screen, true));
      gallery.append(figure);
    });
    host.dataset.device = project.mobilePresentation.device;
    host.append(introduction, gallery);
  }

  document.addEventListener("project-preview-open", ({ detail }) => {
    const host = document.getElementById("case-study-mobile-preview");
    if (!host) return;
    host.hidden = !detail.project.mobilePresentation;
    renderPreview(detail.project, host);
  });

  // The artwork exporter uses the same device geometry as the project previews.
  window.MobileProjectPresentation = Object.freeze({ renderCover });
})();
