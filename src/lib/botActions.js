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

/* Découpe un texte en segments texte / lien cliquable (URL, www., email).
   Renvoie [{ t: "text"|"link", v, href? }] — le rendu JSX se fait côté composant.
   La ponctuation finale (., ), etc.) est exclue du lien. */
const LINK_RE = /(https?:\/\/[^\s]+|www\.[^\s]+|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g;
export function linkTokens(text) {
  const src = text || "";
  const out = [];
  let last = 0;
  let m;
  LINK_RE.lastIndex = 0;
  while ((m = LINK_RE.exec(src)) !== null) {
    let tok = m[0];
    const trail = tok.match(/[.,;:!?)\]}'"»…]+$/);
    const trailing = trail ? trail[0] : "";
    if (trailing) tok = tok.slice(0, tok.length - trailing.length);
    if (!tok) continue;
    if (m.index > last) out.push({ t: "text", v: src.slice(last, m.index) });
    const isEmail = /^[^\s@]+@[^\s@]+$/.test(tok) && !/^https?:/i.test(tok);
    const href = isEmail ? `mailto:${tok}` : /^www\./i.test(tok) ? `https://${tok}` : tok;
    out.push({ t: "link", v: tok, href, external: !isEmail });
    if (trailing) out.push({ t: "text", v: trailing });
    last = m.index + m[0].length;
  }
  if (last < src.length) out.push({ t: "text", v: src.slice(last) });
  return out;
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

// Scrolle vers une section de la home (en s'y rendant d'abord si besoin).
// Navigation client-side : aucun rechargement de page.
function scrollToHomeSection(id, router) {
  const scroll = () => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  if (typeof window !== "undefined" && window.location.pathname === "/") {
    scroll();
  } else {
    Promise.resolve(router.push("/")).then(() => setTimeout(scroll, 450));
  }
  return true;
}

// Exécute une cible de la whitelist. `router` = next/router. Retourne true si géré.
export function runNavAction(key, router) {
  const nav = NAV[key];
  if (!nav) return false;
  if (nav.type === "external") { window.open(nav.url, "_blank", "noopener"); return true; }
  if (nav.type === "route") { router.push(nav.url); return true; }
  return scrollToHomeSection(nav.id, router); // type "section"
}

// Navigation vers un lien RELATIF saisi à la main : soit une ancre de la home
// ("#section"), soit une route interne ("/page"). Tout lien externe (http://,
// //, protocole) est refusé. Aucun rechargement de page (router client-side).
export function navigateRelative(target, router) {
  const t = (target || "").trim();
  if (!t) return false;
  if (/^[a-z][a-z0-9+.-]*:/i.test(t) || t.startsWith("//")) return false; // externe / protocole
  if (t.startsWith("#")) return scrollToHomeSection(t.slice(1), router);
  if (t.startsWith("/")) { router.push(t); return true; }
  return false;
}
