import React, { useEffect, useRef } from "react";
import styles from "../../../../../styles/specific/portfolio/windows/terminal.module.css";
import { useConsole } from "../../../../hooks/useConsole";
import { useLang } from "../lang";
import { linkTokens } from "../../../../lib/botActions";

function Terminal() {
  const { lang } = useLang();
  const { lines, exec, recall, complete, suggest, prompt, basePrompt, busy } = useConsole(lang);
  const scrollRef = useRef();
  const inputRef = useRef();
  const wizard = prompt !== basePrompt; // étape interactive en cours (ask)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    if (inputRef.current) inputRef.current.focus();
  }, [lines]);

  const onSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements.shInp;
    exec(input.value);
    input.value = "";
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowUp") { e.preventDefault(); recall(-1, e.target); }
    else if (e.key === "ArrowDown") { e.preventDefault(); recall(1, e.target); }
    else if (e.key === "Tab") {
      e.preventDefault();
      if (wizard || busy) return; // pas d'autocomplétion pendant l'assistant `ask`
      const { value, candidates } = complete(e.target.value);
      e.target.value = value;
      requestAnimationFrame(() => { e.target.selectionStart = e.target.selectionEnd = value.length; });
      suggest(candidates);
    }
  };

  return (
    <div className={styles.terminal} ref={scrollRef} onClick={() => inputRef.current?.focus()}>
      {lines.map((l, i) => {
        if (l.type === "cmd") {
          return (
            <div key={i} className={styles.cmdLine}>
              <span className={styles.prompt}>{l.prompt || prompt}</span> {l.text}
            </div>
          );
        }
        if (l.type === "stream") {
          return (
            <div key={i} className={styles.out}>
              <b className="or">{l.label} › </b>
              <span style={l.waiting ? { opacity: 0.6 } : undefined}>
                {/* Liens cliquables : le widget le faisait déjà via linkTokens,
                    le terminal affichait les URL en texte mort. */}
                {linkTokens(l.text || "").map((tok, k) =>
                  tok.t === "link" ? (
                    <a
                      key={k}
                      href={tok.href}
                      target={tok.external ? "_blank" : undefined}
                      rel={tok.external ? "noopener noreferrer" : undefined}
                      className={styles.link}
                    >
                      {tok.v}
                    </a>
                  ) : (
                    <span key={k}>{tok.v}</span>
                  )
                )}
              </span>
              {!l.done && <span className={styles.caret}>▋</span>}

              {/* Relances : rendues en choix NUMÉROTÉS — la forme native d'un
                  shell, là où le widget affiche des boutons. Taper « 2 » relance
                  la deuxième question. */}
              {l.done && l.suggestions?.length > 0 && (
                <div className={styles.hints}>
                  {l.suggestions.map((q, k) => (
                    <div key={k}>
                      <span className={styles.hintNum}>{k + 1})</span> {q}
                    </div>
                  ))}
                  <div className={styles.hintTip}>↳ tape un chiffre pour enchaîner</div>
                </div>
              )}

              {/* Navigation : rendue en COMMANDE à taper, pas en bouton. */}
              {l.done && l.actions?.length > 0 && (
                <div className={styles.hints}>
                  {l.actions.map((a, k) => (
                    <div key={k}>
                      <span className={styles.hintNum}>$</span> open {String(a).split(":")[0]}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        }
        return <div key={i} className={styles.out}>{l.node}</div>;
      })}
      <form className={styles.shellInput} onSubmit={onSubmit}>
        <span className={styles.prompt}>{prompt}</span>
        <input
          ref={inputRef}
          type="text"
          name="shInp"
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          onKeyDown={onKeyDown}
        />
      </form>
    </div>
  );
}

export default Terminal;
