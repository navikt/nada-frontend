import styled from 'styled-components'
import { colorScheme, ColorSchemeTypes } from './colorScheme'

interface TopBarProps {
  type: ColorSchemeTypes
}

const TopBar = styled.div<TopBarProps>`
  background-color: ${({ type }) => colorScheme[type].dark};
  color: white;
  display: flex;
  padding: 1em;
  justify-content: space-between;
  align-items: center;

  button {
    color: white;
  }
`
export default TopBar
