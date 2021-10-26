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

// The currently loaded nada-backend Apollo client.
let CLIENT: ApolloClient<NormalizedCacheObject> | undefined = undefined
// The currently loaded nada-backend Apollo client for user profile fetching.
// The need for a separate fetcher just for userInfo is questionable.
let USER_CLIENT: ApolloClient<NormalizedCacheObject> | undefined = undefined

// FIXME: I don't see how this can be anything but wrong
// Cached user client cookies. Intention is to flush cache on any change of user cookies.
// But is this local to user context or will two people using the same node.js server compete over it?
let USER_CLIENT_COOKIE: string | undefined
let CLIENT_COOKIE: string | undefined

// TODO: Refactor. The logic of this file is not yet properly thought through.
// - We probably don't need to duplicate a whole client just for UserInfo.
// - We are using the entire cookie object to compare user state, meaning that if any client-side cookies change,
//      we trigger a re-query. Varying on all cookies could be an overly defensive caching strategy?

// Returns the appropriate URI depending on whether this is running on client or server.
// Apollo Client requires absolute URLs on servers, but supports relative URLs on clients, which is convenient.
// On the server, we know 'localhost:3000/api' will proxy to the configured back-end anyway.
const apolloQueryURI = isServer
  ? 'http://localhost:3000/api/query'
  : '/api/query'

// Returns a nada-backend apolloClient.
export function getApolloClient(forceNew?: boolean, cookie?: string) {
  if (cookie != USER_CLIENT_COOKIE) {
    USER_CLIENT_COOKIE = cookie
    USER_CLIENT = undefined
  }

  if (!CLIENT || forceNew) {
    if (!cookie) {
      CLIENT = new ApolloClient({
        ssrMode: isServer,
        uri: apolloQueryURI,
        cache: new InMemoryCache().restore(windowApolloState || {}),
      })
    } else {
      CLIENT = new ApolloClient({
        ssrMode: isServer,
        uri: apolloQueryURI,
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

// Returns a nada-backend apolloClient, specifically for user fetching.
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
        uri: apolloQueryURI,
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
    if (e?.graphQLErrors?.[0]?.message === 'access denied') return undefined
    else throw e
  }
}
