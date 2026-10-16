"use strict";

(() => {
  const catalog = document.getElementById("portfolio-catalog");
  if (!catalog || !window.ResizeObserver || !window.IntersectionObserver || !Element.prototype.animate) return;
  const projects = new Map(JSON.parse(catalog.textContent).map(project => [project.id, project]));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const entries = new Map();
  const dialog = document.getElementById("project-dialog");
  let paused = false;
  try { paused = sessionStorage.getItem("portfolio-previews-paused") === "true"; } catch { /* Storage is optional. */ }

  // Map a flat webpage onto the four inner corners of its photographed screen.
  function screenTransform(corners, width, height) {
    const [[x0,y0],[x1,y1],[x2,y2],[x3,y3]] = corners;
    const dx1=x1-x2, dx2=x3-x2, dx3=x0-x1+x2-x3;
    const dy1=y1-y2, dy2=y3-y2, dy3=y0-y1+y2-y3;
    const determinant=dx1*dy2-dx2*dy1;
    if (Math.abs(determinant)<1e-6) return null;
    const g=(dx3*dy2-dx2*dy3)/determinant;
    const h=(dx1*dy3-dx3*dy1)/determinant;
    return `matrix3d(${[
      (x1-x0+g*x1)/width,(y1-y0+g*y1)/width,0,g/width,
      (x3-x0+h*x3)/height,(y3-y0+h*y3)/height,0,h/height,
      0,0,1,0,x0,y0,0,1
    ].join(",")})`;
  }

  function layout(entry) {
    if (!entry.layer) return;
    const {referenceWidth,referenceHeight}=entry.project.deviceScreen;
    const scale=Math.min(entry.host.clientWidth/referenceWidth,entry.host.clientHeight/referenceHeight);
    entry.layer.style.left=`${(entry.host.clientWidth-referenceWidth*scale)/2}px`;
    entry.layer.style.top=`${(entry.host.clientHeight-referenceHeight*scale)/2}px`;
    entry.layer.style.transform=`scale(${scale})`;
  }

  function update(entry) {
    const active=entry.inView && !paused && !reduced.matches && !document.hidden &&
      (!dialog?.open || dialog.contains(entry.host));
    if (active && !entry.loaded && !entry.loading && !entry.failed) load(entry);
    if (!entry.animation) return;
    const hover=matchMedia("(hover: hover)").matches && entry.interaction.matches(":hover");
    if (active && !hover && !entry.interaction.matches(":focus-within")) entry.animation.play();
    else entry.animation.pause();
    entry.layer.hidden=reduced.matches;
  }

  function updateAll() { entries.forEach(update); }

  function load(entry) {
    entry.loading=true;
    const content=new Image();
    content.alt="";
    content.decoding="async";
    content.className="device-scroll-content";
    content.onload=() => {
      if (entries.get(entry.host)!==entry) return;
      const {corners,referenceWidth,referenceHeight,notch}=entry.project.deviceScreen;
      const distance=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
      const screenWidth=(distance(corners[0],corners[1])+distance(corners[3],corners[2]))/2;
      const screenHeight=(distance(corners[0],corners[3])+distance(corners[1],corners[2]))/2;
      const width=content.naturalWidth;
      const height=Math.round(width*screenHeight/screenWidth);
      const transform=screenTransform(corners,width,height);
      if (!transform) { entry.failed=true; return; }
      const layer=document.createElement("div");
      layer.className="device-scroll-layer";
      layer.setAttribute("aria-hidden","true");
      layer.style.width=`${referenceWidth}px`;
      layer.style.height=`${referenceHeight}px`;
      const screen=document.createElement("div");
      screen.className="device-scroll-window";
      screen.style.width=`${width}px`;
      screen.style.height=`${height}px`;
      screen.style.transform=transform;
      if (notch) {
        const [left,right,depth]=notch.map(value=>`${value*100}%`);
        screen.style.clipPath=`polygon(0 0,${left} 0,${left} ${depth},${right} ${depth},${right} 0,100% 0,100% 100%,0 100%)`;
      }
      screen.append(content);
      layer.append(screen);
      entry.host.append(layer);
      entry.layer=layer;
      entry.loaded=true;
      entry.loading=false;
      layout(entry);
      const travel=Math.max(0,content.naturalHeight-height);
      const down=Math.min(50,Math.max(20,travel/170));
      const up=down*.65;
      const hold=2.5;
      const duration=hold+down+hold+up;
      const easing="cubic-bezier(.32,0,.2,1)";
      entry.animation=content.animate([
        {transform:"translateY(0)",offset:0},
        {transform:"translateY(0)",offset:hold/duration,easing},
        {transform:`translateY(-${travel}px)`,offset:(hold+down)/duration},
        {transform:`translateY(-${travel}px)`,offset:(hold+down+hold)/duration,easing},
        {transform:"translateY(0)",offset:1}
      ],{duration:duration*1000,iterations:Infinity});
      entry.animation.pause();
      update(entry);
    };
    content.onerror=()=>{entry.failed=true;entry.loading=false;};
    content.src=entry.project.originalDesign;
  }

  const resize=new ResizeObserver(records=>records.forEach(({target})=>{
    const entry=entries.get(target);
    if (entry) layout(entry);
  }));
  const visibility=new IntersectionObserver(records=>records.forEach(({target,isIntersecting})=>{
    const entry=entries.get(target);
    if (entry) {entry.inView=isIntersecting;update(entry);}
  }),{threshold:.08});

  function register(host,project) {
    if (!project?.deviceScreen || !project.originalDesign) return;
    const previous=entries.get(host);
    previous?.animation?.cancel();
    previous?.layer?.remove();
    host.classList.add("device-preview-host");
    const entry={host,project,inView:false,interaction:host.closest(".catalog-art, .project-art") || host};
    entries.set(host,entry);
    resize.observe(host);
    visibility.unobserve(host);
    visibility.observe(host);
    if (!previous) ["pointerenter","pointerleave","focusin","focusout"].forEach(event=>entry.interaction.addEventListener(event,()=>{
      const current=entries.get(host);
      if (current) update(current);
    }));
  }

  document.querySelectorAll("[data-device-project]").forEach(host=>register(host,projects.get(host.dataset.deviceProject)));
  document.addEventListener("project-preview-open",({detail})=>{
    const host=document.getElementById("case-study-device-preview");
    if (host) register(host,detail.project);
    updateAll();
  });
  dialog?.addEventListener("close",updateAll);
  document.addEventListener("visibilitychange",updateAll);

  function updateControls() {
    document.querySelectorAll(".device-preview-toolbar").forEach(toolbar=>toolbar.hidden=reduced.matches);
    document.querySelectorAll(".device-motion-toggle").forEach(button=>{
      button.hidden=reduced.matches;
      button.setAttribute("aria-label",paused ? "Play scrolling previews" : "Pause scrolling previews");
      button.setAttribute("aria-pressed",String(paused));
      button.querySelector("span").textContent=paused ? "Play previews" : "Pause previews";
      button.querySelector("path").setAttribute("d",paused ? "M7 3v18l14-9z" : "M6 4h4v16H6zm8 0h4v16h-4z");
    });
  }
  document.querySelectorAll(".device-motion-toggle").forEach(button=>button.addEventListener("click",()=>{
    paused=!paused;
    try {sessionStorage.setItem("portfolio-previews-paused",String(paused));} catch { /* Continue without persistence. */ }
    updateControls();
    updateAll();
  }));
  reduced.addEventListener("change",()=>{updateControls();updateAll();});
  updateControls();
})();
