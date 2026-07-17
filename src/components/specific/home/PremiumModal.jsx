/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../../../styles/specific/home/home.module.css";
import Terminal from "../portfolio/wndows/Terminal";
import { L, tx } from "../../../rawDatas/i18n";
import { useLandingLang } from "../../../context/landingLang";

const ph = (name, color = "ffa500") => `/icons/ph/${name}__${color}.svg`;

const ACTIONS = [
  { id: "cv", label: L("Read my résumé", "Lire mon CV"), sub: L("Short version, hold the coffee", "Version courte, sans le café"), icon: ph("file-text") },
  { id: "os", label: L("PaulBrain OS", "PaulBrain OS"), sub: L("My brain in desktop mode", "Mon cerveau en mode bureau"), icon: ph("desktop") },
  { id: "terminal", label: L("Terminal mode", "Mode terminal"), sub: L("For the brave — type help", "Pour les vrais, tapez help"), icon: ph("terminal-window") },
  { id: "bot", label: L("My bot", "Mon bot"), sub: L("Soon — it's still learning", "Bientôt — il apprend encore"), icon: ph("robot", "8a8aa0"), disabled: true },
  { id: "3d", label: L("3D mode", "Mode 3D"), sub: L("Soon — still modelling…", "Bientôt — je modélise…"), icon: ph("cube", "8a8aa0"), disabled: true },
];

const MODAL_UI = {
  en: {
    badge: "Premium edition (free, promise)",
    title: "“Another page where I'll scroll… and scroll…”",
    text: "Heard you. So before the big scroll, pick how you'd like to get to know me — I adapt, it's kind of my job.",
    continue: "Or keep scrolling, your call →",
    shell: "type",
    back: "Back",
  },
  fr: {
    badge: "Édition Premium (gratuite, promis)",
    title: "« Encore une page où je vais scroller… scroller… »",
    text: "Je vous ai entendu. Alors avant le grand scroll, choisissez comment vous voulez faire connaissance — je m'adapte, c'est un peu mon métier.",
    continue: "Ou continuer à scroller, c'est vous qui voyez →",
    shell: "tapez",
    back: "Retour",
  },
};

function PremiumModal({ onClose }) {
  const router = useRouter();
  const { lang } = useLandingLang();
  const m = MODAL_UI[lang];
  const [mode, setMode] = useState("menu");

  const run = (id) => {
    if (id === "cv") window.open("/cv", "_blank");
    else if (id === "os") router.push("/paulfolio");
    else if (id === "terminal") setMode("terminal");
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={`${styles.modal} ${mode === "terminal" ? styles.modalWide : ""}`} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose} aria-label="Fermer">×</button>

        {mode === "menu" ? (
          <>
            <div className={styles.modalBadge}>{m.badge}</div>
            <h2 className={styles.modalTitle}>{m.title}</h2>
            <p className={styles.modalText}>{m.text}</p>

            <div className={styles.modalGrid}>
              {ACTIONS.map((a) => (
                <button
                  key={a.id}
                  className={`${styles.modalAction} ${a.disabled ? styles.modalActionOff : ""}`}
                  onClick={() => !a.disabled && run(a.id)}
                  disabled={a.disabled}
                >
                  <img src={a.icon} alt="" />
                  <span className={styles.maLabel}>{tx(a.label, lang)}</span>
                  <span className={styles.maSub}>{tx(a.sub, lang)}</span>
                </button>
              ))}
            </div>

            <button className={styles.modalContinue} onClick={onClose}>
              {m.continue}
            </button>
          </>
        ) : (
          <div className={styles.modalTerminal}>
            <div className={styles.modalTerminalTop}>
              <button className={styles.modalBack} onClick={() => setMode("menu")}>← {m.back}</button>
              <span>Dever Shell — {m.shell} <b>help</b></span>
            </div>
            <div className={styles.modalTerminalBody}>
              <Terminal />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PremiumModal;
