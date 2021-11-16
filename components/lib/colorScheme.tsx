import { ArrayElement } from '../../lib/schema/ArrayElement'
import { SearchContentQuery } from '../../lib/schema/graphql'

export type ColorSchemeTypes =
  | ArrayElement<SearchContentQuery['search']>['result']['__typename']
  | 'User'

export const colorScheme: Record<ColorSchemeTypes, Record<string, string>> = {
  Dataproduct: { dark: '#396375', light: '#98cada' },
  Collection: { dark: '#5B5970', light: '#A19DC7' },
  User: { dark: '#5B5970', light: '#A19DC7' },
}
