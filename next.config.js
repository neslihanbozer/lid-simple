/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use export for production builds
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  ...(process.env.NODE_ENV === 'production' && { trailingSlash: true }),
  images: {
    unoptimized: true
  },
  async redirects() {
    return [
      { source: '/einbuergerungstest', destination: '/', permanent: true },
      { source: '/einbuergerungstest/', destination: '/', permanent: true },
      { source: '/berlin-fragen', destination: '/bundeslaender/berlin-fragen', permanent: true },
    ];
  },
}

module.exports = nextConfig
