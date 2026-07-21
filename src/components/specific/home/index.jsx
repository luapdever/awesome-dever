/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "../../../../styles/specific/home/home.module.css";
import {
  stats, capabilities, journey, testimonials, usefulLinks, collaborations, HERO_TITLE, HOME_UI,
  experiences, yearsOfExperience, tx, SKILL_CAT, skillSet,
} from "../../../data";
import { useLandingLang } from "../../../context/landingLang";
import { useExperience } from "../../../context/experience";
import ContactForm from "../../global/ContactForm";

const YEARS = yearsOfExperience();
const initials = (name) => name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
const ROLES = ["Full-Stack Engineer", "Creative Developer", "Problem Solver", "Real-Time Architect"];

// Phosphor category icons for the stack (no emojis on the landing).
const ph = (name, color = "ffa500") => `/icons/ph/${name}__${color}.svg`;
const CAT_PH = {
  languages: ph("code"),
  frontend: ph("browser"),
  backend: ph("stack"),
  mobile: ph("device-mobile"),
  cms: ph("globe-hemisphere-west"),
  data: ph("database"),
  devops: ph("rocket-launch"),
  tools: ph("wrench"),
};

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
  const testiRef = useRef();
  const heroReadyRef = useRef(false); // hero title unmasked (intro done) → cursor play allowed
  const { lang } = useLandingLang();
  const ui = HOME_UI[lang];
  const { openChooser } = useExperience();
  const [role, setRole] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRole((r) => (r + 1) % ROLES.length), 2600);
    return () => clearInterval(id);
  }, []);

  // Preloader failsafe: the veil is normally lifted by the GSAP intro (rAF-driven).
  // If rAF stalls (backgrounded tab), JS errors, or the user prefers reduced motion,
  // a wall-clock timer removes it anyway so the page is never held hostage by an
  // animation. setTimeout keeps firing even when rAF is throttled in a hidden tab.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const pre = document.getElementById("preloader");
    if (!pre) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dismiss = () => {
      if (pre.dataset.done) return;
      pre.dataset.done = "1";
      pre.style.transition = "transform 0.5s ease";
      pre.style.transform = "translateY(-100%)";
      pre.setAttribute("aria-hidden", "true");
      heroReadyRef.current = true;
      document.querySelectorAll(".heroTitleWord").forEach((w) => { if (w.parentElement) w.parentElement.style.overflow = "visible"; });
    };
    const id = setTimeout(dismiss, reduce ? 0 : 4500);
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

  // Recalculate pinned-scroll distances when the language (and thus text width) changes.
  useEffect(() => {
    if (typeof window !== "undefined" && ScrollTrigger) {
      const id = setTimeout(() => ScrollTrigger.refresh(), 120);
      return () => clearTimeout(id);
    }
  }, [lang]);

  // Playful hero title — words flee the cursor and spring back (skip touch / reduced-motion).
  // Re-runs on lang change because the <h1 key={lang}> remounts fresh words.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const words = gsap.utils.toArray(".heroTitleWord");
    const hero = document.querySelector(".heroSec");
    if (!words.length || !hero) return;

    // On a language switch there's no intro to preserve, so unmask immediately;
    // on first load the intro timeline flips heroReadyRef + overflow when the reveal ends.
    if (heroReadyRef.current) words.forEach((w) => { if (w.parentElement) w.parentElement.style.overflow = "visible"; });

    const RADIUS = 165, PUSH = 0.7;
    const qx = words.map((w) => gsap.quickTo(w, "x", { duration: 0.55, ease: "power3.out" }));
    const qy = words.map((w) => gsap.quickTo(w, "y", { duration: 0.55, ease: "power3.out" }));
    const qr = words.map((w) => gsap.quickTo(w, "rotation", { duration: 0.55, ease: "power3.out" }));
    const rest = (i) => { qx[i](0); qy[i](0); qr[i](0); };

    const onMove = (e) => {
      if (!heroReadyRef.current) return; // wait until the intro reveal has finished
      for (let i = 0; i < words.length; i++) {
        const b = words[i].getBoundingClientRect();
        const dx = (b.left + b.width / 2) - e.clientX;
        const dy = (b.top + b.height / 2) - e.clientY;
        const dist = Math.hypot(dx, dy);
        if (dist < RADIUS) {
          const f = (1 - dist / RADIUS) * PUSH;
          qx[i](dx * f); qy[i](dy * f); qr[i]((dx / RADIUS) * 6 * f);
        } else rest(i);
      }
    };
    const reset = () => { for (let i = 0; i < words.length; i++) rest(i); };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", reset);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", reset);
      words.forEach((w) => gsap.set(w, { x: 0, y: 0, rotation: 0 }));
    };
  }, [lang]);

  // Testimonials: gentle auto-scroll, still manually draggable (pauses on interaction).
  useEffect(() => {
    const el = testiRef.current;
    if (!el) return;
    // Keep a float accumulator — assigning a sub-pixel value to scrollLeft each
    // frame would round back to 0 and never move.
    let raf, paused = false, last = null, pos = el.scrollLeft || 0;
    const PX_PER_SEC = 28;
    const step = (ts) => {
      if (last != null && !paused && el.scrollWidth > el.clientWidth) {
        const dt = Math.min((ts - last) / 1000, 0.05);
        const half = el.scrollWidth / 2;
        pos += PX_PER_SEC * dt;
        if (pos >= half) pos -= half;
        el.scrollLeft = pos;
      }
      last = ts;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    const pause = () => { paused = true; };
    const resume = () => { pos = el.scrollLeft; last = null; paused = false; };
    el.addEventListener("pointerenter", pause);
    el.addEventListener("pointerleave", resume);
    el.addEventListener("pointerdown", pause);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", pause);
      el.removeEventListener("pointerleave", resume);
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      /* Preloader + hero intro. Skipped under reduced-motion (the failsafe
         effect below reveals everything instantly instead). */
      const heroWords = gsap.utils.toArray(".heroTitleWord");
      if (reduceMotion) {
        heroReadyRef.current = true;
        heroWords.forEach((w) => { if (w.parentElement) w.parentElement.style.overflow = "visible"; });
      } else {
        const counter = { v: 0 };
        gsap.timeline()
          .to(counter, { v: 100, duration: 1.6, ease: "power2.inOut", onUpdate: () => { const n = document.getElementById("preCount"); if (n) n.textContent = Math.round(counter.v); } })
          .to("#preName", { y: -14, opacity: 0, duration: 0.5, ease: "power2.in" }, "-=0.2")
          .to("#preloader", { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "-=0.1")
          .from(heroWords, { yPercent: 120, duration: 1, ease: "power4.out", stagger: 0.07 }, "-=0.5")
          .from("[data-hero-fade]", { y: 24, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 }, "-=0.7")
          // Reveal mask done → let each word overflow its clip box so it can drift with the cursor.
          .add(() => { heroReadyRef.current = true; heroWords.forEach((w) => { if (w.parentElement) w.parentElement.style.overflow = "visible"; }); });
      }

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

      /* Journey — pinned horizontal scroll (desktop + mobile) */
      const mm = gsap.matchMedia();
      const setupPin = () => {
        const track = galleryTrack.current;
        if (!track) return null;
        const amount = () => track.scrollWidth - window.innerWidth + 80;
        return gsap.to(track, {
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
      };
      // Desktop: pinned horizontal scroll (vertical scroll drives it) — unchanged.
      mm.add("(min-width: 860px)", () => { setupPin(); });
      // Mobile: native horizontal swipe + normal vertical page scroll (no pin),
      // GSAP image parallax driven by the container's own horizontal scroll.
      mm.add("(max-width: 859px)", () => {
        const track = galleryTrack.current;
        if (!track) return;
        const imgs = track.querySelectorAll("figure img");
        gsap.set(imgs, { scale: 1.16 });
        const onScroll = () => {
          const tr = track.getBoundingClientRect();
          const center = tr.left + tr.width / 2;
          imgs.forEach((img) => {
            const r = img.parentElement.getBoundingClientRect();
            const rel = ((r.left + r.width / 2) - center) / (tr.width || 1); // -1..1
            gsap.set(img, { xPercent: rel * 9 });
          });
        };
        onScroll();
        track.addEventListener("scroll", onScroll, { passive: true });
        return () => track.removeEventListener("scroll", onScroll);
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
          <span className={styles.kicker} data-hero-fade>Paul Mèdédji Zannou</span>
          <h1 className={styles.heroTitle} key={lang}>
            {HERO_TITLE[lang].map((tok, i) =>
              tok.br ? (
                <br key={i} />
              ) : (
                <React.Fragment key={i}>
                  <span className={styles.wWrap}><span className={`heroTitleWord ${tok.cls ? styles[tok.cls] : ""}`}>{tok.w}</span></span>{" "}
                </React.Fragment>
              )
            )}
          </h1>
          <div className={styles.heroSub} data-hero-fade>
            <span className={styles.roleRotator}>{ROLES[role]}</span>
            <span className={styles.heroDot}>•</span>
            <span>{YEARS} {ui.heroSubYears}</span>
          </div>
          <div className={styles.heroActions} data-hero-fade>
            <Link href="/paulfolio" className={styles.btnPrimary} data-magnetic>{ui.btnOS}</Link>
            <a href="/cv" target="_blank" rel="noopener noreferrer" className={styles.btnGhost} data-magnetic>{ui.btnCV}</a>
          </div>
        </div>
        <div className={styles.heroFoot}>
          <span>{ui.scroll}</span>
          <span className={styles.heroLine} />
        </div>
      </section>

      {/* MARQUEE — casquettes / roles */}
      <div className={styles.marquee}>
        <div className={styles.marqueeTrack}>
          {[...ui.casquettes, ...ui.casquettes].map((m, i) => (<span key={i}>{m}<i>✦</i></span>))}
        </div>
      </div>

      {/* QUI SUIS-JE */}
      <section id="qui-suis-je" className={styles.section}>
        <p className={`${styles.aboutText} aboutText`} key={lang}>
          {ui.aboutText.split(" ").map((w, i) => <span className="aboutWord" key={i}>{w} </span>)}
        </p>
        <div data-reveal><Link href="/about-me" className={styles.btnGhost} data-magnetic>{ui.bioLink}</Link></div>
      </section>

      {/* QUE SAIS-JE FAIRE */}
      <section id="que-sais-je-faire" className={styles.section}>
        <h2 className={styles.bigHead} data-mask><MaskWords text={ui.headCaps} /></h2>
        <div className={styles.capGrid} data-stagger>
          {capabilities.map((c, i) => (
            <article className={styles.capCard} key={i}>
              <span className={styles.capNum}>0{i + 1}</span>
              <img src={c.icon} alt="" className={styles.capIcon} />
              <h3>{tx(c.title, lang)}</h3>
              <p>{tx(c.desc, lang)}</p>
              <div className={styles.tags}>{c.tags.map((t, j) => <span key={j}>{t}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      {/* MON PARCOURS EN IMAGES — pinned horizontal on desktop, stacked on mobile */}
      <section id="parcours" className={styles.galleryPin} ref={galleryPin}>
        <div className={styles.galleryTrack} ref={galleryTrack}>
          <div className={styles.galleryIntro}>
            <h2 className={styles.bigHead}>{ui.headJourney}</h2>
            <p>{ui.journeyIntro}</p>
          </div>
          {journey.map((j, i) => (
            <figure className={styles.gCard} key={i}>
              <div className={styles.gImg}>
                <img src={j.img} alt={tx(j.title, lang)} loading="lazy" />
                <span className={styles.gYear}>{j.year}</span>
              </div>
              <figcaption>
                <b>{tx(j.title, lang)}</b>
                <span>{tx(j.caption, lang)}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* MES EXPÉRIENCES — sticky stack */}
      <section id="experiences" className={styles.section}>
        <h2 className={styles.bigHead} data-mask><MaskWords text={ui.headExp} /></h2>
        <div className={styles.stack}>
          {experiences.map((xp, i) => (
            <article className={styles.stackCard} style={{ top: `${90 + i * 18}px` }} key={xp.id}>
              <div className={styles.stackNum}>0{i + 1}</div>
              <div className={styles.stackBody}>
                <div className={styles.stackHead}><b>{tx(xp.role, lang)}</b><span>{tx(xp.period, lang)}</span></div>
                <div className={styles.stackOrg}>{xp.org}</div>
                {xp.summary && <p>{tx(xp.summary, lang)}</p>}
                <div className={styles.tags}>{xp.stack.slice(0, 6).map((s, j) => <span key={j}>{s}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* MES COLLABORATIONS — projets clés + CTA vers l'OS */}
      <section id="collaborations" className={styles.section}>
        <div className={styles.stackHeadRow}>
          <h2 className={styles.bigHead} data-mask><MaskWords text={ui.headCollab} /></h2>
          <p className={styles.stackSub} data-reveal>{ui.collabSub}</p>
        </div>
        <div className={styles.collabGrid} data-stagger>
          {collaborations.map((c, i) => (
            <a key={i} href={c.url} target="_blank" rel="noopener noreferrer" className={styles.collabCard}>
              <span className={styles.collabIcon}><img src={c.icon} alt="" loading="lazy" /></span>
              <span className={styles.collabName}>{c.name}</span>
              <span className={styles.collabClient}>{tx(c.client, lang)}</span>
              <span className={styles.collabTag}>{tx(c.tag, lang)}</span>
              <b className={styles.collabArrow}>↗</b>
            </a>
          ))}
        </div>
        <div className={styles.collabMore} data-reveal>
          <Link href="/paulfolio" className={styles.btnPrimary}>{ui.collabMore}</Link>
        </div>
      </section>

      {/* MA STACK PAR CATÉGORIE — bloc scannable, pas de bandeau */}
      <section id="stack" className={styles.section}>
        <div className={styles.stackHeadRow}>
          <h2 className={styles.bigHead} data-mask><MaskWords text={ui.stackHead} /></h2>
        </div>
        <div className={styles.techGrid} data-stagger>
          {skillSet.map((cat) => (
            <div className={styles.techCat} key={cat.key}>
              <div className={styles.techCatHead}>
                <img src={CAT_PH[cat.key] || cat.icon} alt="" />
                <span>{SKILL_CAT[cat.category] ? tx(SKILL_CAT[cat.category], lang) : cat.category}</span>
              </div>
              <div className={styles.techChips}>
                {cat.skills.map((sk, i) => (
                  <span className={styles.techChip} key={i}>
                    {sk.icon && <img src={sk.icon} alt="" loading="lazy" />}
                    {sk.name}
                  </span>
                ))}
              </div>
            </div>
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
              {/* Valeur réelle en fallback (SSR / sans JS / anim qui plante) ;
                  le compteur JS repart de 0 au scroll pour l'effet. */}
              <b data-count={num} data-suffix={suffix}>{num}{suffix}</b>
              <span>{tx(s.l, lang)}</span>
            </div>
          );
        })}
      </section>

      {/* TÉMOIGNAGES */}
      <section id="temoignages" className={`${styles.section} ${styles.testiHead}`}>
        <h2 className={styles.bigHead} data-mask><MaskWords text={ui.headTesti} /></h2>
      </section>
      <div className={styles.testiScroller} ref={testiRef}>
        {[...testimonials, ...testimonials].map((t, i) => (
          <blockquote
            className={styles.testi}
            key={i}
            aria-hidden={i >= testimonials.length ? "true" : undefined}
          >
            <p>“{tx(t.text, lang)}”</p>
            <footer>
              <span className={styles.avatar}>{initials(t.name)}</span>
              <span className={styles.testiWho}><b>{t.name}</b><span>{tx(t.role, lang)}{t.project ? ` · ${t.project}` : ""}</span></span>
            </footer>
          </blockquote>
        ))}
      </div>

      {/* POUR COLLABORER */}
      <section id="collaborer" className={styles.cta}>
        <h2 className={styles.ctaBig} data-mask><MaskWords text={ui.ctaTitle} /></h2>
        <p data-reveal>{ui.ctaText}</p>
        <div className={styles.ctaForm} data-reveal>
          <ContactForm lang={lang} source="home-cta" />
        </div>
        <div className={styles.ctaActions} data-reveal>
          <a className={styles.btnGhost} href="mailto:pzannou511@gmail.com" data-magnetic>{ui.ctaMail}</a>
          <button
            className={styles.btnGhost}
            onClick={openChooser}
            data-magnetic
            title={lang === "fr" ? "Changer d'expérience — version classique ou PaulBrain OS" : "Change experience — classic version or PaulBrain OS"}
          >{ui.ctaOther}</button>
        </div>
      </section>

      {/* LIENS UTILES */}
      <section id="liens" className={styles.section}>
        <h2 className={styles.bigHead} data-mask><MaskWords text={ui.headLinks} /></h2>
        <div className={styles.linksGrid} data-stagger>
          {usefulLinks.map((l, i) => (
            <a className={styles.linkCard} key={i} href={l.href} target={l.target} rel={l.target ? "noopener noreferrer" : undefined}>
              <img src={l.icon} alt="" />
              <span>{tx(l.label, lang)}</span>
              <b className={styles.linkArrow}>→</b>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
