# Plan — Upgrade Next.js, SEO & relooking UI "OS"

## Contexte

`awesome-dever` est le portfolio de Paul « Luap » ZANNOU, développeur fullstack. Deux expériences :
- **Landing** (`/`) : scroll animé GSAP (PartOverview + AboutMe : présentation, formations, skills, loisirs).
- **OS** (`/my-portfolio`) : simulation d'un système d'exploitation — splash de boot, desktop à icônes, fenêtres draggables (min/max/close), taskbar, terminal interactif, App Store, contact, menu contextuel.

Stack actuel : **Next.js 12.3.1**, React 18.2, GSAP, CSS Modules, thème violet `#110068` + orange, police Dosis (chargée via `<link>` Google Fonts).

Objectif : (1) migrer vers **Next.js 15 + React 18.3** sans régression, (2) rendre le site **SEO-friendly**, (3) **relooker l'UI** vers un OS glassmorphism moderne et dynamique, en conservant et raffinant l'identité violet+orange. Scope UI : OS **et** landing pour cohérence.

Décisions validées : Next 15 + React 18 (sûr) · scope OS + landing · style glassmorphism moderne · palette violet+orange gardée et raffinée.

---

## Partie 1 — Upgrade Next.js 12 → 15 (React 18.3)

**`package.json`**
- `next` → `^15`, `react`/`react-dom` → `^18.3.1`, `eslint-config-next` → `^15`, `eslint` reste `^8.57`.
- `@react-three/fiber` (8.x), `@react-three/drei`, `three`, `gsap`, `axios`, `react-toastify`, `react-icons` : **inchangés** (R3F 8 compatible React 18). La 3D n'est de toute façon pas active (lien "3D View" = toast "available soon").

**`next.config.js`**
- Supprimer `swcMinify` (par défaut/déprécié en Next 15).
- Conserver `reactStrictMode`.
- Ajouter `images.remotePatterns` pour `cdn.jsdelivr.net` (icônes devicon utilisées dans `aboutMe.js`) afin de permettre `next/image`.
- Conserver le bloc `env` (appUrl/apiUrl) — fonctionne toujours ; corriger l'usage (slash final) côté composants.

**`_app.js`** : retirer le `Router.events` de debug (`console.log`) inutile ; reste compatible pages router.

**Vérifs migration** : pas de `getInitialProps`/API dépréciée détectée ; `next/image` déjà utilisé dans `nav.jsx` (props width/height valides).

---

## Partie 2 — SEO

**Composant réutilisable** `src/components/global/seo.jsx` (nouveau) — encapsule `next/head` avec props `title`, `description`, `path`, `image`, `type` ; génère title, description, canonical, `og:*` (title/description/image/url/type), `twitter:card`, et accepte un bloc `jsonLd` optionnel. Utilisé dans `pages/index.js` et `pages/my-portfolio/index.js` à la place des `<Head>` dupliqués.

**`pages/_document.js`**
- `<Html lang="en">`.
- Supprimer le `<meta name="description">` **dupliqué** (l.28) et les og déplacés vers `<Seo>`/per-page.
- Retirer le `<link>` Google Fonts (remplacé par `next/font`, voir Partie 3).
- Corriger viewport : retirer `maximum-scale=1` (accessibilité / zoom).

**Données structurées (JSON-LD)** : schéma `Person` (Paul ZANNOU, jobTitle, url, sameAs = réseaux de `aboutMe.js`) injecté sur la home via `<Seo jsonLd={...}>`.

**Fichiers crawl**
- `public/robots.txt` (Allow + référence sitemap).
- `public/sitemap.xml` (statique : `/` et `/my-portfolio`).

**Corrections SEO ponctuelles**
- `pages/my-portfolio/index.js` l.25 : bug espace `appUrl +" luap.png"` → URL correcte.
- `AppStore.jsx` l.45 : `alt=""` → alt descriptif (nom du projet `mbPer`).
- Remplacer les `<img>` clés par `next/image` là où c'est simple (logos, icônes, previews) avec `alt` correct ; garder `<img>` pour les cas pilotés par GSAP si la migration risque de casser les refs.

---

## Partie 3 — Relooking UI (glassmorphism, violet+orange raffiné)

### Design tokens — `styles/globals.css` (`:root`)
Ajouter une couche de tokens réutilisés partout :
- Palette raffinée : violet `--color-primary`, variantes claires/sombres, accent orange, surfaces translucides (`--glass-bg: rgba(...)`, `--glass-border`).
- `--radius` (12–16px), `--blur` (16–24px), ombres en couches (`--shadow-1/-2`).
- Migrer la police **Dosis** vers `next/font/google` (dans `_app.js`, variable CSS `--font-dosis`) → supprime le `<link>` et la règle eslint désactivée `no-page-custom-font`.

### OS — `/my-portfolio`
Fichiers : `styles/specific/portfolio/content.module.css`, `index.module.css`, `windows/*.module.css`, et `src/components/specific/portfolio/Content.jsx`, `hooks/useWindowScreen.js`.

- **Fenêtres** : fond translucide + `backdrop-filter: blur`, coins arrondis, bordure 1px claire, ombres en couches. Header raffiné (label + actions), animation d'ouverture **scale+fade** et fermeture/minimisation via GSAP (spring), au lieu du simple fade.
- **Barre de menu haut** (style macOS, nouveau, dans `Content.jsx`) : marque DEVER + **horloge live** (composant `src/components/global/clock.jsx`, heure montée via `useEffect` pour éviter tout mismatch d'hydratation SSR) + petites icônes de statut.
- **Dock / taskbar** : conteneur glass arrondi, **magnification au survol** (scale CSS), point indicateur d'app active, séparateurs propres.
- **Desktop** : wallpaper à **gradient animé** subtil (keyframes) au lieu de l'image statique ; icônes en grille avec état hover/sélection.
- **Splash de boot** : logo avec glow + légère barre de progression, transition de sortie plus soignée.
- **Terminal** (`terminal.module.css`, `useConsole.js`) : restyle monospace, prompt coloré, **caret clignotant**, historique de commandes (flèches ↑/↓) — amélioration légère.
- **Menu contextuel** : glass, arrondi, animation fade/scale.

### Landing — `/`
Fichiers : `styles/specific/home/*`, `home/about/*`, `nav.module.css`, `footer.module.css`, composants `PartOverview.jsx`, `AboutMe.jsx`, `nav.jsx`, `footer.jsx`.
- Appliquer les tokens (radius/ombres/gradients) aux cartes, boutons et sections.
- Nav + footer en **glass** cohérent avec l'OS.
- Micro-interactions plus fluides (hover/transitions adoucis ; conserver les animations GSAP ScrollTrigger existantes).
- Échelle typographique et contrastes ajustés (accessibilité).

### Cursor
`cursor.jsx` / `cursor.module.css` : adoucir l'animation pulsante (déjà désactivée sur l'OS) pour rester cohérent.

---

## Fichiers principaux touchés
- Config/upgrade : `package.json`, `next.config.js`, `pages/_app.js`, `pages/_document.js`.
- SEO (nouveaux) : `src/components/global/seo.jsx`, `public/robots.txt`, `public/sitemap.xml` ; modifs `pages/index.js`, `pages/my-portfolio/index.js`, `404.js`, `AppStore.jsx`.
- UI OS : `Content.jsx`, `useWindowScreen.js`, `useConsole.js`, nouveaux `clock.jsx` ; `styles/specific/portfolio/*` (+ `windows/*`).
- UI landing + global : `styles/globals.css`, `keyframes.css`, `styles/specific/home/*`, `nav.jsx`/`footer.jsx` + leurs CSS.

---

## Vérification
1. `npm install` (ou `yarn`) puis `npm run dev` → vérifier `/` et `/my-portfolio` (aucun warning de migration, fenêtres/drag/terminal/taskbar fonctionnels).
2. `npm run build` → build Next 15 sans erreur (images, font, config).
3. `npm run lint` → propre (règle font supprimée).
4. SEO : vérifier `view-source` de `/` (lang, canonical, og/twitter, JSON-LD), accès `/robots.txt` et `/sitemap.xml` ; passer un Lighthouse SEO/Accessibilité.
5. Contrôle visuel responsive (desktop + mobile breakpoints existants) sur les deux pages.
