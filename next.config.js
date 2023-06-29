/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  env: {
    APP_URL: process.env.APP_URL
  }
}

module.exports = nextConfig
