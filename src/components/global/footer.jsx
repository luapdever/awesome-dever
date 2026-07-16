import React from "react";
import Link from "next/link";
import styles from "../../../styles/global/footer.module.css";
import { socialMedias } from "../../rawDatas/aboutMe";
import { useExperience } from "../../context/experience";
import { useLandingLang } from "../../context/landingLang";

function TheFooter() {
  const year = new Date().getFullYear();
  const { openChooser } = useExperience();
  const { lang } = useLandingLang();
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <h3>Paul <span>ZANNOU</span></h3>
          <p>
            Ingénieur logiciel full-stack — web, mobile, temps réel &amp; DevOps.
            Basé à Cotonou, Bénin. Ouvert aux missions et collaborations.
          </p>
          <div className={styles.socials}>
            {socialMedias.map(
              (s, i) =>
                i < socialMedias.length - 1 && (
                  <a key={i} href={s.link} target="_blank" rel="noopener noreferrer" aria-label="social link">
                    {s.icon}
                  </a>
                )
            )}
          </div>
        </div>

        <div className={styles.col}>
          <h4>Navigation</h4>
          <Link href="/">Accueil</Link>
          <Link href="/#qui-suis-je">Qui suis-je</Link>
          <Link href="/#que-sais-je-faire">Compétences</Link>
          <Link href="/#experiences">Expériences</Link>
          <Link href="/about-me">Bio complète</Link>
        </div>

        <div className={styles.col}>
          <h4>Explorer</h4>
          <Link href="/paulfolio">PaulBrain OS</Link>
          <a href="/cv/index.html" target="_blank" rel="noopener noreferrer">Mon CV interactif</a>
          <Link href="/#temoignages">Témoignages</Link>
          <a href="https://luap-dever.netlify.app" target="_blank" rel="noopener noreferrer">Mon blog</a>
          <button type="button" className={styles.linkBtn} onClick={openChooser}>
            {lang === "fr" ? "Changer d'expérience" : "Change experience"}
          </button>
        </div>

        <div className={styles.col}>
          <h4>Contact</h4>
          <a href="mailto:pzannou511@gmail.com">pzannou511@gmail.com</a>
          <a href="tel:+2290190667333">+229 01 90 66 73 33</a>
          <span>Abomey-Calavi / Cotonou, Bénin</span>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>&copy; {year} Paul Mèdédji ZANNOU — Luap Dever. Tous droits réservés.</span>
        <span className={styles.made}>
          Conçu &amp; codé avec
          <img src="https://api.iconify.design/ph:coffee-fill.svg?color=%23ffa500" alt="café" className={styles.madeIcon} />
          · passion
        </span>
      </div>
    </footer>
  );
}

export default TheFooter;
