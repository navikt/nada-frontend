/** @type {import('next').NextConfig} */
const { getBackendURI } = require('./lib/api/config.js')

// for react-md-editor. see https://github.com/uiwjs/react-md-editor#support-nextjs
const removeImports = require('next-remove-imports')()

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(removeImports({
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: '/api/:path*',
      destination: `${getBackendURI()}/:path*`, // Proxy to backend
    },
  ],
}))
