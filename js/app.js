/* =========================================================
   SP3 DIGITAL — APP
   Bootstrap: form handling, footer year, misc wiring
   ========================================================= */

(function () {
  /* ---- Footer year ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Contact form (front-end only demo handler) ---- */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form && status) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const required = form.querySelectorAll("[required]");
      let valid = true;
      required.forEach((field) => {
        if (!field.value.trim()) valid = false;
      });

      const emailField = form.querySelector("#email");
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

      // Simulated network round-trip. Replace with a real endpoint when ready.
      setTimeout(() => {
        status.textContent =
          "Thanks — your message has been received. Our team will reply within one business day.";
        status.classList.add("success", "is-visible");
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
        form.reset();
      }, 900);
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
