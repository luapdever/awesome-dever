/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import styles from "../../../../../styles/specific/portfolio/windows/contact.module.css";
import { socialMedias } from "../../../../rawDatas/aboutMe";
import { useLang } from "../lang";

const EMAIL = "pzannou511@gmail.com";
const PHONE = "+229 01 90 66 73 33";
const LOCATION = "Abomey-Calavi / Cotonou, Benin";
const EMAIL_RE = /^[\w-.]+@([\w-]+\.)+[\w-]+$/;

function Contact() {
  const { t } = useLang();
  const btnSend = useRef();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ email: "", name: "", body: "" });

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const sendMessage = (e) => {
    e.preventDefault();
    if (sent || loading) return;
    if (!(EMAIL_RE.test(form.email) && form.name && form.body)) return;

    setLoading(true);
    axios
      .post(process.env.apiUrl + "contact", {
        headers: { "Content-Type": "application/json", Accept: "application/json, text-plain, */*" },
        email: form.email, name: form.name, body: form.body,
      })
      .then(() => {
        toast.success("Message sent to Paul");
        setLoading(false);
        setSent(true);
      })
      .catch((err) => {
        toast.error(String(err));
        setLoading(false);
      });
  };

  return (
    <div className={styles.contact}>
      <header className={styles.head}>
        <span className={styles.headIcon}>
          <img src="https://api.iconify.design/ph:envelope-simple.svg?color=%23ffa500" alt="" />
        </span>
        <div>
          <h1>{t.cTitle}</h1>
          <span className={styles.sub}>{t.cSub}</span>
        </div>
      </header>

      <div className={styles.body}>
        <aside className={styles.reach}>
          <span className={styles.reachLabel}>{t.cReach}</span>
          <a className={styles.reachItem} href={`mailto:${EMAIL}`}>
            <FaEnvelope /><span>{EMAIL}</span>
          </a>
          <a className={styles.reachItem} href={`tel:${PHONE.replace(/\s/g, "")}`}>
            <FaPhoneAlt /><span>{PHONE}</span>
          </a>
          <div className={styles.reachItem}>
            <FaMapMarkerAlt /><span>{LOCATION}</span>
          </div>
          <div className={styles.socials}>
            {socialMedias.map((s, i) => (
              <a key={i} href={s.link} target="_blank" rel="noreferrer" title={s.link}>
                <button>{s.icon}</button>
              </a>
            ))}
          </div>
        </aside>

        <form className={styles.form} onSubmit={sendMessage}>
          <div className={styles.row}>
            <label htmlFor="c-name">{t.cName}</label>
            <input id="c-name" name="name" type="text" placeholder={t.cNamePh} onChange={change} required />
          </div>
          <div className={styles.row}>
            <label htmlFor="c-email">{t.cEmail}</label>
            <input id="c-email" name="email" type="email" placeholder={t.cEmailPh} onChange={change} required />
          </div>
          <div className={styles.row}>
            <label htmlFor="c-body">{t.cMsg}</label>
            <textarea id="c-body" name="body" placeholder={t.cMsgPh} onChange={change} required />
          </div>
          {sent ? (
            <div className={styles.sentBadge}>{t.cSentBadge}</div>
          ) : (
            <button ref={btnSend} className={styles.sendBtn} type="submit" disabled={loading}>
              {loading ? t.cSending : t.cSend}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Contact;
