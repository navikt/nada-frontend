import { Bandage } from '@navikt/ds-icons'
import { Heading, Link } from '@navikt/ds-react'
import { useProductAreasQuery } from '../../lib/schema/graphql'
import ErrorMessage from '../lib/error'
import ExploreAreasIcon from '../lib/icons/exploreAreasIcon'

const ProductAreaLinks = () => {
  const productAreasQuery = useProductAreasQuery()

  if (productAreasQuery.error)
    return <ErrorMessage error={productAreasQuery.error} />
  if (
    productAreasQuery.loading ||
    !productAreasQuery.data?.productAreas ||
    !productAreasQuery.data.productAreas.length
  )
    return <></>

  const defaultProductAreaID =
    productAreasQuery.data.productAreas.find(
      (it) => it.id == '6b149078-927b-4570-a1ce-97bbb9499fb6'
    )?.id || productAreasQuery.data.productAreas[0].id
  return (
    <div className="border border-border-muted bg-white rounded-lg w-11/12 md:w-[35rem] h-fit p-4 flex items-center flex-col md:flex-row gap-4 md:gap-0">
      <div className="mr-6">
        <ExploreAreasIcon />
      </div>
      <div>
        <Heading level="2" size="medium">
          <Link
            href={`/productArea/${defaultProductAreaID}`}
            className="underline"
          >
            Utforsk områder
          </Link>
        </Heading>
        <p>Er du nysgjerrig på hva de ulike områdene i NAV gjør?
          Her kan du utforske dataprodukter og fortellinger noen av områdene har publisert.</p>
      </div>
    </div>
  )
}

export default ProductAreaLinks
