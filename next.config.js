/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    appUrl: "https://luap-dever.netlify.app/",
    // apiUrl: "https://dever-luapdever511.koyeb.app/api/"
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      { protocol: "https", hostname: "www.svgrepo.com" }
    ]
  },
  // En-têtes de sécurité de base (sans CSP pour l'instant : à ajouter une fois
  // les icônes self-hostées et le Consent Mode stabilisé, avec des nonces).
  // NB : microphone=(self) est laissé ouvert car PaulBot utilise le Web Speech
  // API (dictée vocale).
  // /cv et /cv/ servent le CV statique (public/cv) — évite le 404
  // sur l'URL propre (celle du sitemap), en dev comme en prod. L'URL reste /cv.
  async rewrites() {
    return [
      { source: "/cv", destination: "/cv/index.html" },
      { source: "/cv/", destination: "/cv/index.html" },
    ];
  },
  async headers() {
    // Le Fast Refresh (HMR) de Next utilise eval() EN DÉV uniquement → on autorise
    // 'unsafe-eval' seulement en développement. En PROD, la CSP reste stricte
    // (pas de eval), ce qui est le comportement voulu et sûr.
    const devEval = process.env.NODE_ENV !== "production" ? " 'unsafe-eval'" : "";
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), geolocation=(), browsing-topics=(), microphone=(self)" },
          // CSP pragmatique : 'unsafe-inline' requis pour les scripts inline GTM/GA
          // et les styles inline (GSAP/CSS-in-JS). img-src https: pour les icônes
          // devicons/favicons distantes. connect/frame limités à self + GA/GTM.
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'" + devEval + " https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://region1.google-analytics.com",
              // L'OS (PaulBrain OS) embarque des sites/démos externes en iframe
              // (portfolios, projets…) → on autorise le framing de tout site https.
              "frame-src 'self' https:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
