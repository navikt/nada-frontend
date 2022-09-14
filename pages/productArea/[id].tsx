import { ErrorMessage, Loader } from "@navikt/ds-react";
import { useRouter } from "next/router";
import { useState } from "react";
import ProductAreaContent from "../../components/productArea/content";
import ProductAreaSidebar from "../../components/productArea/sidebar";
import { ProductAreaQuery, useProductAreaQuery } from "../../lib/schema/graphql";

interface PAItem {
    name: string,
    dataproducts: {
        __typename?: 'Dataproduct';
        id: string;
        name: string;
        description: string;
        created: any;
        lastModified: any;
        keywords: Array<string>;
        slug: string;
        owner: {
            __typename?: 'Owner';
            group: string;
            teamkatalogenURL?: string | null | undefined;
            teamContact?: string | null | undefined;
        }
    }[],
    stories: {
        __typename?: 'Story';
        id: string;
        name: string;
        created: any;
        keywords: Array<string>;
        lastModified?: any | null | undefined;
        owner: {
            __typename?: 'Owner';
            group: string;
            teamkatalogenURL?: string | null | undefined;
        }
    }[],
}

export interface PAItems extends Array<PAItem>{}

const createPAItems = (productArea: ProductAreaQuery["productArea"]) => {
    let items = []
    items.push({
        name: productArea.name,
        dataproducts: productArea.dataproducts,
        stories: productArea.stories,
    })
    
    productArea.teams.forEach((t) => {
        items.push({
            name: t.name,
            dataproducts: t.dataproducts,
            stories: t.stories,
        })
    })

    return items
}

const ProductAreaPage = () => {
    const router = useRouter()
    const [currentItem, setCurrentItem] = useState(0)

    const productAreaQuery = useProductAreaQuery({
        variables: {
            id: router.query.id as string
        },
    })

    if (productAreaQuery.error) return <ErrorMessage error={productAreaQuery.error} />
    if (productAreaQuery.loading || !productAreaQuery.data?.productArea) return <Loader />

    const productArea = productAreaQuery.data.productArea
    const paItems = createPAItems(productArea)

    return (
        <div className="flex flex-row h-full flex-grow gap-3 pt-8">
            <ProductAreaSidebar productAreaItems={paItems} setCurrentItem={setCurrentItem} currentItem={currentItem} />
            <ProductAreaContent productAreaItems={paItems} currentItem={currentItem} />
        </div>
    )
}

export default ProductAreaPage;
