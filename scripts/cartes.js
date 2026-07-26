/**
 * T3W – cartes.js
 * ─────────────────────────────────────────
 * Alimente la bibliothèque de cartes depuis le registre.
 * Gère le rendu par section de langue et les filtres.
 */

(async function () {
  const main = document.getElementById('main-content');
  if (!main) return;

  // ── Drapeaux & infos par langue ────────────
  const LANG_META = {
    'English': { flag: '🇬🇧', subtitle: 'Anglais → Français' },
    'Spanish': { flag: '🇪🇸', subtitle: 'Espagnol → Français' }
  };

  let allLessons = [];

  // ── Chargement initial ─────────────────────
  try {
    allLessons = await loadAllLessons();
    renderLibrary(allLessons);
  } catch (err) {
    console.error('T3W cartes.js :', err);
    main.innerHTML = `<p class="load-error">Impossible de charger les cartes.</p>`;
  }

  // ── Rendu de la bibliothèque ───────────────
  function renderLibrary(lessons) {
    const groups = groupByLanguage(lessons);
    const html = Object.entries(groups).map(([lang, items]) => {
      const meta  = LANG_META[lang] || { flag: '🌐', subtitle: lang };
      const cards = items.map(l => renderCard(l, 'library')).join('');
      return `
        <section class="lang-section" data-lang-section="${lang.toLowerCase()}">
          <div class="lang-header" data-reveal>
            <div class="lang-header__left">
              <div class="lang-flag" aria-hidden="true">${meta.flag}</div>
              <div>
                <h2 class="lang-title">${lang}</h2>
                <p class="lang-subtitle">${meta.subtitle}</p>
              </div>
            </div>
            <span class="lang-count">${items.length} carte${items.length > 1 ? 's' : ''}</span>
          </div>
          <div class="cards-grid">${cards}</div>
        </section>
      `.trim();
    }).join('');

    main.innerHTML = html || `<p class="load-empty">Aucune carte disponible.</p>`;
    if (window.T3WMotion) window.T3WMotion.observe(main);
  }

  // ── Audio preview des cartes ───────────────
  // Un seul écouteur permanent sur main (délégation d'événements)
  let currentAudio = null;
  let currentBtn   = null;

  main.addEventListener('click', (e) => {
    // La flèche "commencer" garde son rôle de navigation, pas de preview ici
    if (e.target.closest('.card__arrow')) return;

    const card = e.target.closest('.card');
    if (!card) return;
    const btn = card.querySelector('.btn-card-preview[data-audio]');
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

  // ── Filtre par langue ──────────────────────
  window.filterLang = function (btn, code) {
    // Arrêt de tout audio en cours lors du changement de filtre
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
    if (currentBtn) {
      currentBtn.classList.remove('playing');
      currentBtn = null;
    }

    // Mise à jour de l'état des boutons
    document.querySelectorAll('.filter-tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');

    // Filtrage
    if (code === 'all') {
      renderLibrary(allLessons);
    } else {
      const filtered = allLessons.filter(l => l._langCode === code);
      renderLibrary(filtered);
    }
  };
})();