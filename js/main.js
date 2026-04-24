/* ── Seagulls ─────────────────────────────────────────── */
(function () {
  const container = document.getElementById('birds');
  const wing = `<svg viewBox="0 0 48 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0,8 C4,2 9,1 14,6 C17,8.5 19,9 24,8 C29,7 31,7.5 34,6 C39,1 44,2 48,8"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>
  </svg>`;

  const configs = [
    { top:  7, dur: 22, delay:   0, scale: 0.9  },
    { top: 13, dur: 18, delay:  -6, scale: 0.65 },
    { top: 19, dur: 26, delay: -14, scale: 1.1  },
    { top:  9, dur: 20, delay: -20, scale: 0.75 },
    { top: 28, dur: 24, delay:  -4, scale: 0.55 },
    { top: 16, dur: 17, delay: -10, scale: 1.0  },
    { top: 23, dur: 30, delay: -18, scale: 0.7  },
    { top:  5, dur: 21, delay: -26, scale: 0.85 },
    { top: 34, dur: 19, delay:  -8, scale: 0.6  },
  ];

  configs.forEach(cfg => {
    const b = document.createElement('div');
    b.className = 'bird';
    b.innerHTML = wing;
    b.style.top               = cfg.top + '%';
    b.style.animationDuration = cfg.dur + 's';
    b.style.animationDelay    = cfg.delay + 's';
    b.style.setProperty('--bs', cfg.scale);
    container.appendChild(b);
  });
})();

/* ── Countdown ────────────────────────────────────────── */
(function () {
  const target = new Date('2026-05-23T10:00:00-04:00');

  function pad(n) { return String(n).padStart(2, '0'); }

  function setNum(id, value) {
    const el = document.getElementById(id);
    if (el.textContent !== value) {
      el.textContent = value;
      el.classList.remove('ticking');
      void el.offsetWidth;
      el.classList.add('ticking');
    }
  }

  function tick() {
    const diff = target - new Date();

    if (diff <= 0) {
      ['cd-days', 'cd-hours', 'cd-minutes', 'cd-seconds'].forEach(id => setNum(id, '00'));
      return;
    }

    setNum('cd-days',    pad(Math.floor(diff / 86400000)));
    setNum('cd-hours',   pad(Math.floor((diff % 86400000) / 3600000)));
    setNum('cd-minutes', pad(Math.floor((diff % 3600000) / 60000)));
    setNum('cd-seconds', pad(Math.floor((diff % 60000) / 1000)));
  }

  tick();
  setInterval(tick, 1000);
})();

/* ── Scroll Events ────────────────────────────────────── */
(function () {
  const nav = document.querySelector('nav');
  const bar = document.getElementById('scroll-progress');
  const sun = document.querySelector('.hero-sun');
  const maxScroll = () => document.body.scrollHeight - window.innerHeight;

  function onScroll() {
    const y = window.scrollY;

    nav.classList.toggle('scrolled', y > 30);

    if (bar) {
      bar.style.width = (y / maxScroll() * 100) + '%';
    }

    if (sun) {
      sun.style.transform = `translateY(${Math.min(y * 0.12, 90)}px)`;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ── Scroll Reveal ────────────────────────────────────── */
(function () {
  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    }),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
