/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'steamcdn-a.akamaihd.net', 
      'media.steampowered.com', 
      'cdn.akamai.steamstatic.com', 
      'store.akamai.steamstatic.com', 
      'shared.akamai.steamstatic.com'
    ],
    unoptimized: true, // This can help with external image sources
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://localhost:1200/api/v1/:path*',
      },
    ];
  },
};

module.exports = nextConfig;