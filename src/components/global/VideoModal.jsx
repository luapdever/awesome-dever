import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "../../../styles/global/videomodal.module.css";

/* Vignette + lecteur en modale.

   La vidéo n'existe dans le DOM QUE modale ouverte : tant qu'on ne clique pas,
   aucun octet du fichier n'est demandé — c'est le seul moyen d'avoir un média
   lourd sur une page sans le faire payer à ceux qui ne le regarderont pas. */

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
);

/** "PT7S" → "0:07". Renvoie null si la durée est absente ou non reconnue. */
function humanDuration(iso) {
  const m = /^PT(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso || "");
  if (!m) return null;
  const total = Number(m[1] || 0) * 60 + Number(m[2] || 0);
  if (!total) return null;
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

export default function VideoModal({ src, poster, alt, duration, caption }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus(); // on rend le focus au bouton, pas au <body>
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    // Verrou de défilement : sans lui, la page glisse derrière la modale.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Le clic d'ouverture vaut geste utilisateur : la lecture avec son est permise.
    videoRef.current?.play().catch(() => {});
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  const label = humanDuration(duration);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.thumb}
        onClick={() => setOpen(true)}
        aria-label={`Lire la vidéo : ${alt}`}
      >
        <img src={poster} alt={alt} loading="eager" />
        <span className={styles.play}><PlayIcon /></span>
        {label && <span className={styles.badge}>▶ {label}</span>}
      </button>
      {caption && <p className={styles.caption}>{caption}</p>}

      {mounted && open && createPortal(
        <div
          className={styles.overlay}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <div className={styles.player} onClick={(e) => e.stopPropagation()}>
            <video ref={videoRef} src={src} poster={poster} controls playsInline autoFocus />
            <button type="button" className={styles.close} onClick={close} aria-label="Fermer la vidéo">×</button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
