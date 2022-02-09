import {QueryResult} from "@apollo/client";
import {
    Exact,
    SearchContentWithOptionsQuery,
    SearchOptions,
} from "../../lib/schema/graphql";
import ErrorMessage from "../lib/error";
import LoaderSpinner from "../lib/spinner";
import SearchResultLink from "./searchResultLink";
import styled from "styled-components";

const Results = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

type ResultListInterface = {
    search?: QueryResult<SearchContentWithOptionsQuery, Exact<{ options: SearchOptions }>>
    dataproducts?: { __typename?: "Dataproduct" | undefined, id: string, name: string, keywords: string[], owner: { __typename?: "Owner" | undefined, group: string } }[]
}
const ResultList = ({search, dataproducts}: ResultListInterface) => {
    if (dataproducts) {
        return (
            <Results>
                {
                    dataproducts.map((d, idx) =>
                        <SearchResultLink key={idx} group={d.owner.group} name={d.name} keywords={d.keywords}
                                          link={`/dataproduct/${d.id}`}/>
                    )
                }
            </Results>
        )
    }

    if (search) {
        const {data, loading, error} = search
        if (error) return <ErrorMessage error={error}/>
        if (loading || !data) return <LoaderSpinner/>
        return (
            <div>
               <p> {data.search.length > 0 ? `${data.search.length} resultater` : 'ingen resultater' }</p>

                <Results>
                    {
                        data.search.map((d, idx) =>
                            d.result.__typename === 'Dataproduct' ?
                                <SearchResultLink key={idx} group={d.result.owner.group}
                                                  name={d.result.name}
                                                  keywords={d.result.keywords}
                                                  excerpt={d.excerpt}
                                                  link={`/dataproduct/${d.result.id}`}/> :
                                <SearchResultLink key={idx} group={d.result.group!.group}
                                                  name={d.result.name}
                                                  type={"story"}
                                                  excerpt={d.excerpt}
                                                  link={`/story/${d.result.id}`}/>
                        )
                    }
                </Results>
            </div>
        )
    }
    return <></>
}
export default ResultList
