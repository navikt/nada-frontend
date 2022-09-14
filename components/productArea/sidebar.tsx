import * as React from "react";
import { PAItems } from "../../pages/productArea/[id]";

interface ProductAreaSidebarProps {
    productAreaItems: PAItems
    setCurrentItem: React.Dispatch<React.SetStateAction<number>>
    currentItem: number
}

const ProductAreaSidebar = ({ productAreaItems, setCurrentItem, currentItem }: ProductAreaSidebarProps) => {
    return (
      <div className="flex w-64 flex-col gap-2">
          {productAreaItems.map(( d: any, idx: number) => {
              if (d.stories.length == 0 && d.dataproducts.length == 0 ) {
                  return <div
                    className="border-l-[6px] border-l-transparent mx-1 py-1 hover:cursor-default"
                    key={idx}
                    style={ idx == 0 ? {marginBottom: "1rem", borderBottom: "6px solid rgba(0, 103, 197, 1)"} : {} }
                  >
                      {d.name}
                      <p className="whitespace-nowrap">{d.stories.length} fortellinger / {d.dataproducts.length} produkter</p>
                  </div>
              } else if (currentItem == idx) {
                  return <div
                    className="border-l-[6px] border-l-link px-1 font-semibold py-1"
                    key={idx}
                    style={ idx == 0 ? {marginBottom: "1rem", borderBottom: "6px solid rgba(0, 103, 197, 1)"} : {} }
                  >
                      {d.name}
                      <p className="whitespace-nowrap text-black">{d.stories.length} fortellinger / {d.dataproducts.length} produkter</p>
                  </div>
              } else {
                  return <a
                    className="border-l-[6px] border-l-transparent font-semibold no-underline mx-1 hover:underline hover:cursor-pointer py-1"
                    href="#"
                    key={idx}
                    onClick={() => setCurrentItem(idx)}
                    style={ idx == 0 ? {marginBottom: "1rem", borderBottom: "6px solid rgba(0, 103, 197, 1)"} : {} }
                  >
                      {d.name}
                      <p className="whitespace-nowrap">{d.stories.length} fortellinger / {d.dataproducts.length} produkter</p>
                  </a>
              }
            }
          )}
      </div>
    )
}

export default ProductAreaSidebar;
