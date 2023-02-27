import { Heading, Link } from '@navikt/ds-react'
import { useProductAreasQuery } from '../../lib/schema/graphql'
import ExploreAreasIcon from '../lib/icons/exploreAreasIcon'

const ProductAreaLinks = () => {
  var defaultProductAreaID = '6b149078-927b-4570-a1ce-97bbb9499fb6'
  const productAreasQuery = useProductAreasQuery()

  if (productAreasQuery.data) {
    defaultProductAreaID =
    productAreasQuery.data.productAreas.find(
      (it) => it.id == '6b149078-927b-4570-a1ce-97bbb9499fb6'
    )?.id || productAreasQuery.data.productAreas[0].id
  }
  
  return (
    <div className="border border-border-default bg-white rounded-lg w-11/12 md:w-[17rem] md:h-[22rem] p-4 flex items-center flex-col gap-4">
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
