/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    appUrl: "https://luap-dever.me/",
    apiUrl: "https://dever-backend.herokuapp.com/api/"
  }
}

module.exports = nextConfig
