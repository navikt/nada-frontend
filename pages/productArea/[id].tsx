import { ErrorMessage, Loader } from "@navikt/ds-react";
import { useRouter } from "next/router";
import ProductAreaContent from "../../components/productArea/content";
import ProductAreaSidebar from "../../components/productArea/sidebar";
import { useProductAreaQuery } from "../../lib/schema/graphql";

export interface Dataproduct {
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
    };
}

export interface Story {
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
    };
};

const ProductAreaPage = () => {
    const router = useRouter()

    const productAreaQuery = useProductAreaQuery({
        variables: {
            id: router.query.id as string
        },
    })

    if (productAreaQuery.error) return <ErrorMessage error={productAreaQuery.error} />
    if (productAreaQuery.loading || !productAreaQuery.data?.productArea) return <Loader />

    const productArea = productAreaQuery.data.productArea

    return (
        <div className="flex flex-row h-full flex-grow gap-3 pt-8">
            <ProductAreaSidebar name={productArea.name} stats={{ dataproducts: productArea.dataproducts.length, stories: productArea.stories.length }} />
            <ProductAreaContent dataproducts={productArea.dataproducts} stories={productArea.stories} />
        </div>
    )
}

export default ProductAreaPage;
