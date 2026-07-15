/* ============================================================
   PaulBot — actions de navigation.
   Le bot peut terminer sa réponse par un marqueur [[go:CIBLE]]
   (CIBLE parmi la whitelist ci-dessous) quand le visiteur demande
   à voir une page/section. Le front retire le marqueur du texte
   affiché et exécute la navigation. Aucune URL arbitraire.
   ============================================================ */
export const NAV = {
  bio: { type: "route", url: "/about-me" },
  collaborations: { type: "section", id: "collaborations" },
  skills: { type: "section", id: "que-sais-je-faire" },
  experiences: { type: "section", id: "experiences" },
  journey: { type: "section", id: "parcours" },
  testimonials: { type: "section", id: "temoignages" },
  stack: { type: "section", id: "stack" },
  contact: { type: "section", id: "collaborer" },
  cv: { type: "external", url: "/cv/index.html" },
  os: { type: "route", url: "/paulfolio" },
};

// Libellés du bouton d'action proposé au visiteur (jamais de navigation auto :
// le bot suggère, le visiteur clique).
export const NAV_LABEL = {
  bio: { fr: "Voir sa bio", en: "See his bio" },
  collaborations: { fr: "Voir ses projets", en: "See his projects" },
  skills: { fr: "Voir ses compétences", en: "See his skills" },
  experiences: { fr: "Voir ses expériences", en: "See his experience" },
  journey: { fr: "Voir son parcours", en: "See his journey" },
  testimonials: { fr: "Voir les témoignages", en: "See testimonials" },
  stack: { fr: "Voir sa stack", en: "See his stack" },
  contact: { fr: "Aller au contact", en: "Go to contact" },
  cv: { fr: "Ouvrir le CV", en: "Open the résumé" },
  os: { fr: "Ouvrir PaulBrain OS", en: "Open PaulBrain OS" },
};

export function navLabel(key, lang) {
  const l = NAV_LABEL[key];
  if (!l) return "";
  return l[lang === "en" ? "en" : "fr"];
}

// Retire les marqueurs [[go:...]] (et un éventuel marqueur en cours de
// frappe en fin de flux) et renvoie le texte propre + les cibles trouvées.
export function extractActions(raw) {
  const actions = [];
  let clean = (raw || "").replace(/\[\[\s*go\s*:\s*([a-z]+)\s*\]\]/gi, (_, key) => {
    const k = key.toLowerCase();
    if (NAV[k]) actions.push(k);
    return "";
  });
  clean = clean.replace(/\[\[[^\]]*$/, "").trim(); // marqueur partiel en streaming
  return { clean, actions };
}

// Exécute une cible. `router` = next/router. Retourne true si géré.
export function runNavAction(key, router) {
  const nav = NAV[key];
  if (!nav) return false;
  if (nav.type === "external") { window.open(nav.url, "_blank", "noopener"); return true; }
  if (nav.type === "route") { router.push(nav.url); return true; }
  // section : s'assurer d'être sur la home puis scroller vers l'ancre
  const scroll = () => {
    const el = document.getElementById(nav.id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  if (typeof window !== "undefined" && window.location.pathname === "/") {
    scroll();
  } else {
    Promise.resolve(router.push("/")).then(() => setTimeout(scroll, 450));
  }
  return true;
}
