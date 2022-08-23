import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import * as React from 'react'
import remarkGfm from 'remark-gfm'
import { SubjectHeader } from '../subject'
import KeywordPill, { KeywordBox } from './keywordList'
import { Link } from '@navikt/ds-react'

export const Name = styled.h1`
  margin: 0;
  font-weight: 300;
`

export const StyledDescription = styled.div`
  border-radius: 10px;
  text-align: justify;
  margin-top: 2rem;
`

export const Description = ({
  keywords,
  markdown,
}: {
  keywords: string[]
  markdown?: string | null
}) => (
  <StyledDescription>
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {markdown || '*ingen beskrivelse*'}
    </ReactMarkdown>
    {!!keywords.length && (
      <div className="flex flex-row gap-1 flex-wrap my-2">
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
      </div>
    )}
  </StyledDescription>
)
