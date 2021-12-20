import styled from 'styled-components'
import { Story, StoryViewType } from '../../lib/schema/graphql'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

//@ts-ignore
import Plot from 'react-plotly.js';

const StoryDiv = styled.div`
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  > * {
    width: 100%;
  }
`

interface ResultsProps {
  story: Story
}

export function Story({ story }: ResultsProps) {
  return (
    <StoryDiv>
      <h1>{story.name}</h1>
      {story?.views.map((view, id) => {
        switch (view.type) {
          case StoryViewType.Header:
            return <Header key={id} text={view.spec.content} size={view.spec.size} />
          case StoryViewType.Markdown:
            return <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {view.spec.content}
            </ReactMarkdown>
          case StoryViewType.Plotly:
            // For some reason plotly doesn't like the type of the data. Hack to make it work
            const spec = JSON.parse(JSON.stringify(view.spec))
            return <div key={id}><Plot data={spec.data} layout={spec.layout} /></div>
        }
      })}
    </StoryDiv>
  )
}

export default Story

interface HeaderProps {
  text: string
  size: number
}

function Header({ text, size }: HeaderProps) {
  switch (size) {
    case 1:
      return <h1>{text}</h1>
    case 2:
      return <h2>{text}</h2>
    case 3:
      return <h3>{text}</h3>
    case 4:
      return <h4>{text}</h4>
    case 5:
      return <h5>{text}</h5>
    case 6:
      return <h6>{text}</h6>
    default:
      return <h1>{text}</h1>
  }
}
