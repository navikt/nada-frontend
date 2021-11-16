import styled from 'styled-components'
import Link from 'next/link'
import {
  navBlaDarken40,
  navBlaLighten20,
  navBlaLighten60,
  navBlaLighten80,
} from '../../styles/constants'
import { SearchContentQuery } from '../../lib/schema/graphql'
import { ArrayElement } from '../../lib/schema/ArrayElement'
import { ResultIcon } from './resultIcon'
import { DescriptionExcerpt } from '../../lib/descriptionExcerpt'
import humanizeDate from '../lib/humanizeDate'
import { colorScheme } from '../lib/colorScheme'

type SearchResponse = ArrayElement<SearchContentQuery['search']>
type SearchResult = SearchResponse['result']
type SearchResultType = SearchResult['__typename']

export const SearchResultLinkDiv = styled.div<SearchResultProps>`
  margin-bottom: 15px;
  width: 100%;
  background-color: #f9f9f9;
  border: 2px solid ${({ result }) => colorScheme[result.__typename].dark};
  border-radius: 5px;
  cursor: pointer;

  :hover {
    h3 {
      background-color: ${navBlaDarken40};
      transition: background-color 0.15s;
    }
    aside {
      background-color: ${navBlaLighten60};
      transition: background-color 0.15s;
    }
    transition: background-color 0.15s;
    background-color: ${navBlaLighten80};
    border-color: ${navBlaLighten20};
  }
`

const TopLine = styled.h3<SearchResultProps>`
  padding: 0.25em 0.75rem;

  background-color: ${({ result }) => colorScheme[result.__typename].dark};
  color: white;
  margin: 0;
`

const BottomLine = styled.aside<SearchResultProps>`
  padding: 0.25em 0.75rem;

  background-color: ${({ result }) => colorScheme[result.__typename].light};

  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  color: #333;
  display: flex;
  gap: 1rem;
`

const ResultInfo = styled.div`
  display: flex;
`

export interface SearchResultProps {
  result: SearchResponse['result']
  excerpt?: string
}

export const SearchResultLink = ({ result, excerpt }: SearchResultProps) => {
  const getLink = (result: SearchResponse['result']) =>
    `/${result.__typename.toLowerCase()}/${result.id}`

  return (
    <Link href={getLink(result)}>
      <SearchResultLinkDiv result={result}>
        <TopLine result={result}>{result.name}</TopLine>
        <BottomLine result={result}>
          <div>Eier: {result.owner.group}</div>
          <div>Opprettet: {humanizeDate(result.created, 'PP')}</div>
          <div>Oppdatert: {humanizeDate(result.lastModified, 'PP')}</div>
        </BottomLine>
        <ResultInfo>
          <ResultIcon result={result} />
          <DescriptionExcerpt>
            {(excerpt && `…${excerpt}…`) || result.description || ''}
          </DescriptionExcerpt>
        </ResultInfo>
      </SearchResultLinkDiv>
    </Link>
  )
}

export default SearchResultLink
