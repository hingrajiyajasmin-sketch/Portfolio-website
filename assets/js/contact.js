"use strict";

(() => {
  const form = document.getElementById("contact-form");
  const settings = document.getElementById("contact-settings");
  if (!form || !settings) return;
  const { email, endpoint, ajaxEndpoint } = JSON.parse(settings.textContent);
  const submit = document.getElementById("contact-submit");
  const note = document.getElementById("contact-delivery-note");
  const status = document.getElementById("contact-form-status");
  submit.disabled = false;

  if (ajaxEndpoint && new URL(ajaxEndpoint, location.href).protocol === "https:") {
    submit.firstChild.textContent = "Send message ";
    note.textContent = "Share your details and I’ll get back to you.";
    let sending = false;
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (sending || !form.reportValidity()) return;
      const data = new FormData(form);
      if (String(data.get("_honey") || "").trim()) return;
      const fields = ["name", "email", "message"];
      fields.forEach((field) => data.set(field, String(data.get(field) || "").trim()));
      if (!data.get("name") || String(data.get("message")).length < 10) {
        status.hidden = false;
        status.dataset.state = "error";
        status.textContent = "Please add your name and at least 10 characters about your project.";
        return;
      }
      data.set("_subject", `Portfolio enquiry: ${data.get("project")}`);
      sending = true;
      submit.disabled = true;
      submit.firstChild.textContent = "Sending… ";
      form.setAttribute("aria-busy", "true");
      status.hidden = false;
      status.dataset.state = "sending";
      status.textContent = "Sending your message…";
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 20000);
      try {
        const response = await fetch(ajaxEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(Object.fromEntries(data)),
          signal: controller.signal
        });
        const result = await response.json();
        if (!response.ok || (result.success !== true && result.success !== "true")) {
          throw new Error("Submission was not accepted");
        }
        form.reset();
        status.dataset.state = "success";
        status.textContent = "Thanks for reaching out! Your message has been submitted. I’ll get back to you soon.";
      } catch {
        status.dataset.state = "error";
        status.textContent = "Your message couldn’t be sent. Please try again or ";
        const fallback = document.createElement("a");
        fallback.href = `mailto:${email}`;
        fallback.textContent = "email me directly";
        status.append(fallback, ".");
      } finally {
        clearTimeout(timeout);
        sending = false;
        submit.disabled = false;
        submit.firstChild.textContent = "Send message ";
        form.removeAttribute("aria-busy");
      }
    });
    return;
  }

  if (endpoint && new URL(endpoint, location.href).protocol === "https:") {
    form.action = endpoint;
    form.method = "post";
    submit.firstChild.textContent = "Send message ";
    note.textContent = "Share your details and I’ll get back to you.";
    return;
  }

  if (email) {
    submit.firstChild.textContent = "Prepare email ";
    note.textContent = "This opens your email app with your message ready to send.";
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const message = `Hi Jasmin,\n\n${data.get("message").trim()}\n\nProject: ${data.get("project")}\nName: ${data.get("name").trim()}\nEmail: ${data.get("email").trim()}`;
    status.replaceChildren();
    status.hidden = false;
    if (email) {
      location.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Project enquiry: ${data.get("project")}`)}&body=${encodeURIComponent(message)}`;
      status.textContent = "Your email draft is ready. Send it from your email app to complete your enquiry.";
      return;
    }
    try {
      await navigator.clipboard.writeText(message);
      status.textContent = "Message copied. Open the LinkedIn link to send it to Jasmin.";
    } catch {
      status.textContent = "Copy the message below and send it on LinkedIn.";
      const draft = document.createElement("textarea");
      draft.readOnly = true;
      draft.setAttribute("aria-label", "Your message ready to copy");
      draft.value = message;
      status.append(draft);
      draft.focus();
      draft.select();
    }
  });
})();
