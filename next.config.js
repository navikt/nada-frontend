/** @type {import('next').NextConfig} */
const { getBackendURI } = require('./lib/api/config.js')

// for react-md-editor. see https://github.com/uiwjs/react-md-editor#support-nextjs
const removeImports = require('next-remove-imports')()

module.exports = removeImports({
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: '/api/:path*',
      destination: `${getBackendURI()}/:path*`, // Proxy to backend
    },
  ],
})
