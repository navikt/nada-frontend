import * as React from "react";

interface ProductAreaSidebarProps {
    dashboards: any
    setCurrentDashboard: Function
    currentDashboard: number
}

const ProductAreaSidebar = ({ dashboards, setCurrentDashboard, currentDashboard }: ProductAreaSidebarProps) => {
    return (
      <div className="flex w-64 flex-col gap-2">
          {dashboards.map(( d: any, idx: number) =>
            currentDashboard == idx ? (
              <p
                className="border-l-[6px] border-l-link px-1 font-semibold py-1"
                key={idx}
                style={ idx == 0 ? {marginBottom: "1rem", borderBottom: "6px solid rgba(0, 103, 197, 1)"} : {} }
              >
                  {d.name}
                  <p className="whitespace-nowrap text-black">{d.stories.length} fortellinger / {d.dataproducts.length} produkter</p>
              </p>
            ) : (
              <a
                className="border-l-[6px] border-l-transparent font-semibold no-underline mx-1 hover:underline hover:cursor-pointer py-1"
                href="#"
                key={idx}
                onClick={() => setCurrentDashboard(idx)}
                style={ idx == 0 ? {marginBottom: "1rem", borderBottom: "6px solid rgba(0, 103, 197, 1)"} : {} }
              >
                  {d.name}
                  <p className="whitespace-nowrap text-black">{d.stories.length} fortellinger / {d.dataproducts.length} produkter</p>
              </a>
            )
          )}
      </div>
    )
}

export default ProductAreaSidebar;
