import styled from 'styled-components'
import { navLillaDarken40 } from '../../styles/constants'

const TopBar = styled.div`
  background-color: ${navLillaDarken40};
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
