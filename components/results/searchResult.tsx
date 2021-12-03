import Link from 'next/link'
import { SearchContentQuery } from '../../lib/schema/graphql'
import { ArrayElement } from '../../lib/schema/ArrayElement'
import { DescriptionExcerpt } from '../../lib/descriptionExcerpt'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconBox from '../lib/icons/iconBox'
import BigQueryLogo from '../lib/icons/bigQueryLogo'
import * as React from 'react'
import styled from 'styled-components'

type SearchResponse = ArrayElement<SearchContentQuery['search']>

const StyledCard = styled(Card)`
  width: 345px; 
  height: 230px; 
  margin-bottom: 10px;
  padding-bottom: 20px;
  cursor: pointer;
  :hover {
    background-color: #fafafa
  }
`

export interface SearchResultProps {
  result: SearchResponse['result']
  excerpt: string
}

export const SearchResultLink = ({ result, excerpt }: SearchResultProps) => {
  const getLink = (result: SearchResponse['result']) =>
    `/dataproduct/${result.id}`

  return (
    <Link href={getLink(result)}>
      <StyledCard>
        <CardHeader
          avatar={
            <IconBox size={42}>
              <BigQueryLogo />
            </IconBox>
          }
          titleTypographyProps={{ variant: 'h4' }}
          title={result.name}
          subheader={result.owner.group}
        />
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            <DescriptionExcerpt excerpt={excerpt} />
          </Typography>
        </CardContent>
      </StyledCard>
    </Link>
  )
}

export default SearchResultLink
