/* ================================================================
   CYBERBARRETT.COM — Main JavaScript
   ================================================================ */

/* ---- NAV HAMBURGER ---- */
(function () {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      toggle.classList.toggle('open');
    });
  }
})();

/* ---- NAV DROPDOWNS (click to open, click outside to close) ---- */
(function () {
  const drops = document.querySelectorAll('.nav-has-drop');

  drops.forEach(function (item) {
    const trigger = item.querySelector('a');
    const menu    = item.querySelector('.nav-drop');
    if (!trigger || !menu) return;

    // Prevent the parent link from navigating if it's a '#' href
    trigger.addEventListener('click', function (e) {
      const href = trigger.getAttribute('href');
      if (href === '#') e.preventDefault();

      const isOpen = item.classList.contains('open');

      // Close all other dropdowns
      drops.forEach(function (d) {
        if (d !== item) d.classList.remove('open');
      });

      // Toggle this one
      item.classList.toggle('open', !isOpen);
    });
  });

  // Click outside closes all
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-has-drop')) {
      drops.forEach(function (d) { d.classList.remove('open'); });
    }
  });
})();

/* ---- REVEAL ON SCROLL ---- */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  els.forEach(function (el) { observer.observe(el); });
})();

/* ---- STAT COUNTER ANIMATION ---- */
(function () {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.getAttribute('data-target'), 10);
      const dur    = 1800;
      const step   = Math.ceil(target / (dur / 16));
      let current  = 0;

      const timer = setInterval(function () {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current.toLocaleString();
      }, 16);

      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(function (el) { observer.observe(el); });
})();
