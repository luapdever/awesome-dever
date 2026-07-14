/* ============================================================
   SOURCE DE DONNÉES — Vault (projets privés / entreprise)
   Projets non affichables publiquement en iframe (confidentiels,
   internes, sous accord d'entreprise). Regroupés dans l'app "Vault".
   Champs : id, name, client, role, year, status, tag, desc,
            stack[], highlights[], link?{label,url}
   status ∈ "Confidential" | "Enterprise" | "Government"
   ============================================================ */
import { L } from "./i18n";

export const vaultProjects = [
  {
    id: "invoicepay",
    name: "InvoicePay",
    client: "CCIB — Chamber of Commerce and Industry of Benin",
    role: L("Node.js Backend Developer", "Développeur backend Node.js"),
    year: "2022 – 2023",
    status: "Government",
    tag: L("E-invoicing", "E-facturation"),
    desc: L(
      "Invoice dematerialization and validation platform for a public institution: multi-level hierarchical approval workflow (13 roles), PDF report generation, Firebase push and multi-channel email notifications, and a complete audit log for compliance.",
      "Plateforme de dématérialisation et de validation de factures pour une institution publique : workflow d'approbation hiérarchique multi-niveaux (13 rôles), génération de rapports PDF, notifications push Firebase et e-mail multicanal, et journal d'audit complet pour la conformité."
    ),
    stack: ["Node.js", "Express", "Sequelize", "MySQL", "JWT", "Firebase FCM", "WebSocket", "PDF"],
    link: null,
  },
  {
    id: "celtiis-corporate",
    name: "Celtiis – SBIN",
    year: "2026",
    status: "Confidential",
    hidden: true,
    desc: "Details are under NDA and cannot be disclosed.",
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
