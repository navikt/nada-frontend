import Link from 'next/link'
import { SearchContentQuery } from '../../../lib/schema/graphql'
import { ArrayElement } from '../../../lib/schema/ArrayElement'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import IconBox from '../../lib/icons/iconBox'
import BigQueryLogo from '../../lib/icons/bigQueryLogo'
import * as React from 'react'
import styled from 'styled-components'

type SearchResponse = ArrayElement<SearchContentQuery['search']>

const StyledCard = styled(Card)`
  width: 31%;
  margin-bottom: 20px;
  padding-bottom: 20px;
  cursor: pointer;
  @media only screen and (max-width: 1024px) {
    width: 48%;
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
  :hover {
    background-color: #fafafa;
  }
`

export interface SearchResultProps {
  result: SearchResponse['result']
}

export const SearchResultLink = ({ result }: SearchResultProps) => {
  const getLink = (result: SearchResponse['result']) =>
    `/dataproduct/${result.id}`

  return (
    <Link href={getLink(result)}>
      <StyledCard>
        <CardHeader
          style={{ paddingBottom: '0px' }}
          avatar={
            <IconBox size={42}>
              <BigQueryLogo />
            </IconBox>
          }
          titleTypographyProps={{ variant: 'h6' }}
          title={result.name}
          subheader={`eier: ${result.owner.group}`}
        />
      </StyledCard>
    </Link>
  )
}

export default SearchResultLink
