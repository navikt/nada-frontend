import styled from 'styled-components'
import HTMLEllipsis from 'react-lines-ellipsis/lib/html'
import { marked } from 'marked'

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

    p {
      display: inline;
    }
  }

  * {
    font-size: 16px;
  }
`

export const DescriptionExcerpt = ({ excerpt }: { excerpt: string }) => {

  return (
    <StyledDescription>
      <HTMLEllipsis
        unsafeHTML={marked.parse(excerpt)}
        maxLine='5'
        ellipsis='…'
        basedOn='letters'
      />
    </StyledDescription>
  )
}
