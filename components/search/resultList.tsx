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
  a {
    text-decoration: none;
  }
`

type ResultListInterface = {
    search?: QueryResult<SearchContentWithOptionsQuery, Exact<{ options: SearchOptions }>>
    dataproducts?: { __typename?: "Dataproduct" | undefined, id: string, name: string, keywords: string[], owner: { __typename?: "Owner" | undefined, group: string } }[]
    stories?: { __typename?: 'Story', id: string, name: string, owner?: { __typename?: 'Owner'; group: string } | null | undefined }[] 
}
const ResultList = ({search, dataproducts, stories}: ResultListInterface) => {
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
