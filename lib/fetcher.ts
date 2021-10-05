export const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    const error = new Error(`${res.status} - ${res.statusText}`)
    throw error
  }
  return res.json()
}
export default fetcher
