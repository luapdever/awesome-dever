import { L } from "./i18n";

/* ============================================================
   SOURCE DE DONNÉES — Expériences professionnelles (bilingue).
   Les champs affichés (role, period, type, summary, highlights)
   sont marqués via L(en, fr) pour l'i18n. Alignées avec le CV.
   ============================================================ */
export const experiences = [
  {
    id: "kamgoko",
    role: L("Full-Stack Software Engineer", "Ingénieur logiciel full-stack"),
    org: "KAMGOKO Technologies",
    client: "Telecom & media accounts",
    type: L("Full-time", "Temps plein"),
    period: L("Jan 2022 – Present", "Janv. 2022 – Présent"),
    start: "2022-01",
    end: null,
    current: true,
    location: "Cotonou, Benin",
    summary: L("Broad skills acquired through projects for MTN, Moov, Celtiis, Orabank and other major accounts (telecom, media, banking).", "Nombreuses compétences acquises via des projets pour MTN, Moov, Celtiis, Orabank et d'autres grands comptes (télécoms, médias, banque)."),
    highlights: [
      L(
        "2026 · Celtiis (via KAMGOKO): confidential engagement under a non-disclosure agreement (NDA).",
        "2026 · Celtiis (via KAMGOKO) : mission confidentielle sous accord de non-divulgation (NDA)."
      ),
      L(
        "2022–2025 · MTN & Moov: corporate sites (MTN Benin, MTN Congo, Moov Africa Togo), MyMTN Selfcare (Vue.js) and the MonRouteur activation page — custom themes/plugins, RESTful APIs, performance.",
        "2022–2025 · MTN & Moov : sites corporate (MTN Bénin, MTN Congo, Moov Africa Togo), MyMTN Selfcare (Vue.js) et la page d'activation MonRouteur — thèmes/plugins sur mesure, APIs RESTful, performance."
      ),
    ],
    stack: ["WordPress", "PHP", "Vue.js", "Node.js", "Docker", "Jenkins", "Keycloak"],
    links: [],
  },
  {
    id: "france-assist",
    role: L("Backend & Real-Time Engineer", "Ingénieur backend & temps réel"),
    org: "France Assist",
    client: "France Assist",
    type: L("Collaboration", "Collaboration"),
    period: L("2024 – 2025", "2024 – 2025"),
    start: "2024-01",
    end: "2025-12",
    current: false,
    location: "Remote",
    summary: L("Emilia Cross — a dating app (Flutter mobile + PWA) with per-minute billed live video.", "Emilia Cross — une application de rencontre (Flutter mobile + PWA) à visio facturée à la minute."),
    highlights: [
      L(
        "Built end to end: Flutter clients (mobile + PWA) + a NestJS backend (multi-service API + dedicated WebSocket server).",
        "Conçue de bout en bout : clients Flutter (mobile + PWA) + backend NestJS (API multi-services + serveur WebSocket dédié)."
      ),
      L(
        "Live video (Agora) billed per minute via a credit system, identity verification (Stripe Identity/KYC), Stripe payments & payouts, RBAC and 2FA.",
        "Visio en direct (Agora) facturée à la minute via un système de crédits, vérification d'identité (Stripe Identity/KYC), paiements & reversements (payouts) Stripe, RBAC et 2FA."
      ),
      L(
        "Firebase push notifications, Google Cloud storage, media pipeline (FFmpeg/Sharp) and application monitoring.",
        "Notifications push Firebase, stockage Google Cloud, pipeline média (FFmpeg/Sharp) et supervision applicative."
      ),
    ],
    stack: ["Flutter", "NestJS", "TypeScript", "PostgreSQL", "Socket.io", "Agora RTC", "Stripe", "Firebase", "Docker"],
    links: [{ label: "emiliacross.com", url: "https://emiliacross.com/" }],
  },
  {
    id: "ccib",
    role: L("Desktop & Mobile Developer", "Développeur desktop & mobile"),
    org: "CCIB — Chamber of Commerce and Industry of Benin",
    client: "CCIB (Government)",
    type: L("Contract", "Prestation"),
    period: L("2022 – 2023", "2022 – 2023"),
    start: "2022-01",
    end: "2023-12",
    current: false,
    location: "Cotonou, Benin",
    summary: L("Confidential engagement for a public institution — under NDA.", "Prestation confidentielle pour une institution publique — sous NDA."),
    highlights: [
      L(
        "Project details are covered by a non-disclosure agreement (NDA).",
        "Détails du projet couverts par un accord de confidentialité (NDA)."
      ),
    ],
    stack: ["Node.js", "Express", "MySQL"],
    links: [],
  },
  {
    id: "octogone",
    role: L("Frontend Developer", "Développeur frontend"),
    org: "Octogone Trading Sarl",
    client: "Octogone Trading",
    type: L("Full-time", "Temps plein"),
    period: L("Oct 2021 – Dec 2021", "Oct. 2021 – Déc. 2021"),
    start: "2021-10",
    end: "2021-12",
    current: false,
    location: "Cotonou, Benin",
    summary: L("Foundations in PHP, Vue.js and Nuxt.js; first steps in Node.js.", "Bases en PHP, Vue.js et Nuxt.js ; premiers pas en Node.js."),
    highlights: [
      L("Consolidated foundations in PHP, Vue.js and Nuxt.js — reusable components, Webpack optimization, Agile collaboration.", "Consolidation des bases en PHP, Vue.js et Nuxt.js — composants réutilisables, optimisation Webpack, collaboration Agile."),
      L("Very first steps in Node.js, still learning the ropes.", "Tout premiers pas en Node.js, encore en apprentissage."),
    ],
    stack: ["PHP", "Vue.js", "Nuxt.js", "Node.js", "Webpack"],
    links: [],
  },
  {
    id: "web-marina",
    role: L("Web & Mobile Developer — Internship", "Développeur web & mobile — Stage"),
    org: "Web Marina Agency",
    client: "Web Marina Agency",
    type: L("Internship", "Stage"),
    period: L("2020 – 2021", "2020 – 2021"),
    start: "2020-01",
    end: "2021-12",
    current: false,
    location: "Cotonou, Benin",
    summary: L("First professional experience — mobile & web.", "Première expérience professionnelle — mobile & web."),
    highlights: [
      L("Contributed to iOS/Android mobile apps with Flutter.", "Participation à des apps mobiles iOS/Android avec Flutter."),
      L("Implemented intuitive interfaces and API integration.", "Implémentation d'interfaces intuitives et intégration d'API."),
    ],
    stack: ["Flutter", "Dart", "HTML5", "CSS3"],
    links: [],
  },
];

export default experiences;
