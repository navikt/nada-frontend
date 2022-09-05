import { Link } from "@navikt/ds-react";
import { Employer } from "@navikt/ds-icons";

interface ProductAreaSidebarProps {
    name: string
    stats: {
        dataproducts: number
        stories: number
    }
}

const ProductAreaSidebar = ({ name, stats }: ProductAreaSidebarProps) => {
    return (
        <div className="py-2">
            <Link href="#" className="nada-search-result max-w-[47rem] align-top">
                <div className="flex flex-col border w-full border-border-inverted rounded px-4 py-3">
                    <div className="flex flex-row gap-2">
                        <Employer />
                        <div className="whitespace-nowrap">{name}</div>
                    </div>
                    <p className="whitespace-nowrap">{stats.stories} fortellinger / {stats.dataproducts} produkter</p>
                </div>
            </Link>
        </div>
    )
}

export default ProductAreaSidebar;
