import styled from 'styled-components'
import {
  navBlaLighten80,
  navGraBakgrunn,
  navGronnLighten20,
  navGronnLighten60,
} from '../../styles/constants'
import { Dataproduct } from '../../lib/schema/graphql'
import { ResultAbstract } from '../results/resultAbstract'
import { LogoSidebar } from '../results/logoSidebar'

const SearchResultDiv = styled.div<{ selected: boolean }>`
  background-color: ${(props) =>
    props.selected ? navGronnLighten60 : navGraBakgrunn};
  display: flex;
  padding: 16px 24px;
  margin-bottom: 15px;
  border: ${(props) =>
    props.selected ? `3px solid ${navGronnLighten20}` : `3px solid white`};
  cursor: pointer;
  :hover {
    background-color: ${(props) =>
      props.selected ? '#ebfaef' : navBlaLighten80};
  }
`

export interface SearchResultProps {
  result: Dataproduct
  selected: boolean
  handleClick: (id: string) => void
}

export const SearchResult = ({
  result,
  selected,
  handleClick,
}: SearchResultProps) => {
  return (
    <SearchResultDiv selected={selected} onClick={() => handleClick(result.id)}>
      <LogoSidebar result={result} />
      <ResultAbstract result={result} />
    </SearchResultDiv>
  )
}

export default SearchResult