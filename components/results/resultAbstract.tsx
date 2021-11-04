import styled from 'styled-components'
import { ArrayElement } from '../../lib/schema/ArrayElement'
import { SearchContentQuery } from '../../lib/schema/graphql'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import { useState } from 'react'

import HTMLEllipsis from 'react-lines-ellipsis/lib/html'

const StyledTitle = styled.h2`
  line-height: 1;
  font-weight: 300;
  font-size: 20px;
  font-family: 'Source Sans Pro';
  margin: 0 8px 0 0;
`

const StyledResultAbstract = styled.div`
  height: 120px;
  width: 100%;
`

const StyledDescription = styled.div`
  width: 100%;
  color: #555;
  font-size: 16px;
  font-style: italic;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 16px;
  }
`
interface DescriptionProps {
  children: string
}

// Temporary workaround until backend does the excerpt for us
const Description = ({ children }: DescriptionProps) => {
  const [description, setDescription] = useState<string>('')

  unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(children)
    .then((x) => setDescription(x.toString()))

  return (
    <StyledDescription>
      <HTMLEllipsis
        unsafeHTML={description}
        maxLine="3"
        ellipsis="…"
        basedOn="letters"
      />
    </StyledDescription>
  )
}

export interface ResultAbstractProps {
  result: ArrayElement<SearchContentQuery['search']>
}

export const ResultAbstract = ({ result }: ResultAbstractProps) => (
  <StyledResultAbstract>
    <StyledTitle>{result.name}</StyledTitle>
    <Description>{result.description || ''}</Description>
  </StyledResultAbstract>
)
