/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Remove output: 'export' for API routes to work
  // Azure Static Web Apps supports Next.js with API routes
  experimental: {
    // Reduce hydration mismatches
    optimizePackageImports: ['@mui/material', '@mui/icons-material']
  },
  // Optimize for production
  swcMinify: true,
  // Add compiler options for better error messages in development
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production'
  }
};
