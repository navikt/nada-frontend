import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import * as React from 'react'
import remarkGfm from 'remark-gfm'

export const Name = styled.h1`
  margin: 0;
  font-weight: 300;
`

export const StyledDescription = styled.div`
  border-radius: 10px;
  text-align: justify;
`

export const Description = ({ markdown }: { markdown?: string | null }) => (
  <StyledDescription>
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {markdown || '*ingen beskrivelse*'}
    </ReactMarkdown>
  </StyledDescription>
)
