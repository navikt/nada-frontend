import { useState } from "react"
import { PAItem, PAItems } from "../../pages/productArea/[id]"
import ProductAreaContent from "./content"
import ProductAreaSidebar from "./sidebar"

interface ProductAreaViewProps {
    paItems: PAItems
}

const ProductAreaView = ({paItems}: ProductAreaViewProps) => {
    const initialTab = (item: PAItem) => {
        return item.dashboardURL ? "dashboard" : "stories"
    }

    const [currentItem, setCurrentItem] = useState(0)
    const [currentTab, setCurrentTab] = useState(initialTab(paItems[0]))

    const handleSetCurrentItem = (newCurrent: number) => {
        setCurrentItem(newCurrent)
        setCurrentTab(initialTab(paItems[newCurrent]))
    }

    return (
        <div className="flex flex-row h-full flex-grow gap-3 pt-8">
            <ProductAreaSidebar productAreaItems={paItems} setCurrentItem={handleSetCurrentItem} currentItem={currentItem} />
            <ProductAreaContent currentItem={paItems[currentItem]} currentTab={currentTab} setCurrentTab={setCurrentTab} />
        </div>
    )
}

export default ProductAreaView;