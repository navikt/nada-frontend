import styled from 'styled-components'
import { Story, StoryViewType } from '../../lib/schema/graphql'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Header from './header'

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
