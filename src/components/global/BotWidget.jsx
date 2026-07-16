/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import styles from "../../../styles/global/botwidget.module.css";
import { useLandingLang } from "../../context/landingLang";
import { NAV, extractActions, runNavAction, navLabel, navigateRelative, linkTokens } from "../../lib/botActions";
import { detectProjects, followUps, pageContext, routeIntent, clientAnswer, tourSteps } from "../../lib/botExtras";
import { submitContact } from "../../lib/altcha";

const MIC = "https://api.iconify.design/ph:microphone.svg?color=%23000000";
const MIC_ON = "https://api.iconify.design/ph:microphone-fill.svg?color=%232a1a00";
const SPEAK = "https://api.iconify.design/ph:speaker-high.svg?color=%23ffd9a0";
const SPEAK_ON = "https://api.iconify.design/ph:speaker-simple-x.svg?color=%23ffd9a0";

const ROBOT = "https://api.iconify.design/ph:robot.svg";
const SEND = "https://api.iconify.design/ph:paper-plane-tilt-fill.svg?color=%232a1a00";
const CHAT = "https://api.iconify.design/ph:chat-circle-dots-fill.svg?color=%231a0a00";
const CLOSE = "https://api.iconify.design/ph:x-bold.svg?color=%23ffffff";

const CHAT_URL = process.env.NEXT_PUBLIC_CHAT_URL || "/api/chat";

const UI = {
  fr: {
    title: "PaulBot",
    subtitle: "Assistant du portfolio",
    intro: "Bonjour et bienvenue 👋 Je suis PaulBot, ravi de t'accueillir. N'hésite pas à me poser tes questions sur le parcours, les compétences ou les projets de Paul — je peux aussi t'emmener sur la bonne page avec plaisir.",
    placeholder: "Écris ton message…",
    error: "Je suis momentanément indisponible. Réessaie dans un instant, ou écris directement à Paul : pzannou511@gmail.com.",
    suggestions: ["Il maîtrise quoi ?", "Montre-moi ses projets", "Est-il disponible ?"],
    open: "Discuter avec PaulBot",
    onbTitle: "Avant de commencer",
    onbText: "Comment Paul peut-il te recontacter au besoin ?",
    pseudoLabel: "Pseudo",
    pseudoPh: "Comment t'appelles-tu ?",
    tabEmail: "Email",
    tabPhone: "Téléphone",
    tabIncognito: "Incognito",
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
    exportPdf: "Exporter en PDF",
    clearConvo: "Effacer la conversation",
    available: "Disponible",
    hello: (n) => `Salut ${n} 👋 `,
    personaVisitor: "Visiteur",
    personaRecruiter: "Je recrute",
    recruiterIntro: "Ravi de t'accueillir. Pose-moi tout sur sa disponibilité, sa stack, ses projets — ou récupère son CV en un clic.",
    recruiterSuggestions: ["Est-il disponible ?", "Sa stack technique ?", "Ouvre son CV", "Comment le contacter ?"],
    teaser: "Une question sur Paul ? 👋",
    mic: "Dicter",
    micStop: "Arrêter la dictée",
    readAloud: "Lire à voix haute",
    stopReading: "Arrêter la lecture",
    retry: "Réessayer",
    escalatePrompt: "Tu veux que Paul te recontacte ? Laisse ton email 👇",
    escalatePh: "ton@email.com",
    escalateSend: "OK",
    escalateAgain: (n, max) => `Envoyé ✅ — tu peux en laisser un autre (${n}/${max}).`,
    escalateMax: "Merci, on s'arrête là (5 max) 🙂",
    tourStepLabel: "Étape",
    tourGoTo: "Aller à",
    tourDone: "Tour terminé ✨",
  },
  en: {
    title: "PaulBot",
    subtitle: "Portfolio assistant",
    intro: "Hello and welcome 👋 I'm PaulBot, glad to have you here. Feel free to ask me anything about Paul's background, skills or projects — I'd be happy to take you to the right page too.",
    placeholder: "Type your message…",
    error: "I'm momentarily unavailable. Please try again shortly, or reach Paul directly at pzannou511@gmail.com.",
    suggestions: ["What's his stack?", "Show me his projects", "Is he available?"],
    open: "Chat with PaulBot",
    onbTitle: "Before we start",
    onbText: "How can Paul get back to you if needed?",
    pseudoLabel: "Nickname",
    pseudoPh: "What should we call you?",
    tabEmail: "Email",
    tabPhone: "Phone",
    tabIncognito: "Incognito",
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
    exportPdf: "Export to PDF",
    clearConvo: "Clear conversation",
    available: "Available",
    hello: (n) => `Hi ${n} 👋 `,
    personaVisitor: "Visitor",
    personaRecruiter: "I'm hiring",
    recruiterIntro: "Glad to have you here. Ask me anything about his availability, stack and projects — or grab his résumé in one click.",
    recruiterSuggestions: ["Is he available?", "His tech stack?", "Open his résumé", "How to reach him?"],
    teaser: "A question about Paul? 👋",
    mic: "Dictate",
    micStop: "Stop dictation",
    readAloud: "Read aloud",
    stopReading: "Stop reading",
    retry: "Retry",
    escalatePrompt: "Want Paul to get back to you? Drop your email 👇",
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
    { cmd: "/projets", desc: "Voir ses projets", type: "ask", prompt: "Montre-moi ses projets." },
    { cmd: "/competences", desc: "Ses compétences", type: "ask", prompt: "Quelles sont ses compétences ?" },
    { cmd: "/experience", desc: "Son parcours", type: "ask", prompt: "Parle-moi de son expérience." },
    { cmd: "/stack", desc: "Sa stack technique", type: "ask", prompt: "C'est quoi sa stack technique ?" },
    { cmd: "/dispo", desc: "Est-il disponible ?", type: "ask", prompt: "Est-il disponible pour une mission ?" },
    { cmd: "/contact", desc: "Comment le contacter", type: "ask", prompt: "Comment puis-je le contacter ?" },
    { cmd: "/go", desc: "Naviguer vers une page ou section", type: "go" },
  ],
  en: [
    { cmd: "/projects", desc: "See his projects", type: "ask", prompt: "Show me his projects." },
    { cmd: "/skills", desc: "His skills", type: "ask", prompt: "What are his skills?" },
    { cmd: "/experience", desc: "His background", type: "ask", prompt: "Tell me about his experience." },
    { cmd: "/stack", desc: "His tech stack", type: "ask", prompt: "What's his tech stack?" },
    { cmd: "/available", desc: "Is he available?", type: "ask", prompt: "Is he available for a project?" },
    { cmd: "/contact", desc: "How to reach him", type: "ask", prompt: "How can I contact him?" },
    { cmd: "/go", desc: "Navigate to a page or section", type: "go" },
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
  const inputRef = useRef();
  const onbRef = useRef();
  const cidRef = useRef("");
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
      const saved = sessionStorage.getItem("paulbot_contact");
      if (saved) setContact(JSON.parse(saved));
      let cid = sessionStorage.getItem("paulbot_cid");
      if (!cid) { cid = newId(); sessionStorage.setItem("paulbot_cid", cid); }
      cidRef.current = cid;
      const savedMsgs = sessionStorage.getItem("paulbot_messages");
      if (savedMsgs) { const arr = JSON.parse(savedMsgs); if (Array.isArray(arr)) setMessages(arr); }
      const ec = Number(sessionStorage.getItem("paulbot_esc_count")) || 0;
      if (ec) setEscCount(ec);
      if (!embedded && sessionStorage.getItem("paulbot_open") === "1") setOpen(true);
    } catch {}
    if (embedded) return; // pas d'ouverture externe en mode intégré
    // Ouverture déclenchée depuis l'extérieur (ex. le choix "PaulBot" du modal).
    const openHandler = () => setOpen(true);
    window.addEventListener("paulbot:open", openHandler);
    return () => window.removeEventListener("paulbot:open", openHandler);
  }, [embedded]);

  // Persistance : état ouvert/fermé (widget flottant uniquement).
  useEffect(() => {
    if (embedded) return;
    try { sessionStorage.setItem("paulbot_open", open ? "1" : "0"); } catch {}
  }, [open, embedded]);
  useEffect(() => {
    if (pending) return; // évite d'écrire à chaque token pendant le streaming
    try {
      if (messages.length) sessionStorage.setItem("paulbot_messages", JSON.stringify(messages.slice(-40)));
      else sessionStorage.removeItem("paulbot_messages");
    } catch {}
  }, [messages, pending]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

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
    try { sessionStorage.setItem("paulbot_contact", JSON.stringify(c)); } catch {}
    setContact(c);
    setTimeout(() => inputRef.current?.focus(), 60);
  };

  const autoGrow = (el) => {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  };

  // Appelle le LLM avec un contexte donné (streaming). Marque l'erreur pour
  // permettre un « Réessayer ».
  const callModel = async (contextMessages) => {
    setPending(true);
    setMessages((m) => [...m, { role: "assistant", content: "", at: Date.now() }]);
    let acc = "";
    try {
      const url = (typeof window !== "undefined" && window.__CHAT_URL) || CHAT_URL;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: contextMessages, lang, conversationId: cidRef.current, contact }),
      });
      if (!res.ok || !res.body) throw new Error(`http ${res.status}`);
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        const shown = extractActions(acc).clean;
        setMessages((m) => {
          const copy = m.slice();
          copy[copy.length - 1] = { ...copy[copy.length - 1], role: "assistant", content: shown, error: false };
          return copy;
        });
      }
      const { actions } = extractActions(acc);
      if (actions[0]) {
        setMessages((m) => {
          const copy = m.slice();
          copy[copy.length - 1] = { ...copy[copy.length - 1], action: actions[0] };
          return copy;
        });
      }
    } catch {
      setMessages((m) => {
        const copy = m.slice();
        copy[copy.length - 1] = { ...copy[copy.length - 1], role: "assistant", content: ui.error, error: true };
        return copy;
      });
    } finally {
      setPending(false);
    }
  };

  const send = (text) => {
    const content = (text || "").trim();
    if (!content || pending) return;
    historyRef.current.push(content);
    histIdxRef.current = -1;
    const userMsg = { role: "user", content, at: Date.now() };

    // 1) Réponse déterministe côté client → AUCUN appel modèle.
    const intent = routeIntent(content);
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
    try { sessionStorage.setItem("paulbot_contact", JSON.stringify(c)); } catch {}
    setContact(c);
    // Compte la tentative (jusqu'à 5) — le formulaire se cache ensuite.
    const next = escCount + 1;
    setEscCount(next);
    try { sessionStorage.setItem("paulbot_esc_count", String(next)); } catch {}
    setEscEmail("");
    try {
      await submitContact({ name: c.name, email: value, message: "Demande de recontact via PaulBot.", source: "bot-recontact" });
    } catch {
      /* silencieux : le contact figure aussi dans le PDF de conversation */
    }
  };

  // Tour guidé : navigue vers la section courante puis avance.
  const tourNext = () => {
    const steps = tourSteps(lang);
    const s = steps[tourStep];
    if (!s) return;
    runNavAction(s.nav, router);
    setTourStep((i) => Math.min(i + 1, steps.length));
  };

  const chooseSlash = (item) => {
    if (!item) return;
    if (slash?.mode === "go") { setDraft(""); runNavAction(item.key, router); return; }
    if (item.type === "go") { setDraft("/go "); setTimeout(() => inputRef.current?.focus(), 0); return; }
    if (item.type === "ask") { setDraft(""); send(item.prompt); return; }
  };

  const submit = () => {
    if (slashActive) {
      // /go avec un lien relatif saisi → on navigue directement.
      if (slash.mode === "go" && slash.link) { setDraft(""); navigateRelative(slash.link, router); return; }
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
    try { sessionStorage.removeItem("paulbot_messages"); } catch {}
    setTimeout(() => inputRef.current?.focus(), 40);
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
        <div className={embedded ? styles.embed : styles.panel} role="dialog" aria-label={ui.title}>
          <header className={styles.head}>
            <img src={ROBOT + "?color=%23110068"} alt="" className={styles.headIcon} />
            <div className={styles.headText}>
              <b>{ui.title}</b>
              <span className={styles.headStatus}><i className={styles.statusDot} />{ui.available}</span>
            </div>
            {contact && (
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
                      {messages.some((mm) => mm.content && mm.content.trim()) && (
                        <button type="button" onClick={exportPdf} role="menuitem">{ui.exportPdf}</button>
                      )}
                      <button type="button" className={styles.menuDanger} onClick={clearConversation} role="menuitem">{ui.clearConvo}</button>
                    </div>
                  </>
                )}
              </div>
            )}
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

              <div className={styles.onbTabs}>
                {["email", "phone", "incognito"].map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={onbMode === m ? styles.onbTabOn : ""}
                    onClick={() => { setOnbMode(m); setOnbError(""); }}
                  >
                    {m === "email" ? ui.tabEmail : m === "phone" ? ui.tabPhone : ui.tabIncognito}
                  </button>
                ))}
              </div>

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
                      {contact?.name ? ui.hello(contact.name) : ""}
                      {contact?.persona === "recruiter" ? ui.recruiterIntro : ui.intro}
                    </p>
                    <div className={styles.suggest}>
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
                              {linkTokens(m.content).map((tok, k) =>
                                tok.t === "link" ? (
                                  <a
                                    key={k}
                                    href={tok.href}
                                    target={tok.external ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    className={styles.msgLink}
                                  >{tok.v}</a>
                                ) : (
                                  <React.Fragment key={k}>{tok.v}</React.Fragment>
                                )
                              )}
                              {streaming && <span className={styles.caret} />}
                            </>
                          )}
                        </div>

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
                                  <button key={k} type="button" className={styles.infoBtn} onClick={() => runNavAction(a.nav, router)}>{a.label} →</button>
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
                            onClick={() => runNavAction(m.action, router)}
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
                  const chips = followUps(prevUser?.content, last.content, lang);
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
                  placeholder={ui.placeholder}
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
