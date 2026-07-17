/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "../../../../../styles/specific/portfolio/windows/welcome.module.css";
import { socialMedias, OS } from "../../../../data";
import luap from "../../../../assets/img/awesome/luap-thinking.png";
import { useLang } from "../lang";

const QUICK = [
  { id: "skills", label: "Skills", icon: "/icons/ph/brain__ffc25c.svg" },
  { id: "career", label: "Career", icon: "/icons/ph/briefcase__ffc25c.svg" },
  { id: "vault", label: "Enterprise", icon: "/icons/ph/lock-key__ffc25c.svg" },
  { id: "appStore", label: "Apps", icon: "/icons/ph/device-mobile__ffc25c.svg" },
  { id: "terminal", label: "Terminal", icon: "/icons/ph/desktop__ffc25c.svg" },
  { id: "contact", label: "Contact", icon: "/icons/ph/envelope-simple__ffc25c.svg" },
];

function open(e, id) {
  // Prevent the click from bubbling to the window container (which would
  // steal focus back and push the newly-opened window behind this one).
  if (e) e.stopPropagation();
  if (typeof window !== "undefined" && typeof window.__osOpen === "function") window.__osOpen(id);
}

function WelcomeContent() {
  const { t } = useLang();
  return (
    <div className={styles.welcomeContent}>
      <header className={styles.hero}>
        <div className={styles.avatar}>
          <img src={luap.src} alt="Paul M. ZANNOU" />
        </div>
        <div className={styles.heroText}>
          <span className={styles.kicker}>{t.wKicker} {OS.name}</span>
          <h1>
            {t.wGreeting} <b>Paul</b>
          </h1>
          <p className={styles.role}>{t.wRole}</p>
          <span className={styles.available}><i /> {t.wAvailable}</span>
        </div>
      </header>

      <div className={styles.stats}>
        {t.wStats.map((s, i) => (
          <div className={styles.stat} key={i}>
            <b>{s.n}</b>
            <span>{s.l}</span>
          </div>
        ))}
      </div>

      <p className={styles.intro}>{t.wIntro}</p>

      <div className={styles.doBlock}>
        <h4>{t.wDoTitle}</h4>
        <ul className={styles.doList}>
          {t.wDo.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </div>

      <span className={styles.exploreLabel}>{t.wExplore}</span>
      <div className={styles.quickGrid}>
        {QUICK.map((q) => (
          <button key={q.id} className={styles.quickBtn} onClick={(e) => open(e, q.id)}>
            <img src={q.icon} alt="" />
            <span>{q.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.footerRow}>
        <span className={styles.sign}>— {OS.author}</span>
        <div className={styles.socials}>
          {socialMedias.map((social, index) => (
            <a key={"Social " + index} href={social.link} target="_blank" rel="noreferrer" title={social.link}>
              <button>{social.icon}</button>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WelcomeContent;
