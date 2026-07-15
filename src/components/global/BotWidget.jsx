/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import styles from "../../../styles/global/botwidget.module.css";
import { useLandingLang } from "../../context/landingLang";
import { NAV, extractActions, runNavAction, navLabel, navigateRelative } from "../../lib/botActions";

const ROBOT = "https://api.iconify.design/fluent-emoji-flat:robot.svg";
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

function BotWidget() {
  const router = useRouter();
  const { lang } = useLandingLang();
  const ui = UI[lang] || UI.fr;
  const [open, setOpen] = useState(false);
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
  const scrollRef = useRef();
  const inputRef = useRef();
  const onbRef = useRef();
  const cidRef = useRef("");

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
      if (sessionStorage.getItem("paulbot_open") === "1") setOpen(true);
    } catch {}
    // Ouverture déclenchée depuis l'extérieur (ex. le choix "PaulBot" du modal).
    const openHandler = () => setOpen(true);
    window.addEventListener("paulbot:open", openHandler);
    return () => window.removeEventListener("paulbot:open", openHandler);
  }, []);

  // Persistance : état ouvert/fermé + historique client (bon retour au reload).
  useEffect(() => {
    try { sessionStorage.setItem("paulbot_open", open ? "1" : "0"); } catch {}
  }, [open]);
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

  // Rafraîchit les dates relatives tant que le widget est ouvert.
  useEffect(() => {
    if (!open) return;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, [open]);

  useEffect(() => { setSlashIndex(0); }, [draft]);
  useEffect(() => { autoGrow(inputRef.current); }, [draft]);

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
    try { sessionStorage.setItem("paulbot_contact", JSON.stringify(c)); } catch {}
    setContact(c);
    setTimeout(() => inputRef.current?.focus(), 60);
  };

  const autoGrow = (el) => {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  };

  const send = async (text) => {
    const content = (text || "").trim();
    if (!content || pending) return;
    const next = [...messages, { role: "user", content, at: Date.now() }];
    setMessages([...next, { role: "assistant", content: "", at: Date.now() }]);
    setPending(true);
    try {
      const url = (typeof window !== "undefined" && window.__CHAT_URL) || CHAT_URL;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, lang, conversationId: cidRef.current, contact }),
      });
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        const shown = extractActions(acc).clean;
        setMessages((m) => {
          const copy = m.slice();
          copy[copy.length - 1] = { ...copy[copy.length - 1], role: "assistant", content: shown };
          return copy;
        });
      }
      // Pas de navigation automatique : on attache la cible au message pour
      // proposer un bouton cliquable — c'est le visiteur qui décide.
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
        copy[copy.length - 1] = { ...copy[copy.length - 1], role: "assistant", content: ui.error };
        return copy;
      });
    } finally {
      setPending(false);
    }
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

  return (
    <>
      {open && (
        <div className={styles.panel} role="dialog" aria-label={ui.title}>
          <header className={styles.head}>
            <img src={ROBOT} alt="" className={styles.headIcon} />
            <div className={styles.headText}>
              <b>{ui.title}</b>
              <span>{ui.subtitle}</span>
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
            <button className={styles.headClose} onClick={() => setOpen(false)} aria-label="Fermer">
              <img src={CLOSE} alt="" />
            </button>
          </header>

          {!contact ? (
            <div className={styles.onboard}>
              <img src={ROBOT} alt="" className={styles.onbIcon} />
              <b className={styles.onbTitle}>{ui.onbTitle}</b>
              <p className={styles.onbText}>{ui.onbText}</p>

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
              <div className={styles.stream} ref={scrollRef}>
                {messages.length === 0 && (
                  <div className={styles.intro}>
                    <p>{ui.intro}</p>
                    <div className={styles.suggest}>
                      {ui.suggestions.map((s, i) => (
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
                          ) : (
                            <>{m.content}{streaming && <span className={styles.caret} />}</>
                          )}
                        </div>
                        {!isUser && m.action && !streaming && (
                          <button
                            type="button"
                            className={styles.navAction}
                            onClick={() => runNavAction(m.action, router)}
                          >
                            {navLabel(m.action, lang)} →
                          </button>
                        )}
                        {!thinking && m.at && (
                          <span className={styles.msgTime}>{friendlyTime(m.at, lang, now)}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
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
                <button type="submit" disabled={pending} aria-label="Envoyer"><img src={SEND} alt="" /></button>
              </form>
            </>
          )}
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
  );
}

export default BotWidget;
