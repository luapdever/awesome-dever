/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/global/botwidget.module.css";
import { useLandingLang } from "../../context/landingLang";
import { extractActions, runNavAction } from "../../lib/botActions";

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
  },
  en: {
    title: "PaulBot",
    subtitle: "Portfolio assistant",
    intro: "I'm PaulBot. Ask me about Paul's background, skills or projects — I can also take you to the right page.",
    placeholder: "Type your message…",
    error: "I'm momentarily unavailable. Please try again shortly, or reach Paul directly at pzannou511@gmail.com.",
    suggestions: ["What's his stack?", "Show me his projects", "Is he available?"],
    open: "Chat with PaulBot",
  },
};

function BotWidget() {
  const router = useRouter();
  const { lang } = useLandingLang();
  const ui = UI[lang] || UI.fr;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [pending, setPending] = useState(false);
  const scrollRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

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
        body: JSON.stringify({ messages: next, lang }),
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
      // Réponse complète → exécuter l'éventuelle navigation.
      const { actions } = extractActions(acc);
      if (actions[0]) setTimeout(() => runNavAction(actions[0], router), 400);
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
                  <div className={isUser ? styles.user : styles.assistant}>
                    {thinking ? (
                      <span className={styles.dots}><i /><i /><i /></span>
                    ) : (
                      <>{m.content}{streaming && <span className={styles.caret} />}</>
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
