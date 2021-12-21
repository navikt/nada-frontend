import SearchResultLink from './searchResult'
import {Exact, KeywordsQuery, MetabaseProudctsQuery, SearchContentQuery, SearchQuery} from '../../../lib/schema/graphql'
import LoaderSpinner from "../../lib/spinner";
import ErrorMessage from "../../lib/error";
import {QueryResult} from "@apollo/client";
import Link from 'next/link'
import StringToColor from "../../../lib/stringToColor";
import KeywordLink from "../../lib/keywordList";

interface ResultsProps {
    search?: QueryResult<SearchContentQuery, Exact<{ q: SearchQuery }>>
    metabase?: QueryResult<MetabaseProudctsQuery, Exact<{ [p: string]: never }>>
    keywords?: QueryResult<KeywordsQuery, Exact<{ [p: string]: never }>>
}

export function ResultList({search, metabase, keywords}: ResultsProps) {
    if (metabase) {
        const {data, loading, error} = metabase
        if (error) return <ErrorMessage error={error}/>
        if (loading || !data) return <LoaderSpinner/>

        return (<>
            {
                data.dataproducts.map((d, idx) =>
                    <SearchResultLink key={idx} group={d.owner.group} name={d.name}
                                      link={`/dataproduct/${d.id}`}/>
                )
            }
        </>)
    }
    if (search) {
        const {data, loading, error} = search
        if (error) return <ErrorMessage error={error}/>
        if (loading || !data) return <LoaderSpinner/>
        return (<>
            {
                data.search.map((d, idx) =>
                    <SearchResultLink key={idx} group={d.result.owner.group} name={d.result.name}
                                      link={`/dataproduct/${d.result.id}/explore`}/>
                )
            }
        </>)
    }
    if (keywords) {
        const {data, loading, error} = keywords
        if (error) return <ErrorMessage error={error}/>
        if (loading || !data) return <LoaderSpinner/>
        return (<div>
            {
                data.keywords.map((d, idx) =>
                    <Link key={idx} href={'/search?q=' + d.keyword}>
                        <a>
                            <KeywordLink color={StringToColor(d.keyword)} horizontal={true}>
                                {d.keyword} ({d.count})
                            </KeywordLink>
                        </a>
                    </Link>
                )
            }
        </div>)
    }
    return <></>
}

export default ResultList
