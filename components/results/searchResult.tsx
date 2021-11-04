import styled from 'styled-components'
import Link from 'next/link'
import { navBlaLighten80, navGraBakgrunn } from '../../styles/constants'
import { ResultAbstract } from './resultAbstract'
import { LogoSidebar } from './logoSidebar'
import { SearchContentQuery } from '../../lib/schema/graphql'
import { ArrayElement } from '../../lib/schema/ArrayElement'

const SearchResultLinkDiv = styled.div`
  margin-bottom: 15px;
  width: 50%;

  > div {
    padding: 5px 8px;

    > div {
      box-shadow: 4px 4px 6px 1px rgba(0, 0, 0, 0.1);
      padding: 10px 13px;
      background-color: ${navGraBakgrunn};
      display: flex;

      cursor: pointer;

      :hover {
        box-shadow: 4px 4px 6px 1px rgba(102, 165, 244, 0.3);

        // box-shadow: 15px 25px 44px -11px rgba(102, 165, 244, 0.6); // navBlaLighten80
        background-color: ${navBlaLighten80};
      }
    }
  }
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
        <div>
          <div>
            <LogoSidebar result={result} />
            <ResultAbstract result={result} />
          </div>
        </div>
      </SearchResultLinkDiv>
    </Link>
  )
}

export default SearchResultLink
