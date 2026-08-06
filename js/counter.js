/* =========================================================
   SP3 DIGITAL — COUNTER
   Animates data-count elements when scrolled into view
   ========================================================= */

(function () {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animate = (el) => {
    const target = parseFloat(el.getAttribute('data-count'));
    const decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals'), 10) : 0;
    const duration = 1600;

    if (reduceMotion) {
      el.textContent = target.toFixed(decimals);
      return;
    }

    const start = performance.now();
    const from = 0;

    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const step = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(t);
      const value = from + (target - from) * eased;
      el.textContent = value.toFixed(decimals);
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals);
    };

    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => io.observe(el));
  } else {
    counters.forEach(animate);
  }
})();
