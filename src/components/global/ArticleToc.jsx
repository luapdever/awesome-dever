import { useEffect, useState } from "react";
import styles from "../../../styles/global/articletoc.module.css";

/* Sommaire ancré, à droite de la colonne de lecture.

   Le rail est en `fixed` calé sur le bord droit de la colonne : la colonne
   garde sa largeur de lecture et sa position centrée, aucun recalcul de
   layout. Masqué sous 1280 px, où il n'y a plus de place pour lui. */

export default function ArticleToc({ items, label }) {
  const [active, setActive] = useState(items[0]?.id || null);
  const [open, setOpen] = useState(false);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    if (!items.length) return;
    const targets = items.map((i) => document.getElementById(i.id)).filter(Boolean);
    if (!targets.length) return;

    /* Le rail est en `fixed` : sans cela il reste affiché par-dessus le pied de
       page une fois l'article terminé. On l'efface dès que la fin de l'article
       entre dans le champ — il n'a plus rien à indiquer à ce moment-là. */
    const tail = document.querySelector("footer") || targets[targets.length - 1]?.closest("article");

    /* On ne peut pas se contenter du premier titre « visible » : plusieurs le
       sont à la fois. On retient le dernier dont le haut est passé sous la
       barre de navigation — c'est la section qu'on lit réellement. */
    const onScroll = () => {
      let current = targets[0];
      for (const t of targets) {
        if (t.getBoundingClientRect().top <= 140) current = t;
      }
      setActive(current.id);
      if (tail) setAtEnd(tail.getBoundingClientRect().top < window.innerHeight - 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  if (items.length < 2) return null; // un sommaire d'une ligne ne sert à rien

  const activeIndex = Math.max(0, items.findIndex((i) => i.id === active));
  const links = items.map((i, n) => (
    <li key={i.id}>
      <a
        href={`#${i.id}`}
        onClick={() => setOpen(false)}
        className={active === i.id ? styles.active : undefined}
        aria-current={active === i.id ? "true" : undefined}
      >
        <span className={styles.num}>{String(n + 1).padStart(2, "0")}</span>
        <span className={styles.label}>{i.text}</span>
      </a>
    </li>
  ));

  return (
    <>
      <nav className={`${styles.toc} ${atEnd ? styles.gone : ""}`} aria-label={label} aria-hidden={atEnd || undefined}>
        <p className={styles.title}>{label}</p>
        <ol>{links}</ol>
      </nav>

      {/* Mobile : le rail n'a pas la place, mais sauter de section reste utile
          sur un article long. Barre collante repliée, dépliable d'un geste. */}
      <nav className={styles.mobile} aria-label={label}>
        <button
          type="button"
          className={styles.mobileBtn}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <span className={styles.mobileNum}>{String(activeIndex + 1).padStart(2, "0")}<i>/{items.length}</i></span>
          <span className={styles.mobileLabel}>{items[activeIndex]?.text}</span>
          <span className={`${styles.chevron} ${open ? styles.chevronUp : ""}`} aria-hidden="true">⌄</span>
        </button>
        {open && <ol className={styles.mobileList}>{links}</ol>}
      </nav>
    </>
  );
}
