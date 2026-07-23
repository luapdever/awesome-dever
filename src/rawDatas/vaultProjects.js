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
];

export default vaultProjects;
