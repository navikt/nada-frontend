export const getBackendURI = (): string => {
  if (
    process?.env?.NEXT_PUBLIC_BACKEND &&
    process.env.NEXT_PUBLIC_BACKEND.length
  ) {
    return process.env.NEXT_PUBLIC_BACKEND
  }
  return 'http://localhost:3000/api'
}
