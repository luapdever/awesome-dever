/* ============================================================
   SSOT — Source de Données Unique (Phase 0 : socle).
   ------------------------------------------------------------
   Point d'accès CANONIQUE et unique aux données du portfolio.
   Pour l'instant, ce module se contente de RÉ-EXPORTER les
   sources existantes (`src/rawDatas/*`) — AUCUNE donnée n'est
   copiée, transformée ni déplacée : les fichiers d'origine
   restent la source physique, ce module en est la façade.

   Objectif : que les futurs consommateurs importent d'ICI
   (`import { skillSet } from "@/data"`) au lieu d'aller piocher
   dans dix fichiers. Les phases suivantes migreront les données
   physiquement DERRIÈRE cette façade, sans que les consommateurs
   ne bougent, et normaliseront les formes (voir schema.js).

   ⚠️ Phase 0 = zéro changement de rendu, de style ou de donnée.
   Voir README.md pour le plan complet et la cartographie.
   ============================================================ */

/* -------- Profil & identité -------- */
export { socialMedias } from "../rawDatas/aboutMe";
export { XP_START, yearsOfExperience } from "../rawDatas/xp";
export { OS } from "../rawDatas/os";

/* -------- Parcours / expériences -------- */
export { experiences } from "../rawDatas/experiences";

/* -------- Projets & réalisations -------- */
export { performances, groupsMeta } from "../rawDatas/performances";
export { mobilePerformances } from "../rawDatas/mobilePerformances";
export { vaultProjects } from "../rawDatas/vaultProjects";

/* -------- Compétences -------- */
export { skillSet } from "../rawDatas/skillset";
export { skillList } from "../rawDatas/skill";

/* -------- Contenu de la page d'accueil -------- */
export {
  collaborations,
  stats,
  capabilities,
  journey,
  testimonials,
  usefulLinks,
  HERO_TITLE,
  HOME_UI,
} from "../rawDatas/home";

/* -------- i18n & utilitaires -------- */
export { LANGS, L, tx, txArr, STATUS_LABEL, SKILL_CAT, STR } from "../rawDatas/i18n";
export { wallpapers, pickWallpaper } from "../rawDatas/wallpapers";
