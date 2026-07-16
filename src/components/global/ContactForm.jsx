/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { submitContact } from "../../lib/altcha";
import styles from "../../../styles/global/contactform.module.css";

const SHIELD = "https://api.iconify.design/ph:shield-check.svg?color=%23ffa500";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const T = {
  fr: {
    namePh: "Ton nom", emailPh: "ton@email.com", subjectPh: "Sujet (optionnel)", msgPh: "Décris ton projet ou ta question en quelques lignes…",
    send: "Envoyer le message", sending: "Envoi…",
    ok: "Message envoyé — Paul te répondra vite. 🙌",
    errRate: "Trop de messages, réessaie dans quelques minutes.",
    err: "Envoi impossible pour le moment, réessaie plus tard.",
    altcha: "Protégé par ALTCHA — anti-spam open-source, aucune donnée envoyée à un tiers.",
    name: "Nom", email: "Email", subject: "Sujet", message: "Message",
  },
  en: {
    namePh: "Your name", emailPh: "you@email.com", subjectPh: "Subject (optional)", msgPh: "Describe your project or question in a few lines…",
    send: "Send message", sending: "Sending…",
    ok: "Message sent — Paul will reply shortly. 🙌",
    errRate: "Too many messages, try again in a few minutes.",
    err: "Couldn't send right now, please try again later.",
    altcha: "Protected by ALTCHA — open-source anti-spam, no data sent to any third party.",
    name: "Name", email: "Email", subject: "Subject", message: "Message",
  },
};

export default function ContactForm({ lang = "fr", source = "home-cta" }) {
  const t = T[lang] || T.fr;
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [state, setState] = useState("idle"); // idle | sending | sent | error
  const [errMsg, setErrMsg] = useState("");

  const change = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const valid = form.name.trim() && EMAIL_RE.test(form.email) && form.message.trim();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (state === "sending" || state === "sent" || !valid) return;
    setState("sending");
    setErrMsg("");
    try {
      // Résout le captcha ALTCHA (proof-of-work) puis envoie via le backend PaulBot.
      await submitContact({ name: form.name, email: form.email, subject: form.subject, message: form.message, source });
      setState("sent");
    } catch (err) {
      setState("error");
      setErrMsg(err?.status === 429 ? t.errRate : t.err);
    }
  };

  if (state === "sent") {
    return (
      <div className={styles.sent}>
        <img src="https://api.iconify.design/ph:check-circle-fill.svg?color=%2335d07f" alt="" />
        <span>{t.ok}</span>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.grid2}>
        <input className={styles.field} name="name" value={form.name} onChange={change} placeholder={t.namePh} aria-label={t.name} autoComplete="name" maxLength={80} required />
        <input className={styles.field} name="email" type="email" value={form.email} onChange={change} placeholder={t.emailPh} aria-label={t.email} autoComplete="email" maxLength={160} required />
      </div>
      <input className={styles.field} name="subject" value={form.subject} onChange={change} placeholder={t.subjectPh} aria-label={t.subject} maxLength={160} />
      <textarea className={styles.field} name="message" value={form.message} onChange={change} placeholder={t.msgPh} aria-label={t.message} rows={4} maxLength={4000} required />

      {errMsg && <span className={styles.err}>{errMsg}</span>}

      <div className={styles.foot}>
        <span className={styles.altcha}><img src={SHIELD} alt="" />{t.altcha}</span>
        <button type="submit" className={styles.submit} disabled={!valid || state === "sending"}>
          {state === "sending" ? t.sending : t.send}
        </button>
      </div>
    </form>
  );
}
