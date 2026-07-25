/**
 * T3W – motion.js
 * ─────────────────────────────────────────
 * Contrôleur de révélation au scroll, partagé par toutes les pages.
 * Observe tout élément [data-reveal] et lui ajoute la classe
 * .is-visible dès qu'il entre dans le viewport (voir motion.css
 * pour les styles associés).
 *
 * - N'utilise IntersectionObserver que pour ce qui a une vraie
 *   valeur UX (contenu sous la ligne de flottaison).
 * - Respecte prefers-reduced-motion : dans ce cas, le contenu est
 *   affiché immédiatement, sans observation ni animation.
 * - Expose window.T3WMotion.observe(root) pour (ré)observer du
 *   contenu injecté dynamiquement après le chargement initial
 *   (ex : cartes générées depuis le JSON par home.js / cartes.js).
 */

(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let observer = null;

  function revealAll(root) {
    root.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-visible'));
  }

  function getObserver() {
    if (observer) return observer;
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -8% 0px', // révèle un peu avant que l'élément touche le bas du viewport
      threshold: 0.15
    });
    return observer;
  }

  function observe(root = document) {
    const targets = root.querySelectorAll('[data-reveal]:not(.is-visible)');
    if (prefersReduced) {
      targets.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const obs = getObserver();
    targets.forEach(el => obs.observe(el));
  }

  document.addEventListener('DOMContentLoaded', () => observe(document));

  // API publique pour le contenu injecté après coup (cartes dynamiques)
  window.T3WMotion = { observe, revealAll };
})();
