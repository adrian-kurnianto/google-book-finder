/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'books.google.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
