import { Link } from "@navikt/ds-react";
import { Bandage } from "@navikt/ds-icons";

interface ProductAreaSidebarProps {
    name: string
    stats: {
        dataproducts: number
        stories: number
    }
}

const ProductAreaSidebar = ({ name, stats }: ProductAreaSidebarProps) => {
    return (
        <div>
            <Link href="#" className="nada-pa-menu-item max-w-[47rem] align-top">
                <div className="flex flex-col border w-full border-border-inverted rounded px-4 py-3 gap-1">
                    <div className="flex flex-row gap-2">
                        <Bandage className="h-8 w-8"/>
                        <div className="whitespace-nowrap align-middle">{name}</div>
                    </div>
                    <p className="whitespace-nowrap text-black">{stats.stories} fortellinger / {stats.dataproducts} produkter</p>
                </div>
            </Link>
        </div>
    )
}

export default ProductAreaSidebar;
