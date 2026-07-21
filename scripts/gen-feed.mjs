/* ============================================================
   Génère public/feed.xml (RSS 2.0) au build (prebuild).
   → On PARSE blog.js (comme gen-sitemap) plutôt que de l'importer :
     un import ESM nommé casse sur Node 18 en prod Netlify (blog.js y
     est vu comme du CommonJS). Le parsing est agnostique aux modules.
   Contenu principal en français (langue d'origine des articles).
   ============================================================ */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "public", "feed.xml");
const ORIGIN = "https://luap-dever.netlify.app";
const TITLE = "Le blog — Paul Mèdédji Zannou (Luap Dever)";
const DESC = "Billets tech, culture dev, un peu d'IA — et quelques carnets de voyage.";

const src = fs.readFileSync(path.join(__dirname, "..", "src", "rawDatas", "blog.js"), "utf8");

const esc = (s) =>
  (s || "")
    .replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\\\/g, "\\") // dé-échappe le JS
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); // ré-échappe le XML

const grab = (block, re) => { const m = block.match(re); return m ? m[1] : ""; };

// Découpe le fichier en blocs « article » à partir de chaque `slug:`.
const slugRe = /slug:\s*["']([a-z0-9-]+)["']/g;
const marks = [...src.matchAll(slugRe)];
const items = marks.map((m, i) => {
  const start = m.index;
  const end = i + 1 < marks.length ? marks[i + 1].index : src.length;
  const block = src.slice(start, end);
  return {
    slug: m[1],
    date: grab(block, /date:\s*["'](\d{4}-\d{2}-\d{2})["']/),
    category: grab(block, /category:\s*["']([^"']+)["']/),
    title: grab(block, /title:\s*L\(\s*"((?:[^"\\]|\\.)*)"/),
    excerpt: grab(block, /excerpt:\s*L\(\s*"((?:[^"\\]|\\.)*)"/),
  };
}).filter((it) => it.slug && it.date);

// Plus récent d'abord.
items.sort((a, b) => (a.date < b.date ? 1 : -1));
const lastBuild = new Date().toUTCString();

const body = items
  .map((it) => {
    const link = `${ORIGIN}/blog/${it.slug}`;
    const pub = new Date(`${it.date}T09:00:00Z`).toUTCString();
    return (
      `    <item>\n` +
      `      <title>${esc(it.title)}</title>\n` +
      `      <link>${link}</link>\n` +
      `      <guid isPermaLink="true">${link}</guid>\n` +
      `      <pubDate>${pub}</pubDate>\n` +
      (it.category ? `      <category>${esc(it.category)}</category>\n` : "") +
      `      <description>${esc(it.excerpt)}</description>\n` +
      `    </item>`
    );
  })
  .join("\n");

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n` +
  `  <channel>\n` +
  `    <title>${esc(TITLE)}</title>\n` +
  `    <link>${ORIGIN}/blog</link>\n` +
  `    <atom:link href="${ORIGIN}/feed.xml" rel="self" type="application/rss+xml" />\n` +
  `    <description>${esc(DESC)}</description>\n` +
  `    <language>fr</language>\n` +
  `    <lastBuildDate>${lastBuild}</lastBuildDate>\n` +
  `${body}\n` +
  `  </channel>\n` +
  `</rss>\n`;

fs.writeFileSync(OUT, xml);
console.log(`✓ feed.xml généré (${items.length} articles)`);
