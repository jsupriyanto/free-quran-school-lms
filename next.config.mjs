/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: [
      'freequranschoolstorage.blob.core.windows.net'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'freequranschoolstorage.blob.core.windows.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Remove output: 'export' for API routes to work
  // Azure Static Web Apps supports Next.js with API routes
  experimental: {
    // Reduce hydration mismatches
    optimizePackageImports: ['@mui/material', '@mui/icons-material']
  },
  // Optimize for production (swcMinify is now default in Next.js 13+)
  // Add compiler options for better error messages in development
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production'
  },
  // Add custom headers for Azure Static Web Apps
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },
  // Add redirects for authentication
  async redirects() {
    return [
      {
        source: '/401',
        destination: '/authentication/sign-in',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
