/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SHOP_SERVICES, SHOP_ICONS } from "../../rawDatas/shop";
import { tx } from "../../rawDatas/i18n";
import { submitOrder } from "../../lib/altcha";
import styles from "../../../styles/global/minishop.module.css";

const SHIELD = "/icons/ph/shield-check__ffa500.svg";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const T = {
  fr: {
    kicker: "Mini-shop", heading: "Commander un service",
    lead: "Choisis un service, réponds (si tu veux) à 5 questions rapides, et laisse tes coordonnées. Paul reçoit tout par email et revient vers toi.",
    order: "Commander", quiz: "Questionnaire", optional: "optionnel",
    quizHint: "Ça aide à cadrer — tu peux tout laisser vide.",
    yourInfo: "Tes coordonnées", namePh: "Ton nom", emailPh: "ton@email.com",
    phonePh: "Téléphone / WhatsApp (optionnel)", msgPh: "Un mot sur ton besoin (optionnel)…",
    typeHere: "Ta réponse…",
    send: "Envoyer la commande", sending: "Envoi…", back: "← Services",
    okTitle: "Commande envoyée 🎉", okBody: "Paul a reçu tous les détails et te répondra vite. Merci !",
    close: "Fermer", another: "Commander autre chose",
    errRate: "Trop de demandes, réessaie dans quelques minutes.",
    err: "Envoi impossible pour le moment, réessaie plus tard.",
    altcha: "Protégé par ALTCHA — anti-spam, aucune donnée envoyée à un tiers.",
  },
  en: {
    kicker: "Mini-shop", heading: "Order a service",
    lead: "Pick a service, answer 5 quick questions (optional), and leave your details. Paul gets everything by email and gets back to you.",
    order: "Order", quiz: "Questionnaire", optional: "optional",
    quizHint: "It helps scope things — you can leave it all blank.",
    yourInfo: "Your details", namePh: "Your name", emailPh: "you@email.com",
    phonePh: "Phone / WhatsApp (optional)", msgPh: "A word about your need (optional)…",
    typeHere: "Your answer…",
    send: "Send the order", sending: "Sending…", back: "← Services",
    okTitle: "Order sent 🎉", okBody: "Paul received all the details and will reply soon. Thanks!",
    close: "Close", another: "Order something else",
    errRate: "Too many requests, try again in a few minutes.",
    err: "Couldn't send right now, please try again later.",
    altcha: "Protected by ALTCHA — anti-spam, no data sent to any third party.",
  },
};

function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: SHOP_ICONS[name] || "" }} />
  );
}

export default function MiniShop({ lang = "fr" }) {
  const t = T[lang] || T.fr;
  const [openId, setOpenId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [state, setState] = useState("idle"); // idle | sending | sent | error
  const [errMsg, setErrMsg] = useState("");

  const svc = SHOP_SERVICES.find((s) => s.id === openId) || null;
  const valid = form.name.trim() && EMAIL_RE.test(form.email.trim());

  const open = (id) => {
    setOpenId(id); setAnswers({}); setForm({ name: "", email: "", phone: "", message: "" });
    setState("idle"); setErrMsg("");
  };
  const close = () => setOpenId(null);

  // Verrouille le scroll de la page + Échap pour fermer, tant qu'une modale est ouverte.
  useEffect(() => {
    if (!openId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [openId]);

  const pick = (qi, val) => setAnswers((a) => ({ ...a, [qi]: a[qi] === val ? "" : val }));
  const typeAns = (qi, val) => setAnswers((a) => ({ ...a, [qi]: val }));
  const change = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!svc || state === "sending" || state === "sent" || !valid) return;
    setState("sending"); setErrMsg("");
    try {
      const ans = svc.questions
        .map((q, i) => ({ q: tx(q.q, lang), a: (answers[i] || "").trim() }))
        .filter((x) => x.a);
      await submitOrder({
        service: tx(svc.title, lang),
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        message: form.message.trim() || undefined,
        answers: ans,
        lang,
      });
      setState("sent");
    } catch (err) {
      setState("error");
      setErrMsg(err?.status === 429 ? t.errRate : t.err);
    }
  };

  return (
    <section className={styles.shop} aria-labelledby="shop-title">
      <div className={styles.head}>
        <span className={styles.kicker}>{t.kicker}</span>
        <h3 id="shop-title">{t.heading}</h3>
        <p>{t.lead}</p>
      </div>

      <div className={styles.grid}>
        {SHOP_SERVICES.map((s) => (
          <button key={s.id} type="button" className={styles.card} onClick={() => open(s.id)}>
            <span className={styles.media}>
              {s.image && <img src={s.image} alt={tx(s.title, lang)} loading="lazy" />}
              {s.proof && <span className={styles.proof}>{s.proof}</span>}
            </span>
            <span className={styles.body}>
              <span className={styles.titleRow}>
                <span className={styles.cardIcon}><Icon name={s.icon} /></span>
                <b>{tx(s.title, lang)}</b>
              </span>
              <small>{tx(s.tagline, lang)}</small>
              <span className={styles.cardCta}>{t.order} →</span>
            </span>
          </button>
        ))}
      </div>

      {svc && typeof document !== "undefined" && createPortal(
        <div className={styles.overlay} onClick={close} role="presentation">
          <div className={styles.modal} role="dialog" aria-modal="true" aria-label={tx(svc.title, lang)} onClick={(e) => e.stopPropagation()}>
            <button type="button" className={styles.x} onClick={close} aria-label={t.close}>×</button>

            {state === "sent" ? (
              <div className={styles.sent}>
                <span className={styles.sentIcon}><Icon name={svc.icon} /></span>
                <h4>{t.okTitle}</h4>
                <p>{t.okBody}</p>
                <div className={styles.sentActions}>
                  <button type="button" className={styles.submit} onClick={close}>{t.close}</button>
                </div>
              </div>
            ) : (
              <form className={styles.form} onSubmit={onSubmit} noValidate>
                <div className={styles.modalHead}>
                  <span className={styles.modalIcon}><Icon name={svc.icon} /></span>
                  <div>
                    <h4>{tx(svc.title, lang)}</h4>
                    <p>{tx(svc.desc, lang)}</p>
                  </div>
                </div>

                <div className={styles.quizHead}>
                  <span className={styles.quizTitle}>{t.quiz} <em>· {t.optional}</em></span>
                  <span className={styles.quizHint}>{t.quizHint}</span>
                </div>

                <div className={styles.quiz}>
                  {svc.questions.map((q, i) => (
                    <div key={i} className={styles.q}>
                      <label className={styles.qLabel}>{tx(q.q, lang)}</label>
                      {q.opts ? (
                        <div className={styles.chips}>
                          {q.opts.map((opt, oi) => {
                            const val = tx(opt, lang);
                            return (
                              <button key={oi} type="button"
                                className={`${styles.chip} ${answers[i] === val ? styles.chipOn : ""}`}
                                onClick={() => pick(i, val)}>
                                {val}
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <input className={styles.field} value={answers[i] || ""} onChange={(e) => typeAns(i, e.target.value)} placeholder={t.typeHere} maxLength={600} />
                      )}
                    </div>
                  ))}
                </div>

                <div className={styles.contact}>
                  <span className={styles.contactTitle}>{t.yourInfo}</span>
                  <div className={styles.grid2}>
                    <input className={styles.field} name="name" value={form.name} onChange={change} placeholder={t.namePh} autoComplete="name" maxLength={80} required />
                    <input className={styles.field} name="email" type="email" value={form.email} onChange={change} placeholder={t.emailPh} autoComplete="email" maxLength={160} required />
                  </div>
                  <input className={styles.field} name="phone" value={form.phone} onChange={change} placeholder={t.phonePh} autoComplete="tel" maxLength={40} />
                  <textarea className={styles.field} name="message" value={form.message} onChange={change} placeholder={t.msgPh} rows={3} maxLength={2000} />
                </div>

                {errMsg && <span className={styles.err}>{errMsg}</span>}

                <div className={styles.foot}>
                  <span className={styles.altcha}><img src={SHIELD} alt="" />{t.altcha}</span>
                  <div className={styles.footBtns}>
                    <button type="button" className={styles.ghost} onClick={close}>{t.back}</button>
                    <button type="submit" className={styles.submit} disabled={!valid || state === "sending"}>
                      {state === "sending" ? t.sending : t.send}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
