import { ErrorMessage, Loader } from "@navikt/ds-react";
import { useRouter } from "next/router";
import { useState } from "react";
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

const createDashboardList = (productArea: any) => {
    let dashboards = []
    dashboards.push({
        name: productArea.name,
        dataproducts: productArea.dataproducts,
        stories: productArea.stories,
    })
    
    productArea.teams.forEach((t: any) => {
        dashboards.push({
            name: t.name,
            dataproducts: t.dataproducts,
            stories: t.stories,
        })
    })

    return dashboards
}

const ProductAreaPage = () => {
    const router = useRouter()
    const [currentDashboard, setCurrentDashboard] = useState(0)

    const productAreaQuery = useProductAreaQuery({
        variables: {
            id: router.query.id as string
        },
    })

    if (productAreaQuery.error) return <ErrorMessage error={productAreaQuery.error} />
    if (productAreaQuery.loading || !productAreaQuery.data?.productArea) return <Loader />

    const productArea = productAreaQuery.data.productArea
    const dashboards = createDashboardList(productArea)

    return (
        <div className="flex flex-row h-full flex-grow gap-3 pt-8">
            <ProductAreaSidebar dashboards={dashboards} setCurrentDashboard={setCurrentDashboard} />
            <ProductAreaContent dashboards={dashboards} currentDashboard={currentDashboard} />
        </div>
    )
}

export default ProductAreaPage;
