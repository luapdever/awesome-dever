import { useEffect, useMemo, useRef, useState } from "react";
import { useLandingLang } from "../../context/landingLang";
import styles from "../../../styles/specific/blog/articleReader.module.css";

/* ============================================================
   ArticleReader — mode écoute enrichi (Web Speech API).
   • lit l'article à voix haute (SpeechSynthesis)
   • SURBRILLE la phrase + le mot en cours (via onboundary)
   • AUTO-SCROLL pour suivre la lecture
   • TIMELINE cliquable (seek), précédent / suivant (phrase)
   • VITESSE de lecture (0.75× → 2×)
   Le rendu du corps appartient à ce composant (mots/phrases
   adressables) ; les surbrillances sont imperatives (0 re-render
   par mot → performant).
   ============================================================ */

const T = {
  fr: { listen: "Écouter l'article", play: "Lecture", pause: "Pause", prev: "Phrase précédente", next: "Phrase suivante", stop: "Arrêter", speed: "Vitesse" },
  en: { listen: "Listen to the article", play: "Play", pause: "Pause", prev: "Previous sentence", next: "Next sentence", stop: "Stop", speed: "Speed" },
};
const RATES = [0.75, 1, 1.25, 1.5, 2];
const ga = (action, extra) => { try { if (typeof window.gtag === "function") window.gtag("event", "read_aloud", { action, ...extra }); } catch {} };

// plus grand index i tel que arr[i] <= val
function lastIndexLE(arr, val) {
  let lo = 0, hi = arr.length - 1, res = 0;
  while (lo <= hi) { const mid = (lo + hi) >> 1; if (arr[mid] <= val) { res = mid; lo = mid + 1; } else hi = mid - 1; }
  return res;
}

export default function ArticleReader({ paragraphs, lang }) {
  const L = lang === "en" ? "en" : "fr";
  const t = T[L];
  const containerRef = useRef(null);
  const prevWord = useRef(null);
  const prevSent = useRef(null);
  const statusRef = useRef("idle");
  const currentRef = useRef(-1);
  const rateRef = useRef(1);
  const genRef = useRef(0); // jeton : invalide les callbacks des utterances annulées

  const [supported, setSupported] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | playing | paused
  const [current, setCurrent] = useState(-1);
  const [rate, setRate] = useState(1);

  // Découpe en phrases → mots (avec offsets de caractères pour onboundary).
  const model = useMemo(() => {
    let si = 0;
    const paras = paragraphs.map((para) => {
      const sentTexts = para.match(/[^.!?…]+[.!?…]*(\s+|$)/g) || [para];
      return sentTexts.filter((s) => s.trim()).map((sentText) => {
        const words = sentText.match(/\S+\s*/g) || [sentText];
        let off = 0;
        const wordOffsets = words.map((w) => { const o = off; off += w.length; return o; });
        const s = { index: si, text: sentText, words, wordOffsets };
        si += 1;
        return s;
      });
    });
    return { paras, flat: paras.flat() };
  }, [paragraphs]);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window);
    return () => { try { window.speechSynthesis.cancel(); } catch {} };
  }, []);

  // Anti-coupure Chrome (~15 s).
  useEffect(() => {
    if (status !== "playing") return;
    const id = setInterval(() => { try { const s = window.speechSynthesis; if (s.speaking && !s.paused) { s.pause(); s.resume(); } } catch {} }, 9000);
    return () => clearInterval(id);
  }, [status]);

  const clearWord = () => { if (prevWord.current) { prevWord.current.classList.remove(styles.activeWord); prevWord.current = null; } };
  const highlightWord = (si, wi) => {
    clearWord();
    const el = containerRef.current && containerRef.current.querySelector(`[data-si="${si}"][data-wi="${wi}"]`);
    if (el) { el.classList.add(styles.activeWord); prevWord.current = el; }
  };
  const highlightSentence = (si) => {
    if (prevSent.current) prevSent.current.classList.remove(styles.reading);
    clearWord();
    if (si < 0) { prevSent.current = null; return; }
    const el = containerRef.current && containerRef.current.querySelector(`[data-si="${si}"]:not([data-wi])`);
    if (el) {
      el.classList.add(styles.reading);
      prevSent.current = el;
      const r = el.getBoundingClientRect();
      if (r.top < 96 || r.bottom > window.innerHeight - 150) el.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  };

  const setSt = (s) => { statusRef.current = s; setStatus(s); };
  const setCur = (i) => { currentRef.current = i; setCurrent(i); };

  const speakFrom = (si) => {
    const synth = window.speechSynthesis;
    // Nouvelle génération : invalide les callbacks (onend/onboundary/onerror) de
    // l'utterance qu'on s'apprête à annuler. Sinon le onend de la phrase annulée
    // se déclenche (cancel est asynchrone) et relance speakFrom(currentRef+1),
    // ce qui écrase la cible du seek / précédent / suivant / vitesse.
    const gen = ++genRef.current;
    synth.cancel();
    if (si < 0 || si >= model.flat.length) { finish(); return; }
    setCur(si);
    highlightSentence(si);
    const sent = model.flat[si];
    const u = new window.SpeechSynthesisUtterance(sent.text);
    u.lang = L === "en" ? "en-US" : "fr-FR";
    u.rate = rateRef.current;
    u.onboundary = (e) => { if (gen !== genRef.current) return; const wi = lastIndexLE(sent.wordOffsets, e.charIndex || 0); highlightWord(si, wi); };
    u.onend = () => { if (gen === genRef.current && statusRef.current === "playing") speakFrom(currentRef.current + 1); };
    u.onerror = () => { if (gen === genRef.current && statusRef.current === "playing") speakFrom(currentRef.current + 1); };
    setSt("playing");
    // Chrome ignore parfois un speak() appelé juste après cancel() : on diffère
    // d'un tick. La garde de génération n'émet que la dernière demande.
    setTimeout(() => { if (gen === genRef.current) { try { synth.speak(u); } catch {} } }, 0);
  };

  const finish = () => { genRef.current++; try { window.speechSynthesis.cancel(); } catch {} setSt("idle"); setCur(-1); highlightSentence(-1); };

  const start = () => { speakFrom(0); ga("start"); };
  const toggle = () => {
    const synth = window.speechSynthesis;
    if (statusRef.current === "playing") { synth.pause(); setSt("paused"); ga("pause"); }
    else if (statusRef.current === "paused") { synth.resume(); setSt("playing"); ga("resume"); }
    else start();
  };
  const prev = () => speakFrom(Math.max(0, currentRef.current - 1));
  const next = () => speakFrom(Math.min(model.flat.length - 1, currentRef.current + 1));
  const cycleRate = () => {
    const nextRate = RATES[(RATES.indexOf(rate) + 1) % RATES.length];
    setRate(nextRate); rateRef.current = nextRate;
    ga("speed", { rate: nextRate });
    if (statusRef.current === "playing") speakFrom(currentRef.current);
  };
  const seek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const frac = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    speakFrom(Math.min(model.flat.length - 1, Math.floor(frac * model.flat.length)));
    ga("seek");
  };
  // Cliquer une phrase → lire à partir de là (sauf si sélection de texte).
  const onBodyClick = (e) => {
    const sel = window.getSelection && window.getSelection();
    if (sel && !sel.isCollapsed) return;
    const span = e.target.closest("[data-si]");
    if (!span) return;
    speakFrom(parseInt(span.getAttribute("data-si"), 10));
  };

  const pct = model.flat.length ? ((current + 1) / model.flat.length) * 100 : 0;

  return (
    <>
      {supported && status === "idle" && (
        <div className={styles.trigger}>
          <button type="button" className={styles.listenBtn} onClick={start}>
            <img src="/icons/ph/headphones__ffffff.svg" alt="" width={18} height={18} />
            <span>{t.listen}</span>
          </button>
        </div>
      )}

      <div className={styles.body} ref={containerRef} onClick={supported ? onBodyClick : undefined}>
        {model.paras.map((sents, pi) => (
          <p key={pi}>
            {sents.map((s) => (
              <span key={s.index} data-si={s.index} className={styles.sentence}>
                {s.words.map((w, wi) => (
                  <span key={wi} data-si={s.index} data-wi={wi} className={styles.word}>{w}</span>
                ))}
              </span>
            ))}
          </p>
        ))}
      </div>

      {supported && status !== "idle" && (
        <div className={styles.bar} role="group" aria-label={t.listen}>
          <button type="button" className={styles.ctrl} onClick={prev} title={t.prev} aria-label={t.prev}>
            <img src="/icons/ph/skip-back__ffffff.svg" alt="" width={17} height={17} />
          </button>
          <button type="button" className={`${styles.ctrl} ${styles.playBtn}`} onClick={toggle} title={status === "playing" ? t.pause : t.play} aria-label={status === "playing" ? t.pause : t.play}>
            <img src={status === "playing" ? "/icons/ph/pause__ffffff.svg" : "/icons/ph/play__ffffff.svg"} alt="" width={17} height={17} />
          </button>
          <button type="button" className={styles.ctrl} onClick={next} title={t.next} aria-label={t.next}>
            <img src="/icons/ph/skip-forward__ffffff.svg" alt="" width={17} height={17} />
          </button>

          <div className={styles.timeline} onClick={seek} role="slider" aria-label={t.listen} aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
            <div className={styles.progress} style={{ width: `${pct}%` }} />
          </div>
          <span className={styles.count}>{Math.max(0, current + 1)}/{model.flat.length}</span>

          <button type="button" className={styles.rate} onClick={cycleRate} title={t.speed}>{rate}×</button>
          <button type="button" className={styles.ctrl} onClick={finish} title={t.stop} aria-label={t.stop}>
            <img src="/icons/ph/x__ffffff.svg" alt="" width={15} height={15} />
          </button>
        </div>
      )}
    </>
  );
}
