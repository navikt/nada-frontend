import { SearchResultEntryType } from '../../../lib/schema/schema_types'

const CollectionLogo = () => <img src="/result-icons/datacollection.svg" />
const ProductLogo = () => <img src="/result-icons/dataproduct.svg" />

export const logoMap: Record<SearchResultEntryType, React.ReactNode> = {
  collection: <CollectionLogo />,
  datapackage: <CollectionLogo />,
  dataproduct: <ProductLogo />,
}
