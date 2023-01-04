import { System } from '@navikt/ds-icons'
import { Heading } from '@navikt/ds-react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ProductAreasQuery } from '../../lib/schema/graphql'
import { PAItem, PAItems } from '../../pages/productArea/[id]'
import ProductAreaContent from './content'
import ProductAreaMobileMenu from './productAreaMobileMenu'
import ProductAreaSidebar from './sidebar'

interface ProductAreaViewProps {
  paItems: PAItems
  productAreas: ProductAreasQuery['productAreas']
}

const ProductAreaView = ({ paItems, productAreas }: ProductAreaViewProps) => {
  const initialTab = (item: PAItem) => {
    return item.dashboardURL ? 'dashboard' : 'stories'
  }

  const [currentItem, setCurrentItem] = useState(0)
  const [currentTab, setCurrentTab] = useState(initialTab(paItems[0]))
  const [open, setOpen] = useState(false)

  const handleSetCurrentItem = (newCurrent: number) => {
    setCurrentItem(newCurrent)
    setCurrentTab(initialTab(paItems[newCurrent]))
  }

  const router = useRouter()
  const handleSelectProductArea = (newProductAreaID:string) => {
    router.push(`/productArea/${newProductAreaID}`)
  }

  return (
    <div className="flex flex-col md:flex-row gap-3 py-4">
      <ProductAreaSidebar
        productAreaItems={paItems}
        setCurrentItem={handleSetCurrentItem}
        currentItem={currentItem}
        productAreas={productAreas}
        selectProductArea={handleSelectProductArea}
      />
      <div className="flex gap-4 items-center md:hidden">
        <Heading level="1" size="large">{paItems[currentItem].name}</Heading>
        <a className="flex gap-2 items-center" href="#" onClick={() => setOpen(!open)}><System className="w-4 h-4" />Utforsk</a>
      </div>
      <ProductAreaMobileMenu 
        open={open}
        setOpen={setOpen}
        productAreaItems={paItems}
        setCurrentItem={handleSetCurrentItem}
        productAreas={productAreas}
        selectProductArea={handleSelectProductArea}
      />
      <ProductAreaContent
        currentItem={paItems[currentItem]}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
    </div>
  )
}

export default ProductAreaView
