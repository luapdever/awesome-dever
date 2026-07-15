/* ============================================================
   SOURCE DE DONNÉES — Compétences (catégorisées).
   Champs : key, category, icon (iconify), skills[{name, icon?}],
   concepts[] = concepts avancés ("deep cuts") pour prouver la
   profondeur sans afficher de pourcentage/niveau.
   (level conservé pour d'éventuels usages internes, non affiché.)
   ============================================================ */
export const skillSet = [
  {
    key: "languages",
    category: "Languages",
    icon: "https://api.iconify.design/fluent-emoji-flat:input-latin-letters.svg",
    skills: [
      { name: "JavaScript", level: 95, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", level: 88, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "PHP", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
      { name: "Dart", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
      { name: "Java", level: 65, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "SQL", level: 82, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    ],
    concepts: ["Event loop & microtasks", "Proxy / Reflect metaprogramming", "TS conditional & mapped types", "Generators & iterators", "WeakRef / FinalizationRegistry"],
  },
  {
    key: "frontend",
    category: "Frontend",
    icon: "https://api.iconify.design/fluent-emoji-flat:artist-palette.svg",
    skills: [
      { name: "Vue.js", level: 93, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
      { name: "Nuxt.js", level: 88, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg" },
      { name: "React / Next.js", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "HTML5 / CSS3 / SASS", level: 95, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" },
      { name: "GSAP / Three.js", level: 75, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" },
    ],
    concepts: ["Fine-grained reactivity", "Streaming SSR & partial hydration", "GSAP timelines & ScrollTrigger", "Virtual scrolling", "Web Components / Shadow DOM"],
  },
  {
    key: "backend",
    category: "Backend",
    icon: "https://api.iconify.design/fluent-emoji-flat:gear.svg",
    skills: [
      { name: "Node.js", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "NestJS", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg" },
      { name: "Express", level: 88, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "Laravel", level: 78, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
      { name: "REST · WebSocket", level: 88, icon: "https://api.iconify.design/mdi:api.svg?color=%23ffffff" },
    ],
    concepts: ["Streams & backpressure", "Dependency injection (NestJS)", "Idempotency & outbox pattern", "Rate limiting & circuit breakers", "Lightweight CQRS / event-driven"],
  },
  {
    key: "ai",
    category: "AI / LLM",
    icon: "https://api.iconify.design/fluent-emoji-flat:robot.svg",
    skills: [
      { name: "LLM integration (Groq · Ollama)", level: 80, icon: "https://api.iconify.design/mdi:robot-happy.svg?color=%23ffffff" },
      { name: "OpenAI-compatible APIs", level: 82, icon: "https://api.iconify.design/simple-icons:openai.svg?color=%23ffffff" },
      { name: "Prompt engineering & guardrails", level: 80, icon: "https://api.iconify.design/mdi:shield-account.svg?color=%23ffffff" },
      { name: "Token streaming (SSE)", level: 84, icon: "https://api.iconify.design/mdi:transit-connection-variant.svg?color=%23ffffff" },
    ],
    concepts: ["Context-stuffing vs RAG", "Context window & token budgeting", "System prompt & guardrails", "SSE token streaming", "Function / tool calling", "Embeddings & vector search (RAG-ready)", "Groq ↔ Ollama hot-swap"],
  },
  {
    key: "mobile",
    category: "Mobile",
    icon: "https://api.iconify.design/fluent-emoji-flat:mobile-phone.svg",
    skills: [
      { name: "Flutter", level: 84, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
      { name: "GetX / Bloc", level: 78, icon: "https://api.iconify.design/mdi:state-machine.svg?color=%23ffffff" },
    ],
    concepts: ["Dart isolates & concurrency", "Reactive state (Bloc/GetX)", "Native platform channels", "Custom render objects"],
  },
  {
    key: "cms",
    category: "CMS & Web",
    icon: "https://api.iconify.design/fluent-emoji-flat:globe-showing-europe-africa.svg",
    skills: [
      { name: "WordPress (themes & plugins)", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" },
      { name: "ACF · Polylang · LearnPress", level: 85, icon: "https://api.iconify.design/mdi:puzzle.svg?color=%23ffffff" },
      { name: "Strapi", level: 72, icon: "https://www.svgrepo.com/show/354399/strapi-icon.svg" },
    ],
    concepts: ["Hooks & filters internals", "Custom Gutenberg blocks", "WP REST + JWT auth", "Multisite & i18n (Polylang)"],
  },
  {
    key: "data",
    category: "Databases",
    icon: "https://api.iconify.design/fluent-emoji-flat:card-file-box.svg",
    skills: [
      { name: "PostgreSQL", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "MySQL / MariaDB", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "TypeORM · Sequelize", level: 82, icon: "https://api.iconify.design/mdi:database-cog.svg?color=%23ffffff" },
    ],
    concepts: ["Recursive CTEs", "LATERAL joins", "Row-Level Security", "Window functions", "Partial & GIN indexes"],
  },
  {
    key: "devops",
    category: "DevOps & Cloud",
    icon: "https://api.iconify.design/fluent-emoji-flat:rocket.svg",
    skills: [
      { name: "Docker · Compose", level: 84, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "GitLab CI · Jenkins", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
      { name: "Nginx · SSL/TLS", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
      { name: "Firebase · GCP · Stripe", level: 82, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      { name: "Keycloak (SSO) · Agora", level: 78, icon: "https://api.iconify.design/mdi:shield-key.svg?color=%23ffffff" },
    ],
    concepts: ["Multi-stage & distroless builds", "Layer caching", "Blue/green & rollbacks", "SSO OIDC (Keycloak)", "Observability (RED/USE)"],
  },
  {
    key: "tools",
    category: "Tooling & Design",
    icon: "https://api.iconify.design/fluent-emoji-flat:hammer-and-wrench.svg",
    skills: [
      { name: "Git · GitHub · GitLab", level: 92, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "Prometheus · Grafana", level: 74, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg" },
      { name: "Blender (3D)", level: 68, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" },
      { name: "Photoshop · XD", level: 72, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
    ],
    concepts: ["Interactive rebase & bisect", "PromQL & Grafana dashboards", "Correlated traces/metrics/logs", "Design tokens"],
  },
];

export default skillSet;
