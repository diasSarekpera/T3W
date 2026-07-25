/**
 * T3W – nav.js
 * ─────────────────────────────────────────
 * Contrôleur de navigation mobile partagé par toutes les pages.
 * Gère : ouverture/fermeture du burger, voile d'arrière-plan,
 * fermeture au clic extérieur, à la touche Échap, et verrouillage
 * du scroll du body pendant que le menu est ouvert.
 *
 * Fonctionne avec n'importe quelle paire burger/liens du moment que :
 *   - le bouton porte l'attribut [data-nav-burger]
 *   - le conteneur de liens porte l'attribut [data-nav-links]
 * Un voile optionnel #nav-overlay est activé s'il est présent dans la page.
 */

(function () {
  const burger = document.querySelector('[data-nav-burger]');
  const links  = document.querySelector('[data-nav-links]');
  const overlay = document.getElementById('nav-overlay');
  if (!burger || !links) return;

  let isOpen = false;

  function setOpen(open) {
    isOpen = open;
    links.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');

    if (overlay) {
      overlay.hidden = !open;
      overlay.classList.toggle('open', open);
    }

    // Verrouille le scroll de la page pendant que le menu mobile est ouvert
    document.body.style.overflow = open ? 'hidden' : '';

    if (open) {
      // Déplace le focus vers le premier lien pour l'accessibilité clavier
      const firstLink = links.querySelector('a');
      if (firstLink) firstLink.focus({ preventScroll: true });
    }
  }

  burger.addEventListener('click', () => setOpen(!isOpen));

  // Fermeture au clic sur le voile
  if (overlay) {
    overlay.addEventListener('click', () => setOpen(false));
  }

  // Fermeture au clic sur un lien (navigation interne)
  links.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false);
  });

  // Fermeture à la touche Échap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      setOpen(false);
      burger.focus();
    }
  });

  // Sécurité : si la fenêtre repasse en desktop, on réinitialise l'état
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && isOpen) setOpen(false);
  });
})();
