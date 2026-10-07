"use strict";

(() => {
  const form = document.getElementById("contact-form");
  const settings = document.getElementById("contact-settings");
  if (!form || !settings) return;
  const { email, endpoint } = JSON.parse(settings.textContent);
  const submit = document.getElementById("contact-submit");
  const note = document.getElementById("contact-delivery-note");
  const status = document.getElementById("contact-form-status");
  submit.disabled = false;

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
