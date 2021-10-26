/** @type {import('next').NextConfig} */
const { getBackendURI } = require('./lib/api/config.js')

module.exports = {
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: '/api/:path*',
      destination: `${getBackendURI()}/:path*`, // Proxy to backend
    },
  ],
}
