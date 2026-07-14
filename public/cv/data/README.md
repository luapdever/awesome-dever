# Données CV — Paul Mededji Zannou

Données structurées extraites de `../index.html` (source de vérité), en **texte brut**
(sans balises HTML), prêtes pour un mode terminal / CLI.

## Régénérer

```bash
cd my-cv
node data/generate.mjs
```

Le script lit `index.html`, nettoie le texte et réécrit tous les fichiers ci-dessous.
À relancer après chaque modification du contenu dans `index.html`.

## Fichiers

| Fichier             | Contenu |
|---------------------|---------|
| `cv.json`           | **Bundle complet** : `{ meta, identity, variants, content: { fr, en } }` — à charger en une fois. |
| `identity.json`     | `firstName`, `lastName`, `photo`, `initials` (commun aux langues). |
| `meta.json`         | Nom, palette, langues disponibles, clés & libellés des profils. |
| `variants.json`     | Les 4 profils. Pour chacun : `projectOrder`, `skillOrder`, `focus` (compétences mises en avant), et par langue `{ role, roleSub, profile }`. |
| `content.fr.json`   | Contenu FR : `ui`, `contact`, `experiences`, `projects`, `skills`, `softSkills`, `education`, `certificates`, `languages`, `interests`. |
| `content.en.json`   | Idem en anglais. |

## Schéma (content.<lang>.json)

- **ui** — libellés des sections/boutons (`profil`, `exp`, `projets`, `tech`, `soft`, `contact`, `formation`, `certs`, `langues`, `interets`, `client`, `privateProj`, `exportPdf`, …).
- **contact[]** — `{ icon, text, href }` (`icon` ∈ phone, mail, pin, briefcase).
- **experiences[]** — `{ role, org, period, note, bullets[] }` (ordre chronologique).
- **projects[]** — `{ id, name, year, role, client, desc, stack[], links[{label,href}], private? }`.
- **skills[]** — `{ key, cat, items }` (`key` référencé par `variants.*.skillOrder` / `focus`).
- **softSkills[]** — `{ title, desc }`.
- **education[]** — `{ period, school, detail }`.
- **certificates[]** — chaînes.
- **languages[]** — `{ name, level, pct }`.
- **interests[]** — chaînes.

## Composer une version précise

Un profil = `variants[<profil>]` (titre/résumé + ordres) appliqué au `content[<langue>]`.

```js
const cv = JSON.parse(fs.readFileSync("data/cv.json"));
const lang = "en", profile = "backend";
const base = cv.content[lang];
const v = cv.variants[profile];
const byId  = Object.fromEntries(base.projects.map(p => [p.id, p]));
const byKey = Object.fromEntries(base.skills.map(s => [s.key, s]));
const projects = v.projectOrder.map(id => byId[id]);   // projets réordonnés
const skills   = v.skillOrder.map(k => byKey[k]);      // compétences réordonnées
const { role, roleSub, profile: summary } = v[lang];
```

Clés valides : langues `fr` | `en` ; profils `fullstack` | `frontend` | `backend` | `devops`.
