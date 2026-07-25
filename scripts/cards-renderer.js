/**
 * T3W – cards-renderer.js
 * ─────────────────────────────────────────
 * Génère le HTML d'une carte à partir des données JSON.
 * Partagé par la page d'accueil et la bibliothèque.
 */

/**
 * Crée l'HTML d'une carte à partir d'une leçon.
 * @param {Object} lesson  - données chargées depuis lesson.json
 * @param {string} context - 'home' | 'library' (affecte la destination du lien)
 * @returns {string} HTML de la carte
 */
function renderCard(lesson, context = 'library') {
  const { card, words, language, id, _flag, _langCode, _basePath } = lesson;

  // Les 3 mots du trio pour le sous-titre
  const wordList = words.map(w => w.word).join(' · ');

  // Chemin vers la page de session
  const sessionPath = context === 'home'
    ? `/pages/session.html?lesson=${id}`
    : `session.html?lesson=${id}`;

  // Chemin vers l'audio de preview du trio
  const previewAudio = `${_basePath}/audio/preview.mp3`;

  // Icône drapeau + langue pour le tag
  const tagLabel = `${_flag || ''} ${language}`.trim();

  return `
    <article class="card" data-lang="${_langCode || ''}" data-reveal role="article" aria-label="${language} — ${card.title}">
      <div class="card__header">
        <span class="card__tag">${tagLabel}</span>
        <span class="card__num" aria-hidden="true">${card.title}</span>
      </div>
      <div class="card__body">
        <div class="card__text">
          <h3 class="card__title">${card.title}</h3>
          <p class="card__subtitle">${card.tagline}</p>
        </div>
        <div class="card__leaf" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor" style="color: var(--color-gold-pale);">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-8 2 4.13 4.13 3 8 3 8-3.27-3.27-6.86-1.08-10 0z"/>
          </svg>
        </div>
      </div>
      <div class="card__words" aria-label="Mots du trio">${wordList}</div>
      <div class="card__footer">
        <button
          class="card__icon-btn btn-card-preview"
          aria-label="Écouter la preview de ${card.title}"
          data-audio="${previewAudio}"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
        </button>
        <a href="${sessionPath}" class="card__arrow" aria-label="Commencer ${card.title}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </article>
  `.trim();
}
