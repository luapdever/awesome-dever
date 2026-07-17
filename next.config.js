/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    appUrl: "https://luap-dever.netlify.app/",
    // apiUrl: "https://dever-luapdever511.koyeb.app/api/"
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      { protocol: "https", hostname: "www.svgrepo.com" }
    ]
  },
  // En-têtes de sécurité de base (sans CSP pour l'instant : à ajouter une fois
  // les icônes self-hostées et le Consent Mode stabilisé, avec des nonces).
  // NB : microphone=(self) est laissé ouvert car PaulBot utilise le Web Speech
  // API (dictée vocale).
  // /cv et /cv/ servent le CV statique (public/cv/index.html) — évite le 404
  // sur l'URL propre (celle du sitemap), en dev comme en prod. L'URL reste /cv.
  async rewrites() {
    return [
      { source: "/cv", destination: "/cv/index.html" },
      { source: "/cv/", destination: "/cv/index.html" },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), geolocation=(), browsing-topics=(), microphone=(self)" },
        ],
      },
    ];
  },
}

module.exports = nextConfig
