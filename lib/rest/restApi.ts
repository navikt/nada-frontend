const isServer = typeof window === 'undefined'

const apiUrl = () => {
  if (process.env.NEXT_PUBLIC_ENV === 'development') {
    return 'http://localhost:8080/api'
  }
  return isServer ? 'http://nada-backend/api' : '/api'
}

export const getDataproductUrl = (id: string) => `${apiUrl()}/dataproducts/${id}`
export const getDatasetUrl = (id: string) => `${apiUrl()}/datasets/${id}`
export const getProductAreasUrl = () => `${apiUrl()}/productareas`
export const getProductAreaUrl = (id: string) => `${apiUrl()}/productareas/${id}`
export const searchTeamKatalogenUrl = (gcpGroups?: string[]) => 
{
  const parameters = gcpGroups?.length ? gcpGroups.map(group => `gcpGroups=${encodeURIComponent(group)}`).join('&'): ''
  const query = parameters ? `?${parameters}` : ''
  return `${apiUrl()}/teamkatalogen${query}`
}


