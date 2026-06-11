/**
 * T3W – lessons.js
 * ─────────────────────────────────────────
 * Module utilitaire partagé.
 * Fournit les fonctions de chargement des leçons depuis les JSON.
 */

/**
 * Charge un lesson.json depuis son basePath.
 * @param {string} basePath - chemin vers le dossier du trio
 * @returns {Promise<Object>} - données de la leçon enrichies avec basePath
 */
async function loadLesson(basePath) {
  const res = await fetch(`${basePath}/lesson.json`);
  if (!res.ok) throw new Error(`Impossible de charger : ${basePath}/lesson.json`);
  const data = await res.json();
  // Enrichit les chemins audio avec le basePath
  data._basePath = basePath;
  return data;
}

/**
 * Charge toutes les leçons listées dans le registre.
 * @returns {Promise<Array>} - tableau de leçons enrichies
 */
async function loadAllLessons() {
  const results = await Promise.allSettled(
    LESSONS_REGISTRY.map(entry =>
      loadLesson(entry.basePath).then(data => ({
        ...data,
        _flag    : entry.flag,
        _langCode: entry.langCode
      }))
    )
  );
  return results
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value);
}

/**
 * Charge une leçon spécifique par son id.
 * @param {string} id - identifiant du trio (ex: 'english-trio-1')
 * @returns {Promise<Object>} - données de la leçon
 */
async function loadLessonById(id) {
  const entry = LESSONS_REGISTRY.find(e => e.id === id);
  if (!entry) throw new Error(`Leçon introuvable : ${id}`);
  const data = await loadLesson(entry.basePath);
  return { ...data, _flag: entry.flag, _langCode: entry.langCode };
}

/**
 * Résout un chemin audio relatif en chemin absolu.
 * @param {string} basePath
 * @param {string} audioPath - chemin relatif depuis lesson.json (ex: 'audio/hello.mp3')
 * @returns {string}
 */
function resolveAudio(basePath, audioPath) {
  return `${basePath}/${audioPath}`;
}

/**
 * Groupe un tableau de leçons par langue.
 * @param {Array} lessons
 * @returns {Object} - { 'English': [...], 'Spanish': [...] }
 */
function groupByLanguage(lessons) {
  return lessons.reduce((acc, lesson) => {
    const lang = lesson.language;
    if (!acc[lang]) acc[lang] = [];
    acc[lang].push(lesson);
    return acc;
  }, {});
}

/**
 * Retourne le texte de la phrase dans la langue cible d'une leçon.
 * (Gère le fait que la clé varie selon la langue : 'english', 'spanish'…)
 * @param {Object} sentence - objet sentence du JSON
 * @returns {string}
 */
function getSentenceTarget(sentence) {
  const keys = Object.keys(sentence).filter(k => k !== 'french' && k !== 'audio');
  return sentence[keys[0]] || '';
}
