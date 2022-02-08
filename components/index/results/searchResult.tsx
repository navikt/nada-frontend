import Link from 'next/link'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import IconBox from '../../lib/icons/iconBox'
import BigQueryLogo from '../../lib/icons/bigQueryLogo'
import * as React from 'react'
import styled from 'styled-components'
import {KeywordPill} from "../../lib/keywordList";
import StoryLogo from "../../lib/icons/storyLogo";

const StyledCard = styled(Card)`
  margin: 0 10px 20px;
  width: 300px;
  padding-bottom: 10px;
  cursor: pointer;
  box-shadow: rgb(239, 239, 239) 0px 0px 30px 0px;
  :hover {
    box-shadow: rgb(239, 239, 239) 0px 1px 0px 0.5px;
  }
`

export interface SearchResultProps {
    link: string,
    name: string,
    group?: string
    keywords?: string[]
    type?: string
    excerpt?: string
}

export const SearchResultLink = ({link, name, group, keywords, type}: SearchResultProps) => {
    return (
        <Link href={link} passHref={true}>
            <a>
                <StyledCard>
                    <CardHeader
                        style={{paddingBottom: '0px'}}
                        avatar={
                            <IconBox size={42}>
                                {type === "story" ? <StoryLogo/> : <BigQueryLogo/>}
                            </IconBox>
                        }
                        titleTypographyProps={{variant: 'h6'}}
                        title={name}
                        subheader={`eier: ${group}`}
                    />
                    <div style={{float: 'right'}}>
                        {keywords && keywords.map((k, i) =>
                            <Link key={i} href={`/search?q=${k}`} passHref={true}>
                                <a>
                                    <KeywordPill key={i} keyword={k} compact={true}>{k}</KeywordPill>
                                </a>
                            </Link>)}
                    </div>
                </StyledCard>
            </a>
        </Link>
    )
}

export default SearchResultLink
