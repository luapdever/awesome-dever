/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "../../../../styles/specific/about/about.module.css";
import { socialMedias, L, tx } from "../../../data";
import { useLandingLang } from "../../../context/landingLang";
import luap from "../../../assets/img/awesome/luap-thinking.png";

const ph = (name, color = "ffa500") => `/icons/ph/${name}__${color}.svg`;

const INTERESTS = [
  { icon: ph("music-notes"), t: L("Music composition", "Composition musicale"), d: L("Writing melodies like I write code: by structure and by emotion.", "Écrire des mélodies comme j'écris du code : par structure et par émotion.") },
  { icon: ph("soccer-ball"), t: L("Football", "Football"), d: L("A pitch, a team, a game plan — the best product metaphor.", "Un terrain, une équipe, un plan de jeu — la meilleure métaphore du produit.") },
  { icon: ph("book-open"), t: L("Reading", "Lecture"), d: L("From docs to essays: feeding the curiosity that started it all.", "De la doc aux essais : nourrir la curiosité qui a tout démarré.") },
];

const PRINCIPLES = [
  { t: L("Ship, don't promise", "Livrer, pas promettre"), d: L("A running demo beats a thousand slides. I'd rather show than tell.", "Une démo qui tourne vaut mille slides. Je préfère montrer plutôt que raconter.") },
  { t: L("Simple first", "Le simple d'abord"), d: L("Complexity is easy. Simplicity that holds in production is the real work.", "La complexité, c'est facile. La simplicité qui tient en prod, c'est le vrai travail.") },
  { t: L("Document as if I'm leaving tomorrow", "Documenter comme si je partais demain"), d: L("Future me (and the rest of the team) says thanks every time.", "Le futur moi (et le reste de l'équipe) me remercie à chaque fois.") },
  { t: L("Learn in public", "Apprendre en public"), d: L("I break things, I understand them, I share. That's how you move fast.", "Je casse, je comprends, je partage. C'est comme ça qu'on avance vite.") },
  { t: L("Automate the boring", "Automatiser l'ennuyeux"), d: L("A script today, hours saved tomorrow. Well-placed laziness is an engineer's virtue.", "Un script aujourd'hui, des heures gagnées demain. La paresse bien placée est une vertu d'ingénieur.") },
  { t: L("Context before code", "Le contexte avant le code"), d: L("Understand the business and the user before opening the editor: half the bugs then never exist.", "Comprendre le métier et l'utilisateur avant d'ouvrir l'éditeur : la moitié des bugs n'existent alors jamais.") },
];

const MILESTONES = [
  { y: "2001", t: L("Born in Cotonou", "Naissance à Cotonou"), d: L("On June 30th. Long before my first “Hello World”.", "Le 30 juin. Bien avant mon premier « Hello World ».") },
  { y: "2018", t: L("Science baccalauréat, CEG 1 Tchaourou", "Bac série C, CEG 1 Tchaourou"), d: L("Maths and physics — excellent debugging training.", "Les maths et la physique — d'excellents entraînements au débogage.") },
  { y: "2019", t: L("First steps in code", "Premiers pas en code"), d: L("Self-taught, between volunteering, tutorials and sleepless nights.", "Autodidacte, entre bénévolat, tutos et nuits blanches.") },
  { y: "2021", t: L("IFRI/UAC & first contracts", "IFRI/UAC & premiers contrats"), d: L("Internet & Multimedia by day, client projects by night.", "Internet & Multimédia le jour, projets clients le soir.") },
  { y: "2022", t: L("KAMGOKO Technologies", "KAMGOKO Technologies"), d: L("Sites & apps for major accounts (MTN, Moov…).", "Sites & apps pour de grands comptes (MTN, Moov…).") },
  { y: "2024", t: L("Emilia Cross — France Assist", "Emilia Cross — France Assist"), d: L("Architecture of a dating site (live video, KYC, payments & payouts).", "Architecture d'un site de rencontre (visio, KYC, paiements & payouts).") },
  { y: "2026", t: L("Celtiis ecosystem — KAMGOKO", "Écosystème Celtiis — KAMGOKO"), d: L("Multilingual corporate portal & internal platforms, built at KAMGOKO Technologies.", "Portail corporate multilingue & plateformes internes, réalisés chez KAMGOKO Technologies.") },
];

const ABOUT_UI = {
  en: {
    heroTitle: { pre: "Developer by day,", accent: "composer", post: "by night." },
    heroLead: "Aka Luap Dever. Born in Cotonou, I grew up between equations and screens. Today I design digital products — and I still write lines… of code as much as music.",
    histTitle: "My story (the honest version)",
    story: [
      "It all started without a powerful computer, without a mentor and without a career plan — just stubborn curiosity and an internet connection that tested my patience. I learned by breaking things, reading docs at ungodly hours, and redoing ten times what could have worked the first time.",
      "From volunteer to intern, then to software engineer, I kept the same approach: understand the problem better than the solution. That's what let me tackle demanding topics — per-minute billing, real-time video streaming, government e-invoicing, multilingual enterprise WordPress ecosystems — without ever losing the thread (or my sense of humour).",
      "I believe good software is recognized by its discretion: it does the job, wakes no one at night, and reads back without dread. And when I close the editor, I compose music — because after all, code and melody are the same quest for structure and emotion.",
    ],
    princTitle: "My principles",
    milesTitle: "A few landmarks",
    beyondTitle: "Beyond the code",
    beyondText: "Three different ways to recharge — and often, that's where the best architecture ideas show up.",
    ctaTitle: "Shall we build something?",
    ctaContact: "Contact me",
    ctaOS: "Explore PaulBrain OS",
    ctaCV: "My résumé",
    ctaBook: "Read my biography (the book)",
  },
  fr: {
    heroTitle: { pre: "Développeur le jour,", accent: "compositeur", post: "à mes heures." },
    heroLead: "Alias Luap Dever. Né à Cotonou, j'ai grandi entre les équations et les écrans. Aujourd'hui je conçois des produits numériques — et j'écris encore des lignes… de code comme de musique.",
    histTitle: "Mon histoire (la version honnête)",
    story: [
      "Tout a commencé sans ordinateur puissant, sans mentor et sans plan de carrière — juste une curiosité tenace et une connexion internet qui testait ma patience. J'ai appris en cassant des choses, en lisant de la doc à des heures indues, et en refaisant dix fois ce qui aurait pu marcher du premier coup.",
      "De bénévole à stagiaire, puis à ingénieur logiciel, j'ai gardé la même approche : comprendre le problème mieux que la solution. C'est ce qui m'a permis de m'attaquer à des sujets exigeants — facturation à la minute, streaming vidéo temps réel, e-facturation gouvernementale, écosystèmes WordPress d'entreprise multilingues — sans jamais perdre le fil (ni le sens de l'humour).",
      "Je crois qu'un bon logiciel se reconnaît à sa discrétion : il fait le travail, ne réveille personne la nuit, et se laisse relire sans angoisse. Et quand je referme l'éditeur, je compose de la musique — parce qu'après tout, le code et la mélodie, c'est la même quête de structure et d'émotion.",
    ],
    princTitle: "Mes principes",
    milesTitle: "Quelques repères",
    beyondTitle: "Au-delà du code",
    beyondText: "Trois façons différentes de recharger les batteries — et souvent, c'est là que les meilleures idées d'architecture arrivent.",
    ctaTitle: "On construit quelque chose ?",
    ctaContact: "Me contacter",
    ctaOS: "Explorer PaulBrain OS",
    ctaCV: "Mon CV",
    ctaBook: "Lire ma biographie (le livre)",
  },
};

function AboutMe() {
  const root = useRef();
  const { lang } = useLandingLang();
  const ui = ABOUT_UI[lang];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from("[data-r]", { y: 40, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 75%" } });
      gsap.utils.toArray("[data-rs]").forEach((g) => {
        gsap.from(g.children, { y: 34, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.08,
          scrollTrigger: { trigger: g, start: "top 85%" } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.about} ref={root}>
      <header className={styles.hero}>
        <div className={styles.avatar} data-r>
          <img src={luap.src} alt="Paul Mèdédji ZANNOU" />
        </div>
        <div className={styles.heroText}>
          <h1 data-r>{ui.heroTitle.pre}<br /><span className={styles.accent}>{ui.heroTitle.accent}</span> {ui.heroTitle.post}</h1>
          <p data-r>{ui.heroLead}</p>
          <div className={styles.socials} data-r>
            {socialMedias.map((s, i) =>
              i < socialMedias.length - 1 ? (
                <a key={i} href={s.link} target="_blank" rel="noopener noreferrer" aria-label="social">{s.icon}</a>
              ) : null
            )}
          </div>
        </div>
      </header>

      <section className={styles.story}>
        <h2 data-r>{ui.histTitle}</h2>
        <div className={styles.storyText} data-r>
          {ui.story.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </section>

      <section className={styles.block}>
        <h2 data-r>{ui.princTitle}</h2>
        <div className={styles.grid} data-rs>
          {PRINCIPLES.map((p, i) => (
            <div className={styles.card} key={i}>
              <span className={styles.cardNum}>{String(i + 1).padStart(2, "0")}</span>
              <h3>{tx(p.t, lang)}</h3>
              <p>{tx(p.d, lang)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.block}>
        <h2 data-r>{ui.milesTitle}</h2>
        <div className={styles.timeline} data-rs>
          {MILESTONES.map((m, i) => (
            <div className={styles.mile} key={i}>
              <span className={styles.mYear}>{m.y}</span>
              <div>
                <b>{tx(m.t, lang)}</b>
                <p>{tx(m.d, lang)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.block}>
        <h2 data-r>{ui.beyondTitle}</h2>
        <div className={styles.interests} data-rs>
          {INTERESTS.map((it, i) => (
            <div className={styles.interest} key={i}>
              <img src={it.icon} alt="" />
              <b>{tx(it.t, lang)}</b>
              <span>{tx(it.d, lang)}</span>
            </div>
          ))}
        </div>
        <p className={styles.beyond} data-r>{ui.beyondText}</p>
      </section>

      <section className={styles.ctaAbout} data-r>
        <h2>{ui.ctaTitle}</h2>
        <div className={styles.ctaActions}>
          <Link href="/#collaborer" className={styles.btnPrimary}>{ui.ctaContact}</Link>
          <Link href="/book" className={styles.btnGhost}>{ui.ctaBook}</Link>
          <Link href="/paulfolio" className={styles.btnGhost}>{ui.ctaOS}</Link>
          <a href="/cv/index.html" target="_blank" rel="noopener noreferrer" className={styles.btnGhost}>{ui.ctaCV}</a>
        </div>
      </section>
    </div>
  );
}

export default AboutMe;
