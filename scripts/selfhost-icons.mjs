/* Self-host des icônes Phosphor : télécharge depuis api.iconify.design les
   combos (nom, couleur) réellement utilisés, puis réécrit les sources pour
   pointer vers /icons/ph/*.svg. Couleur intégrée au SVG → rendu identique. */
import fs from "node:fs";
import path from "node:path";

const ROOT = "/home/paul/All/HCJV/awesome-dever";
const ICON_DIR = path.join(ROOT, "public", "icons", "ph");
const SCAN = ["src", "pages", "public"];
const EXT = new Set([".js", ".jsx", ".ts", ".tsx", ".html"]);

// ---- 1. collecte des fichiers ----
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name === ".next" || (dir.endsWith("public") && e.name === "icons")) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (EXT.has(path.extname(e.name))) out.push(p);
  }
  return out;
}
const files = SCAN.flatMap((d) => walk(path.join(ROOT, d)));

// ---- 2. collecte des combos (nom, couleur|null) ----
const combos = new Map(); // key -> {name, color|null}
const add = (name, color) => { const k = name + "|" + (color || ""); if (!combos.has(k)) combos.set(k, { name, color: color || null }); };

const RE_URL = /https:\/\/api\.iconify\.design\/ph:([a-z0-9-]+)\.svg(?:\?color=%23([0-9a-fA-F]{3,8}))?/g;
const RE_PH = /\bph\(\s*["']([a-z0-9-]+)["']\s*(?:,\s*["']([0-9a-fA-F]{3,8})["'])?\s*\)/g;

for (const f of files) {
  const c = fs.readFileSync(f, "utf8");
  let m;
  RE_URL.lastIndex = 0; while ((m = RE_URL.exec(c))) add(m[1], m[2]);
  // n'énumère les appels ph(...) que là où le helper existe (fichiers front)
  if (/const ph\s*=\s*\(name/.test(c)) { RE_PH.lastIndex = 0; while ((m = RE_PH.exec(c))) add(m[1], m[2] || "ffa500"); }
}

const fileFor = ({ name, color }) => (color ? `${name}__${color}.svg` : `${name}.svg`);
const urlFor = ({ name, color }) => (color ? `https://api.iconify.design/ph:${name}.svg?color=%23${color}` : `https://api.iconify.design/ph:${name}.svg`);

// ---- 3. téléchargement ----
fs.mkdirSync(ICON_DIR, { recursive: true });
let dl = 0, skip = 0, fail = [];
for (const combo of combos.values()) {
  const dest = path.join(ICON_DIR, fileFor(combo));
  if (fs.existsSync(dest)) { skip++; continue; }
  try {
    const res = await fetch(urlFor(combo), { headers: { "User-Agent": "selfhost-script" } });
    if (!res.ok) throw new Error("http " + res.status);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 40 || !buf.toString("utf8", 0, 200).includes("<svg")) throw new Error("not svg");
    fs.writeFileSync(dest, buf);
    dl++;
  } catch (e) { fail.push(fileFor(combo) + " (" + e.message + ")"); }
}

// ---- 4. réécriture des sources ----
let touched = 0;
for (const f of files) {
  let c = fs.readFileSync(f, "utf8");
  const before = c;
  // 4a. helper ph() : template → chemin local
  c = c.split("https://api.iconify.design/ph:${name}.svg?color=%23${color}").join("/icons/ph/${name}__${color}.svg");
  // 4b. URLs littérales AVEC couleur (avant les nues, pour ne pas tronquer)
  c = c.replace(/https:\/\/api\.iconify\.design\/ph:([a-z0-9-]+)\.svg\?color=%23([0-9a-fA-F]{3,8})/g, "/icons/ph/$1__$2.svg");
  // 4c. URLs littérales SANS couleur
  c = c.replace(/https:\/\/api\.iconify\.design\/ph:([a-z0-9-]+)\.svg/g, "/icons/ph/$1.svg");
  if (c !== before) { fs.writeFileSync(f, c); touched++; }
}

console.log(`combos: ${combos.size} | téléchargés: ${dl} | déjà présents: ${skip} | fichiers réécrits: ${touched}`);
if (fail.length) console.log("ÉCHECS:", fail.join(", "));
