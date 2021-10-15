import styled from 'styled-components'
import Link from 'next/link'
import { navBlaLighten80, navGraBakgrunn } from '../../styles/constants'
import { components } from '../../lib/schema/schema'
import { ResultIcon } from './resultIcon'
import { ResultAbstract } from './resultAbstract'
import { SearchResultEntry } from '../../lib/schema/schema_types'

const SearchResultDiv = styled.div`
  background-color: ${navGraBakgrunn};
  display: flex;
  padding: 8px;
  margin-bottom: 15px;

  cursor: pointer;
  :hover {
    background-color: ${navBlaLighten80};
  }
`

export interface SearchResultProps {
  result: SearchResultEntry
}

export const SearchResult = ({ result }: SearchResultProps) => {
  const helper = (type: string) => {
    if (type === 'DataproductCollection') return 'datacollection'
    return type
  }
  return (
    <Link href={`/${helper(result.type)}/${result.id}`}>
      <SearchResultDiv>
        <ResultAbstract result={result} />
        <ResultIcon result={result} />
      </SearchResultDiv>
    </Link>
  )
}

export default SearchResult
