import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import { NextComponentType } from 'next'
import * as React from 'react'

export const Name = styled.h1`
  margin: 0;
  font-weight: 300;
`

export const StyledDescription = styled.div`
  padding: 0.5rem 1rem;
  text-align: justify;
`

export const Description = ({ children }: { children: string }) => (
  <StyledDescription>
    <h2>Beskrivelse</h2>
    <ReactMarkdown>{children}</ReactMarkdown>
  </StyledDescription>
)
