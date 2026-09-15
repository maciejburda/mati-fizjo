/* Mateusz Brzeziński — fizjoterapia dziecięca */
(function () {
  'use strict';

  /* ---- Rok w stopce ---- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---- Cień nagłówka po przewinięciu ---- */
  var head = document.getElementById('siteHead');
  if (head) {
    var onScroll = function () {
      head.classList.toggle('is-stuck', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Menu mobilne ---- */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      links.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) setOpen(false);
    });
  }

  /* ---- Pojawianie się sekcji ---- */
  var targets = document.querySelectorAll('.reveal');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        // Ujawnij też elementy, które przewinęliśmy w całości (np. skok przez #kotwicę).
        if (!entry.isIntersecting && entry.boundingClientRect.top > 0) return;
        var el = entry.target;
        el.style.transitionDelay = Math.min(i * 70, 210) + 'ms';
        el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---- Placeholder rezerwacji: nie prowadzi donikąd, dopóki nie ma linku ---- */
  document.querySelectorAll('[data-ph-link]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      if (el.getAttribute('href') === '#') {
        e.preventDefault();
        var hint = el.parentElement.querySelector('.contact-hint .ph');
        if (hint) { hint.animate(
          [{ opacity: 1 }, { opacity: .35 }, { opacity: 1 }],
          { duration: 600, iterations: 2 }
        ); }
      }
    });
  });
})();
