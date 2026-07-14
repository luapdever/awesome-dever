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
    summary: L("Web engineering for major telecom and media accounts.", "Ingénierie web pour de grands comptes télécoms et médias."),
    highlights: [
      L(
        "2026 · Celtiis – SBIN: multilingual corporate site + press/LMS portal, 17 custom WordPress plugins, recruitment ATS, per-module RBAC, Keycloak SSO, containerized CI/CD.",
        "2026 · Celtiis – SBIN : site corporate multilingue + portail presse/LMS, 17 plugins WordPress sur mesure, ATS de recrutement, RBAC par module, SSO Keycloak, CI/CD conteneurisé."
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
    summary: L("Emilia Cross — social video streaming platform.", "Emilia Cross — plateforme de streaming vidéo social."),
    highlights: [
      L(
        "Architected a real-time video streaming platform in NestJS (multi-service API + dedicated WebSocket server).",
        "Architecture d'une plateforme de streaming vidéo temps réel en NestJS (API multi-services + serveur WebSocket dédié)."
      ),
      L(
        "Per-minute credit-based billing, Stripe payments, KYC verification, RBAC and 2FA.",
        "Facturation à la minute par crédits, paiements Stripe, vérification KYC, RBAC et 2FA."
      ),
      L(
        "Agora RTC video, Firebase notifications, Google Cloud storage and application monitoring.",
        "Vidéo Agora RTC, notifications Firebase, stockage Google Cloud et supervision applicative."
      ),
    ],
    stack: ["NestJS", "TypeScript", "PostgreSQL", "Socket.io", "Agora RTC", "Stripe", "Firebase", "Docker"],
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
    summary: L("InvoicePay — invoice dematerialization for a public institution.", "InvoicePay — dématérialisation des factures pour une institution publique."),
    highlights: [
      L(
        "Built an e-invoicing platform with a multi-level hierarchical approval workflow (13 roles) in Express/Sequelize.",
        "Plateforme d'e-facturation avec un workflow d'approbation hiérarchique multi-niveaux (13 rôles) en Express/Sequelize."
      ),
      L(
        "PDF report generation, Firebase push and multi-channel email notifications, complete audit log for compliance.",
        "Génération de rapports PDF, notifications push Firebase et e-mail multicanal, journal d'audit complet pour la conformité."
      ),
    ],
    stack: ["Node.js", "Express", "Sequelize", "MySQL", "Firebase FCM", "Flutter"],
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
    summary: L("Interactive, responsive interfaces.", "Interfaces interactives et responsives."),
    highlights: [
      L("Developed interactive, responsive interfaces with HTML5, CSS3 and JavaScript.", "Développement d'interfaces interactives et responsives en HTML5, CSS3 et JavaScript."),
      L("Reusable Vue.js (Nuxt.js) components, Webpack optimization, Agile collaboration.", "Composants Vue.js (Nuxt.js) réutilisables, optimisation Webpack, collaboration Agile."),
    ],
    stack: ["Vue.js", "Nuxt.js", "JavaScript", "Webpack"],
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
