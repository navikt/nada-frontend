import Link from 'next/link'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import BigQueryLogo from '../lib/icons/bigQueryLogo'
import { KeywordPill, KeywordBox } from '../lib/keywordList'
import StoryLogo from '../lib/icons/storyLogo'
import * as React from 'react'
import styled from 'styled-components'

const StyledCard = styled(Card)`
  width: 100%;
  padding-bottom: 10px;
  cursor: pointer;
  box-shadow: rgb(239, 239, 239) 0px 0px 30px 0px;
  :hover {
    box-shadow: rgb(239, 239, 239) 0px 1px 0px 0.5px;
  }
`

export interface SearchResultProps {
  link: string
  name: string
  group?: string
  keywords?: string[]
  type?: string
  excerpt?: string
}

export const SearchResultLink = ({
  link,
  name,
  group,
  keywords,
  type,
  excerpt,
}: SearchResultProps) => {
  return (
    <Link href={link} passHref={true}>
      <a>
        <StyledCard>
          <CardHeader
            style={{ paddingBottom: '0px' }}
            avatar={
              <div className="h-[42px] w-[42-px]">
                {type === 'story' ? <StoryLogo /> : <BigQueryLogo />}
              </div>
            }
            titleTypographyProps={{ variant: 'h6' }}
            title={name}
            subheader={`eier: ${group}`}
          />
          {excerpt && (
            <div
              dangerouslySetInnerHTML={{
                __html: excerpt.replace(
                  /\(\(START\)\)(.*?)\(\(STOP\)\)/g,
                  `<i><b>$1</b></i>`
                ),
              }}
              style={{ margin: '10px 16px 0' }}
            />
          )}

          <KeywordBox style={{ float: 'right', marginRight: '10px' }}>
            {keywords &&
              keywords.map((k, i) => (
                <KeywordPill key={i} keyword={k} compact={true}>
                  {k}
                </KeywordPill>
              ))}
          </KeywordBox>
        </StyledCard>
      </a>
    </Link>
  )
}

export default SearchResultLink
