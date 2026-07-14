/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "../../../../styles/specific/about/about.module.css";
import { socialMedias } from "../../../rawDatas/aboutMe";
import luap from "../../../assets/img/awesome/luap-thinking.png";

const ph = (name, color = "ffa500") => `https://api.iconify.design/ph:${name}.svg?color=%23${color}`;

const INTERESTS = [
  { icon: ph("music-notes"), t: "Composition musicale", d: "Écrire des mélodies comme j'écris du code : par structure et par émotion." },
  { icon: ph("soccer-ball"), t: "Football", d: "Un terrain, une équipe, un plan de jeu — la meilleure métaphore du produit." },
  { icon: ph("book-open"), t: "Lecture", d: "De la doc aux essais : nourrir la curiosité qui a tout démarré." },
];

const PRINCIPLES = [
  { t: "Livrer, pas promettre", d: "Une démo qui tourne vaut mille slides. Je préfère montrer plutôt que raconter." },
  { t: "Le simple d'abord", d: "La complexité, c'est facile. La simplicité qui tient en prod, c'est le vrai travail." },
  { t: "Documenter comme si je partais demain", d: "Le futur moi (et le reste de l'équipe) me remercie à chaque fois." },
  { t: "Apprendre en public", d: "Je casse, je comprends, je partage. C'est comme ça qu'on avance vite." },
];

const MILESTONES = [
  { y: "2001", t: "Naissance à Cotonou", d: "Le 30 juin. Bien avant mon premier « Hello World »." },
  { y: "2018", t: "Bac série C, CEG 1 Tchaourou", d: "Les maths et la physique — d'excellents entraînements au débogage." },
  { y: "2019", t: "Premiers pas en code", d: "Autodidacte, entre bénévolat, tutos et nuits blanches." },
  { y: "2021", t: "IFRI/UAC & premiers contrats", d: "Internet & Multimédia le jour, projets clients le soir." },
  { y: "2022", t: "KAMGOKO Technologies", d: "Sites & apps pour de grands comptes (MTN, Moov…)." },
  { y: "2024", t: "Emilia Cross — France Assist", d: "Architecture d'une plateforme de streaming vidéo temps réel." },
  { y: "2026", t: "Écosystème Celtiis", d: "Portail corporate multilingue & plateformes internes." },
];

function AboutMe() {
  const root = useRef();
  useEffect(() => {
    document.documentElement.lang = "fr";
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
          <h1 data-r>Développeur le jour,<br /><span className={styles.accent}>compositeur</span> à mes heures.</h1>
          <p data-r>
            Alias <b>Luap Dever</b>. Né à Cotonou, j'ai grandi entre les équations et les écrans.
            Aujourd'hui je conçois des produits numériques — et j'écris encore des lignes… de code
            comme de musique.
          </p>
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
        <h2 data-r>Mon histoire (la version honnête)</h2>
        <div className={styles.storyText} data-r>
          <p>
            Tout a commencé sans ordinateur puissant, sans mentor et sans plan de carrière — juste
            une curiosité tenace et une connexion internet qui testait ma patience. J'ai appris en
            cassant des choses, en lisant de la doc à des heures indues, et en refaisant dix fois ce
            qui aurait pu marcher du premier coup.
          </p>
          <p>
            De bénévole à stagiaire, puis à ingénieur logiciel, j'ai gardé la même approche :
            comprendre le problème mieux que la solution. C'est ce qui m'a permis de m'attaquer à des
            sujets exigeants — <b>facturation à la minute</b>, <b>streaming vidéo temps réel</b>,
            <b> e-facturation gouvernementale</b>, <b>écosystèmes WordPress d'entreprise multilingues</b> —
            sans jamais perdre le fil (ni le sens de l'humour).
          </p>
          <p>
            Je crois qu'un bon logiciel se reconnaît à sa discrétion : il fait le travail, ne réveille
            personne la nuit, et se laisse relire sans angoisse. Et quand je referme l'éditeur, je
            compose de la musique — parce qu'après tout, le code et la mélodie, c'est la même quête de
            structure et d'émotion.
          </p>
        </div>
      </section>

      <section className={styles.block}>
        <h2 data-r>Mes principes</h2>
        <div className={styles.grid} data-rs>
          {PRINCIPLES.map((p, i) => (
            <div className={styles.card} key={i}>
              <span className={styles.cardNum}>{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.block}>
        <h2 data-r>Quelques repères</h2>
        <div className={styles.timeline} data-rs>
          {MILESTONES.map((m, i) => (
            <div className={styles.mile} key={i}>
              <span className={styles.mYear}>{m.y}</span>
              <div>
                <b>{m.t}</b>
                <p>{m.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.block}>
        <h2 data-r>Au-delà du code</h2>
        <div className={styles.interests} data-rs>
          {INTERESTS.map((it, i) => (
            <div className={styles.interest} key={i}>
              <img src={it.icon} alt="" />
              <b>{it.t}</b>
              <span>{it.d}</span>
            </div>
          ))}
        </div>
        <p className={styles.beyond} data-r>
          Trois façons différentes de recharger les batteries — et souvent, c'est là que les
          meilleures idées d'architecture arrivent.
        </p>
      </section>

      <section className={styles.ctaAbout} data-r>
        <h2>On construit quelque chose&nbsp;?</h2>
        <div className={styles.ctaActions}>
          <Link href="/#collaborer" className={styles.btnPrimary}>Me contacter</Link>
          <Link href="/paulfolio" className={styles.btnGhost}>Explorer PaulBrain OS</Link>
          <a href="/cv/index.html" target="_blank" rel="noopener noreferrer" className={styles.btnGhost}>Mon CV</a>
        </div>
      </section>
    </div>
  );
}

export default AboutMe;
