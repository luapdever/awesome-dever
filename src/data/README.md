# `src/data` — Source de Données Unique (SSOT)

Façade d'accès **canonique** aux données du portfolio. But : ne plus dupliquer
les mêmes faits (skills, expériences, projets, dispo, liens) dans plusieurs
fichiers / runtimes.

> **Phase 0 (actuelle) — socle uniquement.**
> `index.js` **ré-exporte** les sources existantes de `src/rawDatas/*` :
> aucune donnée n'est copiée, transformée ou supprimée, aucun consommateur
> n'est modifié. **Zéro changement de rendu, de style ou de donnée.**
> Les fichiers de `rawDatas` restent la source physique ; ce dossier en est
> le point d'accès unique et documente la forme cible (`schema.js`).

## Comment consommer (à partir de la Phase 1)

```js
// Avant : import { skillSet } from "../../rawDatas/skillset";
// Après : import { skillSet } from "@/data"; (ou chemin relatif vers src/data)
import { skillSet, experiences, testimonials } from "../../data";
```

## Cartographie actuelle (où vit quoi aujourd'hui)

| Domaine | Export | Source physique (Phase 0) |
|---|---|---|
| Identité / profil | `me`, `socialMedias`, `formations`, `listSkills` | `rawDatas/aboutMe.js` |
| Ancienneté | `XP_START`, `yearsOfExperience` | `rawDatas/xp.js` |
| Méta OS | `OS` | `rawDatas/os.js` |
| Expériences | `experiences` | `rawDatas/experiences.js` |
| Projets (OS) | `performances`, `groupsMeta` | `rawDatas/performances.js` |
| Projets (mobile) | `mobilePerformances` | `rawDatas/mobilePerformances.js` |
| Projets (Vault) | `vaultProjects` | `rawDatas/vaultProjects.js` |
| Compétences | `skillSet` | `rawDatas/skillset.js` |
| Compétences (liste) | `skillList` | `rawDatas/skill.js` |
| Accueil | `collaborations`, `stats`, `capabilities`, `journey`, `testimonials`, `usefulLinks`, `HERO_TITLE`, `HOME_UI` | `rawDatas/home.js` |
| i18n / utils | `L`, `tx`, `txArr`, `LANGS`, `STATUS_LABEL`, `SKILL_CAT`, `STR` | `rawDatas/i18n.js` |
| Fonds d'écran | `wallpapers`, `pickWallpaper` | `rawDatas/wallpapers.js` |

**Hors de ce dépôt (dupliqué aujourd'hui, à unifier en Phases 2–3) :**
- CV statique → objets inline dans `public/cv/index.html` (générateur : `public/cv/data/generate.mjs`).
- Backend PaulBot → `paulbot-backend/src/paulbot/paul.context.ts` (`EXPERIENCES`, `SKILLS`, `COLLABS`).

## Plan des phases

- **Phase 0 — socle** *(faite)* : façade `src/data` + schéma cible. Rien ne change.
- **Phase 1 — frontend** : basculer les consommateurs (home, apps OS) vers `@/data`
  via adaptateurs qui reproduisent les formes actuelles ; vérifier la **parité**
  de rendu, puis migrer les données physiquement derrière la façade.
- **Phase 2 — CV** : `generate.mjs` lit `src/data` → régénère le CV (fin des
  objets inline dupliqués).
- **Phase 3 — backend** : script `sync:profile` → génère les données lues par
  `paul.context.ts` (qui ne garde que l'assemblage du prompt).

## Règle d'or
On ne perd **jamais** de donnée : chaque phase est réversible, vérifiée par
parité de rendu, et ne supprime une ancienne source qu'**après** avoir confirmé
que la nouvelle produit un résultat identique.
