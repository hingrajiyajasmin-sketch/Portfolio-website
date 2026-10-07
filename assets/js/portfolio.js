"use strict";

(() => {
  // Filter a large collection without changing source or keyboard order.
  const portfolioGrid = document.getElementById("portfolio-grid");
  if (portfolioGrid) {
    const cards = [...portfolioGrid.querySelectorAll(".catalog-card")];
    const filters = [...document.querySelectorAll(".industry-filter")];
    const more = document.getElementById("load-projects");
    const pageSize = 12;
    let activeIndustry = "all";
    let limit = pageSize;
    function updateCollection() {
      const matched = cards.filter(card => activeIndustry === "all" || card.dataset.industry === activeIndustry);
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
    more.addEventListener("click", () => {
      const previousCount = cards.filter(card => !card.hidden).length;
      limit += pageSize;
      const visible = updateCollection();
      const firstNew = visible[previousCount];
      if (firstNew) firstNew.querySelector(".project-preview").focus();
    });
    document.getElementById("reset-portfolio").addEventListener("click", () => {
      activeIndustry = "all";
      limit = pageSize;
      updateCollection();
      filters.find(button => button.dataset.industry === "all")?.focus();
    });
    document.getElementById("portfolio-controls").hidden = false;
    updateCollection();
  }
})();
