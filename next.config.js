/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    appUrl: "https://luap-dever.netlify.app/",
    apiUrl: "https://dever-luapdever511.koyeb.app/api/"
  }
}

module.exports = nextConfig
