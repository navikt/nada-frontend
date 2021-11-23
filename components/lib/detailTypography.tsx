import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import * as React from 'react'
import remarkGfm from 'remark-gfm'

export const Name = styled.h1`
  margin: 0;
  font-weight: 300;
`

export const SectionHeader = styled.h2`
  padding: 0.5rem 0;
  margin: 0;
`

export const StyledDescription = styled.div`
  background-color: #f7f7f7;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0.5rem;
  text-align: justify;
`

export const Description = ({ markdown }: { markdown?: string | null }) => (
  <StyledDescription>
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {markdown || '*ingen beskrivelse*'}
    </ReactMarkdown>
  </StyledDescription>
)
