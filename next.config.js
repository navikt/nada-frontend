/** @type {import('next').NextConfig} */
const { getBackendURI } = require('./lib/api/config.js')

module.exports = {
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: '/api/query',
      destination: `${getBackendURI()}/query`, // Proxy to backend
    },
    {
      source: '/api/:path*',
      destination: `${getBackendURI()}/api/:path*`, // Proxy to backend
    },
  ],
}
