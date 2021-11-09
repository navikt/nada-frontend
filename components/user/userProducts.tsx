import styled from 'styled-components'
import Link from 'next/link'
import { navBlaLighten80, navGraBakgrunn } from '../../styles/constants'
import { UserInfoQuery } from '../../lib/schema/graphql'
import { DescriptionExcerpt } from '../../lib/descriptionExcerpt'
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

const StyledTitle = styled.h2`
  line-height: 1;
  font-weight: 300;
  font-size: 20px;
  font-family: 'Source Sans Pro';
  margin: 0 8px 0 0;
`

export interface UserProductProps {
  product: ArrayElement<UserInfoQuery['userInfo']['dataproducts']>
}

export const UserProduct = ({ product }: UserProductProps) => {
  return (
    <Link href={`/dataproduct/${product.id}`} passHref>
      <SearchResultLinkDiv>
        <div>
          <div>
            <StyledTitle>{product.name}</StyledTitle>
            <DescriptionExcerpt>{product.description || ''}</DescriptionExcerpt>
          </div>
        </div>
      </SearchResultLinkDiv>
    </Link>
  )
}

export default UserProduct
