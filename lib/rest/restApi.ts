const isServer = typeof window === 'undefined'

export const apiUrl = () => {
    if (process.env.NEXT_PUBLIC_ENV === 'development') {
      return 'http://localhost:8080/api'
    }
    return isServer ? 'http://nada-backend/api' : '/api'
}

export const getDataproductUrl = (id: string)=> `${apiUrl()}/dataproducts/${id}`
export const getDatasetUrl = (id: string)=> `${apiUrl()}/datasets/${id}`
export const getProductAreasUrl = () => `${apiUrl()}/productareas`
export const getProductAreaUrl = (id: string) => `${apiUrl()}/productareas/${id}`
