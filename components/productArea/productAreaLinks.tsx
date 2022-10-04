import { Bandage } from "@navikt/ds-icons";
import { Link } from "@navikt/ds-react";
import { useProductAreasQuery } from "../../lib/schema/graphql";
import ErrorMessage from "../lib/error";

const ProductAreaLinks = () => {
    const productAreasQuery = useProductAreasQuery()

    if (productAreasQuery.error) return <ErrorMessage error={productAreasQuery.error} />
    if (productAreasQuery.loading || !productAreasQuery.data?.productAreas) return <></>

    const productAreas = productAreasQuery.data.productAreas

    return (
        <div className="flex flex-row flex-wrap">
            {productAreas.map((pa) => (
                <div key={pa.id} className="py-2">
                    <Link href={`/productArea/${pa.id}`} className="nada-search-result max-w-[47rem] align-top">
                        <div className="flex flex-col border w-full border-border-inverted rounded px-4 py-3">
                            <div className="flex flex-row gap-2">
                                <Bandage />
                                <div className="whitespace-nowrap">{pa.name}</div>
                            </div>
                            <p className="whitespace-nowrap text-black">{pa.stories.length} fortellinger / {pa.dataproducts.length} produkter</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default ProductAreaLinks;
