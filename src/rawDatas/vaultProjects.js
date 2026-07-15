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
  {
    id: "gov-einvoicing",
    company: "CCIB — Chambre de Commerce et d'Industrie du Bénin",
    year: "2022 – 2023",
    status: "Government",
    hidden: true,
  },
  {
    id: "celtiis-corporate",
    company: "Celtiis (via KAMGOKO)",
    year: "2026",
    status: "Confidential",
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
