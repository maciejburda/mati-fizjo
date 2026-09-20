/* Mateusz Brzeziński, fizjoterapia dziecięca */
(function () {
  'use strict';

  /* ---- Pojawianie się sekcji ----
     Najpierw, w osobnym bloku: gdyby cokolwiek niżej rzuciło wyjątkiem,
     treść i tak zostanie odsłonięta.
     Zamiatanie po scrollu zamiast IntersectionObserver: element przeskoczony
     jednym skokiem (kotwica, przywrócona pozycja, szybki flick) nigdy nie
     dostaje callbacku z IO i zostałby na stałe niewidoczny. */
  try {
    var pending = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      pending.forEach(function (el) { el.classList.add('is-in'); });
      pending = [];
    } else {
      // Bez rAF-owego throttlingu: w nieaktywnej karcie rAF bywa wstrzymany,
      // co zamroziłoby licznik na stałe. Lista i tak topnieje do zera.
      var sweep = function () {
        var limit = window.innerHeight * 0.88;
        pending = pending.filter(function (el) {
          if (el.getBoundingClientRect().top >= limit) return true;
          el.classList.add('is-in');
          return false;
        });
        if (!pending.length) {
          window.removeEventListener('scroll', sweep);
          window.removeEventListener('resize', sweep);
          window.removeEventListener('load', sweep);
          window.removeEventListener('hashchange', sweep);
        }
      };
      window.addEventListener('scroll', sweep, { passive: true });
      window.addEventListener('resize', sweep);
      // Skok do #kotwicy przy wczytaniu dzieje się PO tym skrypcie i bywa, że
      // nie generuje zdarzenia scroll, więc zamiatamy też po ułożeniu strony.
      window.addEventListener('load', sweep);
      window.addEventListener('hashchange', sweep);
      sweep();
    }
  } catch (e) {
    Array.prototype.forEach.call(document.querySelectorAll('.reveal'), function (el) {
      el.classList.add('is-in');
    });
  }

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
  var mobile = window.matchMedia('(max-width: 860px)');
  if (toggle && links) {
    var setOpen = function (open, refocus) {
      toggle.setAttribute('aria-expanded', String(open));
      links.classList.toggle('is-open', open);
      // Nie polegaj na opóźnionym przejściu visibility: inert natychmiast
      // wyjmuje zamknięte menu z kolejności tabulacji i z drzewa dostępności.
      if (mobile.matches) links.toggleAttribute('inert', !open);
      else links.removeAttribute('inert');
      if (!open && refocus) toggle.focus();
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var wasOpen = toggle.getAttribute('aria-expanded') === 'true';
      setOpen(false, wasOpen);
    });
    setOpen(false);
    var syncMobile = function () { setOpen(false); };
    if (mobile.addEventListener) mobile.addEventListener('change', syncMobile);
    else if (mobile.addListener) mobile.addListener(syncMobile);
  }

})();
