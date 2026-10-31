import React from "react";
import Link from "next/link";
import styles from "../../../styles/global/footer.module.css";
import { socialMedias } from "../../data/identity";
import { useExperience } from "../../context/experience";
import { useLandingLang } from "../../context/landingLang";

function TheFooter() {
  const year = new Date().getFullYear();
  const { openChooser } = useExperience();
  const { lang } = useLandingLang();
  const en = lang === "en";
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <h3>Paul <span>ZANNOU</span></h3>
          <p>
            {en ? "Full-stack software engineer: web, mobile, real-time and DevOps. Based in Cotonou, Benin. Open to opportunities and collaborations." : "Ingénieur logiciel full-stack : web, mobile, temps réel & DevOps. Basé à Cotonou, Bénin. Ouvert aux missions et collaborations."}
          </p>
          <div className={styles.socials}>
            {socialMedias.map(
              (s, i) =>
                i < socialMedias.length - 1 && (
                  <a key={i} href={s.link} target="_blank" rel="noopener noreferrer" aria-label={s.name || "Réseau social"}>
                    {s.icon}
                  </a>
                )
            )}
          </div>
        </div>

        <div className={styles.col}>
          <h4>Navigation</h4>
          <Link href="/">{en ? "Home" : "Accueil"}</Link>
          <Link href="/#qui-suis-je">{en ? "About" : "Qui suis-je"}</Link>
          <Link href="/#que-sais-je-faire">{en ? "Skills" : "Compétences"}</Link>
          <Link href="/#experiences">{en ? "Experience" : "Expériences"}</Link>
          <Link href="/about-me">{en ? "Full bio" : "Bio complète"}</Link>
        </div>

        <div className={styles.col}>
          <h4>{en ? "Explore" : "Explorer"}</h4>
          <Link href="/shop">{lang === "fr" ? "Commander un service" : "Order a service"}</Link>
          <Link href="/projects">{lang === "en" ? "Projects" : "Projets"}</Link>
          <Link href="/paulfolio">PaulBrain OS</Link>
          <a href="/cv" target="_blank" rel="noopener noreferrer">{en ? "Interactive resume" : "Mon CV interactif"}</a>
          <Link href="/#temoignages">{en ? "Testimonials" : "Témoignages"}</Link>
          <Link href="/blog">{en ? "My blog" : "Mon blog"}</Link>
          <button
            type="button"
            className={styles.linkBtn}
            onClick={openChooser}
            title={lang === "fr" ? "Changer d'expérience : version classique ou PaulBrain OS" : "Change experience: classic version or PaulBrain OS"}
          >
            {lang === "fr" ? "Changer d'expérience" : "Change experience"}
          </button>
        </div>

        <div className={styles.col}>
          <h4>Contact</h4>
          <a href="mailto:hi@paulzannou.com">hi@paulzannou.com</a>
          <a href="tel:+2290190667333">+229 01 90 66 73 33</a>
          <span>Abomey-Calavi / Cotonou, Bénin</span>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>&copy; {year} Paul Mèdédji ZANNOU · Luap Dever. {en ? "All rights reserved." : "Tous droits réservés."}</span>
        <span className={styles.made}>
          {en ? "Designed & coded with" : "Conçu & codé avec"}
          <img src="/icons/ph/coffee-fill__ffa500.svg" alt={en ? "coffee" : "café"} className={styles.madeIcon}  loading="lazy" decoding="async"/>
          · passion
        </span>
      </div>
    </footer>
  );
}

export default TheFooter;
