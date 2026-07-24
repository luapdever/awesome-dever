/* ============================================================
   SOURCE DE DONNÉES — Vault (projets privés / entreprise)
   Projets non affichables publiquement (confidentiels, internes,
   sous accord). Regroupés dans l'app "Vault".
   Confidentialité : pour les projets sous NDA (`hidden: true`), on
   n'expose QUE l'entreprise concernée (`company`) — aucun nom ni
   détail de projet n'est stocké ici.
   Champs publics : id, name, client, role, year, status, tag, desc,
            stack[], link?{label,url}
   status ∈ "Confidential" | "Enterprise" | "Government"
   ============================================================ */
import { L } from "./i18n";

export const vaultProjects = [
  // Projets sous NDA : résumés VOLONTAIREMENT génériques et sans chiffres —
  // ils donnent le rôle, le domaine et une stack plausible SANS révéler le projet.
  // (À ajuster par Paul si besoin ; aucun détail confidentiel ici.)
  {
    id: "gov-einvoicing",
    company: "CCIB — Chambre de Commerce et d'Industrie du Bénin",
    role: L("Full-stack Developer", "Développeur full-stack"),
    year: "2022 – 2023",
    status: "Government",
    tag: L("Public-sector digital platform", "Plateforme numérique du secteur public"),
    desc: L(
      "Digital platform for a public institution (business services, data & workflow management). End-to-end application development. Details under NDA.",
      "Plateforme numérique pour une institution publique (services aux entreprises, gestion de données et de démarches). Développement applicatif de bout en bout. Détails sous NDA."
    ),
    stack: ["JavaScript", "Node.js", "PostgreSQL"],
    hidden: true,
  },
  {
    id: "celtiis-corporate",
    company: "Celtiis (via KAMGOKO)",
    role: L("Full-stack Developer", "Développeur full-stack"),
    year: "2026",
    status: "Confidential",
    tag: L("Telecom web ecosystem", "Écosystème web télécom"),
    desc: L(
      "Web platforms for a telecom operator (multilingual corporate portal, content management, integrations), delivered at KAMGOKO. Details under NDA.",
      "Plateformes web pour un opérateur télécom (portail corporate multilingue, gestion de contenu, intégrations), réalisées chez KAMGOKO. Détails sous NDA."
    ),
    stack: ["WordPress", "PHP", "JavaScript", "SASS"],
    hidden: true,
  },
  {
    id: "vantia-beacon",
    name: "Beacon — Diffusion interne programmée",
    client: "France Assist",
    role: L("Desktop Developer (Electron)", "Développeur desktop (Electron)"),
    year: "2023",
    status: "Enterprise",
    tag: L("Cross-platform desktop app", "Application desktop multiplateforme"),
    desc: L(
      "Cross-platform Electron desktop app that broadcasts scheduled internal messages onto employee workstations: publications (text, video, audio, flash, scrolling ticker) authored in a rich WYSIWYG editor (Froala) with an in-app media player (Plyr), scheduled and delivered as always-on-top frameless overlay windows (kiosk mode, multi-monitor aware), pushed in real time over WebSocket, with defer/snooze persisted in a local SQLite database. Secure IPC bridge (contextBridge + contextIsolation), multi-file media upload to a REST API, and packaging/distribution via electron-builder.",
      "Application desktop multiplateforme (Electron) de diffusion programmée de messages internes sur les postes des employés : publications (texte, vidéo, audio, flash, bandeau défilant) rédigées dans un éditeur WYSIWYG riche (Froala) avec lecteur média intégré (Plyr), planifiées et diffusées en fenêtres superposées always-on-top sans cadre (mode kiosque, multi-écrans), poussées en temps réel via WebSocket, avec report/rappel des publications persistés en base locale SQLite. Bridge IPC sécurisé (contextBridge + contextIsolation), upload média multi-fichiers vers une API REST, et packaging/distribution via electron-builder."
    ),
    stack: ["Electron", "electron-builder", "Vue.js", "SQLite", "Socket.io", "IPC · contextBridge", "Froala (WYSIWYG)", "Plyr"],
  },
  {
    id: "moov-togo",
    name: "Moov Africa Togo",
    client: "Moov Africa (via KAMGOKO)",
    role: L("WordPress Developer", "Développeur WordPress"),
    year: "2022 – 2025",
    status: "Enterprise",
    tag: L("Corporate site", "Site corporate"),
    desc: L(
      "Corporate website for the telecom operator: custom theme, tailored plugins, multilingual content management and performance/SEO optimization.",
      "Site corporate pour l'opérateur télécom : thème sur mesure, plugins dédiés, gestion de contenu multilingue et optimisation performance/SEO."
    ),
    stack: ["WordPress", "PHP", "JavaScript", "SASS"],
    link: { label: "moov-africa.tg", url: "https://moov-africa.tg/" },
  },

  // ===== MTN — livrés chez KAMGOKO Technologies (studio) =====
  // Projets PUBLICS (URLs live), pas de NDA : crédit explicite à KAMGOKO,
  // le studio via lequel Paul a réalisé ces applications pour MTN.
  {
    id: "mtn-yello-connect",
    name: "Y'ello Connect",
    client: "MTN Bénin · via KAMGOKO",
    role: L("Frontend Developer", "Développeur frontend"),
    year: "2024",
    status: "Enterprise",
    tag: L("Telecom · Auth / SSO", "Télécom · Auth / SSO"),
    desc: L(
      "Single sign-on authentication portal for MTN Bénin — one secure login shared across MTN's web services.",
      "Portail d'authentification unique (SSO) de MTN Bénin — une connexion sécurisée partagée par les services web de MTN."
    ),
    stack: ["Vue.js", "Bootstrap", "Node.js"],
    link: { label: "auth.mtn.bj", url: "https://auth.mtn.bj/" },
  },
  {
    id: "mtn-selfcare",
    name: "My MTN Web",
    client: "MTN Bénin · via KAMGOKO",
    role: L("Frontend Developer", "Développeur frontend"),
    year: "2024",
    status: "Enterprise",
    tag: L("Telecom · Selfcare", "Télécom · Selfcare"),
    desc: L(
      "Self-service web app for MTN customers: plans, purchases and account management, integrated with MTN's REST APIs.",
      "Application web self-service pour les clients MTN : forfaits, achats et gestion de compte, intégrée aux APIs REST de MTN."
    ),
    stack: ["Vue.js", "WordPress", "Bootstrap", "Node.js"],
    link: { label: "my.mtn.bj", url: "https://my.mtn.bj/" },
  },
  {
    id: "mtn-yello-tickets",
    name: "Y'ello Tickets",
    client: "MTN Bénin · via KAMGOKO",
    role: L("Full-stack Developer", "Développeur full-stack"),
    year: "2024",
    status: "Enterprise",
    tag: L("Telecom · Support", "Télécom · Support"),
    desc: L(
      "Support-ticket management used by MTN agents — ticket workflow from creation to resolution.",
      "Gestion des tickets de support utilisée par les agents MTN — workflow du ticket, de la création à la résolution."
    ),
    stack: ["Vue.js", "Node.js"],
    link: { label: "my.mtn.bj/yello-tickets", url: "https://my.mtn.bj/yello-tickets/" },
  },
  {
    id: "mtn-yello-market",
    name: "Y'ello Market",
    client: "MTN Bénin · via KAMGOKO",
    role: L("Full-stack Developer", "Développeur full-stack"),
    year: "2024",
    status: "Enterprise",
    tag: L("Telecom · E-commerce", "Télécom · E-commerce"),
    desc: L(
      "Online marketplace for MTN Bénin — buy and sell a wide range of products across the country.",
      "Marketplace en ligne pour MTN Bénin — achat et vente d'une large gamme de produits à travers le pays."
    ),
    stack: ["Vue.js", "Node.js"],
    link: { label: "shop.mtn.bj", url: "https://shop.mtn.bj/" },
  },
  {
    id: "mtn-monrouteur",
    name: "Mon Routeur",
    client: "MTN Bénin · via KAMGOKO",
    role: L("Frontend Developer", "Développeur frontend"),
    year: "2024",
    status: "Enterprise",
    tag: L("Telecom · Activation", "Télécom · Activation"),
    desc: L(
      "Activation landing shown when an MTN router runs out of plan or data — quick plan/data top-up.",
      "Landing d'activation affichée quand un routeur MTN n'a plus de forfait ou de data — recharge rapide forfait/data."
    ),
    stack: ["HTML", "CSS", "JavaScript", "Nginx"],
    link: { label: "monrouteur.mtn.bj", url: "https://monrouteur.mtn.bj/" },
  },
  {
    id: "mtn-benin-corporate",
    name: "MTN Bénin — Corporate",
    client: "MTN Bénin · via KAMGOKO",
    role: L("WordPress Developer", "Développeur WordPress"),
    year: "2022 — 2025",
    status: "Enterprise",
    tag: L("Telecom · Corporate site", "Télécom · Site corporate"),
    desc: L(
      "Corporate website of MTN Bénin — custom WordPress theme and plugins, with performance and SEO optimization.",
      "Site corporate de MTN Bénin — thème et plugins WordPress sur mesure, avec optimisation performance et SEO."
    ),
    stack: ["WordPress", "PHP", "SASS"],
    link: { label: "mtn.bj", url: "https://www.mtn.bj/" },
  },
  {
    id: "mtn-congo-corporate",
    name: "MTN Congo — Corporate",
    client: "MTN Congo · via KAMGOKO",
    role: L("WordPress Developer", "Développeur WordPress"),
    year: "2022 — 2025",
    status: "Enterprise",
    tag: L("Telecom · Corporate site", "Télécom · Site corporate"),
    desc: L(
      "Corporate website of MTN Congo — custom WordPress theme and plugins with multilingual content.",
      "Site corporate de MTN Congo — thème et plugins WordPress sur mesure avec contenu multilingue."
    ),
    stack: ["WordPress", "PHP", "SASS"],
    link: { label: "mtn.cg", url: "http://mtn.cg/" },
  },
];

export default vaultProjects;
