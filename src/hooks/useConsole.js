import React, { useRef, useState } from "react";
import { buildCommands, OPENABLE } from "../rawDatas/terminalCommands";
import { askBotStream, getContact, setContact, clearContact } from "../lib/botStream";

const PROMPT = "paul@paulbrain:~$";

// Longest common prefix of a list of strings.
const lcp = (arr) => {
  if (!arr.length) return "";
  let p = arr[0];
  for (const s of arr) while (!s.startsWith(p)) p = p.slice(0, -1);
  return p;
};

// Textes bilingues du mini-assistant `ask` (terminal-friendly).
const T = {
  fr: {
    needId: "Avant de discuter avec PaulBot, présente-toi 👇",
    nick: "pseudo ›",
    modeHint: "Comment Paul peut-il te recontacter ? — tape : email · phone · incognito",
    mode: "recontact (email/phone/incognito) ›",
    email: "ton@email.com ›",
    phone: "téléphone (format international, ex. +229…) ›",
    ques: "ta question à PaulBot ›",
    badNick: ">>> indique un pseudo.",
    badMode: ">>> choix invalide — tape email, phone ou incognito.",
    badEmail: ">>> email invalide.",
    badPhone: ">>> numéro invalide (format international, ex. +22990000000).",
    incognito: "Mode anonyme — seul ton pseudo est conservé.",
    ready: (n) => `Bien, ${n} ! Pose ta question : ask <ta question> (ou juste « ask »).`,
    thinking: "PaulBot réfléchit…",
    label: "PaulBot",
    error: "PaulBot est momentanément indisponible. Réessaie, ou écris à pzannou511@gmail.com.",
    reset: "Identité oubliée. Relance « ask » pour te présenter à nouveau.",
    who: (c) =>
      `Tu es connu·e comme « ${c.name} » (${c.mode}${c.value ? " · " + c.value : ""}). « ask reset » pour changer.`,
    noId: "Aucune identité enregistrée. Lance « ask » pour te présenter.",
  },
  en: {
    needId: "Before chatting with PaulBot, introduce yourself 👇",
    nick: "nickname ›",
    modeHint: "How can Paul reach you back? — type: email · phone · incognito",
    mode: "reach-back (email/phone/incognito) ›",
    email: "you@email.com ›",
    phone: "phone (international format, e.g. +229…) ›",
    ques: "your question for PaulBot ›",
    badNick: ">>> please enter a nickname.",
    badMode: ">>> invalid choice — type email, phone or incognito.",
    badEmail: ">>> invalid email.",
    badPhone: ">>> invalid number (international format, e.g. +22990000000).",
    incognito: "Anonymous mode — only your nickname is kept.",
    ready: (n) => `Alright, ${n}! Ask away: ask <your question> (or just “ask”).`,
    thinking: "PaulBot is thinking…",
    label: "PaulBot",
    error: "PaulBot is momentarily unavailable. Try again, or email pzannou511@gmail.com.",
    reset: "Identity cleared. Run “ask” to introduce yourself again.",
    who: (c) =>
      `You're known as “${c.name}” (${c.mode}${c.value ? " · " + c.value : ""}). Use “ask reset” to change.`,
    noId: "No identity saved yet. Run “ask” to introduce yourself.",
  },
};

const HINT = { color: "rgba(255,255,255,0.55)", margin: "2px 0 6px" };
const ERR = { color: "#ff9a9a", margin: "2px 0 6px" };

const intro = {
  type: "out",
  node: (
    <p>
      Hello, this is <b className="or">Dever Shell</b>. Type <b className="or">help</b> for the
      manual — or chat with the bot: <b className="or">ask</b> &lt;your question&gt;. Try{" "}
      <b>neofetch</b>, <b>skills -v</b>, <b>open cv</b>.
    </p>
  ),
};

export const useConsole = (lang = "fr") => {
  const commands = useRef(null);
  if (!commands.current) commands.current = buildCommands();

  const [lines, setLines] = useState([intro]);
  const [promptLabel, setPromptLabel] = useState(PROMPT);
  const [busy, setBusy] = useState(false);
  const history = useRef([]);
  const idx = useRef(0);

  const langRef = useRef(lang);
  langRef.current = lang === "en" ? "en" : "fr";
  const tr = () => T[langRef.current];

  // Machine à états du mini-assistant `ask`.
  const pending = useRef(null); // (line) => void  — consomme la prochaine saisie
  const promptRef = useRef(PROMPT);
  const draft = useRef({}); // { name }
  const queued = useRef(""); // question en attente pendant l'onboarding
  const busyRef = useRef(false);
  const streamId = useRef(0);

  const setPrompt = (p) => { promptRef.current = p; setPromptLabel(p); };
  const resetPrompt = () => { pending.current = null; setPrompt(PROMPT); };
  const pushCmd = (text) => setLines((prev) => [...prev, { type: "cmd", text, prompt: promptRef.current }]);
  const pushOut = (node) => setLines((prev) => [...prev, { type: "out", node }]);
  const hint = (txt) => pushOut(<p style={HINT}>{txt}</p>);
  const errOut = (txt) => pushOut(<p style={ERR}>{txt}</p>);

  // ---- onboarding terminal-friendly ----
  const askQuestion = () => { setPrompt(tr().ques); pending.current = onQuestion; };
  const onQuestion = (line) => {
    if (!line) { resetPrompt(); return; }
    resetPrompt();
    runStream(line);
  };
  const finishOnboarding = (c) => {
    const q = queued.current; queued.current = "";
    if (q) { resetPrompt(); runStream(q); }
    else { hint(tr().ready(c.name)); askQuestion(); }
  };
  const onEmail = (line) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(line)) { errOut(tr().badEmail); setPrompt(tr().email); pending.current = onEmail; return; }
    const c = { mode: "email", name: draft.current.name, value: line };
    setContact(c); finishOnboarding(c);
  };
  const onPhone = (line) => {
    const digits = line.replace(/[^\d]/g, "");
    if (!/^\+/.test(line.trim()) || digits.length < 8) { errOut(tr().badPhone); setPrompt(tr().phone); pending.current = onPhone; return; }
    const c = { mode: "phone", name: draft.current.name, value: line.trim(), consent: true };
    setContact(c); finishOnboarding(c);
  };
  const onMode = (line) => {
    const m = line.toLowerCase();
    if (["e", "email", "mail"].includes(m)) { setPrompt(tr().email); pending.current = onEmail; return; }
    if (["p", "phone", "tel", "téléphone", "telephone"].includes(m)) { setPrompt(tr().phone); pending.current = onPhone; return; }
    if (["i", "incognito", "anon", "anonyme", "anonymous"].includes(m)) {
      const c = { mode: "incognito", name: draft.current.name };
      setContact(c); hint(tr().incognito); finishOnboarding(c);
      return;
    }
    errOut(tr().badMode); setPrompt(tr().mode); pending.current = onMode;
  };
  const onNick = (line) => {
    if (!line) { errOut(tr().badNick); setPrompt(tr().nick); pending.current = onNick; return; }
    draft.current = { name: line };
    hint(tr().modeHint); setPrompt(tr().mode); pending.current = onMode;
  };
  const beginOnboarding = (inlineQuestion) => {
    queued.current = (inlineQuestion || "").trim();
    hint(tr().needId); setPrompt(tr().nick); pending.current = onNick;
  };

  const startAsk = (inline) => {
    const contact = getContact();
    if (!contact || !contact.name) { beginOnboarding(inline); return; }
    const q = (inline || "").trim();
    if (q) runStream(q);
    else askQuestion();
  };

  // ---- streaming d'une réponse ----
  const runStream = async (q) => {
    resetPrompt();
    busyRef.current = true; setBusy(true);
    const id = ++streamId.current;
    setLines((prev) => [...prev, { type: "stream", id, label: tr().label, text: tr().thinking, waiting: true, done: false }]);
    const patch = (fields) => setLines((prev) => prev.map((l) => (l.id === id ? { ...l, ...fields } : l)));
    try {
      await askBotStream({
        question: q,
        lang: langRef.current,
        onToken: (partial) => patch({ text: partial, waiting: false }),
      });
      patch({ done: true, waiting: false });
    } catch {
      patch({ text: tr().error, done: true, waiting: false });
    } finally {
      busyRef.current = false; setBusy(false);
    }
  };

  const exec = (raw) => {
    const value = raw ?? "";

    // 1) Une étape interactive attend une saisie (onboarding / question).
    if (pending.current) {
      pushCmd(value);
      const handler = pending.current;
      pending.current = null;
      handler(value.trim());
      return;
    }

    const v = value.trim();
    if (!v) return;
    if (busyRef.current) return; // on ignore les saisies pendant le streaming

    history.current.push(v);
    idx.current = history.current.length;

    if (v === "clear" || v === "cls") { setLines([]); return; }

    const tokens = v.split(/\s+/);
    const name = tokens[0].toLowerCase();
    const rest = tokens.slice(1);
    const flags = rest.filter((t) => t.startsWith("-"));
    const args = rest.filter((t) => !t.startsWith("-"));

    // 2) `ask` / `chat` : intercepté (async + streaming), hors dispatch sync.
    if (name === "ask" || name === "chat") {
      pushCmd(value);
      if (args[0] === "reset" || flags.includes("--reset") || flags.includes("--new")) {
        clearContact(); hint(tr().reset); return;
      }
      if (args[0] === "whoami" || flags.includes("--who")) {
        const c = getContact();
        hint(c && c.name ? tr().who(c) : tr().noId); return;
      }
      startAsk(args.join(" "));
      return;
    }

    // 3) commandes synchrones classiques.
    const cmd = commands.current[name];
    let output;
    if (cmd) {
      try {
        output = cmd.run({ args, flags, has: (f) => flags.includes(f), raw: v });
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
    setLines((prev) => [...prev, { type: "cmd", text: value, prompt: PROMPT }, { type: "out", node: output }]);
  };

  // ---- Tab autocompletion (shell-like) ----
  const commandNames = () =>
    [...new Set([...Object.keys(commands.current), "ask", "clear", "cls"])].filter((n) => /^[a-z]/.test(n)).sort();
  const argPool = (cmd) => {
    if (cmd === "open") return OPENABLE;
    if (cmd === "lang") return ["fr", "en"];
    if (cmd === "help" || cmd === "man") return commandNames();
    return null;
  };

  const complete = (raw) => {
    const value = raw || "";
    const trailingSpace = /\s$/.test(value);
    const tokens = value.split(/\s+/).filter(Boolean);

    if (tokens.length <= 1 && !trailingSpace) {
      const partial = (tokens[0] || "").toLowerCase();
      const matches = commandNames().filter((n) => n.startsWith(partial));
      if (matches.length === 0) return { value, candidates: [] };
      if (matches.length === 1) return { value: matches[0] + " ", candidates: [] };
      const prefix = lcp(matches);
      return { value: prefix.length > partial.length ? prefix : value, candidates: matches };
    }

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

  const suggest = (candidates) => {
    if (!candidates || candidates.length < 2) return;
    setLines((prev) => [
      ...prev,
      { type: "out", node: <p style={{ color: "rgba(255,255,255,0.55)", margin: "2px 0 6px" }}>{candidates.join("   ")}</p> },
    ]);
  };

  const recall = (dir, input) => {
    const items = history.current;
    if (!items.length) return;
    if (dir === -1) idx.current = idx.current <= 0 ? 0 : idx.current - 1;
    else idx.current = idx.current >= items.length ? items.length : idx.current + 1;
    input.value = items[idx.current] ?? "";
    requestAnimationFrame(() => { input.selectionStart = input.selectionEnd = input.value.length; });
  };

  return { lines, exec, recall, complete, suggest, prompt: promptLabel, basePrompt: PROMPT, busy };
};
