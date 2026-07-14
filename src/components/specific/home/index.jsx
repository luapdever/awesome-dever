/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "../../../../styles/specific/home/home.module.css";
import { stats, capabilities, journey, testimonials, usefulLinks } from "../../../rawDatas/home";
import { experiences } from "../../../rawDatas/experiences";
import { yearsOfExperience } from "../../../rawDatas/xp";
import { tx } from "../../../rawDatas/i18n";
import PremiumModal from "./PremiumModal";

const YEARS = yearsOfExperience();
const initials = (name) => name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
const MARQUEE = ["Vue.js", "NestJS", "Node.js", "Flutter", "TypeScript", "PostgreSQL", "Docker", "WebSocket", "React", "Stripe", "WordPress", "GSAP", "Three.js", "CI/CD"];
const ROLES = ["Full-Stack Engineer", "Creative Developer", "Problem Solver", "Real-Time Architect"];

const MaskWords = ({ text, className }) => (
  <span className={className}>
    {text.split(" ").map((w, i) => (
      <React.Fragment key={i}>
        <span className={styles.wWrap}><span data-word>{w}</span></span>{" "}
      </React.Fragment>
    ))}
  </span>
);

function HomePage() {
  const root = useRef();
  const galleryPin = useRef();
  const galleryTrack = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [role, setRole] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRole((r) => (r + 1) % ROLES.length), 2600);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || sessionStorage.getItem("seenPremium")) return;
    const id = setTimeout(() => { setModalOpen(true); sessionStorage.setItem("seenPremium", "1"); }, 4200);
    return () => clearTimeout(id);
  }, []);

  // Magnetic buttons
  useEffect(() => {
    const mags = gsap.utils.toArray("[data-magnetic]");
    const handlers = mags.map((el) => {
      const move = (e) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.4, y: (e.clientY - r.top - r.height / 2) * 0.5, duration: 0.4, ease: "power3.out" });
      };
      const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" });
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      return { el, move, leave };
    });
    return () => handlers.forEach((h) => { h.el.removeEventListener("mousemove", h.move); h.el.removeEventListener("mouseleave", h.leave); });
  }, []);

  useEffect(() => {
    document.documentElement.lang = "fr";
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* Preloader */
      const heroWords = gsap.utils.toArray(".heroTitleWord");
      const counter = { v: 0 };
      gsap.timeline()
        .to(counter, { v: 100, duration: 1.6, ease: "power2.inOut", onUpdate: () => { const n = document.getElementById("preCount"); if (n) n.textContent = Math.round(counter.v); } })
        .to("#preName", { y: -14, opacity: 0, duration: 0.5, ease: "power2.in" }, "-=0.2")
        .to("#preloader", { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "-=0.1")
        .from(heroWords, { yPercent: 120, duration: 1, ease: "power4.out", stagger: 0.07 }, "-=0.5")
        .from("[data-hero-fade]", { y: 24, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 }, "-=0.7");

      /* Hero bg parallax */
      gsap.to("[data-hero-bg]", { scale: 1.25, yPercent: 12, ease: "none", scrollTrigger: { trigger: ".heroSec", start: "top top", end: "bottom top", scrub: true } });

      /* Heading masked reveals */
      gsap.utils.toArray("[data-mask]").forEach((el) =>
        gsap.from(el.querySelectorAll("[data-word]"), { yPercent: 120, duration: 0.9, ease: "power4.out", stagger: 0.06, scrollTrigger: { trigger: el, start: "top 88%" } }));

      /* Reveals + stagger */
      gsap.utils.toArray("[data-reveal]").forEach((el) =>
        gsap.from(el, { y: 50, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } }));
      gsap.utils.toArray("[data-stagger]").forEach((g) =>
        gsap.from(g.children, { y: 46, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.09, scrollTrigger: { trigger: g, start: "top 86%" } }));

      /* About scrub */
      const aboutWords = gsap.utils.toArray(".aboutWord");
      if (aboutWords.length) gsap.fromTo(aboutWords, { opacity: 0.16 }, { opacity: 1, ease: "none", stagger: 0.5, scrollTrigger: { trigger: ".aboutText", start: "top 72%", end: "bottom 60%", scrub: true } });

      /* Journey — pinned horizontal scroll (DESKTOP ONLY) */
      const mm = gsap.matchMedia();
      mm.add("(min-width: 860px)", () => {
        const track = galleryTrack.current;
        if (!track) return;
        const amount = () => track.scrollWidth - window.innerWidth + 80;
        gsap.to(track, {
          x: () => -amount(),
          ease: "none",
          scrollTrigger: {
            trigger: galleryPin.current,
            start: "top top",
            end: () => `+=${amount()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      /* Count-up */
      gsap.utils.toArray("[data-count]").forEach((el) => {
        const end = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || "";
        const o = { v: 0 };
        gsap.to(o, { v: end, duration: 1.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 92%" }, onUpdate: () => { el.textContent = Math.round(o.v) + suffix; } });
      });

      ScrollTrigger.refresh();
      setTimeout(() => ScrollTrigger.refresh(), 800);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.home} ref={root}>
      {modalOpen && <PremiumModal onClose={() => setModalOpen(false)} />}

      {/* PRELOADER */}
      <div className={styles.preloader} id="preloader">
        <div id="preName" className={styles.preName}>PAUL · ZANNOU</div>
        <div className={styles.preCount}><span id="preCount">0</span><em>%</em></div>
      </div>

      {/* HERO */}
      <section className={`${styles.heroSec} heroSec`}>
        <div className={styles.heroBg} data-hero-bg>
          <div className={styles.heroAurora} />
        </div>
        <div className={styles.heroGrid} />
        <div className={styles.heroVeil} />
        <div className={styles.heroInner}>
          <span className={styles.kicker} data-hero-fade>Paul Mededji Zannou</span>
          <h1 className={styles.heroTitle}>
            <span className={styles.wWrap}><span className="heroTitleWord">Je</span></span>{" "}
            <span className={styles.wWrap}><span className={`heroTitleWord ${styles.accent}`}>construis</span></span>{" "}
            <span className={styles.wWrap}><span className="heroTitleWord">ce</span></span>{" "}
            <span className={styles.wWrap}><span className="heroTitleWord">que</span></span><br />
            <span className={styles.wWrap}><span className="heroTitleWord">les</span></span>{" "}
            <span className={styles.wWrap}><span className="heroTitleWord">idées</span></span>{" "}
            <span className={styles.wWrap}><span className={`heroTitleWord ${styles.accent2}`}>promettent.</span></span>
          </h1>
          <div className={styles.heroSub} data-hero-fade>
            <span className={styles.roleRotator}>{ROLES[role]}</span>
            <span className={styles.heroDot}>•</span>
            <span>{YEARS} ans à livrer, casser et réparer (en mieux).</span>
          </div>
          <div className={styles.heroActions} data-hero-fade>
            <Link href="/paulfolio" className={styles.btnPrimary} data-magnetic>Explorer PaulBrain OS</Link>
            <a href="/cv/index.html" target="_blank" rel="noopener noreferrer" className={styles.btnGhost} data-magnetic>Mon CV</a>
          </div>
        </div>
        <div className={styles.heroFoot}>
          <span>SCROLL</span>
          <span className={styles.heroLine} />
        </div>
      </section>

      {/* MARQUEE */}
      <div className={styles.marquee}>
        <div className={styles.marqueeTrack}>
          {[...MARQUEE, ...MARQUEE].map((m, i) => (<span key={i}>{m}<i>✦</i></span>))}
        </div>
      </div>

      {/* QUI SUIS-JE */}
      <section id="qui-suis-je" className={styles.section}>
        <p className={`${styles.aboutText} aboutText`}>
          {("Développeur autodidacte devenu ingénieur, je transforme des problèmes que d'autres jugent compliqués — facturation à la minute, streaming vidéo temps réel, e-facturation gouvernementale — en produits stables, élégants et documentés.")
            .split(" ").map((w, i) => <span className="aboutWord" key={i}>{w} </span>)}
        </p>
        <div data-reveal><Link href="/about-me" className={styles.btnGhost} data-magnetic>Ma bio complète</Link></div>
      </section>

      {/* QUE SAIS-JE FAIRE */}
      <section id="que-sais-je-faire" className={styles.section}>
        <h2 className={styles.bigHead} data-mask><MaskWords text="Un couteau suisse, mais qui compile." /></h2>
        <div className={styles.capGrid} data-stagger>
          {capabilities.map((c, i) => (
            <article className={styles.capCard} key={i}>
              <span className={styles.capNum}>0{i + 1}</span>
              <img src={c.icon} alt="" className={styles.capIcon} />
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <div className={styles.tags}>{c.tags.map((t, j) => <span key={j}>{t}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      {/* MON PARCOURS EN IMAGES — pinned horizontal on desktop, stacked on mobile */}
      <section id="parcours" className={styles.galleryPin} ref={galleryPin}>
        <div className={styles.galleryTrack} ref={galleryTrack}>
          <div className={styles.galleryIntro}>
            <h2 className={styles.bigHead}>Mon parcours,<br />image par image.</h2>
            <p>Sept clichés, six ans, une constante&nbsp;: apprendre plus vite que le café ne refroidit.</p>
          </div>
          {journey.map((j, i) => (
            <figure className={styles.gCard} key={i}>
              <div className={styles.gImg}>
                <img src={j.img} alt={j.title} loading="lazy" />
                <span className={styles.gYear}>{j.year}</span>
              </div>
              <figcaption>
                <b>{j.title}</b>
                <span>{j.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* MES EXPÉRIENCES — sticky stack */}
      <section id="experiences" className={styles.section}>
        <h2 className={styles.bigHead} data-mask><MaskWords text="Là où j'ai laissé du code." /></h2>
        <div className={styles.stack}>
          {experiences.map((xp, i) => (
            <article className={styles.stackCard} style={{ top: `${90 + i * 18}px` }} key={xp.id}>
              <div className={styles.stackNum}>0{i + 1}</div>
              <div className={styles.stackBody}>
                <div className={styles.stackHead}><b>{tx(xp.role, "fr")}</b><span>{tx(xp.period, "fr")}</span></div>
                <div className={styles.stackOrg}>{xp.org}</div>
                {xp.summary && <p>{tx(xp.summary, "fr")}</p>}
                <div className={styles.tags}>{xp.stack.slice(0, 6).map((s, j) => <span key={j}>{s}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CHIFFRES */}
      <section className={styles.statsBand} data-stagger>
        {stats.map((s, i) => {
          const num = parseInt(s.n, 10);
          const suffix = s.n.replace(/[0-9]/g, "");
          return (
            <div className={styles.statBig} key={i}>
              <b data-count={num} data-suffix={suffix}>0{suffix}</b>
              <span>{s.l}</span>
            </div>
          );
        })}
      </section>

      {/* TÉMOIGNAGES */}
      <section id="temoignages" className={styles.section}>
        <h2 className={styles.bigHead} data-mask><MaskWords text="Ils ont survécu à mes commits." /></h2>
      </section>
      <div className={styles.testiMarquee}>
        <div className={styles.testiTrack}>
          {[...testimonials, ...testimonials].map((t, i) => (
            <blockquote className={styles.testi} key={i}>
              <p>“{t.text}”</p>
              <footer>
                <span className={styles.avatar}>{initials(t.name)}</span>
                <span className={styles.testiWho}><b>{t.name}</b><span>{t.role}{t.project ? ` · ${t.project}` : ""}</span></span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>

      {/* POUR COLLABORER */}
      <section id="collaborer" className={styles.cta}>
        <h2 className={styles.ctaBig} data-mask><MaskWords text="On construit quelque chose ?" /></h2>
        <p data-reveal>Un projet ambitieux, un délai serré, une idée qui vous empêche de dormir&nbsp;? Écrivez-moi.</p>
        <div className={styles.ctaActions} data-reveal>
          <a className={styles.btnPrimary} href="mailto:pzannou511@gmail.com" data-magnetic>Écrire un e-mail</a>
          <button className={styles.btnGhost} onClick={() => setModalOpen(true)} data-magnetic>Autres façons de me connaître</button>
        </div>
      </section>

      {/* LIENS UTILES */}
      <section id="liens" className={styles.section}>
        <h2 className={styles.bigHead} data-mask><MaskWords text="Liens utiles." /></h2>
        <div className={styles.linksGrid} data-stagger>
          {usefulLinks.map((l, i) => (
            <a className={styles.linkCard} key={i} href={l.href} target={l.target} rel={l.target ? "noopener noreferrer" : undefined}>
              <img src={l.icon} alt="" />
              <span>{l.label}</span>
              <b className={styles.linkArrow}>→</b>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
