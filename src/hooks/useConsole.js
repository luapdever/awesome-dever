import React, { useRef, useState } from "react";
import { buildCommands, OPENABLE } from "../rawDatas/terminalCommands";

const PROMPT = "paul@paulbrain:~$";

// Longest common prefix of a list of strings.
const lcp = (arr) => {
  if (!arr.length) return "";
  let p = arr[0];
  for (const s of arr) while (!s.startsWith(p)) p = p.slice(0, -1);
  return p;
};

const intro = {
  type: "out",
  node: (
    <p>
      Hello, this is <b className="or">Dever Shell</b>. Type <b className="or">help</b> for the
      manual — or try <b>neofetch</b>, <b>skills -v</b>, <b>projects --all</b>, <b>open cv</b>.
    </p>
  ),
};

export const useConsole = () => {
  const commands = useRef(null);
  if (!commands.current) commands.current = buildCommands();

  const [lines, setLines] = useState([intro]);
  const history = useRef([]);
  const idx = useRef(0);

  const exec = (raw) => {
    const value = (raw || "").trim();
    if (!value) return;

    history.current.push(value);
    idx.current = history.current.length;

    if (value === "clear" || value === "cls") {
      setLines([]);
      return;
    }

    const tokens = value.split(/\s+/);
    const name = tokens[0].toLowerCase();
    const rest = tokens.slice(1);
    const flags = rest.filter((t) => t.startsWith("-"));
    const args = rest.filter((t) => !t.startsWith("-"));
    const cmd = commands.current[name];

    let output;
    if (cmd) {
      try {
        output = cmd.run({ args, flags, has: (f) => flags.includes(f), raw: value });
      } catch (err) {
        output = <p>{">>>"} error running <b>{name}</b>.</p>;
      }
    } else {
      output = (
        <p>
          {">>> "}command not found: <b>{name}</b> — type <b className="or">help</b> to see
          available commands.
        </p>
      );
    }

    setLines((prev) => [...prev, { type: "cmd", text: value }, { type: "out", node: output }]);
  };

  // ---- Tab autocompletion (shell-like) ----
  const commandNames = () =>
    [...new Set(Object.keys(commands.current)), "clear", "cls"].filter((n) => /^[a-z]/.test(n)).sort();
  const argPool = (cmd) => {
    if (cmd === "open") return OPENABLE;
    if (cmd === "lang") return ["fr", "en"];
    if (cmd === "help" || cmd === "man") return commandNames();
    return null;
  };

  // Returns { value, candidates }: value = the (possibly) completed input;
  // candidates = matches to display when the completion is ambiguous.
  const complete = (raw) => {
    const value = raw || "";
    const trailingSpace = /\s$/.test(value);
    const tokens = value.split(/\s+/).filter(Boolean);

    // Completing the command name (first word).
    if (tokens.length <= 1 && !trailingSpace) {
      const partial = (tokens[0] || "").toLowerCase();
      const matches = commandNames().filter((n) => n.startsWith(partial));
      if (matches.length === 0) return { value, candidates: [] };
      if (matches.length === 1) return { value: matches[0] + " ", candidates: [] };
      const prefix = lcp(matches);
      return { value: prefix.length > partial.length ? prefix : value, candidates: matches };
    }

    // Completing an argument for commands that take one.
    const pool = argPool(tokens[0].toLowerCase());
    if (!pool) return { value, candidates: [] };
    const partial = trailingSpace ? "" : (tokens[tokens.length - 1] || "").toLowerCase();
    const base = tokens.slice(0, trailingSpace ? tokens.length : tokens.length - 1).join(" ");
    const matches = pool.filter((a) => a.toLowerCase().startsWith(partial));
    if (matches.length === 0) return { value, candidates: [] };
    if (matches.length === 1) return { value: `${base} ${matches[0]} `, candidates: [] };
    const prefix = lcp(matches);
    return { value: prefix.length > partial.length ? `${base} ${prefix}` : value, candidates: matches };
  };

  // Print candidate completions below the prompt (like a shell after double-Tab).
  const suggest = (candidates) => {
    if (!candidates || candidates.length < 2) return;
    setLines((prev) => [
      ...prev,
      { type: "out", node: <p style={{ color: "rgba(255,255,255,0.55)", margin: "2px 0 6px" }}>{candidates.join("   ")}</p> },
    ]);
  };

  // ArrowUp / ArrowDown history recall.
  const recall = (dir, input) => {
    const items = history.current;
    if (!items.length) return;
    if (dir === -1) idx.current = idx.current <= 0 ? 0 : idx.current - 1;
    else idx.current = idx.current >= items.length ? items.length : idx.current + 1;
    input.value = items[idx.current] ?? "";
    requestAnimationFrame(() => {
      input.selectionStart = input.selectionEnd = input.value.length;
    });
  };

  return { lines, exec, recall, complete, suggest, prompt: PROMPT };
};
