import { Link } from "@navikt/ds-react";
import { Bandage } from "@navikt/ds-icons";
import { Dispatch, SetStateAction } from "react";

interface ProductAreaSidebarProps {
    dashboards: any
    setCurrentDashboard: Function
}

const ProductAreaSidebar = ({ dashboards, setCurrentDashboard }: ProductAreaSidebarProps) => {
    return (
        <div className="flex flex-col">
            {dashboards && dashboards.map((d: any, idx: number) => (
                <Link key={"dashboard-"+idx} onClick={() => setCurrentDashboard(idx)} href="#" className="nada-pa-menu-item max-w-[47rem] align-top">
                    <div className="flex flex-col border w-full border-border-inverted rounded px-4 py-3 gap-1">
                        <div className="flex flex-row gap-2">
                            <Bandage className="h-8 w-8"/>
                            <div className="whitespace-nowrap align-middle">{d.name}</div>
                        </div>
                        <p className="whitespace-nowrap text-black">{d.stories.length} fortellinger / {d.dataproducts.length} produkter</p>
                    </div>
                </Link>
            ))}
            
        </div>
    )
}

export default ProductAreaSidebar;
