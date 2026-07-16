/* ============================================================
   PaulBot — enrichissements CÔTÉ CLIENT (aucun appel modèle).
   - detectProjects : repère les projets cités dans une réponse
     pour afficher des mini-cartes (construites par le front).
   - followUps : propose des questions de suivi contextuelles.
   - pageContext : suggestion liée à la page/section courante.
   ============================================================ */
import { L, tx } from "../rawDatas/i18n";
import { experiences } from "../rawDatas/experiences";

/* Faits déterministes sur Paul (répondus SANS le modèle).
   BOOKING : mailto par défaut (fonctionne partout) — remplace par un lien
   Cal.com/Calendly le jour où tu en as un. */
export const PAUL_FACTS = {
  email: "pzannou511@gmail.com",
  phone: "+2290190667333",
  phoneDisplay: "+229 01 90 66 73 33",
  location: "Cotonou / Abomey-Calavi, Bénin",
  booking: "https://cal.com/paul-zannou/15min",
};

/* Routeur d'intention CÔTÉ CLIENT.
   Renvoie une intention si la question a une réponse déterministe (email,
   téléphone, CV, dispo, parcours, tour…) → le modèle N'EST PAS sollicité.
   Renvoie null sinon → on laisse le LLM répondre. */
export function routeIntent(text) {
  const t = (text || "").toLowerCase().trim();
  if (!t) return null;
  const re = (r) => r.test(t);
  if (re(/qui\s+es[- ]?tu|t'?es qui|tu es qui|who are you|c'est quoi ce bot/)) return "who";
  if (re(/tour guid|visite guid|fais[- ]?moi visiter|guide[- ]?moi|guided tour|show me around|un petit tour/)) return "tour";
  if (re(/\bcv\b|curriculum|résumé|resume/)) return "cv";
  if (re(/e-?mail|courriel|adresse mail|son mail\b/)) return "email";
  if (re(/numéro|numero|téléphone|telephone|\bphone\b|whatsapp|l'appeler/)) return "phone";
  if (re(/où\s+(est|habite|vit|se trouve)|localisation|quelle ville|quel pays|based in|il habite/)) return "location";
  if (re(/rendez[- ]?vous|réserver|reserver|créneau|creneau|échanger|echanger|meeting|book a|rencontr|call with|prendre contact/)) return "meeting";
  if (re(/disponible|dispo\b|freelance|recrut|embauch|mission|tjm|tarif|available|for hire|hire him/)) return "dispo";
  if (re(/parcours|carrière|carriere|timeline|cheminement|ses?\s+expériences?|son\s+parcours|his experience|career path/)) return "timeline";
  return null; // → le modèle est nécessaire
}

// Construit la réponse cliente (contenu + widget) pour une intention.
export function clientAnswer(intent, lang) {
  const fr = lang !== "en";
  const S = (f, e) => (fr ? f : e);
  const F = PAUL_FACTS;
  switch (intent) {
    case "who":
      return { content: S("Je suis PaulBot, l'assistant du portfolio de Paul — je réponds sur son parcours, ses compétences et ses projets, et je peux t'emmener sur la bonne page.", "I'm PaulBot, Paul's portfolio assistant — I answer about his background, skills and projects, and can take you to the right page.") };
    case "email":
      return { content: S("Pour joindre Paul par email :", "Reach Paul by email:"), widget: { type: "info", rows: [{ label: "Email", value: F.email, href: `mailto:${F.email}` }] } };
    case "phone":
      return { content: S("Son numéro (WhatsApp aussi) :", "His number (WhatsApp too):"), widget: { type: "info", rows: [{ label: S("Téléphone", "Phone"), value: F.phoneDisplay, href: `tel:${F.phone}` }] } };
    case "location":
      return { content: S("Il est basé ici :", "He's based here:"), widget: { type: "info", rows: [{ label: S("Localisation", "Location"), value: F.location }] } };
    case "cv":
      return { content: S("Son CV interactif est juste là :", "His interactive résumé is right here:"), widget: { type: "info", actions: [{ label: S("Ouvrir le CV", "Open the résumé"), nav: "cv" }] } };
    case "meeting":
      return { content: S("Je te mets en relation avec lui :", "Let me connect you with him:"), widget: { type: "info", actions: [{ label: S("Proposer un échange", "Propose a chat"), href: F.booking }, { label: S("Écrire un email", "Send an email"), href: `mailto:${F.email}` }], askEmail: true } };
    case "dispo":
      return {
        content: S("Bonne nouvelle 🎯", "Good news 🎯"),
        widget: {
          type: "info",
          rows: [
            { label: S("Disponibilité", "Availability"), value: S("Ouvert aux missions freelance & collaborations", "Open to freelance & collaborations") },
            { label: S("Télétravail", "Remote"), value: S("Oui", "Yes") },
            { label: S("Basé à", "Based in"), value: F.location },
            { label: "Focus", value: "Web · Mobile · Backend · DevOps" },
          ],
          actions: [{ label: S("Proposer un échange", "Propose a chat"), href: F.booking }],
          askEmail: true,
        },
      };
    case "timeline":
      return { content: S("Son parcours en un coup d'œil :", "His journey at a glance:"), widget: { type: "timeline", items: careerTimeline(lang) } };
    case "tour":
      return { content: S("C'est parti pour un mini-tour guidé — je t'emmène section par section :", "Let's take a quick guided tour — I'll walk you through it:"), widget: { type: "tour" } };
    default:
      return { content: "" };
  }
}

// Frise de carrière compacte (depuis experiences.js), résolue par langue.
export function careerTimeline(lang) {
  return (experiences || []).map((e) => ({ role: tx(e.role, lang), org: e.org, period: tx(e.period, lang) }));
}

// Étapes du tour guidé (cible de navigation + libellé).
export function tourSteps(lang) {
  const fr = lang !== "en";
  const S = (f, e) => (fr ? f : e);
  return [
    { nav: "bio", label: S("Qui est Paul", "Who Paul is") },
    { nav: "skills", label: S("Ses compétences", "His skills") },
    { nav: "experiences", label: S("Son parcours", "His experience") },
    { nav: "collaborations", label: S("Ses projets", "His projects") },
    { nav: "contact", label: S("Le contacter", "Contact him") },
  ];
}

const fav = (d) => `https://www.google.com/s2/favicons?sz=64&domain=${d}`;

// Base de projets connue du front (dérivée du portfolio). Sert aux cartes.
export const BOT_PROJECTS = [
  { name: "Emilia Cross", aliases: ["emilia cross", "emilia"], url: "https://emiliacross.com/", icon: fav("emiliacross.com"), tag: L("Real-time video streaming", "Streaming vidéo temps réel") },
  { name: "My MTN · Selfcare", aliases: ["mymtn", "my mtn", "selfcare"], url: "https://my.mtn.bj/", icon: fav("my.mtn.bj"), tag: L("Vue.js self-care portal", "Portail selfcare Vue.js") },
  { name: "MTN Bénin", aliases: ["mtn bénin", "mtn benin", "mtn.bj"], url: "https://www.mtn.bj/", icon: fav("mtn.bj"), tag: L("Corporate WordPress", "Site corporate WordPress") },
  { name: "Mon Routeur", aliases: ["mon routeur", "monrouteur"], url: "https://monrouteur.mtn.bj/?ref=noref", icon: fav("monrouteur.mtn.bj"), tag: L("Activation journey", "Parcours d'activation") },
  { name: "WAPIFY", aliases: ["wapify"], url: "https://wapify.co/", icon: fav("wapify.co"), tag: L("WhatsApp AI marketing", "Marketing IA WhatsApp") },
  { name: "GoCoachings", aliases: ["gocoachings", "go coachings"], url: "https://www.gocoachings.com", icon: fav("gocoachings.com"), tag: L("Coaching platform", "Plateforme de coaching") },
  { name: "NinjaLinking", aliases: ["ninjalinking", "ninja linking"], url: "https://app.ninjalinking.fr", icon: fav("ninjalinking.fr"), tag: L("SEO backlinks SaaS", "SaaS backlinks SEO") },
  { name: "Sevexchange", aliases: ["sevexchange"], url: "https://sevexchange.com", icon: fav("sevexchange.com"), tag: L("Crypto & mobile-money exchange", "Échange crypto & mobile money") },
  { name: "Kloo", aliases: ["kloo"], url: "https://kloo.me", icon: fav("kloo.me"), tag: L("Link-in-bio platform", "Plateforme link-in-bio") },
];

// Repère jusqu'à 3 projets cités dans un texte (cartes construites par le front).
export function detectProjects(text, lang) {
  const t = (text || "").toLowerCase();
  const found = [];
  for (const p of BOT_PROJECTS) {
    const keys = [p.name.toLowerCase(), ...(p.aliases || [])];
    if (keys.some((k) => t.includes(k))) found.push({ name: p.name, url: p.url, icon: p.icon, tag: tx(p.tag, lang) });
    if (found.length >= 3) break;
  }
  return found;
}

// Questions de suivi contextuelles (statiques, choisies par le front).
export function followUps(lastUser, lastBot, lang) {
  const fr = lang !== "en";
  const S = (f, e) => (fr ? f : e);
  const t = `${lastUser || ""} ${lastBot || ""}`.toLowerCase();
  const has = (...ks) => ks.some((k) => t.includes(k));
  const pool = [];
  if (has("backend", "nestjs", "node", "api", "websocket")) pool.push(S("Et côté frontend ?", "And on the frontend?"), S("Montre-moi Emilia Cross", "Show me Emilia Cross"));
  if (has("frontend", "vue", "react", "nuxt", "flutter", "mobile")) pool.push(S("Et côté backend ?", "And on the backend?"));
  if (has("emilia")) pool.push(S("C'était quoi son rôle ?", "What was his role?"), S("Quelle stack pour Emilia ?", "What stack for Emilia?"));
  if (has("dispo", "disponible", "freelance", "mission", "recrut")) pool.push(S("Comment le contacter ?", "How to reach him?"), S("Ouvre son CV", "Open his résumé"));
  if (has("compétence", "maîtrise", "stack", "skills", "techno", "langage")) pool.push(S("Il a quels projets ?", "What has he built?"), S("Est-il disponible ?", "Is he available?"));
  if (has("cv", "résumé", "resume", "curriculum")) pool.push(S("Est-il disponible ?", "Is he available?"), S("Ses compétences ?", "His skills?"));
  if (has("contact", "email", "numéro", "recontact", "@")) pool.push(S("Est-il disponible ?", "Is he available?"));
  const defaults = [S("Il maîtrise quoi ?", "What's his stack?"), S("Montre-moi ses projets", "Show me his projects"), S("Est-il disponible ?", "Is he available?"), S("Comment le contacter ?", "How to reach him?")];
  for (const d of defaults) { if (pool.length >= 3) break; if (!pool.includes(d)) pool.push(d); }
  return [...new Set(pool)].slice(0, 3);
}

// Suggestion liée à la page / section actuellement regardée (aucun appel modèle).
export function pageContext(lang) {
  if (typeof window === "undefined") return null;
  const fr = lang !== "en";
  const S = (f, e) => (fr ? f : e);
  const path = window.location.pathname;
  if (path.startsWith("/about-me")) return { label: S("Résume-moi qui est Paul", "Sum up who Paul is"), prompt: S("Qui est Paul en quelques mots ?", "Who is Paul in a few words?") };
  if (path.startsWith("/paulfolio")) return { label: S("C'est quoi PaulBrain OS ?", "What is PaulBrain OS?"), prompt: S("C'est quoi PaulBrain OS ?", "What is PaulBrain OS?") };
  // Home : on regarde quelle section est la plus proche du centre du viewport.
  const SECTIONS = [
    { id: "experiences", label: S("Résume ses expériences", "Sum up his experience"), prompt: S("Résume-moi ses expériences.", "Sum up his experience.") },
    { id: "collaborations", label: S("Parle-moi de ses projets", "Tell me about his projects"), prompt: S("Parle-moi de ses projets.", "Tell me about his projects.") },
    { id: "que-sais-je-faire", label: S("Il maîtrise quoi ?", "What's his stack?"), prompt: S("Il maîtrise quoi ?", "What's his stack?") },
    { id: "stack", label: S("Sa stack technique ?", "His tech stack?"), prompt: S("C'est quoi sa stack technique ?", "What's his tech stack?") },
    { id: "temoignages", label: S("Ce qu'on dit de lui ?", "What people say about him?"), prompt: S("Que disent ses collaborateurs de lui ?", "What do his collaborators say about him?") },
    { id: "collaborer", label: S("Comment le contacter ?", "How to reach him?"), prompt: S("Comment puis-je le contacter ?", "How can I contact him?") },
  ];
  const mid = window.innerHeight / 2;
  let best = null, bestDist = Infinity;
  for (const s of SECTIONS) {
    const el = document.getElementById(s.id);
    if (!el) continue;
    const r = el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) continue; // hors écran
    const dist = Math.abs(r.top + r.height / 2 - mid);
    if (dist < bestDist) { bestDist = dist; best = s; }
  }
  return best ? { label: best.label, prompt: best.prompt } : null;
}
