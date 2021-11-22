import styled from 'styled-components'
import { useState } from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeFormat from 'rehype-format'
// @ts-ignore
import remarkBehead from 'remark-behead'
// @ts-ignore
import remarkTitle from 'remark-title'

import rehypeStringify from 'rehype-stringify'
import HTMLEllipsis from 'react-lines-ellipsis/lib/html'

const StyledDescription = styled.div`
  width: 100%;
  color: #555;
  line-height: 1;
  padding: 1rem 1rem;

  > div {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-weight: bold;
      color: #222;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
      display: inline;
    }
  }

  * {
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
    .use(remarkTitle, { title: '' })
    .use(remarkBehead, { depth: 3 })
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(children)
    .then((x) => setDescription(x.toString()))

  return (
    <StyledDescription>
      <HTMLEllipsis
        unsafeHTML={description}
        maxLine="5"
        ellipsis="…"
        basedOn="letters"
      />
    </StyledDescription>
  )
}
