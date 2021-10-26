import {
  ApolloClient,
  ApolloError,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { USER_INFO } from './queries/userInfo/userInfo'

const isServer = typeof window === 'undefined'
const windowApolloState = !isServer && (window.__NEXT_DATA__ as any).apolloState

let CLIENT: ApolloClient<NormalizedCacheObject> | undefined = undefined
let CLIENT_COOKIE: string | undefined
let USER_CLIENT: ApolloClient<NormalizedCacheObject> | undefined = undefined
let USER_CLIENT_COOKIE: string | undefined

export function getApolloClient(forceNew?: boolean, cookie?: string) {
  if (cookie != USER_CLIENT_COOKIE) {
    USER_CLIENT_COOKIE = cookie
    USER_CLIENT = undefined
  }

  if (!CLIENT || forceNew) {
    if (!cookie) {
      CLIENT = new ApolloClient({
        ssrMode: isServer,
        uri: 'http://localhost:3000/api/query',
        cache: new InMemoryCache().restore(windowApolloState || {}),
      })
    } else {
      CLIENT = new ApolloClient({
        ssrMode: isServer,
        uri: 'http://localhost:3000/api/query',
        cache: new InMemoryCache().restore(windowApolloState || {}),
        credentials: 'same-origin',
        headers: {
          cookie,
        },
      })
    }
  }

  return CLIENT
}

const getUserFetcher = (cookie?: string) => {
  if (cookie != USER_CLIENT_COOKIE) {
    USER_CLIENT_COOKIE = cookie
    console.log('invalidating client')
    USER_CLIENT = undefined
  }
  if (!USER_CLIENT) {
    USER_CLIENT = new ApolloClient({
      ssrMode: true,
      link: createHttpLink({
        uri: 'http://localhost:3000/api/query',
        credentials: 'same-origin',
        headers: {
          cookie,
        },
      }),
      cache: new InMemoryCache(),
    })
  }
  return USER_CLIENT
}

export const getUserInfo = async (cookie?: string) => {
  const client = getUserFetcher(cookie)

  try {
    const { data } = await client.query({
      query: USER_INFO,
    })
    return data
  } catch (e: any) {
    if (e.graphQLErrors[0].message === 'access denied') return undefined
    else throw e
  }
}
