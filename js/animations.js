/* =========================================================
   SP3 DIGITAL — ANIMATIONS
   Scroll-reveal engine + scroll progress bar
   ========================================================= */

(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll('[data-reveal]');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---- Scroll progress bar ---- */
  const progress = document.querySelector('.page-progress');
  if (progress) {
    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      progress.style.width = max > 0 ? `${(scrolled / max) * 100}%` : '0%';
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  /* ---- Subtle hero parallax on the blobs ---- */
  if (!reduceMotion) {
    const blobs = document.querySelectorAll('.blob');
    const hero = document.querySelector('.hero');
    if (hero && blobs.length) {
      hero.addEventListener('pointermove', (e) => {
        const { innerWidth: w, innerHeight: h } = window;
        const x = (e.clientX / w - 0.5) * 18;
        const y = (e.clientY / h - 0.5) * 18;
        blobs.forEach((b, i) => {
          const factor = i % 2 === 0 ? 1 : -1;
          b.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
      });
    }
  }
})();
