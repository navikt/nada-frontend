import styled from 'styled-components'
import Link from 'next/link'
import { navBlaLighten80, navGraBakgrunn } from '../../styles/constants'
import { components } from '../../lib/schema'
import BigQueryLogo from '../lib/icons/bigQueryLogo'
import DataPackageLogo from '../lib/icons/dataPackageLogo'
import DataProductLogo from '../lib/icons/dataProductLogo'

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

const SearchResultContent = styled.div`
  flex-grow: 1;

  h1 {
    font-size: 1.5em;
    margin: 0;
  }
`

type SearchResultEntry = components['schemas']['SearchResultEntry']

export interface SearchResultProps {
  searchResultEntry: SearchResultEntry
}

const SearchResultAbstract = ({ searchResultEntry }: SearchResultProps) => (
  <SearchResultContent>
    <h1>{searchResultEntry.name}</h1>
    <p>{searchResultEntry.excerpt}</p>
  </SearchResultContent>
)

const SearchResultIcon = ({ searchResultEntry }: SearchResultProps) => {
  const iconMap = {
    dataproduct: <DataProductLogo />,
    dataset: <BigQueryLogo />,
    datapackage: <DataPackageLogo />,
  }

  if (searchResultEntry.type && searchResultEntry.type in iconMap)
    return iconMap[searchResultEntry.type]

  return <DataProductLogo />
}

export const SearchResult = ({ searchResultEntry }: SearchResultProps) => (
  <Link href={`/dataproduct/${searchResultEntry.id}`}>
    <SearchResultDiv>
      <SearchResultAbstract searchResultEntry={searchResultEntry} />
      <SearchResultIcon searchResultEntry={searchResultEntry} />
    </SearchResultDiv>
  </Link>
)

export default SearchResult
