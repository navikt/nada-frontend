import styled from 'styled-components'
import { useState } from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeFormat from 'rehype-format'
// @ts-ignore
import remarkBehead from 'remark-behead'
import rehypeStringify from 'rehype-stringify'
import HTMLEllipsis from 'react-lines-ellipsis/lib/html'

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
export const DescriptionExcerpt = ({ children }: DescriptionProps) => {
  const [description, setDescription] = useState<string>('')

  unified()
    .use(remarkParse)
    .use(remarkBehead, { depth: 4 })
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
