import {QueryResult} from "@apollo/client";
import {
    Exact,
    SearchContentWithOptionsQuery,
    SearchOptions,
} from "../../lib/schema/graphql";
import ErrorMessage from "../lib/error";
import LoaderSpinner from "../lib/spinner";
import SearchResultLink from "../index/results/searchResult";
import styled from "styled-components";
const Results = styled.div`
  display: flex;
  flex-direction: row;
`

type ResultListInterface = {
    search: QueryResult<SearchContentWithOptionsQuery, Exact<{ options: SearchOptions }>>
}
const ResultList = ({search}: ResultListInterface) => {
    const {data, loading, error} = search
    if (error) return <ErrorMessage error={error}/>
    if (loading || !data) return <LoaderSpinner/>
    return (<Results>
        {
            data.search.map((d, idx) =>
                d.result.__typename === 'Dataproduct' ? <SearchResultLink key={idx} group={d.result.owner.group}
                                  name={d.result.name}
                                  keywords={d.result.keywords}
                                  excerpt={d.excerpt}
                                  link={`/dataproduct/${d.result.id}`}/> :<SearchResultLink key={idx} group={d.result.group!.group}
                                                                                             name={d.result.name}
                                                                                             excerpt={d.excerpt}
                                                                                             link={`/dataproduct/${d.result.id}`}/>
            )
        }
    </Results>)
}
export default ResultList
