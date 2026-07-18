/* ============================================================
   Génère public/sitemap.xml au build (prebuild).
   → Une seule liste de routes à maintenir ; `lastmod` = date du build
     (plus de date figée à la main), et les nouvelles pages (ex. /book)
     ne sont plus oubliées.
   ============================================================ */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "public", "sitemap.xml");
const ORIGIN = "https://luap-dever.netlify.app";

// Articles du blog : on PARSE blog.js (slug + date) au lieu de l'importer.
// (Un import ESM nommé casse sur Node 18 en prod Netlify, où blog.js est
// vu comme du CommonJS. Le parsing n'a aucune dépendance au système de modules.)
const blogSrc = fs.readFileSync(path.join(__dirname, "..", "src", "rawDatas", "blog.js"), "utf8");
const blogArticles = [
  ...blogSrc.matchAll(/slug:\s*["']([a-z0-9-]+)["'],\s*date:\s*["'](\d{4}-\d{2}-\d{2})["']/g),
].map((m) => ({ slug: m[1], date: m[2] }));

const lastmod = new Date().toISOString().slice(0, 10);

// Routes publiques indexables (chemins propres, sans slash fautif).
const ROUTES = [
  { path: "/", priority: "1.0", changefreq: "monthly" },
  { path: "/book", priority: "0.9", changefreq: "monthly" }, // la biographie (SEO Book+Person)
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
  { path: "/about-me", priority: "0.7", changefreq: "monthly" },
  { path: "/paulfolio", priority: "0.7", changefreq: "monthly" },
  { path: "/cv", priority: "0.6", changefreq: "monthly" }, // rewrite → public/cv (URL propre, sans redirection)
  // Articles du blog (parsés depuis blog.js)
  ...blogArticles.map((p) => ({ path: `/blog/${p.slug}`, priority: "0.6", changefreq: "monthly", lastmod: p.date })),
];

const body = ROUTES.map(
  (r) =>
    `  <url>\n` +
    `    <loc>${ORIGIN}${r.path}</loc>\n` +
    `    <lastmod>${r.lastmod || lastmod}</lastmod>\n` +
    `    <changefreq>${r.changefreq}</changefreq>\n` +
    `    <priority>${r.priority}</priority>\n` +
    `  </url>`
).join("\n");

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  `${body}\n` +
  `</urlset>\n`;

fs.writeFileSync(OUT, xml);
console.log(`✓ sitemap.xml généré (${ROUTES.length} URLs, lastmod ${lastmod})`);
