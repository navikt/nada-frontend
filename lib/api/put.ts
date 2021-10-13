export const apiPUT = async (url: string, data: any) => {
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error(`${res.status} - ${res.statusText}`)

  return await res.json()
}

export default apiPUT
