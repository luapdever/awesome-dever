/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../../../styles/specific/home/home.module.css";
import Terminal from "../portfolio/wndows/Terminal";

const ph = (name, color = "ffa500") => `https://api.iconify.design/ph:${name}.svg?color=%23${color}`;

const ACTIONS = [
  { id: "cv", label: "Lire mon CV", sub: "Version courte, sans le café", icon: ph("file-text") },
  { id: "os", label: "PaulBrain OS", sub: "Mon cerveau en mode bureau", icon: ph("desktop") },
  { id: "terminal", label: "Mode terminal", sub: "Pour les vrais, tapez help", icon: ph("terminal-window") },
  { id: "bot", label: "Mon bot", sub: "Bientôt — il apprend encore", icon: ph("robot", "8a8aa0"), disabled: true },
  { id: "3d", label: "Mode 3D", sub: "Bientôt — je modélise…", icon: ph("cube", "8a8aa0"), disabled: true },
];

function PremiumModal({ onClose }) {
  const router = useRouter();
  const [mode, setMode] = useState("menu");

  const run = (id) => {
    if (id === "cv") window.open("/cv/index.html", "_blank");
    else if (id === "os") router.push("/paulfolio");
    else if (id === "terminal") setMode("terminal");
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose} aria-label="Fermer">×</button>

        {mode === "menu" ? (
          <>
            <div className={styles.modalBadge}>Édition Premium (gratuite, promis)</div>
            <h2 className={styles.modalTitle}>
              « Encore une page où je vais scroller… scroller… »
            </h2>
            <p className={styles.modalText}>
              Je vous ai entendu. Alors avant le grand scroll, choisissez comment vous voulez
              faire connaissance — je m'adapte, c'est un peu mon métier.
            </p>

            <div className={styles.modalGrid}>
              {ACTIONS.map((a) => (
                <button
                  key={a.id}
                  className={`${styles.modalAction} ${a.disabled ? styles.modalActionOff : ""}`}
                  onClick={() => !a.disabled && run(a.id)}
                  disabled={a.disabled}
                >
                  <img src={a.icon} alt="" />
                  <span className={styles.maLabel}>{a.label}</span>
                  <span className={styles.maSub}>{a.sub}</span>
                </button>
              ))}
            </div>

            <button className={styles.modalContinue} onClick={onClose}>
              Ou continuer à scroller, c'est vous qui voyez →
            </button>
          </>
        ) : (
          <div className={styles.modalTerminal}>
            <div className={styles.modalTerminalTop}>
              <button className={styles.modalBack} onClick={() => setMode("menu")}>← Retour</button>
              <span>Dever Shell — tapez <b>help</b></span>
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
