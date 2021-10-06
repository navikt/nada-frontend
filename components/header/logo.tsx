import styled from 'styled-components'
import Link from 'next/link'

const LogoBox = styled.div`
  cursor: pointer;
  width: 150px;
  flex-basis: 150px;
  flex-shrink: 0;
`

export const Logo = () => (
  <LogoBox aria-label="Datakatalogen">
    <Link href="/">
      <img src="/nada.svg" />
    </Link>
  </LogoBox>
)

export default Logo
