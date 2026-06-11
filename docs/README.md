# T3W – The 3 Words

## Ajouter un nouveau trio

L'ajout d'un nouveau trio se fait en **3 étapes seulement**.

---

### 1. Créer le dossier du trio

```
assets/
└── lessons/
    └── English/          ← ou Spanish/, French/, etc.
        └── Trio4/        ← nouveau dossier
            ├── lesson.json
            └── audio/
                ├── word1.mp3
                ├── word2.mp3
                ├── word3.mp3
                ├── sentence.mp3
                └── song.mp3
```

---

### 2. Créer le fichier `lesson.json`

```json
{
  "id": "english-trio-4",
  "language": "English",

  "card": {
    "title": "Trio 4",
    "tagline": "Description courte de ce qu'on apprend."
  },

  "words": [
    { "word": "Word1", "translation": "Traduction1", "audio": "audio/word1.mp3" },
    { "word": "Word2", "translation": "Traduction2", "audio": "audio/word2.mp3" },
    { "word": "Word3", "translation": "Traduction3", "audio": "audio/word3.mp3" }
  ],

  "sentence": {
    "english": "La phrase avec Word1, Word2 et Word3.",
    "french": "La traduction française de la phrase.",
    "audio": "audio/sentence.mp3"
  },

  "song": {
    "title": "Titre de la chanson",
    "description": "Description courte de la chanson.",
    "audio": "audio/song.mp3"
  }
}
```

> **Note sur la clé de phrase :** utilisez la langue cible comme clé (`"english"`, `"spanish"`, `"portuguese"`…). La clé `"french"` est toujours la traduction. La clé `"audio"` est le chemin de l'audio.

---

### 3. Enregistrer le trio dans le registre

Ouvrir `assets/lessons/registry.js` et ajouter une entrée :

```js
{
  id      : 'english-trio-4',   // doit correspondre à l'id dans lesson.json
  language: 'English',
  flag    : '🇬🇧',
  langCode: 'en',
  basePath: '/assets/lessons/English/Trio4'
}
```

C'est tout. Le site affichera automatiquement la nouvelle carte sur la page d'accueil et dans la bibliothèque.

---

## Structure des fichiers

```
/
├── index.html                          ← Page d'accueil
├── pages/
│   ├── cartes.html                     ← Bibliothèque de cartes
│   └── session.html                    ← Page de session (chargement dynamique)
│
├── styles/
│   ├── global/
│   │   ├── variables.css               ← Tokens de design (couleurs + polices uniquement)
│   │   ├── reset.css
│   │   └── base.css                    ← Styles de base, animations, squelettes
│   ├── components/
│   │   ├── navbar.css
│   │   ├── cards.css
│   │   └── footer.css
│   └── pages/
│       ├── home/                       ← main.css (point d'entrée), hero.css, about.css, learn.css
│       ├── cards/                      ← cartes.css (point d'entrée)
│       └── session/                    ← session.css (point d'entrée)
│
├── scripts/
│   ├── lessons.js                      ← Utilitaires de chargement JSON (partagé)
│   ├── cards-renderer.js               ← Rendu HTML d'une carte (partagé)
│   ├── home.js                         ← Script de la page d'accueil
│   ├── cartes.js                       ← Script de la bibliothèque
│   └── session.js                      ← Script de la page de session
│
└── assets/
    └── lessons/
        ├── registry.js                 ← ⭐ Seul fichier à modifier pour ajouter un trio
        ├── English/
        │   ├── Trio1/lesson.json + audio/
        │   ├── Trio2/
        │   └── Trio3/
        └── Spanish/
            ├── Trio1/lesson.json + audio/
            ├── Trio2/
            └── Trio3/
```

---

## Convention CSS

Seules les couleurs (`--color-*`, `--c-*`) et les polices (`--font-*`) peuvent être définies comme variables CSS. Toutes les autres valeurs (border-radius, padding, transitions, shadows…) sont écrites directement dans les règles.
