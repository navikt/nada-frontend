export const apiDELETE = async (url: string) => {
  const res = await fetch(url, {
    method: 'DELETE',
  })

  if (res.status !== 204) throw new Error(`${res.status} - ${res.statusText}`)
}

export default apiDELETE
