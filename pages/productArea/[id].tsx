import { ErrorMessage, Loader } from "@navikt/ds-react";
import ProductAreaContent from "../../components/productArea/content";
import ProductAreaSidebar from "../../components/productArea/sidebar";
import { DataproductQuery, SearchContentWithOptionsQuery, SearchType, useSearchContentQuery, useSearchContentWithOptionsQuery } from "../../lib/schema/graphql";

interface ProductAreaProps {
    id: string;
}

export interface Dataproduct {
    __typename: 'Dataproduct';
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
    __typename: 'Story';
    id: string;
    name: string;
    created: any;
    keywords: Array<string>;
    modified?: any | null | undefined;
    group: {
        __typename?: 'Owner';
        group: string;
        teamkatalogenURL?: string | null | undefined;
    };
};

const extractProductsAndStories = (data: SearchContentWithOptionsQuery) => {
    let dataproducts: Array<Dataproduct> = []
    let stories: Array<Story> = []
    data.search.forEach((elem) => {
        if (elem.result.__typename == "Dataproduct") dataproducts.push(elem.result)
        else if (elem.result.__typename == "Story") stories.push(elem.result)
    })
    return { dataproducts, stories }
}

const ProductArea = ({ id }: ProductAreaProps) => {
    // todo: replace with search for productArea data
    const productAreaSearch = useSearchContentWithOptionsQuery({
        variables: {
            options: {
                limit: 10,
                types: [SearchType.Dataproduct, SearchType.Story]
            },
        },
        fetchPolicy: 'network-only',
    })

    if (productAreaSearch.error) return <ErrorMessage error={productAreaSearch.error} />
    if (productAreaSearch.loading || !productAreaSearch.data?.search) return <Loader />

    const { dataproducts, stories } = extractProductsAndStories(productAreaSearch.data)

    return (
        <div className="flex flex-row h-full flex-grow gap-3 pt-8">
            <ProductAreaSidebar name="Produktområde helse" stats={{ dataproducts: dataproducts.length, stories: stories.length }} />
            <ProductAreaContent dataproducts={dataproducts} stories={stories} />
        </div>
    )
}

export default ProductArea;
