import {Data} from '@navikt/ds-icons'
import {ChevronLeftDoubleIcon, ChevronRightDoubleIcon} from '@navikt/aksel-icons'
import {Select} from '@navikt/ds-react'
import * as React from 'react'
import {useState} from 'react'
import {PAItems} from '../../pages/productArea/[id]'
import DataproductLogo from '../lib/icons/dataproductLogo'

interface ProductAreaSidebarProps {
    productAreaItems: PAItems
    setCurrentItem: (newCurrent: number) => void
    currentItem: number
    productAreas: any
    selectProductArea: (productAreaId: string) => void
}

const ProductAreaSidebar = ({
                                productAreaItems,
                                setCurrentItem,
                                currentItem,
                                productAreas,
                                selectProductArea,
                            }: ProductAreaSidebarProps) => {
    const relevantProductAreas = productAreas
        .filter(
            (it: any) =>
                it.dataproductsNumber ||
                it.storiesNumber ||
                it.insightProductsNumber
        ).sort((l: any, r: any) => (l.name < r.name ? -1 : 1))

    const [collapsed, setCollapsed] = useState(false)
    return (

        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            {collapsed ? null : (
                <div className="pr-[2rem] w-96 pt-[1.6rem] hidden md:block">
                    <Select
                        className="w-full mb-[1rem]"
                        label=""
                        onChange={(e) => selectProductArea(e.target.value)}
                        value={
                            relevantProductAreas.find((it: any) => it.name == productAreaItems[0].name)
                                ?.id
                        }
                    >
                        {relevantProductAreas.map((it: any, index: number) => (
                            <option key={index} value={it.id}>
                                {it.name}
                            </option>
                        ))}
                    </Select>
                    <div className="flex text-base w-full flex-col gap-2">
                        {productAreaItems.map((d: any, idx: number) =>
                                d.stories.length + d.dataproducts.length + d.insightProducts.length ? (
                                    <div
                                        key={idx}
                                        className={`border-l-[6px] py-1 px-2 hover:cursor-default ${
                                            currentItem == idx
                                                ? 'border-l-text-action'
                                                : 'border-l-transparent'
                                        }`}
                                    >
                                        <a
                                            className="font-semibold no-underline hover:underline"
                                            href="#"
                                            onClick={() => setCurrentItem(idx)}
                                        >
                                            {d.name}
                                        </a>
                                        <div className="flex justify-between w-24">
                <span className="flex gap-2 items-center">
                  <Data
                      aria-label="datafortellinger"
                      className="text-text-subtle"
                  />{' '}
                    {d.stories.length}
                </span>
                                            <span className="flex gap-2 items-center">
                  <div className="h-[14px] w-[14px] text-text-subtle">
                    <DataproductLogo/>
                  </div>
                                                {' '}
                                                {d.dataproducts.length}
                </span>
                                            <span className="flex gap-2 items-center">
                  <div className="h-[14px] w-[14px] text-text-subtle">
                    <Data/>
                  </div>
                                                {' '}
                                                {d.insightProducts.length}
                </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        key={idx}
                                        className={`border-l-[6px] py-1 px-2 hover:cursor-default ${
                                            currentItem == idx
                                                ? 'border-l-text-action'
                                                : 'border-l-transparent'
                                        }`}
                                    >
                                        <p className="font-semibold">{d.name}</p>
                                        <div className="flex justify-between w-24">
                <span className="flex gap-2 items-center">
                  <Data
                      aria-label="datafortellinger"
                      className="text-text-subtle"
                  />{' '}
                    {d.stories.length}
                </span>
                                            <span className="flex gap-2 items-center">
                  <div className="h-[18px] w-[18px] text-text-subtle">
                    <DataproductLogo/>
                  </div>
                                                {' '}
                                                {d.dataproducts.length}
                </span>
                                        </div>
                                    </div>
                                )
                        )}
                    </div>
                </div>
            )}
            <button className="hidden md:block" onClick={() => setCollapsed(!collapsed)}>
                {collapsed ? <ChevronRightDoubleIcon/> : <ChevronLeftDoubleIcon/>}
            </button>
        </div>)
}
export default ProductAreaSidebar
