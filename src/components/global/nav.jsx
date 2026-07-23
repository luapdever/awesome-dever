import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap/dist/gsap";
import dever from "../../assets/img/icons/DEVER.svg";
import styles from "../../../styles/global/nav.module.css";
import { socialMedias, L, tx } from "../../data";
import { track } from "../../lib/analytics";
import { useLandingLang } from "../../context/landingLang";
import { useExperience } from "../../context/experience";

const LINKS = [
  { label: L("Home", "Accueil"), href: "/", id: "top" },
  { label: L("About", "Qui suis-je"), href: "/#qui-suis-je", id: "qui-suis-je" },
  { label: L("Journey", "Parcours"), href: "/#parcours", id: "parcours" },
  { label: L("Experience", "Expériences"), href: "/#experiences", id: "experiences" },
  { label: L("Bio", "Bio"), href: "/about-me", id: "bio" },
  { label: L("Contact", "Contact"), href: "/#collaborer", id: "collaborer" },
];

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");
  const overlay = useRef();
  const { lang, setLang } = useLandingLang();
  const { openChooser } = useExperience();
  const other = lang === "fr" ? "en" : "fr";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Desktop scroll-spy for the active pill link
  useEffect(() => {
    const secs = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    if (!secs.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    secs.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Full-screen overlay reveal
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open && overlay.current) {
      gsap.fromTo(
        overlay.current.querySelectorAll("[data-oitem]"),
        { y: 46, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.06, delay: 0.12 }
      );
    }
  }, [open]);

  const overlayLinks = [
    ...LINKS,
    { label: L("View CV", "Voir le CV"), href: "/cv", id: "cv" },
    { label: "PaulBrain OS", href: "/paulfolio", id: "os" },
  ];

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <Link href="/" className={styles.logo} onClick={() => setOpen(false)}>
          <span className={styles.logoMark}>
            <Image src={dever} alt="Dever" width={24} height={24} />
          </span>
          <span className={styles.logoText}>DEVER</span>
        </Link>

        <nav className={styles.pill}>
          {LINKS.map((l) => (
            <Link key={l.id} href={l.href} className={`${styles.pillLink} ${active === l.id ? styles.pillActive : ""}`}>
              {tx(l.label, lang)}
            </Link>
          ))}
        </nav>

        <div className={styles.right}>
          <div className={styles.langSwitch}>
            <button className={lang === "fr" ? styles.langActive : ""} onClick={() => setLang("fr")}>FR</button>
            <button className={lang === "en" ? styles.langActive : ""} onClick={() => setLang("en")}>EN</button>
          </div>
          <a href="/cv" target="_blank" rel="noopener noreferrer" className={styles.cvLink} onClick={() => track("cv_open", { source: "nav" })}>{tx(L("CV", "CV"), lang)}</a>
          <Link href="/paulfolio" className={styles.cta}>PaulBrain&nbsp;OS</Link>
          <button
            className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
          >
            <span /><span />
          </button>
        </div>
      </header>

      <div ref={overlay} className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}>
        <nav className={styles.overlayNav}>
          {overlayLinks.map((l, i) => (
            <Link key={l.id} href={l.href} className={styles.overlayLink} data-oitem onClick={() => setOpen(false)}>
              <span className={styles.oIndex}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.oLabel}>{tx(l.label, lang)}</span>
            </Link>
          ))}
        </nav>
        <button
          className={styles.overlayExp}
          data-oitem
          onClick={() => { setOpen(false); openChooser(); }}
        >
          <span className={styles.overlayExpIcon}>⤢</span>
          {lang === "fr" ? "Changer d'expérience" : "Change experience"}
        </button>
        <div className={styles.overlayFoot} data-oitem>
          <a href="mailto:pzannou511@gmail.com" className={styles.overlayMail}>pzannou511@gmail.com</a>
          <div className={styles.overlaySocials}>
            {socialMedias.map((s, i) =>
              i < socialMedias.length - 1 ? (
                <a key={i} href={s.link} target="_blank" rel="noopener noreferrer" aria-label={s.name || "Réseau social"}>{s.icon}</a>
              ) : null
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
