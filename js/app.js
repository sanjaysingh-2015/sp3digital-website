/* =========================================================
   SP3 DIGITAL — APP
   Bootstrap: form handling, footer year, misc wiring
   ========================================================= */

(function () {
  /* ---- Footer year ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Contact form (submits to Formspree, delivers to contact@sp3digital.com) ---- */
  // 1. Create a form at https://formspree.io using contact@sp3digital.com
  // 2. Verify that inbox (GoDaddy webmail) via the confirmation email Formspree sends
  // 3. Replace YOUR_FORM_ID below with the ID Formspree gives you (from the endpoint
  //    URL https://formspree.io/f/YOUR_FORM_ID)
  const FORM_ENDPOINT = "https://formspree.io/f/mgawyelw";

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form && status) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const required = form.querySelectorAll("[required]");
      let valid = true;
      required.forEach((field) => {
        if (!field.value.trim()) valid = false;
      });

      const emailField = form.querySelector('[name="email"]');
      if (
        emailField &&
        emailField.value &&
        !/^\S+@\S+\.\S+$/.test(emailField.value)
      ) {
        valid = false;
      }

      status.classList.remove("success", "error");

      if (!valid) {
        status.textContent =
          "Please fill in all required fields with a valid email address.";
        status.classList.add("error", "is-visible");
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalLabel = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";

      try {
        const response = await fetch(FORM_ENDPOINT, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          status.textContent =
            "Thanks — your message has been received. Our team will reply within one business day.";
          status.classList.add("success", "is-visible");
          form.reset();
        } else {
          const data = await response.json().catch(() => null);
          const message =
            data && data.errors && data.errors.length
              ? data.errors.map((err) => err.message).join(" ")
              : "Something went wrong while sending your message. Please try again or email us directly.";
          status.textContent = message;
          status.classList.add("error", "is-visible");
        }
      } catch (err) {
        status.textContent =
          "We couldn't reach the server. Please check your connection and try again.";
        status.classList.add("error", "is-visible");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
    });
  }

  /* ---- Anchor links: account for fixed header height ---- */
  const header = document.querySelector(".site-header");

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const headerH = header ? header.offsetHeight : 0;
      const top =
        target.getBoundingClientRect().top + window.scrollY - headerH + 1;
      window.scrollTo({ top, behavior: "smooth" });
      history.pushState(null, "", id);
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    // Accordion Toggle for Expanded Capabilities
    const accordions = document.querySelectorAll(".accordion-card");

    accordions.forEach((card) => {
      const header = card.querySelector(".card-header");
      header.addEventListener("click", () => {
        card.classList.toggle("active");
        const icon = card.querySelector(".toggle-icon");
        if (card.classList.contains("active")) {
          icon.textContent = "-";
        } else {
          icon.textContent = "+";
        }
      });
    });
  });
  
  /* ---- Newsletter (footer) ---- */
  const newsletter = document.getElementById("newsletter-form");
  if (newsletter) {
    newsletter.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = newsletter.querySelector('input[type="email"]');
      const note = newsletter.querySelector(".newsletter-note");
      if (input && input.value && note) {
        note.textContent = "You’re subscribed. Welcome aboard.";
        input.value = "";
      }
    });
  }
})();
