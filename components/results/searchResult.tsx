import Link from 'next/link'
import {SearchContentQuery} from '../../lib/schema/graphql'
import {ArrayElement} from '../../lib/schema/ArrayElement'
import IconBox from '../lib/icons/iconBox'
import BigQueryLogo from '../lib/icons/bigQueryLogo'
import * as React from 'react'
import styled from 'styled-components'

type SearchResponse = ArrayElement<SearchContentQuery['search']>

const SearchResult = styled.div`
  padding: 10px;
  cursor: pointer;
  flex-wrap: wrap;
  flex-direction: row;
  display: flex;
  color: #222;
  box-shadow: rgb(239, 239, 239) 0px 0px 30px 0px;
  :hover {
    box-shadow: rgb(239, 239, 239) 0px 1px 0px 0.5px;
  }
  
`
const SearchResultHeader = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  width: 100%;
`
const Title = styled.div`
  margin-left: 10px;
  h1 {
    font-size: 20px;
    margin: 0px;
    color: #222;
  }
  h2 {
    font-size: 15px;
    margin: 0px;
    color: #777;
    font-weight: normal;
  }
`

export interface SearchResultProps {
    result: SearchResponse['result']
    excerpt: string
}

export const SearchResultLink = ({result, excerpt}: SearchResultProps) => {
    const getLink = (result: SearchResponse['result']) =>
        `/dataproduct/${result.id}`

    return (
        <Link href={getLink(result)}>
            <a>
                <SearchResult>
                    <SearchResultHeader>
                        <IconBox size={30}>
                            <BigQueryLogo/>
                        </IconBox>
                        <Title>
                            <h1>{result.name}</h1>
                            <h2>{result.owner.group}</h2>
                        </Title>
                    </SearchResultHeader>
                    <div>{excerpt}</div>
                </SearchResult>
            </a>
        </Link>
    )
}

export default SearchResultLink
