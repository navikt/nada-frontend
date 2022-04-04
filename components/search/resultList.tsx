import {QueryResult} from "@apollo/client";
import {
    DataproductExtractInfo,
    Exact,
    Scalars,
    SearchContentWithOptionsQuery,
    SearchOptions,
} from "../../lib/schema/graphql";
import ErrorMessage from "../lib/error";
import LoaderSpinner from "../lib/spinner";
import SearchResultLink from "./searchResultLink";
import styled from "styled-components";
import { format, parseISO } from "date-fns";
import { nb } from "date-fns/locale";

const Results = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  a {
    text-decoration: none;
  }
`

const ExpiredSearchResultLink = styled(SearchResultLink)`
    color: #999;
    cursor: disabled;
`

type ResultListInterface = {
    search?: QueryResult<SearchContentWithOptionsQuery, Exact<{ options: SearchOptions }>>
    dataproducts?: { __typename?: "Dataproduct" | undefined, id: string, name: string, keywords: string[], owner: { __typename?: "Owner" | undefined, group: string } }[]
    stories?: { __typename?: 'Story', id: string, name: string, owner?: { __typename?: 'Owner'; group: string } | null | undefined }[] 
    extracts?: Array<{__typename?: 'DataproductExtractInfo', id: string, dataproductID: string, ready?: any | null | undefined, expired?: any | null | undefined, created: any, signedURL: string}>
}

const parseDate = (date: string) => format(parseISO(date), "dd. MMMM yyyy HH:mm:ii", { locale: nb })

const ResultList = ({search, dataproducts, stories, extracts}: ResultListInterface) => {
    if (extracts) {
        return (<Results>
            {extracts.map(extract => (extract.ready && new Date(extract.expired) > new Date()) ? <SearchResultLink 
                key={extract.id}
                name="Extract"
                excerpt={`Forespurt ${parseDate(extract.created)}, utløper ${parseDate(extract.expired)}`}
                link={extract.signedURL} />
                : <ExpiredSearchResultLink key={extract.id} name={`${dataproducts?.find(d => d.id === extract.dataproductID)?.name ?? ""} ${extract.ready ? "" : "(eksport ikke ferdig)"} ${new Date(extract.expired) <= new Date() ? "(eksport utgått på dato)" : ""}`} link="#" />
                )}
        </Results>)
    }
    if (dataproducts) {
        return (<Results>
            {
                dataproducts.map((d, idx) =>
                    <SearchResultLink key={idx} group={d.owner.group} name={d.name} keywords={d.keywords}
                                      link={`/dataproduct/${d.id}`}/>
                )
            }
        </Results>)
    }

    if (search) {
        const {data, loading, error} = search
        if (error) return <ErrorMessage error={error}/>
        if (loading || !data) return <LoaderSpinner/>
        return (
            <div>
                <p> {data.search.length > 0 ? `${data.search.length} resultater` : 'ingen resultater'}</p>

                <Results>
                    {
                        data.search.map((d, idx) => {

                            if (d.result.__typename === 'Dataproduct') {
                                return <SearchResultLink key={idx} group={d.result.owner.group}
                                                         name={d.result.name}
                                                         keywords={d.result.keywords}
                                                         excerpt={d.excerpt}
                                                         link={`/dataproduct/${d.result.id}`}/>
                            }

                            if (d.result.__typename === 'Story') {
                                console.log(d.result.keywords)
                                return <SearchResultLink key={idx} group={d.result.group!.group}
                                                         name={d.result.name}
                                                         type={"story"}
                                                         keywords={d.result.keywords}
                                                         excerpt={d.excerpt}
                                                         link={`/story/${d.result.id}`}/>
                            }
                        })
                    }
                </Results>
            </div>
        )
    }
    if (stories) {
        return (<Results>
            {
                stories.map((s, idx) =>
                    <SearchResultLink key={idx} group={s.owner?.group} name={s.name}
                        link={`/story/${s.id}`} />
                )
            }
        </Results>)
    }
    return <></>
}
export default ResultList
