import { useRouter } from 'next/router'
import { useState } from 'react'
import { ProductAreasQuery } from '../../lib/schema/graphql'
import { PAItem, PAItems } from '../../pages/productArea/[id]'
import ProductAreaContent from './content'
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

  const handleSetCurrentItem = (newCurrent: number) => {
    setCurrentItem(newCurrent)
    setCurrentTab(initialTab(paItems[newCurrent]))
  }

  const router = useRouter()
  const handleSelectProductArea = (newProductAreaID:string) => {
    router.push(`/productArea/${newProductAreaID}`)
  }

  return (
    <div className="flex flex-row h-full flex-grow gap-3">
      <ProductAreaSidebar
        productAreaItems={paItems}
        setCurrentItem={handleSetCurrentItem}
        currentItem={currentItem}
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
