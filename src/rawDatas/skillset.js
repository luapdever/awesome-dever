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
    icon: "/icons/ph/text-aa__ffa500.svg",
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
    icon: "/icons/ph/palette__ffa500.svg",
    skills: [
      { name: "Vue.js", level: 93, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
      { name: "Nuxt.js", level: 88, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg" },
      { name: "React / Next.js", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "HTML5 / CSS3 / SASS", level: 95, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" },
      { name: "GSAP / Three.js", level: 75, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" },
    ],
    concepts: ["Fine-grained reactivity", "Streaming SSR & partial hydration", "GSAP timelines & ScrollTrigger", "Award-style scrollytelling (pinned scroll, kinetic type)", "OS-style window manager UI", "Admin/BI dashboards (KPI cards, paginated tables, skeletons)", "PWA deep links", "Web Audio synthesis", "Web Speech API (STT/TTS)", "Accessibility (WCAG, ARIA, reduced-motion)", "i18n (FR/EN)", "Web Components / Shadow DOM"],
  },
  {
    key: "backend",
    category: "Backend",
    icon: "/icons/ph/gear__ffa500.svg",
    skills: [
      { name: "Node.js", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "NestJS", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg" },
      { name: "Express", level: 88, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "Laravel", level: 78, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
      { name: "REST · WebSocket", level: 88, icon: "/icons/ph/plugs-connected__ffffff.svg" },
      { name: "Swagger/OpenAPI", level: 82, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swagger/swagger-original.svg" },
    ],
    concepts: ["Streams & backpressure", "Dependency injection (NestJS)", "Idempotency & outbox pattern", "Rate limiting & circuit breakers", "RBAC & permission-gated endpoints", "Safe DTO projections (no data leakage)", "Lightweight CQRS / event-driven", "API documentation (OpenAPI/Swagger)"],
  },
  {
    key: "ai",
    category: "AI / LLM",
    icon: "/icons/ph/robot__ffa500.svg",
    skills: [
      { name: "LLM integration", level: 84, icon: "/icons/ph/robot__ffffff.svg" },
      { name: "Standard OpenAI API", level: 84, icon: "/icons/ph/plugs-connected__ffffff.svg" },
      { name: "RAG (retrieval-augmented)", level: 80, icon: "/icons/ph/database__ffffff.svg" },
      { name: "Fine-tuning", level: 76, icon: "/icons/ph/sliders-horizontal__ffffff.svg" },
      { name: "Prompt engineering & guardrails", level: 82, icon: "/icons/ph/shield-check__ffffff.svg" },
      { name: "AI workflow automation", level: 80, icon: "/icons/ph/flow-arrow__ffffff.svg" },
    ],
    concepts: ["LLM integration (model-agnostic)", "Fine-tuning & LoRA", "RAG — embeddings & vector search", "Standard OpenAI-compatible API", "Function / tool calling", "AI agents & orchestration", "Prompt engineering & guardrails", "Token streaming (SSE)", "Context window & token budgeting", "Workflow automation"],
  },
  {
    key: "mobile",
    category: "Mobile & Desktop",
    icon: "/icons/ph/device-mobile__ffa500.svg",
    skills: [
      { name: "Flutter", level: 84, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
      { name: "GetX / Bloc", level: 78, icon: "/icons/ph/tree-structure__ffffff.svg" },
      { name: "Electron", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg" },
    ],
    concepts: ["Dart isolates & concurrency", "Reactive state (Bloc/GetX)", "Native platform channels", "Deep links (App Links / Universal Links)", "Electron: secure IPC (contextBridge/contextIsolation)", "Electron: always-on-top multi-window overlays (kiosk)", "Electron: offline SQLite + real-time Socket.io", "Electron packaging (electron-builder)", "PWA (installable, offline)"],
  },
  {
    key: "cms",
    category: "CMS & Web",
    icon: "/icons/ph/globe-hemisphere-west__ffa500.svg",
    skills: [
      { name: "WordPress (themes & plugins)", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" },
      { name: "WooCommerce", level: 82, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/woocommerce/woocommerce-original.svg" },
      { name: "ACF · Polylang · LearnPress", level: 85, icon: "/icons/ph/puzzle-piece__ffffff.svg" },
      { name: "Strapi", level: 72, icon: "https://www.svgrepo.com/show/354399/strapi-icon.svg" },
    ],
    concepts: ["Hooks & filters internals", "Custom Gutenberg blocks", "WP REST + JWT auth", "WooCommerce e-commerce", "Multisite & i18n (Polylang)"],
  },
  {
    key: "data",
    category: "Databases",
    icon: "/icons/ph/database__ffa500.svg",
    skills: [
      { name: "PostgreSQL", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "MySQL / MariaDB", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "TypeORM · Sequelize", level: 82, icon: "/icons/ph/database__ffffff.svg" },
    ],
    concepts: ["Recursive CTEs", "LATERAL joins", "Row-Level Security", "Window functions", "Aggregate FILTER clauses", "Single-query KPI rollups", "Partial & GIN indexes"],
  },
  {
    key: "devops",
    category: "DevOps & Cloud",
    icon: "/icons/ph/rocket-launch__ffa500.svg",
    skills: [
      { name: "Docker · Compose", level: 84, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "GitLab CI · Jenkins", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
      { name: "Nginx · SSL/TLS", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
      { name: "Firebase · GCP · Stripe", level: 82, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      { name: "Keycloak (SSO) · Agora", level: 78, icon: "/icons/ph/shield-check__ffffff.svg" },
    ],
    concepts: ["Multi-stage & distroless builds", "Layer caching", "Blue/green & rollbacks", "SSO OIDC (Keycloak)", "Observability (RED/USE)"],
  },
  {
    key: "tools",
    category: "Tooling & Design",
    icon: "/icons/ph/wrench__ffa500.svg",
    skills: [
      { name: "Git · GitHub · GitLab", level: 92, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "Prometheus · Grafana", level: 74, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg" },
      { name: "Blender (3D)", level: 68, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" },
      { name: "Playwright (E2E)", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/playwright/playwright-original.svg" },
      { name: "Photoshop · XD", level: 72, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
    ],
    concepts: ["End-to-end testing (Playwright)", "Interactive rebase & bisect", "PromQL & Grafana dashboards", "Correlated traces/metrics/logs", "Design tokens"],
  },
];

export default skillSet;
