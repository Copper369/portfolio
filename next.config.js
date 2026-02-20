/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },
  
  pwa: {
    dest: "public",
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
        ],
      },
    ];
  },
}

module.exports = withPWA(nextConfig);
