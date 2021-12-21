import Link from 'next/link'
import {SearchContentQuery} from '../../../lib/schema/graphql'
import {ArrayElement} from '../../../lib/schema/ArrayElement'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import IconBox from '../../lib/icons/iconBox'
import BigQueryLogo from '../../lib/icons/bigQueryLogo'
import * as React from 'react'
import styled from 'styled-components'

type SearchResponse = ArrayElement<SearchContentQuery['search']>

const StyledCard = styled(Card)`
  margin: 0 10px 20px;
  padding-bottom: 20px;
  cursor: pointer;
  box-shadow: rgb(239, 239, 239) 0px 0px 30px 0px;
  :hover {
    box-shadow: rgb(239, 239, 239) 0px 1px 0px 0.5px;
  }
`

export interface SearchResultProps {
    link: string,
    name: string,
    group: string
}

export const SearchResultLink = ({link, name, group}: SearchResultProps) => {

    return (
        <Link href={link}>
            <a>
                <StyledCard>
                    <CardHeader
                        style={{paddingBottom: '0px'}}
                        avatar={
                            <IconBox size={42}>
                                <BigQueryLogo/>
                            </IconBox>
                        }
                        titleTypographyProps={{variant: 'h6'}}
                        title={name}
                        subheader={`eier: ${group}`}
                    />
                </StyledCard>
            </a>
        </Link>
    )
}

export default SearchResultLink
