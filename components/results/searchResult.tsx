import styled from 'styled-components'
import Link from 'next/link'
import { navBlaLighten80, navGraBakgrunn } from '../../styles/constants'
import { ResultAbstract } from './resultAbstract'
import { DataproductSchema } from '../../lib/schema/schema_types'
import { LogoSidebar } from './logoSidebar'

const SearchResultLinkDiv = styled.div`
  background-color: ${navGraBakgrunn};
  display: flex;
  padding: 16px 24px;
  margin-bottom: 15px;

  cursor: pointer;
  :hover {
    background-color: ${navBlaLighten80};
  }
`

export interface SearchResultLinkProps {
  result: DataproductSchema
}

export const SearchResultLink = ({ result }: SearchResultLinkProps) => {
  console.log(result.name)
  const helper = (type: string) => {
    if (type === 'Dataproduct') return 'dataproduct'
    return type
  }
  return (
    <Link href={`/${helper(result.type)}/${result.id}`}>
      <SearchResultLinkDiv>
        <LogoSidebar result={result} />
        <ResultAbstract result={result} />
      </SearchResultLinkDiv>
    </Link>
  )
}

export default SearchResultLink
