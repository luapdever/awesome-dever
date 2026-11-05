import fs from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "public", "sitemap.xml");
const ORIGIN = "https://paulzannou.com";

// Articles du blog : on PARSE blog.js (slug + date) au lieu de l'importer.
// (Un import ESM nommé casse sur Node 18 en prod Netlify, où blog.js est
// vu comme du CommonJS. Le parsing n'a aucune dépendance au système de modules.)
const blogSrc = fs.readFileSync(path.join(__dirname, "..", "src", "rawDatas", "blog.js"), "utf8");
const blogArticles = [
  ...blogSrc.matchAll(/slug:\s*["']([a-z0-9-]+)["'],\s*date:\s*["'](\d{4}-\d{2}-\d{2})["']/g),
].map((m) => ({ slug: m[1], date: m[2] }));

const ROOT = path.join(__dirname, "..");
const projects = JSON.parse(fs.readFileSync(path.join(ROOT, "src/data/projectRoutes.json"), "utf8"));
function contentDate(route) {
  const files = route.path.startsWith("/projects")
    ? ["pages/projects", "src/data/projectRoutes.json", "src/data/projectPages.js", "src/rawDatas/celtiis.js", "src/rawDatas/vaultProjects.js", "src/rawDatas/home.js"]
    : route.path === "/" ? ["pages/index.js", "src/rawDatas/home.js", "src/rawDatas/experiences.js"]
    : route.path === "/about-me" ? ["pages/about-me.js", "src/components/specific/about", "src/rawDatas/faq.js"]
    : route.path === "/cv" ? ["public/cv/index.html"]
    : route.path === "/blog" ? ["src/rawDatas/blog.js"]
    : [`pages${route.path}.js`, `pages${route.path}/index.js`];
  try {
    const date = execFileSync("git", ["log", "-1", "--format=%cs", "--", ...files], { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : null;
  } catch { return null; }
}

// Routes publiques indexables (chemins propres, sans slash fautif).
const ROUTES = [
  { path: "/", priority: "1.0", changefreq: "monthly" },
  { path: "/shop", priority: "0.9", changefreq: "monthly" }, // page services / mini-shop
  { path: "/book", priority: "0.9", changefreq: "monthly" }, // la biographie (SEO Book+Person)
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
  { path: "/about-me", priority: "0.7", changefreq: "monthly" },
  { path: "/paulfolio", priority: "0.7", changefreq: "monthly" },
  // /cv est une app STATIQUE servie par rewrite : elle n'a pas de variante de
  // locale. D'où `i18n: false` — sans quoi le sitemap
  // déclarerait une URL morte.
  { path: "/cv", priority: "0.6", changefreq: "monthly", i18n: false },
  { path: "/projects", priority: "0.8", changefreq: "monthly" },
  ...projects.map((project) => ({ path: `/projects/${project.slug}`, priority: "0.7", changefreq: "monthly" })),
  // Articles du blog (parsés depuis blog.js)
  ...blogArticles.map((p) => ({ path: `/blog/${p.slug}`, priority: "0.6", changefreq: "monthly", lastmod: p.date })),
];

const body = ROUTES.map(
  (r) =>
    /* Une entrée par LOCALE : une URL unique ne peut pas être indexée dans deux
       langues. Chaque entrée déclare ses alternates — c'est ce qui indique à
       Google que /about-me et /en/about-me sont la même page traduite. */
    /* `/` en anglais s'écrit `/en`, jamais `/en/` : le canonique servi n'a pas
       de slash final, et deux formes pour une même page sèment le doute. */
    (r.i18n === false ? ["fr"] : ["fr", "en"]).map((loc) => {
      const modified = r.lastmod || contentDate(r);
      const url = (l) => (l === "fr" ? `${ORIGIN}${r.path}` : `${ORIGIN}/en${r.path === "/" ? "" : r.path}`);
      const alts = r.i18n === false ? "" :
        `      <xhtml:link rel="alternate" hreflang="fr" href="${url("fr")}"/>\n` +
        `      <xhtml:link rel="alternate" hreflang="en" href="${url("en")}"/>\n` +
        `      <xhtml:link rel="alternate" hreflang="x-default" href="${url("fr")}"/>\n`;
      return (
        `  <url>\n` +
        `    <loc>${url(loc)}</loc>\n` +
        (modified ? `    <lastmod>${modified}</lastmod>\n` : "") +
        `    <changefreq>${r.changefreq}</changefreq>\n` +
        `    <priority>${r.priority}</priority>\n` +
        alts +
        `  </url>`
      );
    }).join("\n")
).join("\n");

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
  `${body}\n` +
  `</urlset>\n`;

fs.writeFileSync(OUT, xml);
const total = ROUTES.reduce((n, r) => n + (r.i18n === false ? 1 : 2), 0);
console.log(`✓ sitemap.xml généré (${total} URLs, dates issues des contenus)`);
