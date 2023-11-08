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

interface DataproductsListProps {
    datasets: Dataset[]
}

const groupDatasetsByDataproduct = (datasets: any[]) => {
    let dataproducts = new Map<string, Dataset[]>()

    datasets.forEach((dataset) => {
        dataproducts.set(dataset.dataproductID, dataproducts.get(dataset.dataproductID) || [])
        dataproducts.get(dataset.dataproductID)?.push(dataset)
    })

    var datasetsGroupedByDataproduct: Array<Dataset[]> = [];
    dataproducts.forEach((datasets) => {
        datasetsGroupedByDataproduct.push(datasets)
    })

    return datasetsGroupedByDataproduct
}

export const DataproductsList = ({ datasets }: DataproductsListProps) => {
    const groupedDatasets = groupDatasetsByDataproduct(datasets)
    return (
        <>
            {groupedDatasets.map((datasets) => {
                return (
                    <>
                        <ExpansionCard key={datasets[0].dataproductID} aria-label="dataproduct-access">
                            <ExpansionCard.Header>
                                <ExpansionCard.Title>{`Dataprodukt - ${datasets[0].name}`}</ExpansionCard.Title>
                                <ExpansionCard.Description>
                                    <p>Klikk for å se datasettene du har tilgang til</p></ExpansionCard.Description>
                            </ExpansionCard.Header>
                            <ExpansionCard.Content>
                                <>
                                    {datasets.map((dataset) => {
                                        return <SearchResultLink
                                            key={dataset.id}
                                            group={dataset.owner}
                                            name={dataset.name}
                                            type={'Dataset'}
                                            keywords={dataset.keywords}
                                            link={`/dataproduct/${dataset.dataproductID}/${dataset.dataproduct.slug}/${dataset.id}`}
                                        />
                                    })
                                    }
                                </>
                            </ExpansionCard.Content>
                        </ExpansionCard>
                    </>
                )
            })}
        </>
    )
}
