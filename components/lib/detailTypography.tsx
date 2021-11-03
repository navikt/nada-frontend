import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import { NextComponentType } from 'next'

export const Name = styled.h1`
  margin: 0;
  font-weight: 300;
`

export const StyledDescription = styled.div`
  padding-left: 10px;
`

export const Description = ({ children }: { children: string }) => (
  <StyledDescription>
    <ReactMarkdown>{children}</ReactMarkdown>
  </StyledDescription>
)
