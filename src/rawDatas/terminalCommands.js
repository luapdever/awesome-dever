/* eslint-disable react/no-unescaped-entities */
/* ============================================================
   Terminal — registre de commandes (Dever Shell).
   Chaque commande : { name, desc, usage, aliases, run(ctx) }
   ctx = { args (positionnels), flags (['-v', ...]), has(f), raw }
   Certaines commandes acceptent des options : ex. `skills -v`,
   `projects --all`, `help <cmd>`, `open <app>`, `lang fr`.
   ============================================================ */
import React from "react";
import { skillSet } from "./skillset";
import { experiences } from "./experiences";
import { vaultProjects } from "./vaultProjects";
import { tx } from "./i18n";

// The shell is English-only; resolve any bilingual data to English.
const en = (v) => tx(v, "en");

const bar = (lvl) => {
  const n = Math.max(0, Math.min(10, Math.round(lvl / 10)));
  return "█".repeat(n) + "░".repeat(10 - n);
};

const PUBLIC_PROJECTS = [
  { name: "Emilia Cross", cat: "Live video streaming", year: "2024–2025", url: "https://emiliacross.com/" },
  { name: "MyMTN Selfcare", cat: "Telecom · Selfcare", year: "2024", url: "https://my.mtn.bj/" },
  { name: "MTN Bénin", cat: "Telecom · Corporate", year: "2022–2025", url: "https://www.mtn.bj/" },
  { name: "WAPIFY", cat: "WhatsApp AI marketing", year: "2023–2024", url: "https://wapify.co/" },
  { name: "NinjaLinking", cat: "SEO backlinks", year: "2024", url: "https://app.ninjalinking.fr" },
  { name: "GoCoachings", cat: "Coaching SaaS", year: "2023–2024", url: "https://www.gocoachings.com" },
  { name: "Miroiterie du Ternois", cat: "Field management", year: "2025", url: "https://app-mdt.fr" },
  { name: "Sevexchange", cat: "Crypto & MoMo exchange", year: "2019", url: "https://sevexchange.com" },
];

const SOCIALS = [
  { label: "GitHub", url: "https://github.com/luapdever" },
  { label: "LinkedIn", url: "https://linkedin.com/in/paul-zannou-b253a2205" },
  { label: "Blog", url: "https://luap-dever.netlify.app" },
  { label: "Email", url: "mailto:pzannou511@gmail.com" },
];

export const OPENABLE = ["career", "skills", "vault", "cv", "emilia", "contact", "appStore", "terminal", "dever"];

export function buildCommands() {
  const C = {};
  const def = (name, desc, usage, run, aliases = []) => {
    C[name] = { name, desc, usage, run, aliases };
    aliases.forEach((a) => (C[a] = C[name]));
  };

  def("help", "List commands, or details for one.", "help [command]", (ctx) => {
    const target = ctx.args[0];
    if (target && C[target]) {
      const cmd = C[target];
      return (
        <div>
          <p><b className="or">{cmd.name}</b> — {cmd.desc}</p>
          <p>usage: <b>{cmd.usage}</b>{cmd.aliases.length ? `   ·   aliases: ${cmd.aliases.join(", ")}` : ""}</p>
        </div>
      );
    }
    const unique = Object.values(C).filter((c, i, arr) => arr.findIndex((x) => x.name === c.name) === i);
    return (
      <div>
        <p>Available commands — type <b className="or">help &lt;command&gt;</b> for details:</p>
        <ul>
          {unique.map((c) => (
            <li key={c.name}><b className="or">{c.name}</b> — {c.desc}</li>
          ))}
        </ul>
        <p style={{ opacity: 0.6 }}>Tips: use options like <b>-v</b> (verbose) or <b>--all</b>. Arrow ↑/↓ recalls history.</p>
      </div>
    );
  }, ["man", "?"]);

  def("about", "Who is Paul.", "about", () => (
    <p>
      I'm <b className="or">Paul Mèdédji ZANNOU</b> (aka <b>Luap Dever</b>), a{" "}
      <b>full-stack software engineer</b> from Cotonou, Benin. 5+ years building web, mobile
      and real-time apps — from distributed backends (NestJS, Node.js) to reactive UIs
      (Vue.js, Flutter), shipped with Docker & CI/CD. I also love 3D, design and music.
    </p>
  ));

  def("whoami", "Print identity.", "whoami", () => (
    <p><b className="or">paul</b> — Full-Stack Software Engineer · Web · Mobile · Real-Time</p>
  ));

  def("skills", "List technical skills. -v for levels.", "skills [-v]", (ctx) => {
    const verbose = ctx.has("-v") || ctx.has("--verbose");
    return (
      <div>
        <p>Technical stack{verbose ? " (proficiency)" : ""}:</p>
        {skillSet.map((cat) => (
          <div key={cat.key} style={{ marginBottom: 6 }}>
            <b className="or">{cat.category}</b>
            {verbose ? (
              <ul>
                {cat.skills.map((s, i) => (
                  <li key={i}><span style={{ fontFamily: "monospace" }}>{bar(s.level)}</span> {s.level}%  {s.name}</li>
                ))}
              </ul>
            ) : (
              <span> : {cat.skills.map((s) => s.name).join(", ")}</span>
            )}
          </div>
        ))}
      </div>
    );
  });

  def("experience", "Work history. -v for details.", "experience [-v]", (ctx) => {
    const verbose = ctx.has("-v") || ctx.has("--verbose");
    return (
      <div>
        <p>Professional experience:</p>
        <ul>
          {experiences.map((x) => (
            <li key={x.id} style={{ marginBottom: verbose ? 6 : 0 }}>
              <b className="or">{en(x.role)}</b> @ {x.org} <span style={{ opacity: 0.6 }}>({en(x.period)})</span>
              {verbose && x.highlights && (
                <ul>{x.highlights.map((h, i) => <li key={i}>{en(h)}</li>)}</ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }, ["career", "xp"]);

  def("projects", "Public projects. --all for the full list.", "projects [--all]", (ctx) => {
    const all = ctx.has("--all") || ctx.has("-a");
    const list = all ? PUBLIC_PROJECTS : PUBLIC_PROJECTS.slice(0, 4);
    return (
      <div>
        <p>{all ? "All public projects:" : "Featured projects (use --all):"}</p>
        <ul>
          {list.map((p, i) => (
            <li key={i}>
              <b className="or">{p.name}</b> — {p.cat} <span style={{ opacity: 0.6 }}>({p.year})</span>{" "}
              <a href={p.url} target="_blank" rel="noreferrer"><b>↗</b></a>
            </li>
          ))}
        </ul>
        <p style={{ opacity: 0.6 }}>Private/enterprise work: type <b className="or">vault</b>.</p>
      </div>
    );
  }, ["ls"]);

  def("enterprise", "Private & enterprise projects.", "enterprise", () => (
    <div>
      <p>Enterprise & confidential work:</p>
      <ul>
        {vaultProjects.map((p) => (
          <li key={p.id}>
            <b className="or">{p.name}</b> — {p.hidden ? <span style={{ opacity: 0.6 }}>[{p.status}] details under NDA</span> : `${en(p.tag)} · ${p.year}`}
          </li>
        ))}
      </ul>
    </div>
  ), ["vault"]);

  def("education", "Education background.", "education", () => (
    <div>
      <p>Education:</p>
      <ul>
        <li><b className="or">BSc · Internet & Multimedia</b> — IFRI/UAC (2018–2021)</li>
        <li><b className="or">High School Diploma (Science)</b> — CEG 1 Tchaourou (2017–2018)</li>
        <li><b className="or">Self-taught</b> — creative, full-stack & mobile development</li>
      </ul>
    </div>
  ), ["edu"]);

  def("languages", "Spoken languages.", "languages", () => (
    <div>
      <p>Languages:</p>
      <ul>
        <li>French — <b className="or">Native</b></li>
        <li>English — <b className="or">Intermediate</b></li>
        <li>Fon — <b className="or">Native</b></li>
      </ul>
    </div>
  ), ["langs"]);

  def("contact", "How to reach me.", "contact", () => (
    <div>
      <p>Get in touch:</p>
      <ul>
        {SOCIALS.map((s, i) => (
          <li key={i}>{s.label}: <a href={s.url} target="_blank" rel="noreferrer"><b className="or">{s.url.replace("mailto:", "")}</b></a></li>
        ))}
      </ul>
    </div>
  ), ["social"]);

  def("open", "Open an app window.", "open <app>", (ctx) => {
    const id = ctx.args[0];
    if (!id) return <p>usage: <b>open &lt;app&gt;</b> — try: {OPENABLE.join(", ")}</p>;
    const match = OPENABLE.find((x) => x.toLowerCase() === id.toLowerCase());
    if (!match) return <p>{">>>"} unknown app "<b>{id}</b>". Try: {OPENABLE.join(", ")}</p>;
    if (typeof window !== "undefined" && window.__osOpen) window.__osOpen(match);
    return <p>Opening <b className="or">{match}</b>…</p>;
  });

  def("lang", "Switch OS language.", "lang <fr|en>", (ctx) => {
    const l = (ctx.args[0] || "").toLowerCase();
    if (l !== "fr" && l !== "en") return <p>usage: <b>lang fr</b> | <b>lang en</b></p>;
    if (typeof window !== "undefined" && window.__osSetLang) window.__osSetLang(l);
    return <p>Language set to <b className="or">{l.toUpperCase()}</b>.</p>;
  });

  // NB : `ask` est intercepté par useConsole (asynchrone + streaming + onboarding).
  // Cette entrée sert uniquement au `help`, au `man ask` et à l'autocomplétion.
  def(
    "ask",
    "Chat with PaulBot (streaming). Prompts for a nickname & reach-back on first use.",
    "ask [question]   ·   ask reset   ·   ask whoami",
    () => <p>Starting PaulBot…</p>,
    ["chat"]
  );

  def("echo", "Print text.", "echo <text>", (ctx) => <p>{ctx.args.join(" ")}</p>);

  def("date", "Show date & time.", "date", () => <p>{new Date().toString()}</p>);

  def("neofetch", "System info.", "neofetch", () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <pre style={{ color: "var(--color-accent)", margin: 0, lineHeight: 1.15 }}>{`   ___
  |o_o|   PaulBrain OS
  |:_/|   ------------
 //   \\ \\
(|     | )
/'\\_   _/\`\\
\\___)=(___/`}</pre>
      <div>
        <p><b className="or">OS</b>: PaulBrain OS v5.0</p>
        <p><b className="or">Host</b>: paul@paulbrain</p>
        <p><b className="or">Role</b>: Full-Stack Software Engineer</p>
        <p><b className="or">Uptime</b>: 5+ years</p>
        <p><b className="or">Shell</b>: Dever Shell</p>
        <p><b className="or">Stack</b>: JS/TS · Vue · NestJS · Flutter · Docker</p>
      </div>
    </div>
  ));

  def("sudo", "Nice try.", "sudo <cmd>", () => (
    <p>{">>>"} <b className="or">paul</b> is not in the sudoers file. This incident will be reported. 😏</p>
  ));

  return C;
}
