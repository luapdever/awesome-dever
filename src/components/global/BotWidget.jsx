/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import styles from "../../../styles/global/botwidget.module.css";
import { useLandingLang } from "../../context/landingLang";
import { extractActions, runNavAction, navLabel } from "../../lib/botActions";

const ROBOT = "https://api.iconify.design/fluent-emoji-flat:robot.svg";
const SEND = "https://api.iconify.design/ph:paper-plane-tilt-fill.svg?color=%232a1a00";
const CHAT = "https://api.iconify.design/ph:chat-circle-dots-fill.svg?color=%231a0a00";
const CLOSE = "https://api.iconify.design/ph:x-bold.svg?color=%23ffffff";

const CHAT_URL = process.env.NEXT_PUBLIC_CHAT_URL || "/api/chat";

const UI = {
  fr: {
    title: "PaulBot",
    subtitle: "Assistant du portfolio",
    intro: "Je suis PaulBot. Pose-moi une question sur le parcours, les compétences ou les projets de Paul — je peux aussi t'emmener sur la bonne page.",
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
  },
  en: {
    title: "PaulBot",
    subtitle: "Portfolio assistant",
    intro: "I'm PaulBot. Ask me about Paul's background, skills or projects — I can also take you to the right page.",
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
  },
};

const newId = () => {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  } catch {}
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
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
  const scrollRef = useRef();
  const inputRef = useRef();
  const onbRef = useRef();
  const cidRef = useRef("");

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("paulbot_contact");
      if (saved) setContact(JSON.parse(saved));
      let cid = sessionStorage.getItem("paulbot_cid");
      if (!cid) { cid = newId(); sessionStorage.setItem("paulbot_cid", cid); }
      cidRef.current = cid;
    } catch {}
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

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
    const next = [...messages, { role: "user", content }];
    setMessages([...next, { role: "assistant", content: "" }]);
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
          copy[copy.length - 1] = { role: "assistant", content: shown };
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
        copy[copy.length - 1] = { role: "assistant", content: ui.error };
        return copy;
      });
    } finally {
      setPending(false);
    }
  };

  const submit = () => {
    const el = inputRef.current;
    const v = el.value;
    el.value = "";
    autoGrow(el);
    send(v);
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); }
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
                      </div>
                    </div>
                  );
                })}
              </div>

              <form className={styles.inputRow} onSubmit={(e) => { e.preventDefault(); submit(); }}>
                <textarea
                  ref={inputRef}
                  rows={1}
                  className={styles.textarea}
                  placeholder={ui.placeholder}
                  autoComplete="off"
                  onInput={(e) => autoGrow(e.target)}
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
