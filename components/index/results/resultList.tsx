import SearchResultLink from './searchResult'
import {Exact, KeywordsQuery, MetabaseProudctsQuery, SearchContentQuery, SearchQuery} from '../../../lib/schema/graphql'
import LoaderSpinner from "../../lib/spinner";
import ErrorMessage from "../../lib/error";
import {QueryResult} from "@apollo/client";
import styled from "styled-components";
import Link from 'next/link'
import {navBlaLighten80} from "../../../styles/constants";

const stringToColor = function (str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}


const KeywordLink = styled.span<{color: string}>`
display: block;
margin-bottom: 10px;
margin-left: 20px;
color: #222;
:hover {
  color: var(--navds-color-text-link);
  text-decoration: underline;
}
&:before {
    background-color: ${(props) => props.color};
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 10px;
    content: '';
}
`

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
                                      link={`/dataproduct/${d.id}/explore`}/>
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
                            <KeywordLink  color={stringToColor(d.keyword)}>
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
