import styled from 'styled-components'

interface SpacedDivProps {
  spacing?: string
}

const SpacedDiv = styled.div<SpacedDivProps>`
  margin-bottom: ${(props) => (props.spacing ? props.spacing : '0.75rem')};
`
export default SpacedDiv
