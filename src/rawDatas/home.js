/* ============================================================
   Contenu de la page d'accueil — bilingue FR/EN.
   Valeurs traduisibles via L(en, fr) ; résolues avec tx(v, lang).
   Icônes : Phosphor via iconify (ph:*), teintées à l'accent ambre.
   ============================================================ */
import { yearsOfExperience } from "./xp";
import { L } from "./i18n";

const ph = (name, color = "ffa500") => `/icons/ph/${name}__${color}.svg`;
const favicon = (domain) => `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;

const YEARS = yearsOfExperience();

/* Mes collaborations — 10 projets clés, tirés du portfolio (PaulBrain OS).
   Chaque carte pointe vers le projet en ligne ; « Voir plus » ouvre l'OS. */
export const collaborations = [
  { name: "Emilia Cross", client: "France Assist", url: "https://emiliacross.com/", icon: favicon("emiliacross.com"), tag: L("Dating site · live video", "Site de rencontre · visio") },
  { name: "My MTN · Selfcare", client: "MTN — via KAMGOKO", url: "https://my.mtn.bj/", icon: favicon("my.mtn.bj"), tag: L("Vue.js self-care portal", "Portail selfcare Vue.js") },
  { name: "MTN Bénin", client: "MTN — via KAMGOKO", url: "https://www.mtn.bj/", icon: favicon("mtn.bj"), tag: L("Corporate WordPress", "Site corporate WordPress") },
  { name: "Mon Routeur", client: "MTN — via KAMGOKO", url: "https://monrouteur.mtn.bj/?ref=noref", icon: favicon("monrouteur.mtn.bj"), tag: L("Activation journey", "Parcours d'activation") },
  { name: "WAPIFY", client: L("Studio · SaaS", "Studio · SaaS"), url: "https://wapify.co/", icon: favicon("wapify.co"), tag: L("WhatsApp AI marketing", "Marketing IA WhatsApp") },
  { name: "GoCoachings", client: L("Studio · SaaS", "Studio · SaaS"), url: "https://www.gocoachings.com", icon: favicon("gocoachings.com"), tag: L("Coaching platform", "Plateforme de coaching") },
  { name: "NinjaLinking", client: L("Studio · France", "Studio · France"), url: "https://app.ninjalinking.fr", icon: favicon("ninjalinking.fr"), tag: L("SEO backlinks SaaS", "SaaS backlinks SEO") },
  { name: "Sevexchange", client: L("Fintech", "Fintech"), url: "https://sevexchange.com", icon: favicon("sevexchange.com"), tag: L("Crypto & mobile-money exchange", "Échange crypto & mobile money") },
  { name: "Kloo", client: L("Web", "Web"), url: "https://kloo.me", icon: favicon("kloo.me"), tag: L("Link-in-bio platform", "Plateforme link-in-bio") },
  { name: "Miroiterie du Ternois", client: "France", url: "https://www.mdtfermetures.com", icon: favicon("mdtfermetures.com"), tag: L("Field & site management", "Gestion chantiers & terrain") },
];

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
      "Reactive, accessible and animated interfaces with React/Next, Vue.js, Nuxt and Flutter on mobile.",
      "Interfaces réactives, accessibles et animées avec React/Next, Vue.js, Nuxt et Flutter côté mobile."
    ),
    tags: ["React", "Next.js", "Vue.js", "Nuxt", "GSAP", "Flutter"],
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
    icon: ph("robot"),
    title: L("AI & LLM", "IA & LLM"),
    desc: L(
      "LLM-powered assistants and automations: standard OpenAI API, RAG, fine-tuning, prompt guardrails and tool calling.",
      "Assistants et automatisations propulsés par LLM : API OpenAI standard, RAG, fine-tuning, garde-fous de prompt et tool calling."
    ),
    tags: ["LLM", "RAG", "Fine-tuning", "OpenAI API", "Automation"],
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
    icon: ph("sparkle"),
    title: L("Creative & Motion", "Créatif & Motion"),
    desc: L(
      "Award-style interfaces: GSAP/ScrollTrigger scrollytelling, synthesized UI sounds (Web Audio), voice (Web Speech) and immersive, OS-like experiences — accessible by default.",
      "Interfaces primées : scrollytelling GSAP/ScrollTrigger, sons d'interface synthétisés (Web Audio), voix (Web Speech) et expériences immersives façon OS — accessibles par défaut."
    ),
    tags: ["GSAP", "ScrollTrigger", "Web Audio", "Web Speech", "a11y"],
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
  { name: "Luc Martialo", role: L("UI/UX Designer", "Designer UI/UX"), text: L("The kind of portfolio you remember. As a UI/UX designer I notice the small things — and here the whole thing is a crafted experience, not just a page. It stays with you.", "Le genre de portfolio qu'on retient. En tant que designer UI/UX, je repère les détails — et là, l'ensemble est une expérience soignée, pas juste une page. Ça marque.") },
  { name: "Fidèle S.", role: L("Infrastructure Engineer", "Ingénieur Infrastructure"), text: L("Four years working alongside Paul and I still don't know if he's my colleague or my commanding officer — depends on the day and how many servers are on fire. 'Mon Colonel' fixes production faster than most people fix their coffee machine.", "Quatre ans à bosser avec Paul et je ne sais toujours pas si c'est mon collègue ou mon commandant — ça dépend du jour et du nombre de serveurs en feu. 'Mon Colonel' répare la prod plus vite que la plupart des gens ne réparent leur machine à café.") },
];

export const usefulLinks = [
  { label: L("My interactive résumé", "Mon CV interactif"), href: "/cv", target: "_blank", icon: ph("file-text") },
  { label: L("PaulBrain OS", "PaulBrain OS"), href: "/paulfolio", icon: ph("desktop") },
  { label: L("About me", "À propos de moi"), href: "/about-me", icon: ph("user-focus") },
  { label: L("GitHub", "GitHub"), href: "https://github.com/luapdever", target: "_blank", icon: ph("github-logo") },
  { label: L("LinkedIn", "LinkedIn"), href: "https://linkedin.com/in/paul-zannou-b253a2205", target: "_blank", icon: ph("linkedin-logo") },
  { label: L("My blog", "Mon blog"), href: "https://luap-dever.netlify.app/blog", target: "_blank", icon: ph("pen-nib") },
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
    casquettes: ["Frontend", "Backend", "DevOps", "Mobile", "CMS / WordPress", "Real-Time", "AI / LLM", "Creative / 3D"],
    stackHead: "What I'm made of.",
    headCollab: "Some collaborations.",
    collabSub: "A few live projects shipped with teams and clients.",
    collabMore: "See everything in PaulBrain OS",
    aboutText: "A self-taught developer turned engineer, I turn problems others call complicated — per-minute billing, real-time video streaming, government e-invoicing — into stable, elegant and documented products.",
    bioLink: "My full bio",
    headCaps: "A Swiss army knife — that compiles.",
    headJourney: "My journey in frames.",
    journeyIntro: "Seven snapshots, six years, one constant: learning faster than the coffee cools.",
    headExp: "Where I've left some code.",
    headTesti: "They survived my commits.",
    ctaTitle: "Shall we build something?",
    ctaText: "An ambitious project, a tight deadline, an idea that keeps you up at night? Write to me.",
    ctaMail: "Send an email",
    ctaOther: "Change my experience",
    headLinks: "Useful links.",
  },
  fr: {
    heroSubYears: "ans à livrer, casser et réparer (en mieux).",
    btnOS: "Explorer PaulBrain OS",
    btnCV: "Mon CV",
    scroll: "SCROLL",
    casquettes: ["Frontend", "Backend", "DevOps", "Mobile", "CMS / WordPress", "Temps réel", "IA / LLM", "Créatif / 3D"],
    stackHead: "Ce que j'ai dans le ventre.",
    headCollab: "Mes collaborations.",
    collabSub: "Quelques projets en ligne livrés avec des équipes et des clients.",
    collabMore: "Tout voir dans PaulBrain OS",
    aboutText: "Développeur autodidacte devenu ingénieur, je transforme des problèmes que d'autres jugent compliqués — facturation à la minute, streaming vidéo temps réel, e-facturation gouvernementale — en produits stables, élégants et documentés.",
    bioLink: "Ma bio complète",
    headCaps: "Un couteau suisse, mais qui compile.",
    headJourney: "Mon parcours en images.",
    journeyIntro: "Sept clichés, six ans, une constante : apprendre plus vite que le café ne refroidit.",
    headExp: "Là où j'ai laissé du code.",
    headTesti: "Ils ont survécu à mes commits.",
    ctaTitle: "On construit quelque chose ?",
    ctaText: "Un projet ambitieux, un délai serré, une idée qui vous empêche de dormir ? Écrivez-moi.",
    ctaMail: "Écrire un e-mail",
    ctaOther: "Changer d'expérience",
    headLinks: "Liens utiles.",
  },
};
