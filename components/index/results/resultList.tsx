import SearchResultLink from './searchResult'
import {
    Exact,
    GroupStatsQuery,
    KeywordsQuery,
    MetabaseProudctsQuery,
    SearchContentQuery,
    SearchQuery, StoriesQuery
} from '../../../lib/schema/graphql'
import LoaderSpinner from "../../lib/spinner";
import ErrorMessage from "../../lib/error";
import {QueryResult} from "@apollo/client";
import Link from 'next/link'
import KeywordLink from "../../lib/keywordList";

interface ResultsProps {
    search?: QueryResult<SearchContentQuery, Exact<{ q: SearchQuery }>>
    metabase?: QueryResult<MetabaseProudctsQuery, Exact<{ [p: string]: never }>>
    keywords?: QueryResult<KeywordsQuery, Exact<{ [p: string]: never }>>
    groupStats?: QueryResult<GroupStatsQuery, Exact<{ [p: string]: never }>>
    dataproducts?: { __typename?: "Dataproduct" | undefined, id: string, name: string, keywords: string[], owner: { __typename?: "Owner" | undefined, group: string } }[]
    stories?:  QueryResult<StoriesQuery, Exact<{[p: string]: never}>>
    drafts?: any
}

export function ResultList({search, metabase, keywords, dataproducts, groupStats, stories }: ResultsProps) {
    if (stories) {
        const {data, loading, error} = stories
        if (error) return <ErrorMessage error={error}/>
        if (loading || !data) return <LoaderSpinner/>

        return (<>
            {
                data.stories.map((d, idx) =>
                    <SearchResultLink key={idx} group={d.owner?.group} name={d.name} keywords={undefined} type={"story"}
                                      link={`/story/${d.id}`}/>
                )
            }
        </>)
    }
    if (metabase) {
        const {data, loading, error} = metabase
        if (error) return <ErrorMessage error={error}/>
        if (loading || !data) return <LoaderSpinner/>

        return (<>
            {
                data.dataproducts.map((d, idx) =>
                    <SearchResultLink key={idx} group={d.owner.group} name={d.name} keywords={d.keywords}
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
                                      keywords={d.result.keywords}
                                      link={`/dataproduct/${d.result.id}`}/>
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
                            <KeywordLink keyword={d.keyword} horizontal={true}>
                                {d.keyword}
                            </KeywordLink>
                        </a>
                    </Link>
                )
            }
        </div>)
    }
    if (groupStats) {
        const {data, loading, error} = groupStats
        if (error) return <ErrorMessage error={error}/>
        if (loading || !data) return <LoaderSpinner/>
        return (<div>
            {
                data.groupStats.map((d, idx) => {
                        const team = d.email.split('@')[0]
                        return <Link key={idx} href={'/search?q=' + team}>
                            <a>
                                <KeywordLink keyword={team} horizontal={true}>
                                    {team}
                                </KeywordLink>
                            </a>
                        </Link>

                    }
                )
            }
        </div>)
    }
    if (dataproducts) {
        return (<>
            {
                dataproducts.map((d, idx) =>
                    <SearchResultLink key={idx} group={d.owner.group} name={d.name} keywords={d.keywords}
                                      link={`/dataproduct/${d.id}`}/>
                )
            }
        </>)
    }
    return <></>
}

export default ResultList
