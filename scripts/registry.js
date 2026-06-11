/**
 * T3W – Registre des leçons
 * ─────────────────────────────────────────
 * Ce fichier est le SEUL à modifier pour ajouter un nouveau trio.
 * Il suffit d'ajouter une entrée dans le tableau LESSONS_REGISTRY.
 *
 * Structure d'une entrée :
 *   { id, language, flag, basePath }
 *
 *   - id       : identifiant unique (doit correspondre à l'id dans lesson.json)
 *   - language : nom affiché de la langue
 *   - flag     : emoji drapeau
 *   - langCode : code court pour les filtres ('en', 'es', etc.)
 *   - basePath : chemin vers le dossier contenant lesson.json (relatif à la racine)
 */

const LESSONS_REGISTRY = [
  {
    id      : 'english-trio-1',
    language: 'English',
    flag    : '🇬🇧',
    langCode: 'en',
    basePath: '/assets/languages/English/Trio1'
  },
  {
    id      : 'english-trio-2',
    language: 'English',
    flag    : '🇬🇧',
    langCode: 'en',
    basePath: '/assets/languages/English/Trio2'
  },
  {
    id      : 'english-trio-3',
    language: 'English',
    flag    : '🇬🇧',
    langCode: 'en',
    basePath: '/assets/languages/English/Trio3'
  },
  {
    id      : 'spanish-trio-1',
    language: 'Spanish',
    flag    : '🇪🇸',
    langCode: 'es',
    basePath: '/assets/languages/Spanish/Trio1'
  },
  {
    id      : 'spanish-trio-2',
    language: 'Spanish',
    flag    : '🇪🇸',
    langCode: 'es',
    basePath: '/assets/languages/Spanish/Trio2'
  },
  {
    id      : 'spanish-trio-3',
    language: 'Spanish',
    flag    : '🇪🇸',
    langCode: 'es',
    basePath: '/assets/languages/Spanish/Trio3'
  }
];
