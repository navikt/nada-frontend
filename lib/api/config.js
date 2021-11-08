module.exports = {
  getBackendURI: () => {
    if (
      process?.env?.NEXT_PUBLIC_BACKEND &&
      process.env.NEXT_PUBLIC_BACKEND.length
    ) {
      return process.env.NEXT_PUBLIC_BACKEND
    }
    return 'http://127.0.0.1:8080/api'
  },
}
