/* ============================================================
   SSOT — Schéma canonique CIBLE (documentation / JSDoc).
   ------------------------------------------------------------
   Décrit la forme vers laquelle les données convergeront lors
   des phases suivantes. AUCUN effet à l'exécution : ce fichier
   ne fait que documenter les types via JSDoc.

   Convention bilingue : un champ traduisible est un objet
   `I18n` produit par le helper `L(en, fr)` de rawDatas/i18n
   (forme : { __i18n:true, en, fr }), résolu via `tx(v, lang)`.
   Les champs neutres (noms de techno, URLs, icônes) restent des
   chaînes simples.
   ============================================================ */

/**
 * @typedef {{ __i18n: true, en: string, fr: string }} I18n
 * Texte traduisible (helper L). Résolu avec tx(v, lang).
 */

/**
 * @typedef {Object} Link
 * @property {string} label   Libellé (I18n ou string).
 * @property {string} href    URL (externe) ou chemin interne.
 * @property {string} [icon]  Icône (URL iconify / devicon).
 * @property {boolean} [external]
 */

/**
 * @typedef {Object} Profile
 * @property {string} name            Nom complet.
 * @property {string} alias           Alias public (« Luap Dever »).
 * @property {I18n|string} role       Intitulé de poste.
 * @property {string} location        Ville / pays.
 * @property {string} email
 * @property {string} phone
 * @property {string} phoneDisplay
 * @property {{available:boolean, remote:boolean, focus:string}} availability
 * @property {Link[]} links           Liens publics (GitHub, LinkedIn, blog…).
 * @property {{n:string, l:I18n}[]} stats
 */

/**
 * @typedef {Object} Experience
 * @property {string} role            Intitulé (I18n).
 * @property {string} org             Entreprise.
 * @property {string} period
 * @property {I18n} [summary]
 * @property {(I18n|string)[]} [bullets]
 * @property {string[]} [stack]
 */

/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {I18n|string} name
 * @property {string} [client]
 * @property {string} [year]
 * @property {I18n} [desc]
 * @property {string[]} [stack]
 * @property {Link[]} [links]
 * @property {boolean} [nda]          Projet sous NDA → nom/détails masqués.
 * @property {I18n|string} [type]     Type affiché quand nda (« entreprise + type »).
 * @property {boolean} [featured]
 */

/**
 * @typedef {Object} SkillCategory
 * @property {string} key
 * @property {I18n|string} category
 * @property {string} [icon]
 * @property {{name:string, icon?:string, level?:number}[]} skills
 * @property {string[]} [concepts]   « Deep cuts » qui prouvent la profondeur.
 */

/**
 * @typedef {Object} Testimonial
 * @property {string} name
 * @property {I18n|string} role
 * @property {string} [project]
 * @property {I18n} text
 */

export {}; // module sans valeur d'exécution (types uniquement)
