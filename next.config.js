/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.scdn.co"],
  },
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
