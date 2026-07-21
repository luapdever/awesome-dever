/* ============================================================
   MINI-SHOP — Catalogue de services + questionnaires.
   Chaque service : { id, icon(clé), title, tagline, desc, questions[] }.
   Une question : { q, opts? } — avec `opts` → choix (puces), sans → texte libre.
   Tout est bilingue via L(en, fr) ; le composant résout avec tx(v, lang).
   Le questionnaire est OPTIONNEL : il aide juste à cadrer la commande.
   ============================================================ */
import { L } from "./i18n";

// Icônes (contenu interne du <svg>, stroke = currentColor) — cohérentes avec
// les cartes du catalogue WhatsApp.
export const SHOP_ICONS = {
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.6 2.7 2.6 15.3 0 18M12 3c-2.6 2.7-2.6 15.3 0 18"/>',
  phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.2"/><path d="M10.5 18.5h3"/>',
  ai: '<rect x="4" y="8" width="16" height="11" rx="2.4"/><path d="M12 8V5"/><circle cx="12" cy="3.6" r="1.1"/><circle cx="9" cy="13.2" r="1.25"/><circle cx="15" cy="13.2" r="1.25"/><path d="M8 19v1.5M16 19v1.5"/>',
  chat: '<path d="M20 4H4a1.6 1.6 0 0 0-1.6 1.6v9A1.6 1.6 0 0 0 4 16.2h3.2V20l4.2-3.8H20a1.6 1.6 0 0 0 1.6-1.6v-9A1.6 1.6 0 0 0 20 4Z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/>',
  cart: '<circle cx="9.5" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/><path d="M3 4h2.2l2.4 11.1a1 1 0 0 0 1 .8h8.1a1 1 0 0 0 1-.78L20.5 8H6.2"/>',
  portal: '<path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z"/><circle cx="12" cy="10" r="2"/><path d="M8.6 16c.6-1.8 2-2.7 3.4-2.7s2.8.9 3.4 2.7"/>',
  chart: '<path d="M4 20h16"/><path d="M6.5 20v-6.5"/><path d="M12 20V6"/><path d="M17.5 20v-9.5"/>',
  spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M18 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>',
};

export const SHOP_SERVICES = [
  {
    id: "web", icon: "globe",
    title: L("Custom website & web app", "Site web & application sur mesure"),
    tagline: L("Solid backend + fast UI. From SaaS to client portal.", "Backend solide + interface rapide. Du SaaS au portail client."),
    desc: L("A tailor-made platform, front to back (NestJS/Node + Vue/React).", "Une plateforme sur-mesure, du back au front (NestJS/Node + Vue/React)."),
    questions: [
      { q: L("Project type?", "Type de projet ?"), opts: [L("Showcase site", "Site vitrine"), L("Web app", "Application web"), L("SaaS", "SaaS"), L("Redesign", "Refonte"), L("Other", "Autre")] },
      { q: L("Do you have a design/mockup?", "As-tu un design/maquette ?"), opts: [L("Yes, complete", "Oui, complet"), L("Partial", "Partiel"), L("No", "Non")] },
      { q: L("Key features?", "Fonctionnalités clés ?") },
      { q: L("Indicative budget?", "Budget indicatif ?"), opts: [L("< 500k FCFA", "< 500k FCFA"), L("500k–1.5M", "500k–1.5M"), L("1.5M–5M", "1.5M–5M"), L("> 5M", "> 5M"), L("To define", "À définir")] },
      { q: L("Timeline?", "Échéance ?"), opts: [L("< 1 month", "< 1 mois"), L("1–3 months", "1–3 mois"), L("3–6 months", "3–6 mois"), L("Flexible", "Flexible")] },
    ],
  },
  {
    id: "mobile", icon: "phone",
    title: L("Flutter mobile app", "App mobile Flutter"),
    tagline: L("Android · iOS · PWA — one codebase.", "Android · iOS · PWA — une seule base de code."),
    desc: L("Native-feel apps for Android, iOS and installable web (PWA).", "Des apps fluides pour Android, iOS et web installable (PWA)."),
    questions: [
      { q: L("Platforms?", "Plateformes ?"), opts: [L("Android", "Android"), L("iOS", "iOS"), L("Both", "Les deux"), L("+ PWA", "+ PWA")] },
      { q: L("App type?", "Type d'app ?"), opts: [L("E-commerce", "E-commerce"), L("Social", "Réseau social"), L("Utility", "Utilitaire"), L("Business", "Métier"), L("Other", "Autre")] },
      { q: L("Real-time features?", "Fonctions temps réel ?"), opts: [L("Chat", "Chat"), L("Video", "Visio"), L("Notifications", "Notifications"), L("None", "Aucune")] },
      { q: L("Existing design?", "Design existant ?"), opts: [L("Yes", "Oui"), L("No", "Non"), L("To design", "À concevoir")] },
      { q: L("Budget / timeline?", "Budget / échéance ?") },
    ],
  },
  {
    id: "ai", icon: "ai",
    title: L("AI assistant & chatbot", "Assistant IA & Chatbot"),
    tagline: L("24/7 support wired to your data. Reliable, multilingual.", "Support 24/7 branché sur vos données. Fiable, multilingue."),
    desc: L("A smart assistant on your data: support, FAQ, lead qualification.", "Un assistant intelligent sur vos données : support, FAQ, qualification."),
    questions: [
      { q: L("Channel?", "Canal ?"), opts: [L("Website", "Site web"), L("WhatsApp", "WhatsApp"), L("App", "App"), L("Several", "Plusieurs")] },
      { q: L("Data source?", "Source de données ?"), opts: [L("Documents", "Documents"), L("Website", "Site"), L("Database", "Base de données"), L("API", "API"), L("To define", "À définir")] },
      { q: L("Main goal?", "Objectif principal ?"), opts: [L("Customer support", "Support client"), L("Sales", "Ventes"), L("FAQ", "FAQ"), L("Lead qualification", "Qualification leads")] },
      { q: L("Estimated messages/month?", "Volume de messages/mois ?"), opts: [L("< 1k", "< 1k"), L("1k–10k", "1k–10k"), L("> 10k", "> 10k"), L("Unknown", "Inconnu")] },
      { q: L("Languages?", "Langues ?"), opts: [L("FR", "FR"), L("EN", "EN"), L("Multilingual", "Multilingue")] },
    ],
  },
  {
    id: "whatsapp", icon: "chat",
    title: L("WhatsApp marketing & automation", "Marketing & automatisation WhatsApp"),
    tagline: L("Auto replies, catalog, follow-ups, AI campaigns.", "Réponses, catalogue, relances, campagnes IA."),
    desc: L("Sell and reply automatically on WhatsApp — never miss a client.", "Vendez et répondez automatiquement sur WhatsApp — ne ratez plus un client."),
    questions: [
      { q: L("Goal?", "Objectif ?"), opts: [L("Sales", "Ventes"), L("Support", "Support"), L("Follow-ups", "Relances"), L("Catalog", "Catalogue")] },
      { q: L("WhatsApp Business number ready?", "Numéro WhatsApp Business en place ?"), opts: [L("Yes", "Oui"), L("No", "Non")] },
      { q: L("Contacts volume?", "Volume de contacts ?"), opts: [L("< 500", "< 500"), L("500–5000", "500–5000"), L("> 5000", "> 5000")] },
      { q: L("Integrations?", "Intégrations ?"), opts: [L("CRM", "CRM"), L("Payment", "Paiement"), L("Catalog", "Catalogue"), L("None", "Aucune")] },
      { q: L("AI auto-replies?", "Réponses auto par IA ?"), opts: [L("Yes", "Oui"), L("No", "Non"), L("TBD", "À voir")] },
    ],
  },
  {
    id: "ecommerce", icon: "cart",
    title: L("WordPress site & WooCommerce shop", "Site WordPress & boutique WooCommerce"),
    tagline: L("Multilingual shop · Mobile Money & card · SEO.", "Boutique multilingue · Mobile Money & carte · SEO."),
    desc: L("Showcase or online store, self-managed and SEO-optimized.", "Vitrine ou boutique en ligne, autonome et optimisée SEO."),
    questions: [
      { q: L("Type?", "Type ?"), opts: [L("Showcase", "Vitrine"), L("Blog", "Blog"), L("WooCommerce shop", "Boutique WooCommerce"), L("Redesign", "Refonte")] },
      { q: L("Number of products?", "Nombre de produits ?"), opts: [L("< 20", "< 20"), L("20–200", "20–200"), L("> 200", "> 200"), L("N/A", "N/A")] },
      { q: L("Payments?", "Paiements ?"), opts: [L("Mobile Money", "Mobile Money"), L("Card", "Carte"), L("Both", "Les deux"), L("To define", "À définir")] },
      { q: L("Multilingual?", "Multilingue ?"), opts: [L("Yes", "Oui"), L("No", "Non")] },
      { q: L("Have hosting/domain?", "Hébergement/domaine ?"), opts: [L("Yes", "Oui"), L("No", "Non"), L("Advise me", "À conseiller")] },
    ],
  },
  {
    id: "portals", icon: "portal",
    title: L("Portals & pro spaces (B2B)", "Portails & espaces pro (B2B)"),
    tagline: L("Secure spaces, SSO, roles (RBAC), business workflows.", "Espaces sécurisés, SSO, rôles (RBAC), workflows métier."),
    desc: L("Tailor-made client/supplier portals with SSO and fine-grained roles.", "Portails clients/fournisseurs sur mesure : SSO et rôles granulaires."),
    questions: [
      { q: L("Users?", "Utilisateurs ?"), opts: [L("Clients", "Clients"), L("Suppliers", "Fournisseurs"), L("Staff", "Employés"), L("Mixed", "Mixte")] },
      { q: L("Authentication?", "Authentification ?"), opts: [L("Simple", "Simple"), L("SSO", "SSO"), L("Advise me", "À conseiller")] },
      { q: L("Roles & permissions?", "Rôles & permissions ?"), opts: [L("Complex", "Complexes"), L("Basic", "Basiques"), L("TBD", "À définir")] },
      { q: L("Key features?", "Fonctions clés ?") },
      { q: L("Integrations (ERP/CRM/API)?", "Intégrations (ERP/CRM/API) ?"), opts: [L("Yes", "Oui"), L("No", "Non"), L("TBD", "À définir")] },
    ],
  },
  {
    id: "bi", icon: "chart",
    title: L("Back-office & BI dashboard", "Back-office & tableau de bord (BI)"),
    tagline: L("Real-time KPIs · roles (RBAC) · clear reports.", "KPIs en temps réel · droits (RBAC) · rapports clairs."),
    desc: L("Steer your business with clear dashboards and readable data.", "Pilotez votre activité avec des dashboards clairs et lisibles."),
    questions: [
      { q: L("Data to track?", "Données à suivre ?") },
      { q: L("Data sources?", "Sources de données ?"), opts: [L("Existing DB", "Base existante"), L("Files", "Fichiers"), L("API", "API"), L("To define", "À définir")] },
      { q: L("View types?", "Types de vues ?"), opts: [L("KPIs", "KPIs"), L("Charts", "Graphiques"), L("Tables", "Tableaux"), L("Exports", "Exports")] },
      { q: L("Multi-user (RBAC)?", "Multi-utilisateurs (RBAC) ?"), opts: [L("Yes", "Oui"), L("No", "Non")] },
      { q: L("Real-time needed?", "Temps réel nécessaire ?"), opts: [L("Yes", "Oui"), L("No", "Non"), L("TBD", "À voir")] },
    ],
  },
  {
    id: "portfolio", icon: "spark",
    title: L("Portfolio & premium web experience", "Portfolio & expérience web premium"),
    tagline: L("GSAP animations, scrollytelling, 100% responsive.", "Animations GSAP, scrollytelling, 100 % responsive."),
    desc: L("Showcases and portfolios that leave a mark.", "Des vitrines et portfolios qui marquent."),
    questions: [
      { q: L("Goal?", "Objectif ?"), opts: [L("Personal", "Personnel"), L("Business", "Entreprise"), L("Portfolio", "Portfolio"), L("Event", "Événement")] },
      { q: L("Desired style?", "Style souhaité ?"), opts: [L("Minimal", "Sobre"), L("Animated / premium", "Animé / premium"), L("Creative", "Créatif"), L("Advise me", "À conseiller")] },
      { q: L("Content ready?", "Contenu prêt ?"), opts: [L("Yes", "Oui"), L("Partial", "Partiel"), L("No", "Non")] },
      { q: L("Pages/sections?", "Pages/sections ?"), opts: [L("1 (landing)", "1 (landing)"), L("2–5", "2–5"), L("6+", "6+")] },
      { q: L("Timeline?", "Échéance ?"), opts: [L("< 2 weeks", "< 2 sem"), L("2–4 weeks", "2–4 sem"), L("Flexible", "Flexible")] },
    ],
  },
];

// Cartes de marque carrées (1080×1080) — les mêmes que le catalogue WhatsApp :
// mockup navigateur + vraie capture du projet phare + titre/tagline/« Sur devis ».
// Comme l'image contient déjà le texte, la carte /shop n'affiche que l'image.
const SHOP_MEDIA = {
  web: "/shop/web.webp",
  mobile: "/shop/mobile.webp",
  ai: "/shop/ai.webp",
  whatsapp: "/shop/whatsapp.webp",
  ecommerce: "/shop/ecommerce.webp",
  portals: "/shop/portals.webp",
  bi: "/shop/bi.webp",
  portfolio: "/shop/portfolio.webp",
};
SHOP_SERVICES.forEach((s) => { if (SHOP_MEDIA[s.id]) s.image = SHOP_MEDIA[s.id]; });
