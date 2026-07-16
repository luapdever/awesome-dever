import { useEffect } from "react";
import Head from "next/head";

/* Page-cadre pour embarquer le widget PaulBot dans une page tierce (ex. le CV
   statique /cv/index.html) via un <iframe>. Elle ne rend AUCUN widget elle-même :
   le <BotWidget/> global de _app s'affiche déjà (avec ses providers) — donc zéro
   duplication de code.

   Objectif : que l'ANIMATION d'ouverture soit identique à celle du site React.
   Problème résolu : l'iframe passe de « petit coin » à « plein viewport » à
   l'ouverture ; si le panneau se monte pendant que l'iframe est encore minuscule,
   il « pop » clippé / en plein écran puis saute. On corrige par :
     1. un redimensionnement ANTICIPÉ (dès le pointerdown sur le launcher, avant
        que le panneau ne se monte) ;
     2. une détection responsive basée sur le VRAI écran (parent), pas sur la
        largeur de l'iframe (patch matchMedia + override CSS), pour que le
        panneau soit posé à sa taille finale dès la première frame. */

// Patch matchMedia AU CHARGEMENT DU MODULE (avant le montage du widget) : la
// requête (max-width:560px) reflète la largeur du parent (vrai appareil), pas
// celle de l'iframe qu'on redimensionne.
if (typeof window !== "undefined" && !window.__pbMMPatched) {
  window.__pbMMPatched = true;
  try {
    const real = window.matchMedia.bind(window);
    const parentW = () => {
      try { return window.parent.innerWidth || window.innerWidth; } catch { return window.innerWidth; }
    };
    window.matchMedia = (q) => {
      if (/max-width:\s*560px/.test(q)) {
        const base = real(q);
        return {
          get matches() { return parentW() <= 560; },
          media: base.media,
          onchange: null,
          addEventListener: base.addEventListener ? base.addEventListener.bind(base) : undefined,
          removeEventListener: base.removeEventListener ? base.removeEventListener.bind(base) : undefined,
          addListener: base.addListener ? base.addListener.bind(base) : undefined,
          removeListener: base.removeListener ? base.removeListener.bind(base) : undefined,
          dispatchEvent: base.dispatchEvent ? base.dispatchEvent.bind(base) : undefined,
        };
      }
      return real(q);
    };
  } catch {}
}

function BotEmbed() {
  // Avant l'effet du widget : pas de teaser (déborderait de l'iframe fermée) et
  // on démarre fermé. Effet de bord volontaire au rendu client.
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem("paulbot_teaser", "1");
      sessionStorage.removeItem("paulbot_open");
    } catch {}
  }

  useEffect(() => {
    const isMobile = () => {
      try { return (window.parent.innerWidth || window.innerWidth) <= 560; } catch { return window.innerWidth <= 560; }
    };
    // Marque le vrai type d'appareil (pilote l'override CSS ci-dessous).
    const setDev = () => { document.documentElement.dataset.realDevice = isMobile() ? "mobile" : "desktop"; };
    setDev();

    // Signale au parent l'état ouvert/fermé → il dimensionne l'iframe.
    const report = () => {
      const open = !!document.querySelector('[role="dialog"]');
      try { window.parent.postMessage({ __paulbot: true, open }, "*"); } catch {}
    };
    // Redimensionne l'iframe DÈS le pointerdown sur le launcher (avant que le
    // panneau ne se monte) → l'animation d'ouverture se joue à la bonne taille.
    const preOpen = (e) => {
      const el = e.target;
      if (el && el.closest && el.closest('[class*="launcher"]') && !document.querySelector('[role="dialog"]')) {
        try { window.parent.postMessage({ __paulbot: true, open: true }, "*"); } catch {}
      }
    };

    const obs = new MutationObserver(report);
    obs.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("pointerdown", preOpen, true);
    window.addEventListener("resize", setDev);
    const t = setTimeout(report, 120);
    report();
    return () => {
      obs.disconnect();
      document.removeEventListener("pointerdown", preOpen, true);
      window.removeEventListener("resize", setDev);
      clearTimeout(t);
    };
  }, []);

  return (
    <Head>
      <title>PaulBot</title>
      <meta name="robots" content="noindex" />
      <style>{`
        html, body, #__next { background: transparent !important; }
        body { margin: 0; overflow: hidden; }
        * { cursor: auto !important; }
        /* masque le curseur custom du site à l'intérieur de l'iframe */
        [class*="cursor"] { display: none !important; }
        /* Sur un vrai écran desktop, force le panneau flottant (même si l'iframe
           est momentanément étroite pendant l'ouverture) → jamais de plein écran
           mobile qui « saute ». Rendu identique au site React. */
        html[data-real-device="desktop"] [class*="botwidget_panel__"] {
          position: fixed !important;
          top: auto !important;
          left: auto !important;
          right: 22px !important;
          bottom: 92px !important;
          width: min(380px, calc(100vw - 32px)) !important;
          height: min(560px, calc(100vh - 130px)) !important;
          border-radius: 20px !important;
        }
      `}</style>
    </Head>
  );
}

BotEmbed.hideChrome = true;
export default BotEmbed;
