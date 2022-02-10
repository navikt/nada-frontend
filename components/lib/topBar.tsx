import styled from 'styled-components'
import { colorScheme, ColorSchemeTypes } from './colorScheme'

interface TopBarProps {
  type?: ColorSchemeTypes
}

const TopBar = styled.div<TopBarProps>`
  background-color: ${({ type }) => type ? colorScheme[type].dark : 'inherit'};
  color: ${({ type }) => type ? colorScheme[type].light : '#222'};
  display: flex;
  padding: 1em;
  justify-content: space-between;
  align-items: center;

  button {
    color: ${({ type }) => type ? colorScheme[type].light : '#222'};
  }
`
export default TopBar
