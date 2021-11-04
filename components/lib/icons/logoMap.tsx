import { ArrayElement } from '../../../lib/schema/ArrayElement'
import { SearchContentQuery } from '../../../lib/schema/graphql'
interface LogoProps {
  size?: number | undefined
}
export const CollectionLogo = ({ size = undefined }: LogoProps) =>
  size ? (
    <img width={size} height={size} src="/result-icons/datacollection.svg" />
  ) : (
    <img src="/result-icons/datacollection.svg" />
  )
export const ProductLogo = ({ size = undefined }: LogoProps) =>
  size ? (
    <img width={size} height={size} src="/result-icons/dataproduct.svg" />
  ) : (
    <img src="/result-icons/dataproduct.svg" />
  )

export const logoMap: Record<
  ArrayElement<SearchContentQuery['search']>['__typename'],
  React.ReactNode
> = {
  Collection: <CollectionLogo />,
  Dataproduct: <ProductLogo />,
}
