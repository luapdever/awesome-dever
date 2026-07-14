/* ============================================================
   Contenu de la page d'accueil (FR) — ton pro mais humain.
   Icônes : Phosphor via iconify (ph:*), teintées à l'accent ambre.
   ============================================================ */
import { yearsOfExperience } from "./xp";

const ph = (name, color = "ffa500") => `https://api.iconify.design/ph:${name}.svg?color=%23${color}`;

const YEARS = yearsOfExperience();

export const heroActions = [
  { label: "Explorer PaulBrain OS", href: "/paulfolio", primary: true },
  { label: "Mon CV", href: "/cv/index.html", target: "_blank" },
  { label: "Me contacter", href: "#collaborer" },
];

export const stats = [
  { n: `${YEARS}+`, l: "ans d'expérience" },
  { n: "20+", l: "projets livrés" },
  { n: "6+", l: "entreprises & clients" },
  { n: "3", l: "pays" },
];

export const capabilities = [
  {
    icon: ph("browsers"),
    title: "Web & Frontend",
    desc: "Interfaces réactives et accessibles avec Vue.js, Nuxt, React/Next et Flutter côté mobile.",
    tags: ["Vue.js", "Nuxt", "React", "Flutter", "SASS"],
  },
  {
    icon: ph("stack"),
    title: "Backend & Temps réel",
    desc: "APIs robustes, WebSocket et systèmes distribués. Paiements, KYC, RBAC/SSO, files et cron.",
    tags: ["NestJS", "Node.js", "Express", "PostgreSQL", "WebSocket"],
  },
  {
    icon: ph("rocket-launch"),
    title: "DevOps & Cloud",
    desc: "Conteneurisation, CI/CD et supervision. Je livre, je surveille, je dors la nuit.",
    tags: ["Docker", "GitLab CI", "Jenkins", "Nginx", "Grafana"],
  },
  {
    icon: ph("palette"),
    title: "Créatif & 3D",
    desc: "Un peu de GSAP, de Three.js et de Blender quand une interface mérite mieux qu'un tableau.",
    tags: ["GSAP", "Three.js", "Blender", "Photoshop"],
  },
];

// "Mon parcours en images" — dossier public/history
export const journey = [
  { img: "/history/01-benevolat.jpeg", year: "2019", title: "Les débuts", caption: "Bénévole, beaucoup de café, zéro budget — mais l'envie d'apprendre à revendre." },
  { img: "/history/02-stage.jpg", year: "2020", title: "Le stage", caption: "J'y ai appris que « ça marche sur ma machine » n'est pas une ligne de défense recevable." },
  { img: "/history/03-premier-contrat.jpg", year: "2021", title: "Premier contrat", caption: "Contrat signé, syndrome de l'imposteur offert avec. On a survécu tous les deux." },
  { img: "/history/04-concentration.jpeg", year: "2022", title: "Focus", caption: "Concentration maximale. Ne pas déranger — sauf pour un café ou une prod qui brûle." },
  { img: "/history/05-second-contrat.jpeg", year: "2023", title: "Deuxième contrat", caption: "Cette fois, je savais (presque) ce que je faisais. Le presque fait toute la nuance." },
  { img: "/history/06.jpeg", year: "2024", title: "L'équipe", caption: "Le meilleur code se pense parfois loin du clavier, entouré des bonnes personnes." },
  { img: "/history/07-enjoy-trip.jpeg", year: "2025", title: "La récompense", caption: "On ne vit pas que de commits : un peu de repos avant le prochain sprint." },
];

export const testimonials = [
  { name: "Christian", role: "Product Lead — France Assist", project: "Emilia Cross", text: "Paul a pris une idée ambitieuse — du streaming vidéo facturé à la minute — et en a fait une plateforme stable et scalable. Autonome, rigoureux, et capable d'expliquer la technique sans jargon. On rappellera Paul." },
  { name: "Fresnel A.", role: "Développeur", text: "Bosser avec Paul, c'est comme avoir un CI/CD humain : ça build, ça teste, ça livre. Et en prime, il documente — oui, vraiment." },
  { name: "Evans D.", role: "Développeur", text: "Un des rares devs qui lit la doc avant de poser la question. Aussi solide sur le back que sur le front." },
  { name: "Fadel A.", role: "Développeur", text: "On a livré des projets sous pression ensemble. Paul garde son calme quand la prod prend feu — et surtout, il éteint l'incendie." },
  { name: "Clavers", role: "Designer", text: "Enfin un dev qui respecte les maquettes au pixel près. Mes designs n'ont jamais aussi bien vieilli en production." },
  { name: "Ruchi M.", role: "Designer", text: "Paul comprend le design, pas seulement le code. Il propose, il challenge, et le résultat final est toujours plus propre." },
];

export const usefulLinks = [
  { label: "Mon CV interactif", href: "/cv/index.html", target: "_blank", icon: ph("file-text") },
  { label: "PaulBrain OS", href: "/paulfolio", icon: ph("desktop") },
  { label: "À propos de moi", href: "/about-me", icon: ph("user-focus") },
  { label: "GitHub", href: "https://github.com/luapdever", target: "_blank", icon: ph("github-logo") },
  { label: "LinkedIn", href: "https://linkedin.com/in/paul-zannou-b253a2205", target: "_blank", icon: ph("linkedin-logo") },
  { label: "Mon blog", href: "https://luap-dever.me", target: "_blank", icon: ph("pen-nib") },
];
