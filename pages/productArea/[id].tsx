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
  ProductAreasQuery,
  useProductAreaQuery,
  useProductAreasQuery,
} from '../../lib/schema/graphql'


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
    created: any
    keywords: Array<string>
    lastModified?: any | null | undefined
    owner: {
      __typename?: 'Owner'
      group: string
      teamkatalogenURL?: string | null | undefined
    }
  }[]
  quartoStories: {
    __typename?: 'QuartoStory'
    id: string
    name: string
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

export interface PAItems extends Array<PAItem> {}

const createPAItems = (productArea: ProductAreaQuery['productArea']) => {
  let items = []
  items.push({
    name: productArea.name,
    dashboardURL: productArea.dashboardURL,
    dataproducts: productArea.dataproducts,
    stories: productArea.stories,
    quartoStories: productArea.quartoStories,
    insightProducts: productArea.insightProducts,
  })
  productArea.teams
    .slice()
    .sort((a, b) => {
      return (
        b.dataproducts.length +
        b.stories.length +
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
        quartoStories: t.quartoStories,
        insightProducts: t.insightProducts,
      })
    })

  return items
}

interface ProductAreaProps {
  id: string
  productAreas: ProductAreasQuery['productAreas']
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
  const productAreasQuery = useProductAreasQuery()

  if (!router.isReady) return <Loader />

  if (productAreasQuery.error)
    return (
      <div>
        <p>Teamkatalogen er utilgjengelig. Se på slack channel <Link href="https://slack.com/app_redirect?channel=teamkatalogen">#Teamkatalogen</Link></p>
        <ErrorMessage error={productAreasQuery.error} />
      </div>
    )
  if (
    productAreasQuery.loading ||
    !productAreasQuery.data?.productAreas ||
    !productAreasQuery.data.productAreas.length
  )
    return <Loader />

  return (
    <InnerContainer>
      <ProductArea
        id={router.query.id as string}
        productAreas={productAreasQuery.data.productAreas}
      />
    </InnerContainer>
  )
}

export default ProductAreaPage
