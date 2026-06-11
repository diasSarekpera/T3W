/**
 * T3W – session.js
 * ─────────────────────────────────────────
 * Charge dynamiquement le contenu d'une leçon dans la page de session.
 * Lit l'id du trio depuis l'URL : ?lesson=english-trio-1
 */

(async function () {

  // ── 1. Récupération de l'id depuis l'URL ──
  const params   = new URLSearchParams(window.location.search);
  const lessonId = params.get('lesson');

  if (!lessonId) {
    showError('Aucune leçon spécifiée. Retourne à la bibliothèque.');
    return;
  }

  // ── 2. Chargement du JSON ──────────────────
  let lesson;
  try {
    lesson = await loadLessonById(lessonId);
  } catch (err) {
    console.error('T3W session.js :', err);
    showError('Impossible de charger cette leçon.');
    return;
  }

  // ── 3. Mise à jour du titre de page ───────
  document.title = `T3W – ${lesson.language} · ${lesson.card.title}`;

  // ── 4. Mise à jour du bouton langue ───────
  const btnLang = document.querySelector('.btn-lang');
  if (btnLang) {
    const flag = lesson._flag || '';
    btnLang.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
      ${flag} ${lesson.language}
    `;
  }

  // ── 5. Titre de la session ─────────────────
  const sessionTitle = document.querySelector('.section-eyebrow');
  if (sessionTitle) {
    sessionTitle.textContent = `${lesson.card.title} – ${lesson.language}`;
  }

  // ── 6. Cartes de mots ──────────────────────
  const wordsStack = document.querySelector('.words-stack');
  if (wordsStack) {
    wordsStack.innerHTML = lesson.words.map((w, i) => {
      const audioPath = resolveAudio(lesson._basePath, w.audio);
      return `
        <div class="word-card">
          <div class="word-num">${i + 1}</div>
          <div class="word-divider-v"></div>
          <div class="word-body">
            <div class="word-target">${w.word}</div>
            <div class="word-native">${w.translation}</div>
          </div>
          <button class="btn-audio" aria-label="Écouter ${w.word}" data-audio="${audioPath}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
          </button>
        </div>
      `.trim();
    }).join('');
  }

  // ── 7. Phrase du jour ──────────────────────
  const phraseText  = document.querySelector('.phrase-text');
  const phraseTrans = document.querySelector('.phrase-translation');
  const phraseAudio = document.querySelector('.btn-audio-phrase');
  const sentenceAudioPath = resolveAudio(lesson._basePath, lesson.sentence.audio);

  if (phraseText) {
    const targetSentence = getSentenceTarget(lesson.sentence);
    // Mise en évidence des 3 mots dans la phrase
    let highlighted = targetSentence;
    lesson.words.forEach((w, i) => {
      const cls = `w${i + 1}`;
      // Remplacement insensible à la casse, premier occurrence
      const regex = new RegExp(`\\b(${escapeRegex(w.word)})\\b`, 'i');
      highlighted = highlighted.replace(regex, `<span class="${cls}">$1</span>`);
    });
    phraseText.innerHTML = `"${highlighted}"`;
  }

  if (phraseTrans) {
    phraseTrans.textContent = lesson.sentence.french;
  }

  if (phraseAudio) {
    phraseAudio.dataset.audio = sentenceAudioPath;
  }

  // ── 8. Chanson ────────────────────────────
  const songTitle    = document.querySelector('.song-title-text');
  const songSubtitle = document.querySelector('.song-subtitle');
  const songAudioPath = resolveAudio(lesson._basePath, lesson.song.audio);
  const playBtn      = document.getElementById('playBtn');

  if (songTitle)    songTitle.textContent    = lesson.song.title;
  if (songSubtitle) songSubtitle.textContent = lesson.song.description;
  if (playBtn)      playBtn.dataset.audio    = songAudioPath;

  // ── 9. Waveform ───────────────────────────
  const wf = document.getElementById('wf');
  if (wf) {
    const heights = [8,14,20,10,18,24,12,16,22,9,17,21,11,19,13,20,8,15,23,10,18,14,20,9,16,22,11,17,21,12];
    wf.innerHTML = '';
    heights.forEach(h => {
      const b = document.createElement('div');
      b.className = 'bar';
      b.style.cssText = `width:3px;height:${h}px`;
      wf.appendChild(b);
    });
  }

  // ── 10. Lecture audio ─────────────────────
  let currentAudio = null;

  function playAudio(src, btn) {
    // Arrêt de l'audio en cours si différent
    if (currentAudio && currentAudio._src !== src) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      document.querySelectorAll('.btn-audio.playing, .btn-play-main.playing')
        .forEach(b => b.classList.remove('playing'));
      currentAudio = null;
    }

    if (!currentAudio) {
      const audio = new Audio(src);
      audio._src  = src;
      currentAudio = audio;

      audio.play().catch(() => {
        // Fichier absent en dev — pas d'erreur bloquante
      });

      btn.classList.add('playing');

      audio.addEventListener('ended', () => {
        btn.classList.remove('playing');
        currentAudio = null;
      });
    } else {
      // Toggle pause/play sur le même audio
      if (currentAudio.paused) {
        currentAudio.play();
        btn.classList.add('playing');
      } else {
        currentAudio.pause();
        btn.classList.remove('playing');
      }
    }
  }

  // Délégation sur les boutons audio de mots
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-audio[data-audio]');
    if (!btn) return;
    playAudio(btn.dataset.audio, btn);
  });

  // Bouton play chanson
  if (playBtn) {
    let songPlaying = false;
    let songAudio   = null;

    playBtn.addEventListener('click', () => {
      songPlaying = !songPlaying;
      playBtn.classList.toggle('playing', songPlaying);

      document.querySelectorAll('.bar').forEach(b => {
        b.style.animationPlayState = songPlaying ? 'running' : 'paused';
      });

      if (songPlaying) {
        if (!songAudio) {
          songAudio = new Audio(songAudioPath);
          songAudio.addEventListener('ended', () => {
            songPlaying = false;
            playBtn.classList.remove('playing');
            document.querySelectorAll('.bar').forEach(b => {
              b.style.animationPlayState = 'paused';
            });
          });
        }
        songAudio.play().catch(() => {});
      } else {
        if (songAudio) songAudio.pause();
      }
    });
  }

  // ── Utilitaires ────────────────────────────
  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function showError(msg) {
    document.querySelector('.shell').innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100dvh;gap:16px;padding:24px;text-align:center;">
        <p style="font-family:var(--font-serif);font-size:22px;color:var(--c-txt);">${msg}</p>
        <a href="/pages/cartes.html" style="font-family:var(--font-sans);font-size:14px;color:var(--c-accent);text-decoration:underline;">
          Voir toutes les cartes
        </a>
      </div>
    `;
  }

})();
