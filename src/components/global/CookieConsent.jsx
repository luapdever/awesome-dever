import React, { useEffect, useState } from "react";
import styles from "../../../styles/specific/cookieConsent.module.css";

/* Bannière de consentement sobre + Consent Mode v2.
   Le défaut « denied » est posé dans _document (avant les tags Google) ;
   ici on ne fait que recueillir le choix et le propager à gtag. */
const KEY = "cookie_consent";

const UI = {
  fr: {
    text: "Ce site utilise des cookies de mesure d'audience pour améliorer l'expérience.",
    accept: "Accepter",
    refuse: "Refuser",
  },
  en: {
    text: "This site uses analytics cookies to improve your experience.",
    accept: "Accept",
    refuse: "Decline",
  },
};

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [fr, setFr] = useState(true);

  useEffect(() => {
    try {
      setFr(!/^en/i.test(navigator.language || "fr"));
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch { /* stockage indisponible */ }
    // Permet de rouvrir le choix (ex. lien « Cookies » du pied de page).
    window.__openCookiePrefs = () => setVisible(true);
    return () => { delete window.__openCookiePrefs; };
  }, []);

  const decide = (granted) => {
    try { localStorage.setItem(KEY, granted ? "granted" : "denied"); } catch {}
    try {
      if (typeof window.gtag === "function") {
        const v = granted ? "granted" : "denied";
        window.gtag("consent", "update", {
          ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v,
        });
      }
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;
  const t = fr ? UI.fr : UI.en;

  return (
    <div className={styles.bar} role="dialog" aria-live="polite" aria-label={fr ? "Consentement aux cookies" : "Cookie consent"}>
      <p className={styles.text}>{t.text}</p>
      <div className={styles.actions}>
        <button type="button" className={styles.refuse} onClick={() => decide(false)}>{t.refuse}</button>
        <button type="button" className={styles.accept} onClick={() => decide(true)}>{t.accept}</button>
      </div>
    </div>
  );
}
