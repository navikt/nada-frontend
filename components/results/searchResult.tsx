import styled from 'styled-components'
import Link from 'next/link'
import {
  navBlaLighten20,
  navBlaLighten40,
  navBlaLighten60,
  navBlaLighten80,
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
  border: 1px solid #557;
  border-radius: 5px;
  cursor: pointer;

  > * {
    padding: 0.25em 0.75rem;
  }

  :hover {
    h3 {
      background-color: ${navBlaLighten20};
    }
    aside {
      background-color: ${navBlaLighten40};
    }

    background-color: ${navBlaLighten80};
    border-color: ${navBlaLighten20};
  }
`

const TopLine = styled.h3`
  background-color: #557;
  color: white;
  margin: 0;
`

const BottomLine = styled.aside`
  background-color: #bbc;
  text-transform: uppercase;
  font-size: 14px;
  display: flex;
  gap: 1rem;
`

const ResultInfo = styled.div`
  padding: 0.75rem 0.75rem;
  display: flex;
  gap: 0.75em;
`

export interface SearchResultProps {
  result: ArrayElement<SearchContentQuery['search']>
}

export const SearchResultLink = ({ result }: SearchResultProps) => {
  const getLink = (result: ArrayElement<SearchContentQuery['search']>) =>
    `/${result.__typename.toLowerCase()}/${result.id}`

  return (
    <Link href={getLink(result)}>
      <SearchResultLinkDiv>
        <TopLine>{result.name}</TopLine>
        <BottomLine>
          <div>Fra {result.owner.group}</div>
          <div>Opprettet {humanizeDate(result.created, 'PP')}</div>
          <div>Oppdatert {humanizeDate(result.lastModified, 'PP')}</div>
        </BottomLine>
        <ResultInfo>
          <ResultIcon result={result} />
          <DescriptionExcerpt>{result.description || ''}</DescriptionExcerpt>
        </ResultInfo>
      </SearchResultLinkDiv>
    </Link>
  )
}

export default SearchResultLink
