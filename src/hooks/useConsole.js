import React, { useRef, useState } from "react";
import { buildCommands } from "../rawDatas/terminalCommands";

const PROMPT = "paul@paulbrain:~$";

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

  return { lines, exec, recall, prompt: PROMPT };
};
