/** @type {import('next').NextConfig} */
const path = require('path');
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
  ],
});

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig = {
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname, '..'),
  outputFileTracingIncludes: {
    '/': ['./public/**/*', './content/**/*'],
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // Empty turbopack config to silence the webpack/turbopack warning in Next.js 16
  turbopack: {},
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  },
  async redirects() {
    return [
      {
        source: '/formacao',
        destination: '/ensinamentos?tab=caminhos',
        permanent: true,
      },
      {
        source: '/formacao/santos',
        destination: '/ensinamentos/santos',
        permanent: true,
      },
      {
        source: '/formacao/:path*',
        destination: '/ensinamentos/caminhos/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = withPWA(withMDX(nextConfig));
