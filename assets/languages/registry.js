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
    id      : 'english-trio-4',
    language: 'English',
    flag    : '🇬🇧',
    langCode: 'en',
    basePath: '/assets/languages/English/Trio4'
  },
  {
    id      : 'english-trio-5',
    language: 'English',
    flag    : '🇬🇧',
    langCode: 'en',
    basePath: '/assets/languages/English/Trio5'
  },
  {
    id      : 'english-trio-6',
    language: 'English',
    flag    : '🇬🇧',
    langCode: 'en',
    basePath: '/assets/languages/English/Trio6'
  },
  {
    id      : 'english-trio-7',
    language: 'English',
    flag    : '🇬🇧',
    langCode: 'en',
    basePath: '/assets/languages/English/Trio7'
  },
  {
    id      : 'english-trio-8',
    language: 'English',
    flag    : '🇬🇧',
    langCode: 'en',
    basePath: '/assets/languages/English/Trio8'
  },
  {
    id      : 'english-trio-9',
    language: 'English',
    flag    : '🇬🇧',
    langCode: 'en',
    basePath: '/assets/languages/English/Trio9'
  },
  {
    id      : 'english-trio-10',
    language: 'English',
    flag    : '🇬🇧',
    langCode: 'en',
    basePath: '/assets/languages/English/Trio10'
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
  },
  {
    id      : 'spanish-trio-4',
    language: 'Spanish',
    flag    : '🇪🇸',
    langCode: 'es',
    basePath: '/assets/languages/Spanish/Trio4'
  },
  {
    id      : 'spanish-trio-5',
    language: 'Spanish',
    flag    : '🇪🇸',
    langCode: 'es',
    basePath: '/assets/languages/Spanish/Trio5'
  },
  {
    id      : 'spanish-trio-6',
    language: 'Spanish',
    flag    : '🇪🇸',
    langCode: 'es',
    basePath: '/assets/languages/Spanish/Trio6'
  },
  {
    id      : 'spanish-trio-7',
    language: 'Spanish',
    flag    : '🇪🇸',
    langCode: 'es',
    basePath: '/assets/languages/Spanish/Trio7'
  },
  {
    id      : 'spanish-trio-8',
    language: 'Spanish',
    flag    : '🇪🇸',
    langCode: 'es',
    basePath: '/assets/languages/Spanish/Trio8'
  },
  {
    id      : 'spanish-trio-9',
    language: 'Spanish',
    flag    : '🇪🇸',
    langCode: 'es',
    basePath: '/assets/languages/Spanish/Trio9'
  },
  {
    id      : 'spanish-trio-10',
    language: 'Spanish',
    flag    : '🇪🇸',
    langCode: 'es',
    basePath: '/assets/languages/Spanish/Trio10'
  }
];