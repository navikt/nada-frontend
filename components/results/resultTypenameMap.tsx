import { ArrayElement } from '../../lib/schema/ArrayElement'
import { SearchContentQuery } from '../../lib/schema/graphql'

export const resultTypenameMap: Record<
  ArrayElement<SearchContentQuery['search']>['__typename'],
  string
> = {
  Collection: 'Datasamling',
  Dataproduct: 'Dataprodukt',
}
