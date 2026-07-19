/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import styles from "../../../styles/global/botwidget.module.css";
import { useLandingLang } from "../../context/landingLang";
import { NAV, extractActions, extractSuggestions, runNavAction, navLabel, navigateRelative, linkTokens, looksLikeJobOffer, richBlocks } from "../../lib/botActions";
import { detectProjects, followUps, pageContext, routeIntent, clientAnswer, tourSteps, smalltalk, smalltalkReply, waitingMessage } from "../../lib/botExtras";
import { submitContact, solveAltcha } from "../../lib/altcha";

const MIC = "/icons/ph/microphone__000000.svg";
const MIC_ON = "/icons/ph/microphone-fill__2a1a00.svg";
const SPEAK = "/icons/ph/speaker-high__ffd9a0.svg";
const SPEAK_ON = "/icons/ph/speaker-simple-x__ffd9a0.svg";

const ROBOT = "/icons/ph/robot.svg";
const SEND = "/icons/ph/paper-plane-tilt-fill__2a1a00.svg";
const CHAT = "/icons/ph/chat-circle-dots-fill__1a0a00.svg";
const CLOSE = "/icons/ph/x-bold__ffffff.svg";

const CHAT_URL = process.env.NEXT_PUBLIC_CHAT_URL || "/api/chat";

// Repère les réponses "cul-de-sac" (bot indisponible / renvoi vers Paul).
// Dans ces cas on remplace la réponse par la carte /dispo (contact + dispo),
// pour ne pas laisser le visiteur sans piste.
const UNAVAILABLE_RE = /(momentan[eé]ment indisponible|indisponible pour le moment|momentarily unavailable|r[eé]essaie dans un instant|try again shortly|[eé]cri(?:s|re)[- ]?(?:lui|moi)?\s+(?:directement\s+)?[àa]\s+paul|write\s+(?:directly\s+)?to\s+paul|reach\s+paul\s+directly|contacte[rz]?\s+paul\s+directement)/i;

// Données de conversation PARTAGÉES entre tous les onglets/iframes de même
// origine, via localStorage (contrairement à sessionStorage, isolé par onglet).
// Ainsi une conversation entamée sur le site se retrouve dans le widget embarqué
// (ex. le CV, ouvert dans un autre onglet). Lecture avec repli sur sessionStorage
// pour migrer sans perte les sessions déjà en cours.
const shared = {
  get(key) {
    try {
      const l = localStorage.getItem(key);
      if (l !== null) return l;
      // Migration : une session déjà en cours (ancien sessionStorage) est
      // promue vers localStorage pour devenir partagée entre onglets.
      const s = sessionStorage.getItem(key);
      if (s !== null) { localStorage.setItem(key, s); sessionStorage.removeItem(key); }
      return s;
    } catch { return null; }
  },
  set(key, val) {
    try { localStorage.setItem(key, val); sessionStorage.removeItem(key); } catch {}
  },
  remove(key) {
    try { localStorage.removeItem(key); sessionStorage.removeItem(key); } catch {}
  },
};

const UI = {
  fr: {
    title: "PaulBot",
    subtitle: "Assistant du portfolio",
    intros: [
      (n) => `Salut${n ? ` ${n}` : ""} 👋 Moi c'est PaulBot. Pose-moi tes questions sur le parcours, les compétences ou les projets de Paul — je peux même t'emmener sur la bonne page.`,
      (n) => `Hey${n ? ` ${n}` : ""} ✨ Ravi de te voir ! Je suis PaulBot : parcours, compétences, projets de Paul… ou une petite visite guidée, comme tu préfères.`,
      (n) => `Bonjour${n ? ` ${n}` : ""} 🙂 PaulBot à ton service. Curieux du parcours, des compétences ou des projets de Paul ? Je t'explique et je peux te guider sur le site.`,
      (n) => `Coucou${n ? ` ${n}` : ""} 👋 Ici PaulBot. Demande-moi ce que tu veux sur Paul — parcours, compétences, projets — je réponds et je t'oriente.`,
      (n) => `Content de t'accueillir${n ? `, ${n}` : ""} ! 🚀 Je suis PaulBot. Parcours, compétences, projets de Paul : dis-moi juste ce qui t'intéresse.`,
    ],
    placeholder: "Écris ton message…",
    placeholderRecruiter: "Colle une offre d'emploi — je te dis si Paul colle…",
    offerCta: "📋 Préciser mon offre",
    error: "Je suis momentanément indisponible. Réessaie dans un instant, ou écris directement à Paul : pzannou511@gmail.com.",
    suggestions: ["Il maîtrise quoi ?", "Montre-moi ses projets", "Est-il disponible ?"],
    open: "Discuter avec PaulBot",
    onbTitle: "Avant de commencer",
    onbText: "Comment Paul peut-il te recontacter au besoin ?",
    pseudoLabel: "Pseudo",
    pseudoPh: "Comment t'appelles-tu ?",
    onbModeLabel: "Me recontacter par",
    tabEmail: "Email",
    tabPhone: "Téléphone",
    tabIncognito: "Rester anonyme",
    emailPh: "ton@email.com",
    phonePh: "N° de téléphone",
    phoneConsent: "Ton numéro pourra être utilisé pour te recontacter.",
    incognitoNote: "Mode anonyme — seul ton pseudo est conservé.",
    invalidName: "Indique un pseudo.",
    invalidEmail: "Email invalide.",
    invalidPhone: "Numéro invalide.",
    start: "Commencer",
    slashTip: "Astuce : tape « / » pour des commandes rapides.",
    goHint: "Choisis une section, ou tape un lien relatif (#section ou /page) puis Entrée.",
    options: "Options",
    enlarge: "Agrandir le widget",
    reduce: "Réduire le widget",
    exportPdf: "Exporter en PDF",
    clearConvo: "Effacer la conversation",
    available: "Disponible",
    personaVisitor: "Visiteur",
    personaRecruiter: "Je recrute",
    recruiterIntros: [
      (n) => `Bonjour${n ? ` ${n}` : ""} 👋 Je suis PaulBot. Pose-moi tout sur la disponibilité de Paul, sa stack ou ses projets — ou récupère son CV en un clic.`,
      (n) => `Ravi de t'accueillir${n ? `, ${n}` : ""} 🙂 PaulBot ici. Dispo, stack technique, réalisations… ou son CV directement : dis-moi ce qu'il te faut.`,
      (n) => `Hey${n ? ` ${n}` : ""} ✨ Tu recrutes ? Parfait. Disponibilité, compétences, projets de Paul — je te réponds vite, et son CV est à un clic.`,
      (n) => `Bienvenue${n ? `, ${n}` : ""} 🚀 Je suis PaulBot. Évalue Paul en deux minutes : dispo, stack, projets, contact — je te guide.`,
    ],
    recruiterSuggestions: ["Est-il disponible ?", "Sa stack technique ?", "Ouvre son CV", "Comment le contacter ?"],
    teaser: "Une question sur Paul ? 👋",
    mic: "Dicter",
    micStop: "Arrêter la dictée",
    readAloud: "Lire à voix haute",
    stopReading: "Arrêter la lecture",
    retry: "Réessayer",
    escalatePrompt: "Tu veux que Paul te recontacte ? Laisse ton email 👇",
    escalateOffer: "Laisse ton email — Paul te répond, ou propose un échange 👇",
    escalateAck: "Bien reçu ! Paul a tous les détails, il revient vers toi (confirmation envoyée par email).",
    escalatePh: "ton@email.com",
    escalateSend: "OK",
    escalateAgain: (n, max) => `Envoyé ! Tu peux en laisser un autre (${n}/${max}).`,
    escalateMax: "Merci, on s'arrête là (5 max) 🙂",
    tourStepLabel: "Étape",
    tourGoTo: "Aller à",
    tourDone: "Tour terminé ✨",
  },
  en: {
    title: "PaulBot",
    subtitle: "Portfolio assistant",
    intros: [
      (n) => `Hi${n ? ` ${n}` : ""} 👋 I'm PaulBot. Ask me anything about Paul's background, skills or projects — I can even take you to the right page.`,
      (n) => `Hey${n ? ` ${n}` : ""} ✨ Great to see you! I'm PaulBot: Paul's background, skills, projects… or a quick guided tour, your call.`,
      (n) => `Hello${n ? ` ${n}` : ""} 🙂 PaulBot here. Curious about Paul's journey, skills or projects? I'll explain and can guide you around.`,
      (n) => `Welcome${n ? `, ${n}` : ""}! 🚀 I'm PaulBot. Background, skills, projects — just tell me what you'd like to explore.`,
      (n) => `Hi there${n ? `, ${n}` : ""} 👋 PaulBot at your service. Anything about Paul — I'll answer and point you the right way.`,
    ],
    placeholder: "Type your message…",
    placeholderRecruiter: "Paste a job offer — I'll tell you if Paul fits…",
    offerCta: "📋 Paste my offer",
    error: "I'm momentarily unavailable. Please try again shortly, or reach Paul directly at pzannou511@gmail.com.",
    suggestions: ["What's his stack?", "Show me his projects", "Is he available?"],
    open: "Chat with PaulBot",
    onbTitle: "Before we start",
    onbText: "How can Paul get back to you if needed?",
    pseudoLabel: "Nickname",
    pseudoPh: "What should we call you?",
    onbModeLabel: "Reach me via",
    tabEmail: "Email",
    tabPhone: "Phone",
    tabIncognito: "Stay anonymous",
    emailPh: "you@email.com",
    phonePh: "Phone number",
    phoneConsent: "Your number may be used to get back to you.",
    incognitoNote: "Anonymous mode — only your nickname is kept.",
    invalidName: "Please enter a nickname.",
    invalidEmail: "Invalid email.",
    invalidPhone: "Invalid number.",
    start: "Start",
    slashTip: "Tip: type “/” for quick commands.",
    goHint: "Pick a section, or type a relative link (#section or /page) then Enter.",
    options: "Options",
    enlarge: "Enlarge widget",
    reduce: "Reduce widget",
    exportPdf: "Export to PDF",
    clearConvo: "Clear conversation",
    available: "Available",
    personaVisitor: "Visitor",
    personaRecruiter: "I'm hiring",
    recruiterIntros: [
      (n) => `Hello${n ? ` ${n}` : ""} 👋 I'm PaulBot. Ask me anything about Paul's availability, stack or projects — or grab his résumé in one click.`,
      (n) => `Glad to have you${n ? `, ${n}` : ""} 🙂 PaulBot here. Availability, tech stack, shipped projects… or his résumé directly: tell me what you need.`,
      (n) => `Hey${n ? ` ${n}` : ""} ✨ Hiring? Perfect. Paul's availability, skills and projects — quick answers, and his résumé is one click away.`,
      (n) => `Welcome${n ? `, ${n}` : ""} 🚀 I'm PaulBot. Size Paul up in two minutes: availability, stack, projects, contact — I'll guide you.`,
    ],
    recruiterSuggestions: ["Is he available?", "His tech stack?", "Open his résumé", "How to reach him?"],
    teaser: "A question about Paul? 👋",
    mic: "Dictate",
    micStop: "Stop dictation",
    readAloud: "Read aloud",
    stopReading: "Stop reading",
    retry: "Retry",
    escalatePrompt: "Want Paul to get back to you? Drop your email 👇",
    escalateOffer: "Leave your email — Paul will reply, or propose a chat 👇",
    escalateAck: "Got it ✅ — Paul has all the details and will get back to you (confirmation sent by email).",
    escalatePh: "you@email.com",
    escalateSend: "OK",
    escalateAgain: (n, max) => `Sent ✅ — you can add another (${n}/${max}).`,
    escalateMax: "Thanks, that's the limit (5 max) 🙂",
    tourStepLabel: "Step",
    tourGoTo: "Go to",
    tourDone: "Tour done ✨",
  },
};

// Commandes rapides déclenchées en tapant « / ». type "ask" → envoie une
// question au bot ; type "go" → ouvre le sélecteur de navigation.
const COMMANDS = {
  fr: [
    { cmd: "/visite", desc: "Visite guidée du portfolio", type: "ask", prompt: "Fais-moi une visite guidée." },
    { cmd: "/parcours", desc: "Sa carrière en frise", type: "ask", prompt: "Montre-moi son parcours." },
    { cmd: "/dispo", desc: "Disponibilité + recontact", type: "ask", prompt: "Est-il disponible ?" },
    { cmd: "/rdv", desc: "Proposer un échange (Cal.com)", type: "ask", prompt: "Réserver un créneau avec Paul." },
    { cmd: "/projets", desc: "Ses projets (avec liens)", type: "ask", prompt: "Montre-moi ses projets." },
    { cmd: "/competences", desc: "Ses compétences", type: "ask", prompt: "Quelles sont ses compétences ?" },
    { cmd: "/email", desc: "Son email", type: "ask", prompt: "Son email ?" },
    { cmd: "/cv", desc: "Ouvrir son CV", type: "ask", prompt: "Son CV ?" },
    { cmd: "/go", desc: "Naviguer vers une page ou section", type: "go" },
  ],
  en: [
    { cmd: "/tour", desc: "Guided portfolio tour", type: "ask", prompt: "Give me a guided tour." },
    { cmd: "/journey", desc: "His career timeline", type: "ask", prompt: "Show me his experience." },
    { cmd: "/available", desc: "Availability + follow-up", type: "ask", prompt: "Is he available?" },
    { cmd: "/meet", desc: "Propose a chat (Cal.com)", type: "ask", prompt: "Book a slot with Paul." },
    { cmd: "/projects", desc: "His projects (with links)", type: "ask", prompt: "Show me his projects." },
    { cmd: "/skills", desc: "His skills", type: "ask", prompt: "What are his skills?" },
    { cmd: "/email", desc: "His email", type: "ask", prompt: "His email?" },
    { cmd: "/cv", desc: "Open his résumé", type: "ask", prompt: "His CV?" },
    { cmd: "/go", desc: "Go to a page or section", type: "go" },
  ],
};

const newId = () => {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  } catch {}
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

// Date relative « friendly » : à l'instant, 1 min, 1 h, hier, 3 j, puis date.
const friendlyTime = (ts, lang, now) => {
  if (!ts) return "";
  const fr = lang !== "en";
  const s = Math.floor(Math.max(0, (now || Date.now()) - ts) / 1000);
  if (s < 60) return fr ? "à l'instant" : "just now";
  const min = Math.floor(s / 60);
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h} h`;
  const d = Math.floor(h / 24);
  if (d === 1) return fr ? "hier" : "yesterday";
  if (d < 7) return fr ? `${d} j` : `${d} d`;
  return new Date(ts).toLocaleDateString(fr ? "fr-FR" : "en-US", { day: "numeric", month: "short" });
};

/* Composant unique : rendu flottant (défaut) OU intégré dans une fenêtre de
   l'OS via `embedded` — même code, aucune duplication. En mode embedded, le
   chat remplit son conteneur (pas de launcher, pas de bulle, toujours ouvert). */
function BotWidget({ embedded = false, lang: langProp }) {
  const router = useRouter();
  const { lang: landingLang } = useLandingLang();
  const lang = langProp || landingLang;
  const ui = UI[lang] || UI.fr;
  const [open, setOpen] = useState(false);
  const shown = embedded || open;
  const [messages, setMessages] = useState([]);
  const [pending, setPending] = useState(false);
  const [contact, setContact] = useState(null);
  const [onbMode, setOnbMode] = useState("email");
  const [onbName, setOnbName] = useState("");
  const [onbPhone, setOnbPhone] = useState("");
  const [onbError, setOnbError] = useState("");
  const [draft, setDraft] = useState("");
  const [slashIndex, setSlashIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
const [big, setBig] = useState(false); // desktop : agrandir un peu le widget
const [introSeed, setIntroSeed] = useState(0); // variante d'accueil (aléatoire, client)
const [narrow, setNarrow] = useState(false); // viewport mobile (≤560px) — réactif
  const [now, setNow] = useState(0);
  const [onbPersona, setOnbPersona] = useState("visitor");
  const [teaser, setTeaser] = useState(false);
  const [listening, setListening] = useState(false);
  const [speakingIdx, setSpeakingIdx] = useState(-1);
  const [ctxSuggest, setCtxSuggest] = useState(null);
  const [tourStep, setTourStep] = useState(0);
  const [escCount, setEscCount] = useState(0); // tentatives de recontact (max 5)
  const [escEmail, setEscEmail] = useState("");
  const ESC_MAX = 5;
  const scrollRef = useRef();
  const pinnedTopRef = useRef(-1); // index du msg assistant long déjà "épinglé en haut"
  const answeredRef = useRef(new Map()); // idempotence : prompt normalisé → réponse LLM réussie
  const altchaOkRef = useRef(false); // anti-bot : conversation déjà vérifiée (ALTCHA)
  const inputRef = useRef();
  const onbRef = useRef();
  const cidRef = useRef("");
  const lastMsgsRef = useRef(null); // dernier JSON messages écrit/reçu (anti-boucle de synchro)
  const historyRef = useRef([]);
  const histIdxRef = useRef(-1);
  const recognitionRef = useRef(null);
  const voiceSupported = typeof window !== "undefined" && !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  const ttsSupported = typeof window !== "undefined" && "speechSynthesis" in window;

  const commands = COMMANDS[lang] || COMMANDS.fr;

  // Palette « / » : soit le menu des commandes, soit le sélecteur /go.
  const slash = useMemo(() => {
    if (pending || !draft.startsWith("/")) return null;
    if (/^\/go(\s|$)/i.test(draft)) {
      const q = draft.replace(/^\/go\s*/i, "").toLowerCase();
      const raw = draft.replace(/^\/go\s*/i, "").trim();
      const link = /^[/#]/.test(raw) ? raw : "";
      const items = Object.keys(NAV)
        .map((key) => ({ key, label: navLabel(key, lang) }))
        .filter((t) => !q || t.key.includes(q) || t.label.toLowerCase().includes(q));
      return { mode: "go", items, link };
    }
    const q = draft.slice(1).toLowerCase();
    const items = commands.filter((c) => c.cmd.slice(1).includes(q) || c.desc.toLowerCase().includes(q));
    return { mode: "menu", items, link: "" };
  }, [draft, pending, lang, commands]);

  const slashActive = !!slash && (slash.items.length > 0 || slash.mode === "go");
  const slashItems = slash ? slash.items : [];

  useEffect(() => {
    try {
      const saved = shared.get("paulbot_contact");
      if (saved) setContact(JSON.parse(saved));
      let cid = shared.get("paulbot_cid");
      if (!cid) { cid = newId(); shared.set("paulbot_cid", cid); }
      cidRef.current = cid;
      const savedMsgs = shared.get("paulbot_messages");
      if (savedMsgs) { const arr = JSON.parse(savedMsgs); if (Array.isArray(arr)) { setMessages(arr); lastMsgsRef.current = savedMsgs; } }
      const ec = Number(shared.get("paulbot_esc_count")) || 0;
      if (ec) setEscCount(ec);
      if (localStorage.getItem("paulbot_big") === "1") setBig(true);
      setIntroSeed(Math.floor(Math.random() * 997)); // choisit une variante d'accueil
      if (!embedded && sessionStorage.getItem("paulbot_open") === "1") setOpen(true);
    } catch {}
    if (embedded) return; // pas d'ouverture externe en mode intégré
    // Ouverture déclenchée depuis l'extérieur (ex. le choix "PaulBot" du modal).
    const openHandler = () => setOpen(true);
    window.addEventListener("paulbot:open", openHandler);
    return () => window.removeEventListener("paulbot:open", openHandler);
  }, [embedded]);

  // Suit la largeur du viewport (pour savoir si « Agrandir » a du sens).
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(max-width: 560px)");
    const on = () => setNarrow(mq.matches);
    on();
    mq.addEventListener ? mq.addEventListener("change", on) : mq.addListener(on);
    return () => (mq.removeEventListener ? mq.removeEventListener("change", on) : mq.removeListener(on));
  }, []);

  // Persistance : état ouvert/fermé (widget flottant uniquement).
  useEffect(() => {
    if (embedded) return;
    try { sessionStorage.setItem("paulbot_open", open ? "1" : "0"); } catch {}
  }, [open, embedded]);
  useEffect(() => {
    if (pending) return; // évite d'écrire à chaque token pendant le streaming
    const val = messages.length ? JSON.stringify(messages.slice(-40)) : "";
    if (val === lastMsgsRef.current) return; // rien de neuf (ou écho d'une synchro)
    lastMsgsRef.current = val;
    if (val) shared.set("paulbot_messages", val);
    else shared.remove("paulbot_messages");
  }, [messages, pending]);

  // Synchro live entre onglets/iframes : quand un autre widget (même origine)
  // met à jour la conversation, l'identité ou les tentatives, on s'aligne.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.storageArea && e.storageArea !== localStorage) return;
      if (e.key === "paulbot_messages") {
        lastMsgsRef.current = e.newValue || "";
        try { const arr = e.newValue ? JSON.parse(e.newValue) : []; if (Array.isArray(arr)) setMessages(arr); } catch {}
      } else if (e.key === "paulbot_contact") {
        try { setContact(e.newValue ? JSON.parse(e.newValue) : null); } catch {}
      } else if (e.key === "paulbot_esc_count") {
        setEscCount(Number(e.newValue) || 0);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // À l'ouverture : on montre le bas (dernier échange).
  useEffect(() => {
    if (open && scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [open]);

  // À chaque message : dès que la réponse du bot commence à s'afficher, on aligne
  // son HAUT (pour la lire depuis le début) UNE fois, puis on ne re-scrolle PLUS
  // pendant le streaming — l'utilisateur descend à son rythme. Le « penseur »
  // (bulle vide) et les messages visiteur restent affichés en bas.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const lastIdx = messages.length - 1;
    const last = messages[lastIdx];
    if (last && last.role === "assistant") {
      if (pinnedTopRef.current === lastIdx) return; // réponse déjà épinglée → mains libres
      if (last.content) {
        // 1er contenu de la réponse → on épingle son HAUT, puis plus aucun scroll auto.
        pinnedTopRef.current = lastIdx;
        const rows = el.querySelectorAll(`.${styles.row}`);
        const lastRow = rows[rows.length - 1];
        if (lastRow) el.scrollTop += lastRow.getBoundingClientRect().top - el.getBoundingClientRect().top - 8;
        return;
      }
      el.scrollTop = el.scrollHeight; // « penseur » (bulle vide) → visible en bas
      return;
    }
    pinnedTopRef.current = -1;
    el.scrollTop = el.scrollHeight; // message visiteur / ouverture → bas
  }, [messages]);

  // Autocomplete : pré-remplit le champ de recontact avec l'email de l'onboarding
  // (le recruteur n'a qu'à valider ; il peut toujours saisir un autre email).
  useEffect(() => {
    if (contact?.mode === "email" && contact?.value) setEscEmail((v) => v || contact.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contact?.mode, contact?.value]);

  // Rafraîchit les dates relatives tant que le chat est visible.
  useEffect(() => {
    if (!shown) return;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, [shown]);

  useEffect(() => { setSlashIndex(0); }, [draft]);
  useEffect(() => { autoGrow(inputRef.current); }, [draft]);

  // Raccourci clavier ⌘K / Ctrl+K (widget flottant uniquement).
  useEffect(() => {
    if (embedded) return;
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [embedded]);

  // Bulle d'accroche proactive après 15 s d'inactivité (widget flottant, 1×/session).
  useEffect(() => {
    if (embedded || typeof window === "undefined" || open) return;
    try { if (sessionStorage.getItem("paulbot_teaser") === "1") return; } catch {}
    const id = setTimeout(() => setTeaser(true), 15000);
    return () => clearTimeout(id);
  }, [open, embedded]);

  // Conscience de la page : suggestion liée à la section regardée, à l'affichage.
  useEffect(() => {
    if (!shown) return;
    if (!embedded) { setTeaser(false); try { sessionStorage.setItem("paulbot_teaser", "1"); } catch {} }
    if (messages.length === 0) setCtxSuggest(pageContext(lang));
  }, [shown, embedded, lang, messages.length]);

  // Coupe la synthèse vocale quand le chat est masqué / démonté.
  useEffect(() => {
    if (!ttsSupported) return;
    if (!shown) { window.speechSynthesis.cancel(); setSpeakingIdx(-1); }
    return () => { window.speechSynthesis.cancel(); };
  }, [shown, ttsSupported]);

  const confirmContact = () => {
    setOnbError("");
    const name = onbName.trim();
    if (!name) { setOnbError(ui.invalidName); return; }
    let c;
    if (onbMode === "incognito") {
      c = { mode: "incognito", name };
    } else if (onbMode === "email") {
      const value = (onbRef.current?.value || "").trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { setOnbError(ui.invalidEmail); return; }
      c = { mode: "email", name, value };
    } else {
      if (!onbPhone || !isValidPhoneNumber(onbPhone)) { setOnbError(ui.invalidPhone); return; }
      c = { mode: "phone", name, value: onbPhone, consent: true };
    }
    c.persona = onbPersona; // "visitor" | "recruiter" — pilote l'accueil (front only)
    shared.set("paulbot_contact", JSON.stringify(c));
    setContact(c);
    setTimeout(() => inputRef.current?.focus(), 60);
  };

  const autoGrow = (el) => {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  };

  // Repli /dispo : réponse cliente "dispo" (contact + disponibilité), avec une
  // intro neutre — jouée quand le modèle est indisponible ou renvoie vers Paul.
  const dispoFallback = () => ({
    ...clientAnswer("dispo", lang),
    content:
      lang === "fr"
        ? "Je te partage directement sa disponibilité et de quoi le joindre 👇"
        : "Here's his availability and how to reach him directly 👇",
  });

  // Rendu inline (liens, gras) — commun aux messages simples et aux cellules/blocs pitch.
  const renderInline = (text) =>
    linkTokens(text).map((tok, k) =>
      tok.t === "link" ? (
        <a key={k} href={tok.href} target={tok.external ? "_blank" : undefined} rel="noopener noreferrer" className={styles.msgLink}>{tok.v}</a>
      ) : tok.t === "bold" ? (
        <b key={k}>{tok.v}</b>
      ) : (
        <React.Fragment key={k}>{tok.v}</React.Fragment>
      )
    );

  // Rendu riche (mode pitch) : tableaux, images INTERNES, paragraphes de texte.
  const renderBlock = (b, k) => {
    if (b.type === "image") return <img key={k} src={b.src} alt={b.alt} className={styles.pitchImg} loading="lazy" />;
    if (b.type === "table")
      return (
        <div key={k} className={styles.pitchTableWrap}>
          <table className={styles.pitchTable}>
            <thead><tr>{b.header.map((h, j) => <th key={j}>{renderInline(h)}</th>)}</tr></thead>
            <tbody>{b.rows.map((r, ri) => <tr key={ri}>{r.map((c, ci) => <td key={ci}>{renderInline(c)}</td>)}</tr>)}</tbody>
          </table>
        </div>
      );
    return <div key={k} className={styles.richBlock}>{renderInline(b.value)}</div>;
  };

  // Action « Préciser mon offre » (recruteur) : place le curseur dans le champ
  // pour qu'il écrive/colle son offre — SANS envoyer (on lui laisse la main).
  const promptForOffer = () => {
    const el = inputRef.current;
    if (!el) return;
    el.focus();
    try { el.scrollIntoView({ block: "nearest" }); } catch {}
  };

  // Idempotence : rejoue une réponse LLM déjà obtenue pour ce prompt, SANS
  // re-solliciter le bot. Une réponse "indispo" n'étant jamais mise en cache,
  // un renvoi du même prompt retente réellement.
  const normKey = (s) => (s || "").trim().toLowerCase().replace(/\s+/g, " ");
  const tryReuseAnswer = (content, userMsg) => {
    const cached = answeredRef.current.get(normKey(content));
    if (!cached) return false;
    setMessages((m) => [...m, userMsg, { role: "assistant", at: Date.now(), ...cached }]);
    return true;
  };

  // Appelle le LLM avec un contexte donné (streaming). Marque l'erreur pour
  // permettre un « Réessayer ».
  const callModel = async (contextMessages, opts) => {
    const pitch = !!(opts && opts.pitch);
    const cacheKey = normKey([...contextMessages].reverse().find((mm) => mm.role === "user")?.content || "");
    setPending(true);
    setMessages((m) => [...m, { role: "assistant", content: "", at: Date.now(), ...(pitch ? { rich: true } : {}) }]);
    let acc = "";
    let started = false;
    // Si le modèle tarde (> 2 s) et que rien n'est encore arrivé, on glisse un
    // petit message d'attente sympa dans la bulle (remplacé dès le 1er token).
    const waitTimer = setTimeout(() => {
      if (started) return;
      setMessages((m) => {
        const copy = m.slice();
        const last = copy[copy.length - 1];
        if (last && last.role === "assistant" && !last.content) {
          copy[copy.length - 1] = { ...last, content: waitingMessage(lang), waiting: true };
        }
        return copy;
      });
    }, 2000);
    try {
      const url = (typeof window !== "undefined" && window.__CHAT_URL) || CHAT_URL;
      // Anti-bot : sur le 1er message d'une conversation, on résout l'ALTCHA
      // (proof-of-work) et on joint la preuve ; ensuite le backend fait confiance
      // à la conversation (plus de PoW à re-résoudre).
      let altcha;
      if (!altchaOkRef.current) {
        try { altcha = await solveAltcha(); } catch { altcha = undefined; }
      }
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: contextMessages, lang, conversationId: cidRef.current, contact, ...(pitch ? { mode: "pitch" } : {}), ...(altcha ? { altcha } : {}) }),
      });
      if (!res.ok || !res.body) throw new Error(`http ${res.status}`);
      if (altcha) altchaOkRef.current = true; // jeton accepté → conversation vérifiée
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        if (!started) { started = true; clearTimeout(waitTimer); }
        const shown = extractSuggestions(extractActions(acc).clean).clean;
        setMessages((m) => {
          const copy = m.slice();
          copy[copy.length - 1] = { ...copy[copy.length - 1], role: "assistant", content: shown, error: false, waiting: false };
          return copy;
        });
      }
      const acted = extractActions(acc);
      const { clean: finalShown, suggestions: llmSuggest } = extractSuggestions(acted.clean);
      // Vraie impasse = message hors-ligne ou vide. On ne REMPLACE la réponse que
      // dans ce cas ; sinon on AFFICHE la réponse de l'IA (jamais écrasée), et si
      // elle renvoie vers le contact, on AJOUTE le repli dispo APRÈS (message séparé).
      const isDeadEnd = !finalShown.trim() || /momentan[eé]ment indisponible|momentarily unavailable/i.test(finalShown);
      if (!pitch && isDeadEnd && UNAVAILABLE_RE.test(finalShown)) {
        // Cul-de-sac réel (hors-ligne / vide) → on bascule sur /dispo.
        setMessages((m) => {
          const copy = m.slice();
          copy[copy.length - 1] = { ...copy[copy.length - 1], role: "assistant", error: false, waiting: false, action: undefined, ...dispoFallback() };
          return copy;
        });
      } else {
        setMessages((m) => {
          const copy = m.slice();
          copy[copy.length - 1] = {
            ...copy[copy.length - 1],
            role: "assistant", content: finalShown, error: false, waiting: false,
            ...(acted.actions[0] ? { action: acted.actions[0] } : {}),
            ...(llmSuggest.length ? { suggest: llmSuggest } : {}),
          };
          return copy;
        });
        // La réponse renvoie vers le contact/dispo → on l'AJOUTE en message séparé
        // (après la réponse), au lieu de l'écraser.
        if (!pitch && UNAVAILABLE_RE.test(finalShown)) {
          setMessages((m) => [...m, { role: "assistant", at: Date.now(), ...dispoFallback() }]);
        }
        // Mémorise la réponse (idempotence) — uniquement une vraie réponse.
        if (cacheKey) {
          const entry = { content: finalShown };
          if (acted.actions[0]) entry.action = acted.actions[0];
          if (llmSuggest.length) entry.suggest = llmSuggest;
          if (pitch) entry.rich = true;
          const map = answeredRef.current;
          map.set(cacheKey, entry);
          if (map.size > 40) map.delete(map.keys().next().value); // cap mémoire (FIFO)
        }
      }
    } catch {
      // Indisponibilité réseau/serveur → on bascule sur /dispo plutôt qu'un
      // message d'erreur sans issue.
      setMessages((m) => {
        const copy = m.slice();
        copy[copy.length - 1] = { ...copy[copy.length - 1], role: "assistant", error: false, waiting: false, action: undefined, ...dispoFallback() };
        return copy;
      });
    } finally {
      clearTimeout(waitTimer);
      setPending(false);
    }
  };

  const send = (text) => {
    const content = (text || "").trim();
    if (!content || pending) return;
    historyRef.current.push(content);
    histIdxRef.current = -1;
    const userMsg = { role: "user", content, at: Date.now() };

    // 1) Politesse évidente (bonjour, merci, au revoir, ça va) → preset, AUCUN modèle.
    const st = smalltalk(content);
    if (st) {
      const reply = smalltalkReply(st, lang, contact?.name);
      setMessages((m) => [...m, userMsg, { role: "assistant", at: Date.now(), content: reply }]);
      return;
    }

    // Idempotence : si ce prompt a déjà reçu une vraie réponse, on la rejoue
    // (ni appel modèle, ni email d'offre en double). Les "indispo" ne sont pas
    // cachées → un renvoi retente réellement.
    if (tryReuseAnswer(content, userMsg)) return;

    // 1.5) Offre d'emploi collée → mode PITCH (analyse de fit), direct au modèle.
    if (looksLikeJobOffer(content)) {
      const next = [...messages, userMsg];
      setMessages(next);
      callModel(next, { pitch: true });
      return;
    }

    // 2) Réponse déterministe côté client → AUCUN appel modèle. Réservée aux
    //    questions COURTES : un long texte collé (offre, brief…) ne doit pas
    //    être capté par un intent (ex. « email » car l'offre mentionne des e-mails).
    const intent = content.length < 220 ? routeIntent(content) : null;
    if (intent) {
      const ans = clientAnswer(intent, lang);
      setMessages((m) => [...m, userMsg, { role: "assistant", at: Date.now(), ...ans }]);
      return;
    }

    // 2) Sinon seulement, on sollicite le modèle.
    const next = [...messages, userMsg];
    setMessages(next);
    callModel(next);
  };

  // Réémet la requête pour un message en erreur (offline).
  const retry = (failedIdx) => {
    if (pending) return;
    const context = messages.slice(0, failedIdx); // se termine sur le message user
    setMessages(context);
    callModel(context);
  };

  // Escalade recontact : met à jour le contact ET envoie à Paul via le MÊME
  // service que le formulaire (captcha ALTCHA + rate-limit côté backend).
  const submitEscalate = async () => {
    if (escCount >= ESC_MAX) return;
    const value = escEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return;
    const c = { ...(contact || {}), mode: "email", value, name: contact?.name || "Visiteur" };
    shared.set("paulbot_contact", JSON.stringify(c));
    setContact(c);
    // Compte la tentative (jusqu'à 5) — le formulaire se cache ensuite.
    const next = escCount + 1;
    setEscCount(next);
    shared.set("paulbot_esc_count", String(next));
    setEscEmail("");
    try {
      await submitContact({ name: c.name, email: value, message: "Demande de recontact via PaulBot.", source: "bot-recontact" });
    } catch {
      /* silencieux : le contact figure aussi dans le PDF de conversation */
    }
  };

  // Sur mobile, le widget couvre tout l'écran : après une navigation on le
  // ferme pour laisser voir la destination (jamais en mode embarqué / OS).
  const isMobile = () =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 560px)").matches;
  const runNav = (fn) => {
    fn();
    if (!embedded && isMobile()) setOpen(false);
  };

  // Desktop : agrandir/réduire un peu le widget (préférence mémorisée).
  const toggleBig = () => {
    setBig((b) => {
      const next = !b;
      try { localStorage.setItem("paulbot_big", next ? "1" : "0"); } catch {}
      return next;
    });
    setMenuOpen(false);
  };

  // Tour guidé : navigue vers la section courante puis avance.
  const tourNext = () => {
    const steps = tourSteps(lang);
    const s = steps[tourStep];
    if (!s) return;
    runNav(() => runNavAction(s.nav, router));
    setTourStep((i) => Math.min(i + 1, steps.length));
  };

  const chooseSlash = (item) => {
    if (!item) return;
    if (slash?.mode === "go") { setDraft(""); runNav(() => runNavAction(item.key, router)); return; }
    if (item.type === "go") { setDraft("/go "); setTimeout(() => inputRef.current?.focus(), 0); return; }
    if (item.type === "ask") { setDraft(""); send(item.prompt); return; }
  };

  const submit = () => {
    if (slashActive) {
      // /go avec un lien relatif saisi → on navigue directement.
      if (slash.mode === "go" && slash.link) { setDraft(""); runNav(() => navigateRelative(slash.link, router)); return; }
      chooseSlash(slashItems[slashIndex]);
      return;
    }
    const v = draft.trim();
    setDraft("");
    send(v);
  };

  const onKeyDown = (e) => {
    if (slashActive) {
      if (e.key === "ArrowDown") { e.preventDefault(); setSlashIndex((i) => Math.min(i + 1, slashItems.length - 1)); return; }
      if (e.key === "ArrowUp") { e.preventDefault(); setSlashIndex((i) => Math.max(i - 1, 0)); return; }
      if (e.key === "Escape") { e.preventDefault(); setDraft(""); return; }
      if (e.key === "Enter" || e.key === "Tab") { e.preventDefault(); submit(); return; }
    }
    // Historique de saisie (↑/↓) — comme un terminal. Seulement si champ vide
    // ou déjà en navigation d'historique, pour ne pas gêner l'édition.
    if (!slashActive && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
      const hist = historyRef.current;
      if (hist.length && (draft === "" || histIdxRef.current >= 0)) {
        e.preventDefault();
        if (e.key === "ArrowUp") {
          histIdxRef.current = histIdxRef.current < 0 ? hist.length - 1 : Math.max(0, histIdxRef.current - 1);
          setDraft(hist[histIdxRef.current]);
        } else {
          if (histIdxRef.current < 0) return;
          histIdxRef.current += 1;
          if (histIdxRef.current >= hist.length) { histIdxRef.current = -1; setDraft(""); }
          else setDraft(hist[histIdxRef.current]);
        }
        return;
      }
    }
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); }
  };

  // Ouvre/ferme la palette de commandes depuis le bouton « / ».
  const toggleSlash = () => {
    setDraft(slashActive ? "" : "/");
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  // Exporte la conversation courante en PDF (même rendu que l'email serveur).
  const exportPdf = async () => {
    setMenuOpen(false);
    const msgs = messages.filter((m) => m.content && m.content.trim());
    if (!msgs.length) return;
    try {
      const base = (typeof window !== "undefined" && window.__CHAT_URL) || CHAT_URL;
      const url = base.replace(/\/chat(\/?)$/, "/transcript$1");
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: msgs.map((m) => ({ role: m.role, content: m.content, at: m.at })),
          contact,
          conversationId: cidRef.current,
        }),
      });
      if (!res.ok) throw new Error("pdf");
      const blob = await res.blob();
      const href = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = href;
      a.download = "paulbot-conversation.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(href), 2000);
    } catch {
      /* silencieux : l'export nécessite le backend, comme le chat lui-même */
    }
  };

  // Efface l'historique CÔTÉ CLIENT uniquement. Le conversationId est conservé,
  // donc le transcript serveur (→ PDF/email) n'est pas affecté.
  const clearConversation = () => {
    setMessages([]);
    setDraft("");
    setMenuOpen(false);
    answeredRef.current.clear(); // on repart de zéro → cache d'idempotence vidé
    altchaOkRef.current = false; // nouvelle conversation → re-vérification anti-bot
    pinnedTopRef.current = -1;
    // On repart de zéro : on oublie aussi l'identité du visiteur et on la redemande.
    setContact(null);
    setOnbName("");
    setOnbPhone("");
    setOnbError("");
    setOnbMode("email");
    setOnbPersona("visitor");
    setEscCount(0);
    setTourStep(0);
    setIntroSeed(Math.floor(Math.random() * 997)); // nouvelle variante d'accueil
    lastMsgsRef.current = "";
    shared.remove("paulbot_messages");
    shared.remove("paulbot_contact");
    shared.remove("paulbot_esc_count");
    const cid = newId(); // nouvelle conversation → nouvel identifiant (nouveau PDF)
    shared.set("paulbot_cid", cid);
    cidRef.current = cid;
  };

  const dismissTeaser = () => {
    setTeaser(false);
    try { sessionStorage.setItem("paulbot_teaser", "1"); } catch {}
  };

  // Dictée vocale (Web Speech API) — remplit le champ, aucun appel modèle.
  const toggleMic = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    if (listening) { recognitionRef.current?.stop(); return; }
    const rec = new SR();
    rec.lang = lang === "en" ? "en-US" : "fr-FR";
    rec.interimResults = true;
    rec.continuous = false;
    rec.onresult = (e) => {
      const txt = Array.from(e.results).map((r) => r[0].transcript).join("");
      setDraft(txt);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recognitionRef.current = rec;
    setListening(true);
    try { rec.start(); } catch { setListening(false); }
  };

  // Lecture à voix haute de la réponse du bot (SpeechSynthesis).
  const speakMsg = (text, idx) => {
    if (!ttsSupported) return;
    window.speechSynthesis.cancel();
    if (speakingIdx === idx) { setSpeakingIdx(-1); return; }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "en" ? "en-US" : "fr-FR";
    u.onend = () => setSpeakingIdx(-1);
    u.onerror = () => setSpeakingIdx(-1);
    setSpeakingIdx(idx);
    window.speechSynthesis.speak(u);
  };

  return (
    <>
      {shown && (
        <div className={embedded ? styles.embed : `${styles.panel} ${big ? styles.panelBig : ""}`} role="dialog" aria-label={ui.title}>
          <header className={styles.head}>
            <img src={ROBOT + "?color=%23110068"} alt="" className={styles.headIcon} />
            <div className={styles.headText}>
              <b>{ui.title}</b>
              <span className={styles.headStatus}><i className={styles.statusDot} />{ui.available}</span>
            </div>
            {(() => {
              const canEnlarge = !embedded && !narrow;
              const canExport = messages.some((mm) => mm.content && mm.content.trim());
              const canClear = !!contact || messages.length > 0;
              if (!canEnlarge && !canExport && !canClear) return null; // rien à afficher
              return (
                <div className={styles.headMenuWrap}>
                  <button
                    className={styles.headKebab}
                    onClick={() => setMenuOpen((o) => !o)}
                    aria-label={ui.options}
                    aria-expanded={menuOpen}
                  >⋯</button>
                  {menuOpen && (
                    <>
                      <div className={styles.menuScrim} onClick={() => setMenuOpen(false)} />
                      <div className={styles.menuPop} role="menu">
                        {canEnlarge && (
                          <button type="button" onClick={toggleBig} role="menuitem">{big ? ui.reduce : ui.enlarge}</button>
                        )}
                        {canExport && (
                          <button type="button" onClick={exportPdf} role="menuitem">{ui.exportPdf}</button>
                        )}
                        {canClear && (
                          <button type="button" className={styles.menuDanger} onClick={clearConversation} role="menuitem">{ui.clearConvo}</button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })()}
            {!embedded && (
              <button className={styles.headClose} onClick={() => setOpen(false)} aria-label="Fermer">
                <img src={CLOSE} alt="" />
              </button>
            )}
          </header>

          {!contact ? (
            <div className={styles.onboard}>
              <img src={ROBOT + "?color=%23ffffff"} alt="" className={styles.onbIcon} />
              <b className={styles.onbTitle}>{ui.onbTitle}</b>
              <p className={styles.onbText}>{ui.onbText}</p>

              <div className={styles.personaTabs}>
                <button type="button" className={onbPersona === "visitor" ? styles.personaOn : ""} onClick={() => setOnbPersona("visitor")}>{ui.personaVisitor}</button>
                <button type="button" className={onbPersona === "recruiter" ? styles.personaOn : ""} onClick={() => setOnbPersona("recruiter")}>{ui.personaRecruiter}</button>
              </div>

              <input
                className={styles.onbInput}
                type="text"
                value={onbName}
                onChange={(e) => setOnbName(e.target.value)}
                placeholder={ui.pseudoPh}
                aria-label={ui.pseudoLabel}
                autoComplete="nickname"
                maxLength={40}
              />

              <label className={styles.onbSelectRow}>
                <span>{ui.onbModeLabel}</span>
                <select
                  className={styles.onbSelect}
                  value={onbMode}
                  onChange={(e) => { setOnbMode(e.target.value); setOnbError(""); }}
                >
                  <option value="email">{ui.tabEmail}</option>
                  <option value="phone">{ui.tabPhone}</option>
                  <option value="incognito">{ui.tabIncognito}</option>
                </select>
              </label>

              {onbMode === "email" && (
                <input
                  ref={onbRef}
                  className={styles.onbInput}
                  type="email"
                  placeholder={ui.emailPh}
                  onKeyDown={(e) => e.key === "Enter" && confirmContact()}
                  autoComplete="email"
                />
              )}
              {onbMode === "phone" && (
                <div className={styles.phoneWrap}>
                  <PhoneInput
                    international
                    defaultCountry="BJ"
                    value={onbPhone}
                    onChange={(v) => setOnbPhone(v || "")}
                    placeholder={ui.phonePh}
                  />
                </div>
              )}
              {onbError && <p className={styles.onbErr}>{onbError}</p>}
              <p className={styles.consent}>
                {onbMode === "phone" ? ui.phoneConsent : onbMode === "incognito" ? ui.incognitoNote : " "}
              </p>

              <button className={styles.onbStart} type="button" onClick={confirmContact}>{ui.start}</button>
            </div>
          ) : (
            <>
              <div className={styles.stream} ref={scrollRef} role="log" aria-live="polite" aria-relevant="additions text">
                {messages.length === 0 && (
                  <div className={styles.intro}>
                    <p>
                      {(() => {
                        const variants = contact?.persona === "recruiter" ? ui.recruiterIntros : ui.intros;
                        const pick = variants[introSeed % variants.length];
                        return pick(contact?.name || "");
                      })()}
                    </p>
                    <div className={styles.suggest}>
                      {contact?.persona === "recruiter" && (
                        <button type="button" className={styles.suggestCtx} onClick={promptForOffer}>{ui.offerCta}</button>
                      )}
                      {ctxSuggest && (
                        <button type="button" className={styles.suggestCtx} onClick={() => send(ctxSuggest.prompt)}>{ctxSuggest.label}</button>
                      )}
                      {(contact?.persona === "recruiter" ? ui.recruiterSuggestions : ui.suggestions).map((s, i) => (
                        <button key={i} type="button" onClick={() => send(s)}>{s}</button>
                      ))}
                    </div>
                    <p className={styles.slashTip}>{ui.slashTip}</p>
                  </div>
                )}
                {messages.map((m, i) => {
                  const isUser = m.role === "user";
                  const empty = !m.content;
                  const isLast = i === messages.length - 1;
                  const thinking = empty && pending && isLast;
                  const streaming = !isUser && pending && isLast && !empty;
                  return (
                    <div key={i} className={`${styles.row} ${isUser ? styles.rowUser : ""}`}>
                      {!isUser && <img src={ROBOT} alt="" className={`${styles.avatar} ${thinking ? styles.avatarLive : ""}`} />}
                      <div className={styles.bubbleCol}>
                        <div className={isUser ? styles.user : styles.assistant}>
                          {thinking ? (
                            <span className={styles.dots}><i /><i /><i /></span>
                          ) : isUser ? (
                            m.content
                          ) : (
                            <>
                              {m.rich
                                ? richBlocks(m.content).map((b, k) => renderBlock(b, k))
                                : renderInline(m.content)}
                              {streaming && <span className={styles.caret} />}
                            </>
                          )}
                        </div>

                        {/* Après une offre (pitch) : inviter à laisser son email
                            (quel que soit le mode d'onboarding) → Paul reçoit les
                            détails et le recruteur un accusé de réception. */}
                        {!isUser && m.rich && isLast && escCount < ESC_MAX && (
                          <div className={styles.escalate}>
                            <span className={styles.escText}>{escCount > 0 ? ui.escalateAck : ui.escalateOffer}</span>
                            {escCount === 0 && (
                              <div className={styles.escRow}>
                                <input type="email" className={styles.escInput} placeholder={ui.escalatePh} value={escEmail} onChange={(e) => setEscEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submitEscalate()} />
                                <button type="button" className={styles.escBtn} onClick={submitEscalate}>{ui.escalateSend}</button>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Widgets de réponse cliente (construits par le front) */}
                        {!isUser && m.widget && m.widget.type === "info" && (
                          <div className={styles.infoCard}>
                            {(m.widget.rows || []).map((r, k) => (
                              <div key={k} className={styles.infoRow}>
                                <span className={styles.infoLabel}>{r.label}</span>
                                {r.href ? (
                                  <a className={styles.infoValue} href={r.href} target={/^(mailto|tel):/.test(r.href) ? undefined : "_blank"} rel="noopener noreferrer">{r.value}</a>
                                ) : (
                                  <span className={styles.infoValue}>{r.value}</span>
                                )}
                              </div>
                            ))}
                            {m.widget.actions && (
                              <div className={styles.infoActions}>
                                {m.widget.actions.map((a, k) => a.nav ? (
                                  <button key={k} type="button" className={styles.infoBtn} onClick={() => runNav(() => runNavAction(a.nav, router))}>{a.label} →</button>
                                ) : (
                                  <a key={k} className={styles.infoBtn} href={a.href} target={/^(mailto|tel):/.test(a.href) ? undefined : "_blank"} rel="noopener noreferrer">{a.label} →</a>
                                ))}
                              </div>
                            )}
                            {m.widget.askEmail && (contact?.mode === "incognito" || escCount > 0) && escCount < ESC_MAX && (
                              <div className={styles.escalate}>
                                <span className={styles.escText}>{escCount > 0 ? ui.escalateAgain(escCount, ESC_MAX) : ui.escalatePrompt}</span>
                                <div className={styles.escRow}>
                                  <input type="email" className={styles.escInput} placeholder={ui.escalatePh} value={escEmail} onChange={(e) => setEscEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submitEscalate()} />
                                  <button type="button" className={styles.escBtn} onClick={submitEscalate}>{ui.escalateSend}</button>
                                </div>
                              </div>
                            )}
                            {m.widget.askEmail && escCount >= ESC_MAX && <div className={styles.escDone}>{ui.escalateMax}</div>}
                          </div>
                        )}
                        {!isUser && m.widget && m.widget.type === "timeline" && (
                          <div className={styles.timeline}>
                            {m.widget.items.map((it, k) => (
                              <div key={k} className={styles.tlItem}>
                                <span className={styles.tlDot} />
                                <div className={styles.tlBody}>
                                  <b>{it.role}</b>
                                  <span className={styles.tlOrg}>{it.org}</span>
                                  <span className={styles.tlPeriod}>{it.period}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        {!isUser && m.widget && m.widget.type === "tour" && (() => {
                          const steps = tourSteps(lang);
                          const done = tourStep >= steps.length;
                          return (
                            <div className={styles.tour}>
                              <span className={styles.tourProg}>{done ? ui.tourDone : `${ui.tourStepLabel} ${tourStep + 1}/${steps.length}`}</span>
                              {!done && <button type="button" className={styles.tourBtn} onClick={tourNext}>{ui.tourGoTo} : {steps[tourStep].label} →</button>}
                            </div>
                          );
                        })()}

                        {!isUser && m.error && !pending && (
                          <button type="button" className={styles.retryBtn} onClick={() => retry(i)}>↻ {ui.retry}</button>
                        )}
                        {!isUser && m.action && !streaming && (
                          <button
                            type="button"
                            className={styles.navAction}
                            onClick={() => runNav(() => runNavAction(m.action, router))}
                          >
                            {navLabel(m.action, lang)} →
                          </button>
                        )}
                        {!isUser && !streaming && m.content && detectProjects(m.content, lang).length > 0 && (
                          <div className={styles.projCards}>
                            {detectProjects(m.content, lang).map((p, k) => (
                              <a key={k} href={p.url} target="_blank" rel="noopener noreferrer" className={styles.projCard}>
                                <img src={p.icon} alt="" className={styles.projIcon} />
                                <span className={styles.projInfo}>
                                  <b>{p.name}</b>
                                  <span>{p.tag}</span>
                                </span>
                                <span className={styles.projArrow} aria-hidden="true">↗</span>
                              </a>
                            ))}
                          </div>
                        )}
                        {!thinking && m.at && (
                          <span className={styles.msgFoot}>
                            <span className={styles.msgTime}>{friendlyTime(m.at, lang, now)}</span>
                            {!isUser && !streaming && m.content && ttsSupported && (
                              <button
                                type="button"
                                className={styles.ttsBtn}
                                onClick={() => speakMsg(m.content, i)}
                                aria-label={speakingIdx === i ? ui.stopReading : ui.readAloud}
                                title={speakingIdx === i ? ui.stopReading : ui.readAloud}
                              >
                                <img src={speakingIdx === i ? SPEAK_ON : SPEAK} alt="" />
                              </button>
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Questions de suivi contextuelles (front, aucun appel modèle) */}
                {!pending && messages.length > 0 && (() => {
                  const last = messages[messages.length - 1];
                  if (!last || last.role !== "assistant" || !last.content) return null;
                  const prevUser = [...messages].reverse().find((mm) => mm.role === "user");
                  // Relances suggérées par le LLM (piggyback [[next:…]]) si présentes,
                  // sinon repli déterministe côté client (tours sans appel modèle).
                  const chips = (last.suggest && last.suggest.length)
                    ? last.suggest.slice(0, 3)
                    : followUps(prevUser?.content, last.content, lang);
                  return chips.length ? (
                    <div className={styles.followRow}>
                      {chips.map((c, k) => (
                        <button key={k} type="button" className={styles.followChip} onClick={() => send(c)}>{c}</button>
                      ))}
                    </div>
                  ) : null;
                })()}
              </div>

              {slashActive && (
                <div className={styles.slashPop}>
                  {slash.mode === "go" && <div className={styles.slashHint}>{ui.goHint}</div>}
                  {slashItems.map((it, idx) => (
                    <button
                      key={slash.mode === "go" ? it.key : it.cmd}
                      type="button"
                      className={`${styles.slashItem} ${idx === slashIndex ? styles.slashItemOn : ""}`}
                      onMouseEnter={() => setSlashIndex(idx)}
                      onClick={() => chooseSlash(it)}
                    >
                      {slash.mode === "go" ? (
                        <><span className={styles.slashCmd}>{it.label}</span><span className={styles.slashKey}>#{it.key}</span></>
                      ) : (
                        <><span className={styles.slashCmd}>{it.cmd}</span><span className={styles.slashDesc}>{it.desc}</span></>
                      )}
                    </button>
                  ))}
                </div>
              )}

              <form className={styles.inputRow} onSubmit={(e) => { e.preventDefault(); submit(); }}>
                <button
                  type="button"
                  className={`${styles.slashBtn} ${slashActive ? styles.slashBtnOn : ""}`}
                  onClick={toggleSlash}
                  aria-label={ui.slashTip}
                  title={ui.slashTip}
                >/</button>
                <textarea
                  ref={inputRef}
                  rows={1}
                  className={styles.textarea}
                  placeholder={contact?.persona === "recruiter" ? ui.placeholderRecruiter : ui.placeholder}
                  autoComplete="off"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={onKeyDown}
                />
                {voiceSupported && (
                  <button
                    type="button"
                    className={`${styles.micBtn} ${listening ? styles.micOn : ""}`}
                    onClick={toggleMic}
                    aria-label={listening ? ui.micStop : ui.mic}
                    title={listening ? ui.micStop : ui.mic}
                  >
                    <img src={listening ? MIC_ON : MIC} alt="" />
                  </button>
                )}
                <button type="submit" disabled={pending} aria-label="Envoyer"><img src={SEND} alt="" /></button>
              </form>
            </>
          )}
        </div>
      )}

      {/* Chrome flottant (launcher + bulle) — absent en mode intégré à l'OS. */}
      {!embedded && (
        <>
          {teaser && !open && (
            <div className={styles.teaser} role="button" tabIndex={0} onClick={() => setOpen(true)} onKeyDown={(e) => e.key === "Enter" && setOpen(true)}>
              {ui.teaser}
              <button className={styles.teaserClose} onClick={(e) => { e.stopPropagation(); dismissTeaser(); }} aria-label="Fermer">×</button>
            </div>
          )}
          <button
            className={`${styles.launcher} ${open ? styles.launcherOpen : ""}`}
            onClick={() => setOpen((o) => !o)}
            aria-label={ui.open}
            title={ui.open}
          >
            <img src={open ? CLOSE : CHAT} alt="" />
          </button>
        </>
      )}
    </>
  );
}

export default BotWidget;
