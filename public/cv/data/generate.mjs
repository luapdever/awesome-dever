#!/usr/bin/env node
/* ============================================================
   Générateur de données JSON du CV.
   Extrait IDENTITY / T (fr,en) / VARIANTS depuis ../index.html
   (source de vérité) et écrit des JSON propres (texte brut) dans ce dossier.

   Usage :  node data/generate.mjs      (depuis le dossier my-cv)
   Régénère : identity.json, variants.json, content.fr.json,
              content.en.json, meta.json et cv.json (bundle).
   ============================================================ */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(here, "..", "index.html"), "utf8");

// Isole la région des données (avant la section ÉTAT qui touche au DOM).
const start = html.indexOf("const IDENTITY =");
const end = html.indexOf("/* ================= ÉTAT");
if (start < 0 || end < 0) { console.error("Marqueurs de données introuvables."); process.exit(1); }
const dataSrc = html.slice(start, end);

// Évalue uniquement les littéraux de données et les expose.
const factory = new Function(dataSrc + "\nreturn { IDENTITY, T, VARIANTS, VARIANT_KEYS, VARIANT_LABEL };");
const { IDENTITY, T, VARIANTS, VARIANT_KEYS, VARIANT_LABEL } = factory();

// Nettoyage : retire les balises HTML (<b> …), normalise les espaces.
const clean = (v) => {
  if (typeof v === "string") return v.replace(/<\/?[a-z][^>]*>/gi, "").replace(/\s+/g, " ").trim();
  if (Array.isArray(v)) return v.map(clean);
  if (v && typeof v === "object") { const o = {}; for (const k in v) o[k] = clean(v[k]); return o; }
  return v;
};

const identity = clean(IDENTITY);
const contentFr = clean(T.fr);
const contentEn = clean(T.en);
const variants = clean(VARIANTS);
const meta = {
  name: `${identity.firstName} ${identity.lastName}`,
  palette: { primary: "#110068", accent: "#ffa500" },
  languages: Object.keys(T),
  variantKeys: VARIANT_KEYS,
  variantLabels: clean(VARIANT_LABEL),
  generatedFrom: "index.html"
};

const bundle = { meta, identity, variants, content: { fr: contentFr, en: contentEn } };

const w = (file, obj) => {
  writeFileSync(join(here, file), JSON.stringify(obj, null, 2) + "\n", "utf8");
  console.log("écrit", file);
};

w("identity.json", identity);
w("meta.json", meta);
w("variants.json", variants);
w("content.fr.json", contentFr);
w("content.en.json", contentEn);
w("cv.json", bundle);
console.log("OK");
