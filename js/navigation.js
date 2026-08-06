/* =========================================================
   SP3 DIGITAL — NAVIGATION
   Sticky header, mobile menu, active-link tracking
   ========================================================= */

(function () {
  const header = document.querySelector('.site-header');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
  const sections = document.querySelectorAll('main section[id]');

  if (!header) return;

  /* ---- Sticky / transparent header ---- */
  const setHeaderState = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  /* ---- Mobile menu ---- */
  const closeMenu = () => {
    hamburger.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    hamburger.classList.add('is-open');
    mobileMenu.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.contains('is-open') ? closeMenu() : openMenu();
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) closeMenu();
    });
  }

  /* ---- Active section highlighting ---- */
  if ('IntersectionObserver' in window && sections.length) {
    const byId = (id) => document.querySelector(`.nav-links a[href="#${id}"]`);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = byId(entry.target.id);
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach((l) => l.classList.remove('is-active'));
            document.querySelectorAll(`a[href="#${entry.target.id}"]`).forEach((l) =>
              l.classList.add('is-active')
            );
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((s) => io.observe(s));
  }
})();
