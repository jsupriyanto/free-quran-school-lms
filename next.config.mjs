/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Remove output: 'export' for API routes to work
  // Azure Static Web Apps supports Next.js with API routes
};
