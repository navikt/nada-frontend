import styled from 'styled-components'
import { Button } from '@navikt/ds-react'

const ToolbarDiv = styled.div`
  margin-top: 40px;
  top: 0;
  position: sticky;
  background: #fff;
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: row;
  z-index: 10000;
  background-color: #E6F0FF;


  h3 {
    margin: 0;
    padding: 0 10px;
    > span {
      color: red;
    }
  }
`

interface ToolbarProps {
  onSave: () => void
}

export function DraftToolbar({ onSave }: ToolbarProps) {
  return (
    <ToolbarDiv>
      <h3><span>Kladd:</span> ikke lagret</h3>
      <Button onClick={(_) => onSave()}>Lagre</Button>
    </ToolbarDiv>
  )
}

export default DraftToolbar
