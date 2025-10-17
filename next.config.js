/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  async redirects() {
    return [
      { source: '/einbuergerungstest', destination: '/', permanent: true },
      { source: '/einbuergerungstest/', destination: '/', permanent: true },
    ];
  },
}

module.exports = nextConfig
