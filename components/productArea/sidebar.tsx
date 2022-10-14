import { Data } from '@navikt/ds-icons'
import { Select } from '@navikt/ds-react'
import * as React from 'react'
import { ProductAreasQuery } from '../../lib/schema/graphql'
import { PAItems } from '../../pages/productArea/[id]'
import DataproductLogo from '../lib/icons/dataproductLogo'

interface ProductAreaSidebarProps {
  productAreaItems: PAItems
  setCurrentItem: (newCurrent: number) => void
  currentItem: number
  productAreas: ProductAreasQuery['productAreas']
  selectProductArea: (productAreaId: string) => void
}

const ProductAreaSidebar = ({
  productAreaItems,
  setCurrentItem,
  currentItem,
  productAreas,
  selectProductArea,
}: ProductAreaSidebarProps) => {
  const style = (isCurrent: boolean) =>
    `border-l-[6px] py-1 px-2 hover:cursor-default ${
      isCurrent ? 'border-l-link' : 'border-l-transparent'
    }`

  const relevantProductAreas= productAreas.filter(it=>it.areaType=== "PRODUCT_AREA" || it.areaType=== "PROJECT")
  .sort((l, r)=> l.name < r.name? -1: 1)
  return (
    <div className="pr-[2rem] w-96 pt-[1.6rem]">
      <Select
        className="w-full mb-[1rem]"
        label=""
        onChange={(e) => selectProductArea(e.target.value)}
        value={
          relevantProductAreas.find((it) => it.name == productAreaItems[0].name)?.id
        }
      >
        {relevantProductAreas.map((it, index) => (
          <option key={index} value={it.id}>
            {it.name}
          </option>
        ))}
      </Select>
      <div className="flex text-base w-full flex-col gap-2">
        {productAreaItems.map((d: any, idx: number) =>
          d.stories.length || d.dataproducts.length ? (
            <div className={style(currentItem == idx)}>
              <a
                className="font-semibold no-underline hover:underline"
                href="#"
                key={idx}
                onClick={() => setCurrentItem(idx)}
              >
                {d.name}
              </a>
              <div className="flex justify-between w-24">
                <span className="flex gap-2 items-center">
                  <Data
                    aria-label="datafortellinger"
                    className="text-text-muted"
                  />{' '}
                  {d.stories.length}
                </span>
                <span className="flex gap-2 items-center">
                  <div className="h-[18px] w-[18px] text-text-muted">
                    <DataproductLogo />
                  </div>{' '}
                  {d.dataproducts.length}
                </span>
              </div>
            </div>
          ) : (
            <div className={style(currentItem == idx)} key={idx}>
              <p className="font-semibold">{d.name}</p>
              <div className="flex justify-between w-24">
                <span className="flex gap-2 items-center">
                  <Data
                    aria-label="datafortellinger"
                    className="text-text-muted"
                  />{' '}
                  {d.stories.length}
                </span>
                <span className="flex gap-2 items-center">
                  <div className="h-[18px] w-[18px] text-text-muted">
                    <DataproductLogo />
                  </div>{' '}
                  {d.dataproducts.length}
                </span>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default ProductAreaSidebar
