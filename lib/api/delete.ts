export const apiDELETE = async (url: string) => {
  const res = await fetch(url, {
    method: 'DELETE',
  })

  if (!res.ok) throw new Error(`${res.status} - ${res.statusText}`)

  return await res.json()
}

export default apiDELETE
