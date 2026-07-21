/* Apps mises en avant dans la fenêtre App Store (PaulBrain OS).
   Pas de notes/téléchargements fictifs : on n'affiche que des faits
   (métrique d'usage réelle, lien de téléchargement, ou statut NDA). */
export const mobilePerformances = [
  {
    preview: "/projects/emilia.webp",
    name: "Emilia Cross",
    tag: "Dating · live video",
    desc:
      "Dating app where connections happen over live video, billed per minute in real time. Built end to end — Flutter (published app + PWA) and a NestJS backend (KYC, payments & payouts, presence).",
    metric: "2,000+ real-time users",
    platform: "Flutter · PWA",
    year: "2024–2025",
    badge: "Live",
    url: "https://emiliacross.com/download",
  },
  {
    confidential: true,
    name: "InvoicePay",
    tag: "Internal · Invoicing",
    desc:
      "Internal invoice-management app used day-to-day by the team: creation, tracking and settlement of invoices. Confidential (NDA) — internal deployment only, no public screenshots.",
    metric: "~20 internal users",
    platform: "Internal",
    year: "—",
    badge: "NDA · Internal",
    url: "",
  },
];
