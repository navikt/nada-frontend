import { Loader } from '@navikt/ds-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import ErrorMessage from '../../components/lib/error'
import InnerContainer from '../../components/lib/innerContainer'
import ProductAreaView from '../../components/productArea/productAreaView'
import amplitudeLog from '../../lib/amplitude'
import {
  ProductAreaQuery,
  useProductAreaQuery,
} from '../../lib/schema/graphql'
import { useGetProductAreas } from '../../lib/rest/productAreas'


export interface PAItem {
  name: string
  id?: string
  dashboardURL?: string
  dataproducts: {
    __typename?: 'Dataproduct'
    id: string
    name: string
    description: string
    created: any
    lastModified: any
    keywords: Array<string>
    slug: string
    owner: {
      __typename?: 'Owner'
      group: string
      teamkatalogenURL?: string | null | undefined
      teamContact?: string | null | undefined
    }
  }[]
  stories: {
    __typename?: 'Story'
    id: string
    name: string
    description: string
    created: any
    keywords: Array<string>
    lastModified?: any | null | undefined
  }[]
  insightProducts: {
    __typename?: 'InsightProduct'
    id: string
    name: string
    link: string
    type: string
    description: string
    created: any
    lastModified?: any
    keywords: Array<string>
  }[]
}

export interface PAItems extends Array<PAItem> { }

const isRelevantPA = (productArea: ProductAreaQuery['productArea']) => {
  return (
    productArea.dataproducts.length
    || productArea.stories.length
    || productArea.insightProducts.length
  )
}

const createPAItems = (productArea: ProductAreaQuery['productArea']) => {
  let items = []
  if (isRelevantPA(productArea)) {
    items.push({
      name: productArea.name,
      dashboardURL: productArea.dashboardURL,
      dataproducts: productArea.dataproducts,
      stories: productArea.stories,
      insightProducts: productArea.insightProducts,
    })
    productArea.teams
      .slice()
      .filter(
        (it) =>
          it.dataproducts.length > 0 ||
          it.stories.length > 0 ||
          it.insightProducts.length > 0
      )
      .sort((a, b) => {
        return (
          b.dataproducts.length +
          b.insightProducts.length -
          (a.dataproducts.length + a.stories.length + a.insightProducts.length)
        )
      })
      .forEach((t) => {
        items.push({
          name: t.name,
          id: t.id,
          dashboardURL: t.dashboardURL,
          dataproducts: t.dataproducts,
          stories: t.stories,
          insightProducts: t.insightProducts,
        })
      })
  }

  return items
}

interface ProductAreaProps {
  id: string
  productAreas: any[]
}

const ProductArea = ({ id, productAreas }: ProductAreaProps) => {
  const productAreaQuery = useProductAreaQuery({
    variables: {
      id,
    },
  })

  useEffect(() => {
    if (!productAreaQuery.loading && productAreaQuery.data) {
      const eventProperties = {
        sidetittel: 'poside',
        title: productAreaQuery.data.productArea?.name,
      }
      amplitudeLog('sidevisning', eventProperties)
    }
  })

  if (productAreaQuery.error)
    return <ErrorMessage error={productAreaQuery.error} />
  if (productAreaQuery.loading || !productAreaQuery.data?.productArea)
    return <Loader />

  const productArea = productAreaQuery.data.productArea
  const paItems = createPAItems(productArea)

  return <ProductAreaView paItems={paItems} productAreas={productAreas} />
}

const ProductAreaPage = () => {
  const router = useRouter()
  const { productAreas, loading, error } = useGetProductAreas()

  if (!router.isReady) return <Loader />

  if (error)
    return (
      <div>
        <p>Teamkatalogen er utilgjengelig. Se på slack channel <Link href="https://slack.com/app_redirect?channel=teamkatalogen">#Teamkatalogen</Link></p>
        <ErrorMessage error={error} />
      </div>
    )
  if ( loading ||!productAreas?.length)
    return <Loader />

  return (
    <InnerContainer>
      <ProductArea
        id={router.query.id as string}
        productAreas={productAreas}
      />
    </InnerContainer>
  )
}

export default ProductAreaPage
