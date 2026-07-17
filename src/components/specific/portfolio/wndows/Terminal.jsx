import React, { useEffect, useRef } from "react";
import styles from "../../../../../styles/specific/portfolio/windows/terminal.module.css";
import { useConsole } from "../../../../hooks/useConsole";
import { useLang } from "../lang";

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
              <span style={l.waiting ? { opacity: 0.6 } : undefined}>{l.text}</span>
              {!l.done && <span className={styles.caret}>▋</span>}
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
