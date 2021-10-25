import styled from 'styled-components'
import Link from 'next/link'
import { navBlaLighten80, navGraBakgrunn } from '../../styles/constants'
import { ResultAbstract } from './resultAbstract'
import { LogoSidebar } from './logoSidebar'
import { Dataproduct } from '../../lib/schema/graphql'

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
  result: Dataproduct
}

export const SearchResultLink = ({ result }: SearchResultLinkProps) => {
  const helper = (type: string) => {
    if (type === 'Dataproduct') return 'dataproduct'
    return type
  }
  // FIXME: This hack (|| 'dataproduct') is here because typename is possibly
  // undefined. This is probably a schema bug?
  return (
    <Link href={`/${helper(result.__typename || 'dataproduct')}/${result.id}`}>
      <SearchResultLinkDiv>
        <LogoSidebar result={result} />
        <ResultAbstract result={result} />
      </SearchResultLinkDiv>
    </Link>
  )
}

export default SearchResultLink
