import React, { useEffect, useRef } from "react";
import styles from "../../../../../styles/specific/portfolio/windows/terminal.module.css";
import { useConsole } from "../../../../hooks/useConsole";

function Terminal() {
  const { lines, exec, recall, complete, suggest, prompt } = useConsole();
  const scrollRef = useRef();
  const inputRef = useRef();

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
      const { value, candidates } = complete(e.target.value);
      e.target.value = value;
      requestAnimationFrame(() => { e.target.selectionStart = e.target.selectionEnd = value.length; });
      suggest(candidates);
    }
  };

  return (
    <div className={styles.terminal} ref={scrollRef} onClick={() => inputRef.current?.focus()}>
      {lines.map((l, i) =>
        l.type === "cmd" ? (
          <div key={i} className={styles.cmdLine}>
            <span className={styles.prompt}>{prompt}</span> {l.text}
          </div>
        ) : (
          <div key={i} className={styles.out}>{l.node}</div>
        )
      )}
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
