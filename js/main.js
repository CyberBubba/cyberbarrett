/* ================================================================
   CYBERBARRETT.COM — Main JavaScript
   ================================================================ */

/* ---- NAV SCROLL (sticky glass effect) ---- */
(function () {
  const nav = document.getElementById('siteNav') || document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
})();

/* ---- NAV HAMBURGER ---- */
(function () {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (!toggle || !links) return;

  function toggleMenu(e) {
    e.stopPropagation(); // prevent doc click-outside from firing on same event
    links.classList.toggle('open');
    toggle.classList.toggle('open');
    toggle.setAttribute('aria-expanded', links.classList.contains('open'));
  }

  toggle.addEventListener('click', toggleMenu);

  // Fallback for Android browsers that are slow to fire click
  toggle.addEventListener('touchend', function (e) {
    e.preventDefault(); // prevent the ghost click that follows touchend
    toggleMenu(e);
  });

  // Close mobile nav when a leaf link is tapped
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      // Only close if it's not a dropdown trigger (those use preventDefault)
      if (!a.closest('.nav-has-drop')) {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
})();

/* ---- NAV DROPDOWNS (click to open, click outside to close) ---- */
(function () {
  const drops = document.querySelectorAll('.nav-has-drop');

  drops.forEach(function (item) {
    const trigger = item.querySelector('a');
    const menu    = item.querySelector('.nav-drop');
    if (!trigger || !menu) return;

    // Always prevent navigation for dropdown triggers — reach the hub via the dropdown items
    trigger.addEventListener('click', function (e) {
      e.preventDefault();

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
  // Stagger entrance delays for cards within grid containers.
  // Cap at index 7 so long lists don't wait forever (~0.42s max delay).
  document.querySelectorAll('.fc-grid').forEach(function (grid) {
    grid.querySelectorAll('.reveal').forEach(function (card, i) {
      card.style.transitionDelay = (Math.min(i, 7) * 0.07) + 's';
    });
  });

  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06 });

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
