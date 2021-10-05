export const fetcher = async (url: string) => {
  const res = await fetch(`api${url}`)
  if (!res.ok) {
    throw new Error(`${res.status} - ${res.statusText}`)
  }
  return res.json()
}
export default fetcher
// https://nada.intern.nav.no/
