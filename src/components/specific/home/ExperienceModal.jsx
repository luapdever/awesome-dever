/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import gsap from "gsap/dist/gsap";
import styles from "../../../../styles/specific/home/home.module.css";
import Terminal from "../portfolio/wndows/Terminal";
import { L, tx } from "../../../rawDatas/i18n";
import { useLandingLang } from "../../../context/landingLang";
import { useExperience } from "../../../context/experience";

const ph = (name, color = "ffa500") => `https://api.iconify.design/ph:${name}.svg?color=%23${color}`;

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

function ExperienceModal() {
  const router = useRouter();
  const { lang } = useLandingLang();
  const { open, mandatory, remember, dismiss } = useExperience();
  const [mode, setMode] = useState("menu");
  const [chosen, setChosen] = useState(false);
  const overlayRef = useRef();
  const modalRef = useRef();
  const closingRef = useRef(false);
  const m = MODAL_UI[lang];

  // Reset transient state + clear any leftover animation styles when (re)opening.
  useEffect(() => {
    if (!open) return;
    closingRef.current = false;
    setMode("menu");
    setChosen(false);
    if (modalRef.current) gsap.set(modalRef.current, { clearProps: "all" });
    if (overlayRef.current) gsap.set(overlayRef.current, { clearProps: "all" });
  }, [open]);

  if (!open) return null;
  const canClose = !mandatory || chosen;

  // Close by "dropping" the modal into the sticky button (#expSticky).
  const dropClose = (after) => {
    if (closingRef.current) return;
    const modal = modalRef.current;
    const overlay = overlayRef.current;
    const btn = typeof document !== "undefined" ? document.getElementById("expSticky") : null;
    if (!modal || !btn) { dismiss(); after && after(); return; }
    closingRef.current = true;
    const mr = modal.getBoundingClientRect();
    const br = btn.getBoundingClientRect();
    const dx = (br.left + br.width / 2) - (mr.left + mr.width / 2);
    const dy = (br.top + br.height / 2) - (mr.top + mr.height / 2);
    gsap.to(overlay, { autoAlpha: 0, duration: 0.45, ease: "power2.in" });
    gsap.to(modal, {
      x: dx, y: dy, scale: 0.05, rotate: -8, duration: 0.5, ease: "power3.in",
      onComplete: () => {
        const img = btn.querySelector("img");
        if (img) gsap.fromTo(img, { scale: 1 }, { scale: 1.55, duration: 0.16, yoyo: true, repeat: 1, ease: "power2.out" });
        dismiss();
        after && after();
      },
    });
  };

  const run = (id) => {
    if (id === "cv") { remember("cv"); window.open("/cv/index.html", "_blank"); dropClose(); }
    else if (id === "os") { remember("os"); dismiss(); router.push("/paulfolio"); }
    else if (id === "terminal") { remember("terminal"); setChosen(true); setMode("terminal"); }
  };

  // "Keep scrolling" is a deliberate choice too (classic site) — it records the
  // choice so the modal won't nag again this session.
  const keepScrolling = () => { remember("classic"); dropClose(); };
  const onOverlay = () => { if (canClose) dropClose(); };

  return (
    <div className={styles.modalOverlay} ref={overlayRef} onClick={onOverlay}>
      <div ref={modalRef} className={`${styles.modal} ${mode === "terminal" ? styles.modalWide : ""}`} onClick={(e) => e.stopPropagation()}>
        {canClose && (
          <button className={styles.modalClose} onClick={() => dropClose()} aria-label="Fermer">×</button>
        )}

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

            <button className={styles.modalContinue} onClick={keepScrolling}>{m.continue}</button>
          </>
        ) : (
          <div className={styles.modalTerminal}>
            <div className={styles.modalTerminalTop}>
              <button className={styles.modalBack} onClick={() => setMode("menu")}>← {m.back}</button>
              <span className={styles.modalTerminalHint}>Dever Shell — {m.shell} <b>help</b></span>
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

export default ExperienceModal;
