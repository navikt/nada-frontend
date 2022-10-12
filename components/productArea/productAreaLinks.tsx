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
            <p>Foreløpig viser vi kun en pilot for {productAreas.map((pa) => (
                <Link href={`/productArea/${pa.id}`}>{pa.name}</Link>
                ))}
            </p>
        </div>
    )
}

export default ProductAreaLinks;
