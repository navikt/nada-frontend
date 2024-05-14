import { ExpansionCard } from "@navikt/ds-react"
import SearchResultLink from "../search/searchResultLink"

interface Dataset {
    __typename?: 'Dataset' | undefined
    id: string
    dataproductID: string
    dataproduct: {
        name: string
        slug: string
    }
    name: string
    keywords: string[]
    slug: string
    owner: { __typename?: 'Owner' | undefined, group: string }
}

//TODO: there are dataproducts without dataset!!!!
interface DataproductsListProps {
    datasets: any[]
}

const groupDatasetsByDataproduct = (datasets: any[]) => {
    let dataproducts = new Map<string, Dataset[]>()

    datasets?.forEach((dataset) => {
        dataproducts.set(dataset.dataproductID, dataproducts.get(dataset.dataproductID) || [])
        dataproducts.get(dataset.dataproductID)?.push(dataset)
    })

    var datasetsGroupedByDataproduct: Array<any[]> = [];
    dataproducts.forEach((datasets) => {
        datasetsGroupedByDataproduct.push(datasets)
    })

    return datasetsGroupedByDataproduct
}

export const DataproductsList = ({ datasets }: DataproductsListProps) => {
    const groupedDatasets = groupDatasetsByDataproduct(datasets)
    return (
        <>
            {groupedDatasets.map((datasets, i) => {
                return (
                    <div key={i}>
                    <div className="w-[60rem]">
                        <ExpansionCard key={i} aria-label="dataproduct-access">
                            <ExpansionCard.Header>
                                <ExpansionCard.Title>{`Dataprodukt - ${datasets[0].dataproductName}`}</ExpansionCard.Title>
                                <ExpansionCard.Description>
                                    Klikk for å se datasettene du har tilgang til</ExpansionCard.Description>
                            </ExpansionCard.Header>
                            <ExpansionCard.Content className="text-center">
                                <>
                                    {datasets?.map((dataset, i) => {
                                        return <SearchResultLink
                                            key={i}
                                            group={dataset.owner}
                                            name={dataset.name}
                                            type={'Dataset'}
                                            keywords={dataset.keywords}
                                            link={`/dataproduct/${dataset.dataproductID}/${dataset.dpSlug}/${dataset.id}`}
                                        />
                                    })
                                    }
                                </>
                            </ExpansionCard.Content>
                        </ExpansionCard>
                    </div>
                    </div>
                )
            })}
        </>
    )
}
