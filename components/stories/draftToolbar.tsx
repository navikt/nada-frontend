import styled from 'styled-components'
import { Story, StoryViewType } from '../../lib/schema/graphql'

const ToolbarDiv = styled.div`
  position: fixed;
  bottom: 0;
`
interface ToolbarProps {
  story: Story
}

export function DraftToolbar({ story }: ToolbarProps) {
  return (
    <ToolbarDiv>
      <h1>Toolbar</h1>
    </ToolbarDiv>
  )
}

export default DraftToolbar
