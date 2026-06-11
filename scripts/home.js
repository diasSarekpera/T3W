/**
 * T3W – home.js
 * ─────────────────────────────────────────
 * Alimente la section "Aperçu des cartes" de la page d'accueil.
 * Charge les N premières leçons depuis le registre et les affiche.
 */

(async function () {
  const CARDS_LIMIT = 6; // Nombre de cartes affichées sur l'accueil
  const grid = document.getElementById('home-cards-grid');
  if (!grid) return;

  try {
    const lessons = await loadAllLessons();
    const preview = lessons.slice(0, CARDS_LIMIT);

    grid.innerHTML = preview.map(l => renderCard(l, 'home')).join('');
  } catch (err) {
    console.error('T3W home.js :', err);
    grid.innerHTML = `<p class="load-error">Impossible de charger les cartes.</p>`;
  }

  // ── Audio preview des cartes ───────────────
  let currentAudio = null;
  let currentBtn   = null;

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-card-preview[data-audio]');
    if (!btn) return;

    const src = btn.dataset.audio;

    // Même bouton → toggle pause/play
    if (currentBtn === btn && currentAudio) {
      if (currentAudio.paused) {
        currentAudio.play();
        btn.classList.add('playing');
      } else {
        currentAudio.pause();
        btn.classList.remove('playing');
      }
      return;
    }

    // Arrêt de l'audio précédent
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    if (currentBtn) currentBtn.classList.remove('playing');

    // Nouvel audio
    const audio = new Audio(src);
    currentAudio = audio;
    currentBtn   = btn;

    audio.play().catch(() => {
      // Fichier absent en dev — pas d'erreur bloquante
    });
    btn.classList.add('playing');

    audio.addEventListener('ended', () => {
      btn.classList.remove('playing');
      currentAudio = null;
      currentBtn   = null;
    });
  });

  // ── Burger menu (mobile) ───────────────────
  const burger   = document.querySelector('.nav-burger');
  const navLinks = document.querySelector('.nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const expanded = navLinks.classList.contains('open');
      burger.setAttribute('aria-expanded', String(expanded));
    });
  }
})();
