import { ErrorMessage, Loader } from "@navikt/ds-react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ProductAreaView from "../../components/productArea/productAreaView";
import amplitudeLog from "../../lib/amplitude";
import { ProductAreaQuery, useProductAreaQuery } from "../../lib/schema/graphql";

export interface PAItem {
    name: string,
    dashboardURL?: string,
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
        dashboardURL: productArea.dashboardURL,
        dataproducts: productArea.dataproducts,
        stories: productArea.stories,
    })
    productArea.teams.slice().sort((a,b) => {
        return (b.dataproducts.length + b.stories.length) - (a.dataproducts.length + a.stories.length)
    }).forEach((t) => {
        items.push({
            name: t.name,
            dashboardURL: t.dashboardURL,
            dataproducts: t.dataproducts,
            stories: t.stories,
        })
    })

    return items
}

interface ProductAreaProps {
    id: string
}

const ProductArea = ({id}: ProductAreaProps) => {
    const productAreaQuery = useProductAreaQuery({
        variables: {
            id
        },
    })

    if (productAreaQuery.error) return <ErrorMessage error={productAreaQuery.error} />
    if (productAreaQuery.loading || !productAreaQuery.data?.productArea) return <Loader />

    const productArea = productAreaQuery.data.productArea
    const paItems = createPAItems(productArea)

    useEffect(() => {
        const eventProperties = {
          sidetittel: 'poside',
          title: productAreaQuery.data?.productArea?.name,
        }
        amplitudeLog('sidevisning', eventProperties)
      })
      
    return <ProductAreaView paItems={paItems}/>
}

const ProductAreaPage = () => {
    const router = useRouter()
    if (!router.isReady) return <Loader/>

    return <ProductArea id={router.query.id as string}/>
}

export default ProductAreaPage;
