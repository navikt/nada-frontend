export const getBackendURI = () => {
  if (!('NEXT_PUBLIC_BACKEND' in process.env)) {
    throw new Error('Environment NEXT_PUBLIC_BACKEND must be set!')
  }
  return process.env.NEXT_PUBLIC_BACKEND
}
