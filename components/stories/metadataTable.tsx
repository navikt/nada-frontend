import humanizeDate from '../../lib/humanizeDate'
import * as React from 'react'
import { ExternalLink } from '@navikt/ds-icons'
import { StoryQuery } from '../../lib/schema/graphql'
import styled from 'styled-components'
import Link from 'next/link'
import { KeywordPill } from '../lib/keywordList'

const KeywordBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  flex-wrap: wrap;
`
const SubjectContent = styled.div`
  font-size: 14px;
  color: #222;
`

type SubjectHeaderProps = {
  centered?: boolean
}
const SubjectHeader = styled.h2<SubjectHeaderProps>`
  ${(props) => props.centered && 'margin: 0 auto;'}
  color: #222;
  font-weight: 500;
  font-size: 18px;
`
const StyledMetadataTable = styled.div`
  height: fit-content;
  min-width: 250px;
  font-size: 16px;
  line-height: 1;
  border-top: 1px #ddd solid;
  margin-left: 18px;
  margin-right: 18px;
`

interface StoryProps {
  children?: React.ReactNode
  owner: StoryQuery['story']['owner']
  created: string
  lastModified: string
  keywords: string[] | undefined
}

const StyledUl = styled.ul`
  padding-left: 0;
  margin-top: 0px;
`

const StyledLi = styled.li`
  display: inline-block;
  padding-right: 20px;
`

export const MetadataTable = ({
  owner,
  created,
  lastModified,
  keywords,
  children,
}: StoryProps) => {
  return (
    <StyledMetadataTable>
      <StyledUl>
        {children}
        {owner?.group && (
          <>
            <StyledLi>
              <SubjectHeader>Eier</SubjectHeader>
              <SubjectContent>
                {owner?.teamkatalogenURL ? (
                  <a
                    href={owner.teamkatalogenURL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {owner.group.split('@')[0]} <ExternalLink />
                  </a>
                ) : (
                  owner?.group.split('@')[0]
                )}
              </SubjectContent>
            </StyledLi>
          </>
        )}
        <StyledLi>
          <SubjectHeader>Opprettet</SubjectHeader>
          <SubjectContent>{humanizeDate(created)}</SubjectContent>
        </StyledLi>
        {lastModified && (
          <>
            <StyledLi>
              <SubjectHeader>Oppdatert</SubjectHeader>
              <SubjectContent>
                {humanizeDate(lastModified, 'PP HH:mm')}
              </SubjectContent>
            </StyledLi>
          </>
        )}
        {!!keywords && keywords.length > 0 && (
          <>
            <StyledLi>
              <SubjectHeader>Nøkkelord</SubjectHeader>
              <KeywordBox>
                {!!keywords && (
                  <>
                    {keywords.map((k, i) => (
                      <Link key={i} href={`/search?keywords=${k}`}>
                        <a>
                          <KeywordPill key={k} keyword={k}>
                            {k}
                          </KeywordPill>
                        </a>
                      </Link>
                    ))}
                  </>
                )}
              </KeywordBox>
            </StyledLi>
          </>
        )}
      </StyledUl>
    </StyledMetadataTable>
  )
}
