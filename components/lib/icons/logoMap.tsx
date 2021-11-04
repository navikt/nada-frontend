import { ArrayElement } from '../../../lib/schema/ArrayElement'
import { SearchContentQuery } from '../../../lib/schema/graphql'

const CollectionLogo = () => <img src="/result-icons/datacollection.svg" />
const ProductLogo = () => <img src="/result-icons/dataproduct.svg" />

export const logoMap: Record<
  ArrayElement<SearchContentQuery['search']>['__typename'],
  React.ReactNode
> = {
  Collection: <CollectionLogo />,
  Dataproduct: <ProductLogo />,
}
