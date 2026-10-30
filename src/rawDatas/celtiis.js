import { L } from "./i18n";

export const celtiisProjects = [
  {
    id: "celtiis-corporate",
    name: "Celtiis",
    tag: L("Telecom · Public website", "Télécom · Site grand public"),
    desc: L(
      "Celtiis public website, delivered via KAMGOKO. Publicly detected technologies are listed below, based on the supplied Wappalyzer export for www.celtiis.bj. These detections do not describe the internal architecture. Architecture and details of my role are covered by an NDA and are not disclosed.",
      "Site grand public de Celtiis, réalisé via KAMGOKO. Les technologies détectées publiquement sont indiquées ci-dessous, d’après l’export Wappalyzer fourni pour www.celtiis.bj. Ces détections ne décrivent pas l’architecture interne. L’architecture et les détails de mon rôle sont couverts par un NDA et ne sont pas divulgués."
    ),
    stack: ["WordPress", "Elementor", "Polylang", "PHP", "Node.js", "MySQL", "Socket.io", "Bootstrap", "jQuery", "jQuery UI", "jQuery Migrate", "Lodash", "core-js", "Swiper", "Select2", "Phosphor Icons", "Form.io", "ALTCHA", "CookieYes", "Google Tag Manager", "WhatsApp Business Chat"],
    link: { label: "www.celtiis.bj", url: "https://www.celtiis.bj/" },
  },
  {
    id: "celtiis-business",
    name: "Celtiis Business",
    tag: L("Telecom · Business website", "Télécom · Site Business"),
    desc: L(
      "Celtiis Business website, delivered via KAMGOKO. Architecture and details of my role are covered by an NDA and are not disclosed.",
      "Site Celtiis Business, réalisé via KAMGOKO. L’architecture et les détails de mon rôle sont couverts par un NDA et ne sont pas divulgués."
    ),
    stack: [],
    link: { label: "business.celtiis.bj", url: "https://business.celtiis.bj/" },
  },
  {
    id: "celtiis-club-presse",
    name: "Celtiis Club Presse",
    tag: L("Telecom · Club Presse website", "Télécom · Site Club Presse"),
    desc: L(
      "Celtiis Club Presse website, delivered via KAMGOKO. Architecture and details of my role are covered by an NDA and are not disclosed.",
      "Site Club Presse de Celtiis, réalisé via KAMGOKO. L’architecture et les détails de mon rôle sont couverts par un NDA et ne sont pas divulgués."
    ),
    stack: [],
    link: { label: "clubpresse.celtiis.bj", url: "https://clubpresse.celtiis.bj/" },
  },
].map((project) => ({
  ...project,
  client: "Celtiis · via KAMGOKO",
  year: "2026",
  status: "Enterprise",
}));
