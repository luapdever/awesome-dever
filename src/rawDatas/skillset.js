/* ============================================================
   SOURCE DE DONNÉES — Compétences (catégorisées + niveaux)
   Données brutes réutilisables (portfolio OS, futurs use cases).
   Champs : key, category, icon (iconify), accent?, skills[{name, level, icon?}]
   level ∈ 0..100 (pour barres / radar).
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
  },
  {
    key: "mobile",
    category: "Mobile",
    icon: "https://api.iconify.design/fluent-emoji-flat:mobile-phone.svg",
    skills: [
      { name: "Flutter", level: 84, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
      { name: "GetX / Bloc", level: 78, icon: "https://api.iconify.design/mdi:state-machine.svg?color=%23ffffff" },
    ],
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
  },
];

export default skillSet;
