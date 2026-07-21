# Gabarits Tier‑1 — « Preuve projets »

But : passer de *« il a touché ces boîtes »* à *« il a **possédé** des problèmes, à cette **échelle**, avec cet **impact** »*.
Remplis les champs `→ …`. Je câble ensuite dans les fichiers de données (aucune invention de ma part).

**Règles**
- **Ne rien inventer.** Si tu n'as pas un chiffre exact, mets un ordre de grandeur honnête (« ~50k utilisateurs », « 6→2,4 s ») ou laisse vide.
- **NDA-safe** (projets cachés) : jamais le **nom** du projet ni de détail identifiant. On montre le **rôle**, la **nature**, l'**échelle**, la **stack** — pas le livrable.
- **Métrique = un chiffre** : utilisateurs, req/s, temps de chargement, % d'amélioration, volume, uptime, taille d'équipe…
- Bilingue : donne le **FR**, je traduis l'EN (ou remplis les deux si tu préfères).

---

## A. Vault — projets confidentiels (fichier `src/rawDatas/vaultProjects.js`)

Aujourd'hui : 2 lignes + cadenas → un recruteur ne peut rien évaluer. On ajoute un résumé **NDA-safe** avec rôle + échelle + stack, sans rien révéler d'identifiant.

**Exemple (fictif, pour le format) :**
> role → « Backend Architect »
> tag → « Plateforme e-facturation gouvernementale »
> échelle/impact → « ~50k utilisateurs · settlement temps réel · multi-tenant »
> stack → NestJS, PostgreSQL, Redis, Docker
> résumé NDA-safe → « Conception du backend d'une plateforme publique à fort volume : facturation, audit, réconciliation temps réel et cloisonnement multi-locataires. »

### A.1 — CCIB (`gov-einvoicing`, 2022–2023, Government)
- rôle → …
- nature (tag court) → …
- échelle / impact (chiffre) → …
- stack → …
- résumé NDA-safe (1–2 phrases, sans nom de projet) → …

### A.2 — Celtiis via KAMGOKO (`celtiis-corporate`, 2026, Confidential)
- rôle → …
- nature (tag court) → …
- échelle / impact (chiffre) → …
- stack → …
- résumé NDA-safe (1–2 phrases) → …

> `moov-togo` est déjà public et détaillé — rien à faire, sauf si tu veux ajouter une métrique.

---

## B. Collaborations — rôle + 1 métrique (fichier `src/rawDatas/home.js` + app OS)

Aujourd'hui : chaque carte a `name`, `client`, `tag`. On ajoute **ton rôle exact** et **1 métrique d'impact**.
Format par ligne : `rôle → …` · `métrique → …`

| Projet | rôle | métrique (1 chiffre) |
|---|---|---|
| Emilia Cross (France Assist) | → | → |
| My MTN · Selfcare | → | → |
| MTN Bénin (corporate) | → | → |
| Y'ello Market (WooCommerce) | → | → |
| MTN Yello Connect (SSO) | → | → |
| Mon Routeur | → | → |
| WAPIFY | → | → |
| GoCoachings | → | → |
| NinjaLinking | → | → |
| Sevexchange | → | → |
| Kloo | → | → |
| Miroiterie du Ternois | → | → |

> Exemple attendu : *Selfcare* → rôle « Frontend lead », métrique « 6,2 s → 2,4 s de LCP » ou « ~150k utilisateurs ».
> Si un projet n'a pas de métrique publique/honnête, laisse la métrique vide — on gardera juste le rôle.

---

## C. AppStore — apps « fantômes » (app OS, `src/rawDatas/performances.js` ligne ~220)

Aujourd'hui listées sans lien ni preuve : **Ovote · UserList · ToDoList · QR Scan**.
Pour chacune : soit un **lien** (repo GitHub / Play Store / démo), soit **on retire**.

| App | lien (repo / store / démo) OU « retirer » | 1 ligne de description |
|---|---|---|
| Ovote | → | → |
| UserList | → | → |
| ToDoList | → | → |
| QR Scan | → | → |

> Sans lien vérifiable, mieux vaut **retirer** que laisser une icône morte (ça décrédibilise plus que ça n'ajoute).

---

## D. (bonus) Bloc « Au-delà du code » — liens réels (page /about-me)

Optionnel mais fort : rendre les centres d'intérêt **prouvables**.
- Musique → lien (SoundCloud / Spotify / YouTube) → …
- Lecture → Goodreads ou 2–3 titres marquants → …
- Football → (facultatif) équipe / rôle → …

---

### Quand c'est rempli
Renvoie-moi ce fichier complété (ou colle les réponses) — je :
1. enrichis `vaultProjects.js` (champs `role`, `tag`, `desc` NDA-safe, `stack`, `scale`) ;
2. ajoute `role` + `impact` aux `collaborations` de `home.js` (+ rendu sur les cartes) ;
3. relie/retire les apps de l'AppStore ;
4. (bonus) ajoute les liens « Au-delà du code ».
