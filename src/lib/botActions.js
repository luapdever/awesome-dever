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
  cv: { type: "external", url: "/cv" },
  os: { type: "route", url: "/paulfolio" },
  book: { type: "route", url: "/book" },
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
  book: { fr: "Lire le livre", en: "Read the book" },
};

// Un marqueur peut porter un argument après « : » (ex. « book:3 » = chapitre 3
// du livre). On sépare la CIBLE de son argument ; l'argument ne sert qu'au livre.
export function parseAction(raw) {
  const [key, arg] = String(raw || "").split(":");
  return { key, arg: arg || "" };
}
const BOOK_CHAP_LABEL = { fr: "Lire ce chapitre", en: "Read this chapter" };

export function navLabel(key, lang) {
  const { key: base, arg } = parseAction(key);
  const fr = lang !== "en";
  if (base === "book" && arg) return fr ? BOOK_CHAP_LABEL.fr : BOOK_CHAP_LABEL.en;
  const l = NAV_LABEL[base];
  if (!l) return "";
  return fr ? l.fr : l.en;
}

/* Découpe un texte en segments texte / lien cliquable (URL, www., email).
   Renvoie [{ t: "text"|"link", v, href? }] — le rendu JSX se fait côté composant.
   La ponctuation finale (., ), etc.) est exclue du lien. */
const LINK_RE = /(https?:\/\/[^\s]+|www\.[^\s]+|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g;
// Découpe un fragment de texte sur les marqueurs **gras** (Markdown) en
// tokens text/bold, pour un rendu en <b> (le modèle formate ainsi ses titres,
// ex. « **DevOps & Cloud** »).
const BOLD_RE = /\*\*(.+?)\*\*/g;
function pushText(out, str) {
  if (!str) return;
  let last = 0;
  let m;
  BOLD_RE.lastIndex = 0;
  while ((m = BOLD_RE.exec(str)) !== null) {
    if (m.index > last) out.push({ t: "text", v: str.slice(last, m.index) });
    out.push({ t: "bold", v: m[1] });
    last = m.index + m[0].length;
  }
  if (last < str.length) out.push({ t: "text", v: str.slice(last) });
}

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
    if (m.index > last) pushText(out, src.slice(last, m.index));
    const isEmail = /^[^\s@]+@[^\s@]+$/.test(tok) && !/^https?:/i.test(tok);
    const href = isEmail ? `mailto:${tok}` : /^www\./i.test(tok) ? `https://${tok}` : tok;
    out.push({ t: "link", v: tok, href, external: !isEmail });
    if (trailing) pushText(out, trailing);
    last = m.index + m[0].length;
  }
  if (last < src.length) pushText(out, src.slice(last));
  return out;
}

// Retire les marqueurs [[go:...]] (et un éventuel marqueur en cours de
// frappe en fin de flux) et renvoie le texte propre + les cibles trouvées.
export function extractActions(raw) {
  const actions = [];
  let clean = (raw || "").replace(/\[\[\s*go\s*:\s*([a-z]+(?::\d+)?)\s*\]\]/gi, (_, key) => {
    const norm = key.toLowerCase();
    const base = norm.split(":")[0];
    if (NAV[base]) actions.push(norm);
    return "";
  });
  clean = clean.replace(/\[\[[^\]]*$/, "").trim(); // marqueur partiel en streaming
  return { clean, actions };
}

// Heuristique : le message ressemble-t-il à une OFFRE D'EMPLOI collée ?
// Une offre est longue ET contient plusieurs signaux (missions, profil, stack…).
// → déclenche le mode « pitch » (analyse de fit) côté backend.
const JD_SIGNALS = [
  // intitulés / intentions
  "recherch", "recrut", "poste", "mission", "prestation", "profil", "freelance", "cdi", "cdd", "h/f",
  "postuler", "qualifications", "we are looking", "you will", "join our", "join us", "hiring", "role",
  // sections structurantes d'une offre
  "responsabilit", "responsibilities", "requirements", "compétence", "competence", "compétences", "competences",
  "domaine", "contexte", "conditions", "livrable", "prérequis", "prerequis", "missions détaillées",
  // conditions
  "expérience", "experience", "salaire", "salary", "tjm", "remote", "télétravail", "teletravail",
  "renouvelable", "stack technique",
];
export function looksLikeJobOffer(text) {
  const t = (text || "").toLowerCase();
  if (t.length < 180) return false; // une offre est rarement courte
  const hits = JD_SIGNALS.filter((s) => t.includes(s)).length;
  return hits >= 3;
}

// Découpe un contenu Markdown « riche » (réponses du mode pitch) en blocs
// rendables : tableaux, images INTERNES (chemin /…) et paragraphes de texte.
function splitRow(line) {
  return line.replace(/^\s*\|/, "").replace(/\|\s*$/, "").split("|").map((c) => c.trim());
}
export function richBlocks(raw) {
  const lines = (raw || "").replace(/\r/g, "").split("\n");
  const isRow = (s) => /^\s*\|.*\|\s*$/.test(s);
  const isSep = (s) => /^\s*\|[\s:|-]+\|\s*$/.test(s);
  const blocks = [];
  let para = [];
  const flush = () => { const v = para.join("\n").trim(); if (v) blocks.push({ type: "text", value: v }); para = []; };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const t = line.trim();
    // Image seule sur sa ligne, chemin INTERNE uniquement (sécurité : pas d'URL externe).
    const img = t.match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/);
    if (img && img[2].startsWith("/")) { flush(); blocks.push({ type: "image", alt: img[1], src: img[2] }); continue; }
    // Tableau : ligne d'en-tête | … | suivie d'une ligne séparatrice | --- |.
    if (isRow(line) && i + 1 < lines.length && isSep(lines[i + 1])) {
      flush();
      const header = splitRow(line);
      const rows = [];
      i += 2;
      while (i < lines.length && isRow(lines[i]) && !isSep(lines[i])) { rows.push(splitRow(lines[i])); i++; }
      i--;
      blocks.push({ type: "table", header, rows });
      continue;
    }
    para.push(line);
  }
  flush();
  return blocks;
}

// Extrait les relances suggérées par le LLM : marqueur [[next: q1 | q2 | q3]]
// (le modèle les ajoute à la fin ; le front en fait des pastilles). Renvoie le
// texte nettoyé + jusqu'à 3 questions. Tolère le marqueur partiel en streaming.
export function extractSuggestions(raw) {
  const suggestions = [];
  let clean = (raw || "").replace(/\[\[\s*next\s*:\s*([^\]]*?)\s*\]\]/gi, (_, list) => {
    for (const s of String(list).split("|").map((x) => x.trim()).filter(Boolean)) {
      if (suggestions.length < 3 && !suggestions.includes(s)) suggestions.push(s);
    }
    return "";
  });
  clean = clean.replace(/\[\[[^\]]*$/, "").trim(); // marqueur partiel en streaming
  return { clean, suggestions };
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
  const { key: base, arg } = parseAction(key);
  const nav = NAV[base];
  if (!nav) return false;
  if (nav.type === "external") { window.open(nav.url, "_blank", "noopener"); return true; }
  if (nav.type === "route") {
    const url = base === "book" && arg ? `${nav.url}?chap=${encodeURIComponent(arg)}` : nav.url;
    router.push(url);
    return true;
  }
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
