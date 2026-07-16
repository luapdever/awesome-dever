/* eslint-disable @next/next/no-img-element */
import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import styles from "../../../../../styles/specific/portfolio/windows/contact.module.css";
import { socialMedias } from "../../../../rawDatas/aboutMe";
import { useLang } from "../lang";
import ContactForm from "../../../global/ContactForm";

const EMAIL = "pzannou511@gmail.com";
const PHONE = "+229 01 90 66 73 33";
const LOCATION = "Abomey-Calavi / Cotonou, Benin";

/* Fenêtre Contact de l'OS = infos de contact + le MÊME formulaire ALTCHA que
   la home (composant partagé ContactForm — aucune duplication de logique). */
function Contact() {
  const { t, lang } = useLang();

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

        <div className={styles.formCol}>
          <ContactForm lang={lang} source="os-contact" />
        </div>
      </div>
    </div>
  );
}

export default Contact;
