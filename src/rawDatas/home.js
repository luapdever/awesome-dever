/* ============================================================
   Contenu de la page d'accueil — bilingue FR/EN.
   Valeurs traduisibles via L(en, fr) ; résolues avec tx(v, lang).
   Icônes : Phosphor via iconify (ph:*), teintées à l'accent ambre.
   ============================================================ */
import { yearsOfExperience } from "./xp";
import { L } from "./i18n";

const ph = (name, color = "ffa500") => `https://api.iconify.design/ph:${name}.svg?color=%23${color}`;

const YEARS = yearsOfExperience();

export const stats = [
  { n: `${YEARS}+`, l: L("years of experience", "ans d'expérience") },
  { n: "20+", l: L("projects delivered", "projets livrés") },
  { n: "6+", l: L("companies & clients", "entreprises & clients") },
  { n: "3", l: L("countries", "pays") },
];

export const capabilities = [
  {
    icon: ph("browsers"),
    title: L("Web & Frontend", "Web & Frontend"),
    desc: L(
      "Reactive, accessible interfaces with Vue.js, Nuxt, React/Next and Flutter on mobile.",
      "Interfaces réactives et accessibles avec Vue.js, Nuxt, React/Next et Flutter côté mobile."
    ),
    tags: ["Vue.js", "Nuxt", "React", "Flutter", "SASS"],
  },
  {
    icon: ph("stack"),
    title: L("Backend & Real-Time", "Backend & Temps réel"),
    desc: L(
      "Robust APIs, WebSocket and distributed systems. Payments, KYC, RBAC/SSO, queues and cron.",
      "APIs robustes, WebSocket et systèmes distribués. Paiements, KYC, RBAC/SSO, files et cron."
    ),
    tags: ["NestJS", "Node.js", "Express", "PostgreSQL", "WebSocket"],
  },
  {
    icon: ph("rocket-launch"),
    title: L("DevOps & Cloud", "DevOps & Cloud"),
    desc: L(
      "Containerization, CI/CD and monitoring. I ship, I watch, I sleep at night.",
      "Conteneurisation, CI/CD et supervision. Je livre, je surveille, je dors la nuit."
    ),
    tags: ["Docker", "GitLab CI", "Jenkins", "Nginx", "Grafana"],
  },
  {
    icon: ph("palette"),
    title: L("Creative & 3D", "Créatif & 3D"),
    desc: L(
      "A bit of GSAP, Three.js and Blender when an interface deserves better than a spreadsheet.",
      "Un peu de GSAP, de Three.js et de Blender quand une interface mérite mieux qu'un tableau."
    ),
    tags: ["GSAP", "Three.js", "Blender", "Photoshop"],
  },
];

// "Mon parcours en images" — dossier public/history
export const journey = [
  { img: "/history/01-benevolat.jpeg", year: "2019", title: L("The beginnings", "Les débuts"), caption: L("Volunteering, lots of coffee, zero budget — but a hunger to learn worth selling.", "Bénévole, beaucoup de café, zéro budget — mais l'envie d'apprendre à revendre.") },
  { img: "/history/02-stage.jpg", year: "2020", title: L("The internship", "Le stage"), caption: L("Where I learned that “works on my machine” is not an admissible line of defence.", "J'y ai appris que « ça marche sur ma machine » n'est pas une ligne de défense recevable.") },
  { img: "/history/03-premier-contrat.jpg", year: "2021", title: L("First contract", "Premier contrat"), caption: L("Contract signed, impostor syndrome included. We both survived.", "Contrat signé, syndrome de l'imposteur offert avec. On a survécu tous les deux.") },
  { img: "/history/04-concentration.jpeg", year: "2022", title: L("Focus", "Focus"), caption: L("Maximum focus. Do not disturb — except for coffee or a production on fire.", "Concentration maximale. Ne pas déranger — sauf pour un café ou une prod qui brûle.") },
  { img: "/history/05-second-contrat.jpeg", year: "2023", title: L("Second contract", "Deuxième contrat"), caption: L("This time I (almost) knew what I was doing. The almost makes all the difference.", "Cette fois, je savais (presque) ce que je faisais. Le presque fait toute la nuance.") },
  { img: "/history/06.jpeg", year: "2024", title: L("The team", "L'équipe"), caption: L("The best code is sometimes thought up far from the keyboard, with the right people.", "Le meilleur code se pense parfois loin du clavier, entouré des bonnes personnes.") },
  { img: "/history/07-enjoy-trip.jpeg", year: "2025", title: L("The reward", "La récompense"), caption: L("You don't live on commits alone: a little rest before the next sprint.", "On ne vit pas que de commits : un peu de repos avant le prochain sprint.") },
];

export const testimonials = [
  { name: "Christian", role: L("Product Lead — France Assist", "Product Lead — France Assist"), project: "Emilia Cross", text: L("Paul took an ambitious idea — per-minute billed video streaming — and turned it into a stable, scalable platform. Autonomous, rigorous, and able to explain the tech without jargon. We'll call Paul again.", "Paul a pris une idée ambitieuse — du streaming vidéo facturé à la minute — et en a fait une plateforme stable et scalable. Autonome, rigoureux, et capable d'expliquer la technique sans jargon. On rappellera Paul.") },
  { name: "Fresnel A.", role: L("Developer", "Développeur"), text: L("Working with Paul is like having a human CI/CD: it builds, it tests, it ships. And he documents — yes, really.", "Bosser avec Paul, c'est comme avoir un CI/CD humain : ça build, ça teste, ça livre. Et en prime, il documente — oui, vraiment.") },
  { name: "Evans D.", role: L("Developer", "Développeur"), text: L("One of the rare devs who reads the docs before asking. As solid on the back as on the front.", "Un des rares devs qui lit la doc avant de poser la question. Aussi solide sur le back que sur le front.") },
  { name: "Fadel A.", role: L("Developer", "Développeur"), text: L("We shipped projects under pressure together. Paul keeps his cool when production catches fire — and, above all, he puts out the fire.", "On a livré des projets sous pression ensemble. Paul garde son calme quand la prod prend feu — et surtout, il éteint l'incendie.") },
  { name: "Clavers", role: L("Designer", "Designer"), text: L("Finally a dev who respects the mockups to the pixel. My designs have never aged so well in production.", "Enfin un dev qui respecte les maquettes au pixel près. Mes designs n'ont jamais aussi bien vieilli en production.") },
  { name: "Ruchi M.", role: L("Designer", "Designer"), text: L("Paul understands design, not just code. He suggests, he challenges, and the final result is always cleaner.", "Paul comprend le design, pas seulement le code. Il propose, il challenge, et le résultat final est toujours plus propre.") },
];

export const usefulLinks = [
  { label: L("My interactive résumé", "Mon CV interactif"), href: "/cv/index.html", target: "_blank", icon: ph("file-text") },
  { label: L("PaulBrain OS", "PaulBrain OS"), href: "/paulfolio", icon: ph("desktop") },
  { label: L("About me", "À propos de moi"), href: "/about-me", icon: ph("user-focus") },
  { label: L("GitHub", "GitHub"), href: "https://github.com/luapdever", target: "_blank", icon: ph("github-logo") },
  { label: L("LinkedIn", "LinkedIn"), href: "https://linkedin.com/in/paul-zannou-b253a2205", target: "_blank", icon: ph("linkedin-logo") },
  { label: L("My blog", "Mon blog"), href: "https://luap-dever.me", target: "_blank", icon: ph("pen-nib") },
];

// Hero headline as accent-aware tokens (per language).
export const HERO_TITLE = {
  en: [{ w: "I" }, { w: "build", cls: "accent" }, { w: "what" }, { br: true }, { w: "ideas" }, { w: "promise.", cls: "accent2" }],
  fr: [{ w: "Je" }, { w: "construis", cls: "accent" }, { w: "ce" }, { w: "que" }, { br: true }, { w: "les" }, { w: "idées" }, { w: "promettent.", cls: "accent2" }],
};

// Inline UI strings for the homepage.
export const HOME_UI = {
  en: {
    heroSubYears: "years shipping, breaking and fixing (better).",
    btnOS: "Explore PaulBrain OS",
    btnCV: "My résumé",
    scroll: "SCROLL",
    aboutText: "A self-taught developer turned engineer, I turn problems others call complicated — per-minute billing, real-time video streaming, government e-invoicing — into stable, elegant and documented products.",
    bioLink: "My full bio",
    headCaps: "A Swiss army knife — that compiles.",
    headJourney: "My journey, frame by frame.",
    journeyIntro: "Seven snapshots, six years, one constant: learning faster than the coffee cools.",
    headExp: "Where I've left some code.",
    headTesti: "They survived my commits.",
    ctaTitle: "Shall we build something?",
    ctaText: "An ambitious project, a tight deadline, an idea that keeps you up at night? Write to me.",
    ctaMail: "Send an email",
    ctaOther: "Other ways to know me",
    headLinks: "Useful links.",
  },
  fr: {
    heroSubYears: "ans à livrer, casser et réparer (en mieux).",
    btnOS: "Explorer PaulBrain OS",
    btnCV: "Mon CV",
    scroll: "SCROLL",
    aboutText: "Développeur autodidacte devenu ingénieur, je transforme des problèmes que d'autres jugent compliqués — facturation à la minute, streaming vidéo temps réel, e-facturation gouvernementale — en produits stables, élégants et documentés.",
    bioLink: "Ma bio complète",
    headCaps: "Un couteau suisse, mais qui compile.",
    headJourney: "Mon parcours, image par image.",
    journeyIntro: "Sept clichés, six ans, une constante : apprendre plus vite que le café ne refroidit.",
    headExp: "Là où j'ai laissé du code.",
    headTesti: "Ils ont survécu à mes commits.",
    ctaTitle: "On construit quelque chose ?",
    ctaText: "Un projet ambitieux, un délai serré, une idée qui vous empêche de dormir ? Écrivez-moi.",
    ctaMail: "Écrire un e-mail",
    ctaOther: "Autres façons de me connaître",
    headLinks: "Liens utiles.",
  },
};
