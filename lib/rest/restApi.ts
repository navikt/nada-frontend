const isServer = typeof window === 'undefined'

const apiUrl = () => {
    if (process.env.NEXT_PUBLIC_ENV === 'development') {
      return 'http://localhost:8080/api'
    }
    return isServer ? 'http://nada-backend/api' : '/api'
}

export const getDataproductUrl = (id: string)=> `${apiUrl()}/dataproduct/${id}`
