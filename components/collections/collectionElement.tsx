import styled from 'styled-components'
import {
  navBlaLighten80,
  navGraBakgrunn,
  navGronnLighten20,
  navGronnLighten60,
} from '../../styles/constants'
import { SearchResultEntry } from '../../lib/schema/schema_types'
import { ResultAbstract } from '../results/resultAbstract'
import { LogoSidebar } from '../results/logoSidebar'

const SearchResultDiv = styled.div<{ selected: boolean }>`
  background-color: ${(props) =>
    props.selected ? navGronnLighten60 : navGraBakgrunn};
  display: flex;
  padding: 16px 24px;
  margin-bottom: 15px;
  border: ${(props) =>
    props.selected ? `3px solid ${navGronnLighten20}` : 'none'};
  cursor: pointer;
  :hover {
    background-color: ${(props) =>
      props.selected ? '#ebfaef' : navBlaLighten80};
  }
`

export interface SearchResultProps {
  result: SearchResultEntry
  selected: boolean
}

export const SearchResult = ({ result, selected }: SearchResultProps) => {
  return (
    <SearchResultDiv selected={selected}>
      <LogoSidebar result={result} />
      <ResultAbstract result={result} />
    </SearchResultDiv>
  )
}

export default SearchResult
