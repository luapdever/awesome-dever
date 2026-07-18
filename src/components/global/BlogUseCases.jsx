import { useRef, useState } from "react";
import styles from "../../../styles/specific/blog/blogUseCases.module.css";

/* ============================================================
   BlogUseCases — cas d'usage interactifs pour un article.
   • prompt COPIABLE et ÉDITABLE (on ajuste avant de copier)
   • timeline des questions → réponses
   • tout est déplié par défaut (<details open>)
   Rendu uniquement si l'article expose un champ `useCases`.
   ============================================================ */

const T = {
  fr: { heading: "Cas d'usage — essaie les prompts", copy: "Copier le prompt", copied: "Copié ✅", copyQ: "Copier", edit: "Éditable — ajuste puis copie", you: "Toi", bot: "PaulBot" },
  en: { heading: "Use cases — try the prompts", copy: "Copy prompt", copied: "Copied ✅", copyQ: "Copy", edit: "Editable — tweak then copy", you: "You", bot: "PaulBot" },
};

function copyText(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text);
  } catch {}
  return Promise.reject();
}

// Bouton de copie compact (relance/question) — feedback « Copié ».
function CopyBtn({ text, label, copiedLabel, className }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      className={className}
      onClick={() => copyText(text).then(() => { setOk(true); setTimeout(() => setOk(false), 1600); }, () => {})}
    >
      {ok ? copiedLabel : label}
    </button>
  );
}

// Prompt éditable + copie de la valeur COURANTE (donc des ajustements).
function EditablePrompt({ value, t }) {
  const ref = useRef(null);
  const [ok, setOk] = useState(false);
  const rows = Math.min(16, Math.max(3, (value.match(/\n/g) || []).length + 1));
  const copy = () => {
    const text = ref.current ? ref.current.value : value;
    copyText(text).then(() => { setOk(true); setTimeout(() => setOk(false), 1800); }, () => { ref.current && ref.current.select(); });
  };
  return (
    <div className={styles.promptBox}>
      <textarea ref={ref} className={styles.promptArea} defaultValue={value} spellCheck={false} rows={rows} aria-label={t.copy} />
      <div className={styles.promptFoot}>
        <span className={styles.editHint}>{t.edit}</span>
        <button type="button" className={styles.copyBtn} onClick={copy}>{ok ? t.copied : t.copy}</button>
      </div>
    </div>
  );
}

export default function BlogUseCases({ useCases, lang }) {
  const L = lang === "en" ? "en" : "fr";
  const t = T[L];
  const tr = (v) => (v && typeof v === "object" && v.fr !== undefined ? (L === "en" ? v.en : v.fr) : v);
  if (!useCases || !useCases.length) return null;

  return (
    <section className={styles.wrap}>
      <h2 className={styles.heading}>{t.heading}</h2>
      {useCases.map((uc, i) => (
        <details key={i} className={styles.case} open>
          <summary className={styles.caseTitle}>{tr(uc.title)}</summary>

          {uc.prompt ? <EditablePrompt value={tr(uc.prompt)} t={t} /> : null}

          {uc.steps && uc.steps.length > 0 && (
            <ol className={styles.timeline}>
              {uc.steps.map((s, k) => {
                const q = tr(s.q);
                return (
                  <li key={k} className={styles.step}>
                    <div className={styles.q}>
                      <span className={styles.qText}><span className={styles.who}>{t.you}</span>{q}</span>
                      <CopyBtn text={q} label={t.copyQ} copiedLabel={t.copied} className={styles.qCopy} />
                    </div>
                    <div className={styles.a}><span className={styles.who}>{t.bot}</span>{tr(s.a)}</div>
                  </li>
                );
              })}
            </ol>
          )}
        </details>
      ))}
    </section>
  );
}
