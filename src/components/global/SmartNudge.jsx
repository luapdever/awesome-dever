import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLandingLang } from "../../context/landingLang";
import styles from "../../../styles/specific/smartNudge.module.css";

/* ============================================================
   SmartNudge — guidage proactif 100 % CÔTÉ CLIENT (0 requête,
   0 token). On observe le parcours (temps ACTIF, scroll, clics,
   inactivité, pages vues), persisté en sessionStorage pour
   SURVIVRE AUX RECHARGEMENTS. Si l'utilisateur semble perdu après
   ~22 s de temps actif, on propose une page/parcours pertinent
   via un arbre de décision déterministe. Une seule fois/session.
   ============================================================ */

const KEY = "journey_v1"; // sessionStorage : le parcours (survit au reload)
const SHOWN = "nudge_shown_v1"; // sessionStorage : déjà proposé cette session
const OPTOUT = "nudge_optout_v1"; // localStorage : « ne plus proposer »
const THRESHOLD_MS = 22000; // temps ACTIF avant de pouvoir proposer
const IDLE_MS = 11000; // inactivité récente = signal « perdu »
const HARD_CAP_MS = 90000; // au-delà, on ne propose plus (il sait ce qu'il fait)

// Les « expériences » proposables (liens internes uniquement).
const EXP = {
  os: { fr: "Explorer PaulBrain OS", en: "Explore PaulBrain OS", href: "/paulfolio" },
  book: { fr: "Lire le livre", en: "Read the book", href: "/book" },
  cv: { fr: "Voir mon CV", en: "See my résumé", href: "/cv" },
  blog: { fr: "Lire le blog", en: "Read the blog", href: "/blog" },
  about: { fr: "Qui je suis", en: "About me", href: "/about-me" },
};

const UI = {
  fr: {
    default: "Tu explores depuis un moment — je te montre par où continuer ?",
    lost: "Tu cherches quelque chose de précis ? Voici des pistes 👇",
    dismiss: "Non merci",
    optout: "Ne plus proposer",
  },
  en: {
    default: "You've been exploring a while — want a shortcut?",
    lost: "Looking for something specific? Here are a few paths 👇",
    dismiss: "No thanks",
    optout: "Don't show again",
  },
};

// ---- Arbre de décision (déterministe, sans IA) ----
function decide(state, L) {
  const seen = new Set(state.visited);
  // Préférence de suggestions selon la page COURANTE.
  let pref;
  const p = state.path;
  if (p === "/") pref = ["os", "book", "cv"];
  else if (p.startsWith("/blog")) pref = ["book", "cv", "os"];
  else if (p === "/book") pref = ["os", "cv", "blog"];
  else if (p === "/cv") pref = ["book", "about", "os"];
  else if (p === "/about-me") pref = ["cv", "os", "book"];
  else pref = ["os", "book", "cv"];

  const isPingPong = state.visited.length >= 5;
  // On priorise les expériences PAS ENCORE VUES, puis on complète.
  const unseen = pref.filter((k) => !seen.has(EXP[k].href));
  const rest = pref.filter((k) => seen.has(EXP[k].href));
  const ordered = [...unseen, ...rest].slice(0, 3);

  return {
    message: isPingPong ? UI[L].lost : UI[L].default,
    suggestions: ordered.map((k) => ({ key: k, label: EXP[k][L], href: EXP[k].href })),
  };
}

function readJourney() {
  try { return JSON.parse(sessionStorage.getItem(KEY)); } catch { return null; }
}
function writeJourney(j) {
  try { sessionStorage.setItem(KEY, JSON.stringify(j)); } catch {}
}
const now = () => Date.now();
const ga = (name, params) => {
  try { if (typeof window.gtag === "function") window.gtag("event", name, params); } catch {}
};

export default function SmartNudge() {
  const router = useRouter();
  const { lang } = useLandingLang();
  const L = lang === "en" ? "en" : "fr";
  const j = useRef(null);
  const [nudge, setNudge] = useState(null); // { message, suggestions }

  // Init / restauration (survit au rechargement via sessionStorage).
  useEffect(() => {
    const path = router.asPath.split("?")[0];
    const restored = readJourney();
    j.current = restored || { activeMs: 0, clicks: 0, scrollPct: 0, visited: [], path, lastActivity: now() };
    if (j.current.visited[j.current.visited.length - 1] !== path) j.current.visited.push(path);
    j.current.path = path;
    j.current.scrollPct = 0;
    j.current.lastActivity = now();
    writeJourney(j.current);

    const bump = () => { j.current.lastActivity = now(); };
    const onClick = () => { j.current.clicks += 1; bump(); };
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      j.current.scrollPct = h > 0 ? Math.min(1, window.scrollY / h) : 1;
      bump();
    };
    window.addEventListener("pointerdown", onClick, { passive: true });
    window.addEventListener("keydown", onClick, { passive: true });
    window.addEventListener("mousemove", bump, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    // Nouvelle page (navigation client) → on l'ajoute au parcours.
    const onRoute = (url) => {
      const np = url.split("?")[0];
      j.current.visited.push(np);
      j.current.path = np;
      j.current.scrollPct = 0;
      j.current.lastActivity = now();
      writeJourney(j.current);
    };
    router.events.on("routeChangeComplete", onRoute);

    // Le cœur : on n'incrémente le temps que si l'onglet est VISIBLE.
    let saveTick = 0;
    const iv = setInterval(() => {
      if (document.visibilityState !== "visible") return;
      j.current.activeMs += 1000;
      if (++saveTick % 3 === 0) writeJourney(j.current);
      maybeTrigger();
    }, 1000);

    const persist = () => writeJourney(j.current);
    window.addEventListener("beforeunload", persist);
    document.addEventListener("visibilitychange", persist);

    function overlayOpen() {
      // Ne pas gêner un modal ouvert (ExperienceModal, PremiumModal…).
      // On cible la classe réelle de l'overlay (contrôlé par GSAP autoAlpha),
      // pas un texte — sinon le lien « Changer d'expérience » du footer
      // provoquait un faux positif qui bloquait le nudge partout.
      const el = document.querySelector('[class*="modalOverlay"]');
      if (!el) return false;
      const cs = getComputedStyle(el);
      return cs.visibility !== "hidden" && cs.display !== "none" && parseFloat(cs.opacity || "1") > 0.1;
    }

    function maybeTrigger() {
      const s = j.current;
      if (!s) return;
      // ---- GARDE-FOUS ----
      if (nudge) return; // déjà affiché
      try { if (sessionStorage.getItem(SHOWN) === "1") return; } catch {}
      try { if (localStorage.getItem(OPTOUT) === "1") return; } catch {}
      if (s.path === "/paulfolio") return; // l'OS est déjà un parcours guidé
      if (s.activeMs < THRESHOLD_MS || s.activeMs > HARD_CAP_MS) return;
      if (overlayOpen()) return;

      // ---- SIGNAUX « PERDU » (conservateur) ----
      const idle = now() - s.lastActivity;
      const pingPong = s.visited.length >= 5;
      const lost = (idle >= IDLE_MS && (s.scrollPct < 0.25 || s.clicks === 0)) || pingPong;
      if (!lost) return;

      const decision = decide(s, L);
      if (!decision.suggestions.length) return;
      try { sessionStorage.setItem(SHOWN, "1"); } catch {}
      ga("nudge_shown", { page_path: s.path, journey_ms: s.activeMs, ping_pong: pingPong });
      setNudge(decision);
    }

    return () => {
      clearInterval(iv);
      window.removeEventListener("pointerdown", onClick);
      window.removeEventListener("keydown", onClick);
      window.removeEventListener("mousemove", bump);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("beforeunload", persist);
      document.removeEventListener("visibilitychange", persist);
      router.events.off("routeChangeComplete", onRoute);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nudge, L]);

  if (!nudge) return null;

  const close = (reason, target) => {
    ga("nudge_" + reason, { target: target || null });
    setNudge(null);
  };

  return (
    <div className={styles.nudge} role="dialog" aria-live="polite" aria-label={nudge.message}>
      <button className={styles.close} onClick={() => close("dismissed")} aria-label={UI[L].dismiss}>✕</button>
      <p className={styles.msg}>{nudge.message}</p>
      <div className={styles.actions}>
        {nudge.suggestions.map((s) => (
          <Link key={s.key} href={s.href} className={styles.pick} onClick={() => close("clicked", s.key)}>
            {s.label} <span>→</span>
          </Link>
        ))}
      </div>
      <button
        className={styles.optout}
        onClick={() => { try { localStorage.setItem(OPTOUT, "1"); } catch {} close("optout"); }}
      >
        {UI[L].optout}
      </button>
    </div>
  );
}
