import { Bandage } from "@navikt/ds-icons";
import { Heading, Link } from "@navikt/ds-react";
import { useProductAreasQuery } from "../../lib/schema/graphql";
import ErrorMessage from "../lib/error";

const ProductAreaLinks = () => {
    const productAreasQuery = useProductAreasQuery()

    if (productAreasQuery.error) return <ErrorMessage error={productAreasQuery.error} />
    if (productAreasQuery.loading || !productAreasQuery.data?.productAreas) return <></>

    const productAreas = productAreasQuery.data.productAreas

    return (
        <div className="border border-border-muted bg-white rounded-lg w-11/12 md:w-[32rem] h-fit p-4">
            <Heading level="2" size="medium">Utforsk områder</Heading>
            <p>Er du nysgjerrig på hva de ulike områdene i NAV gjør? Her kan du utforske dataprodukter og fortellinger områdene har publisert.</p>
            <p>Foreløpig viser vi kun en pilot.</p>
                            
            {productAreas.map((pa) => (
                <div key={pa.id} className="py-2">
                    <Link href={`/productArea/${pa.id}`} className="nada-product-area-link max-w-[47rem] align-top">
                        <div className="flex flex-col w-full px-4 py-3">
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
