/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    appUrl: "https://luap-dever.netlify.app/",
    apiUrl: "https://dever-luapdever511.koyeb.app/api/"
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      { protocol: "https", hostname: "www.svgrepo.com" }
    ]
  }
}

module.exports = nextConfig
