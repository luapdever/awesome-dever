/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import styles from "../../../../../styles/specific/portfolio/windows/bot.module.css";
import { useLang } from "../lang";
import { extractActions } from "../../../../lib/botActions";

const ROBOT = "https://api.iconify.design/ph:robot.svg?color=%23ffffff";
const SEND = "https://api.iconify.design/ph:paper-plane-tilt-fill.svg?color=%232a1a00";

// SSR/proxy par défaut ("/api/chat"). En SPA, définir NEXT_PUBLIC_CHAT_URL
// sur l'endpoint Nest direct (ex: https://api.luap-dever.me/paulbot/chat).
const CHAT_URL = process.env.NEXT_PUBLIC_CHAT_URL || "/api/chat";

const UI = {
  fr: {
    intro: "Je suis PaulBot. Pose-moi tes questions sur le parcours, les compétences ou les projets de Paul.",
    placeholder: "Pose une question sur Paul…",
    error: "Je suis momentanément indisponible. Réessaie dans un instant, ou écris directement à Paul : pzannou511@gmail.com.",
    suggestions: ["Il maîtrise quoi en backend ?", "Parle-moi d'Emilia Cross", "Est-il disponible ?"],
  },
  en: {
    intro: "I'm PaulBot. Ask me about Paul's background, skills or projects.",
    placeholder: "Ask a question about Paul…",
    error: "I'm momentarily unavailable. Please try again shortly, or reach Paul directly at pzannou511@gmail.com.",
    suggestions: ["What's his backend stack?", "Tell me about Emilia Cross", "Is he available?"],
  },
};

function Bot() {
  const { lang } = useLang();
  const ui = UI[lang] || UI.fr;
  const [messages, setMessages] = useState([]);
  const [pending, setPending] = useState(false);
  const scrollRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const send = async (text) => {
    const content = (text || "").trim();
    if (!content || pending) return;
    const next = [...messages, { role: "user", content }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setPending(true);
    try {
      const res = await fetch(CHAT_URL, {
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

  const autoGrow = (el) => {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 132) + "px";
  };

  const submit = () => {
    const el = inputRef.current;
    const v = el.value;
    el.value = "";
    autoGrow(el);
    send(v);
  };

  const onSubmit = (e) => { e.preventDefault(); submit(); };
  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); }
  };

  return (
    <div className={styles.bot}>
      <div className={styles.stream} ref={scrollRef}>
        {messages.length === 0 && (
          <div className={styles.intro}>
            <img src={ROBOT} alt="PaulBot" className={styles.introIcon} />
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
                  <>
                    {m.content}
                    {streaming && <span className={styles.caret} />}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <form className={styles.inputRow} onSubmit={onSubmit}>
        <textarea
          ref={inputRef}
          rows={1}
          className={styles.textarea}
          placeholder={ui.placeholder}
          autoComplete="off"
          onInput={(e) => autoGrow(e.target)}
          onKeyDown={onKeyDown}
        />
        <button type="submit" disabled={pending} aria-label="Envoyer">
          <img src={SEND} alt="" />
        </button>
      </form>
    </div>
  );
}

export default Bot;
