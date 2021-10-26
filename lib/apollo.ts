import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'

const isServer = typeof window === 'undefined'
const windowApolloState = !isServer && (window.__NEXT_DATA__ as any).apolloState

let CLIENT: ApolloClient<NormalizedCacheObject> | undefined = undefined

export function getApolloClient(forceNew?: boolean) {
  if (!CLIENT || forceNew) {
    CLIENT = new ApolloClient({
      ssrMode: isServer,
      uri: 'http://localhost:3000/api/query',
      cache: new InMemoryCache().restore(windowApolloState || {}),
    })
  }

  return CLIENT
}
