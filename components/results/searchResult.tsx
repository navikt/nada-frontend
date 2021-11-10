import styled from 'styled-components'
import Link from 'next/link'
import {
  navBlaDarken40,
  navBlaLighten20,
  navBlaLighten60,
  navBlaLighten80,
  navLillaDarken40,
  navLillaLighten60,
} from '../../styles/constants'
import { SearchContentQuery } from '../../lib/schema/graphql'
import { ArrayElement } from '../../lib/schema/ArrayElement'
import { ResultIcon } from './resultIcon'
import { DescriptionExcerpt } from '../../lib/descriptionExcerpt'
import humanizeDate from '../lib/humanizeDate'

const SearchResultLinkDiv = styled.div`
  margin-bottom: 15px;
  width: 100%;
  background-color: #f9f9f9;
  border: 2px solid ${navLillaDarken40};
  border-radius: 5px;
  cursor: pointer;

  > * {
    padding: 0.25em 0.75rem;
  }

  :hover {
    h3 {
      background-color: ${navBlaDarken40};
    }
    aside {
      background-color: ${navBlaLighten60};
    }

    background-color: ${navBlaLighten80};
    border-color: ${navBlaLighten20};
  }
`

const TopLine = styled.h3`
  background-color: ${navLillaDarken40};
  color: white;
  margin: 0;
`

const BottomLine = styled.aside`
  background-color: ${navLillaLighten60};
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  color: #333;
  display: flex;
  gap: 1rem;
`

const ResultInfo = styled.div`
  padding: 0.75rem 0.75rem;
  display: flex;
  gap: 0.75em;
`
type SearchResponse = ArrayElement<SearchContentQuery['search']>

export interface SearchResultProps {
  result: SearchResponse['result']
  excerpt?: string
}

export const SearchResultLink = ({ result, excerpt }: SearchResultProps) => {
  const getLink = (result: SearchResponse['result']) =>
    `/${result.__typename.toLowerCase()}/${result.id}`

  return (
    <Link href={getLink(result)}>
      <SearchResultLinkDiv>
        <TopLine>{result.name}</TopLine>
        <BottomLine>
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
