import styled from 'styled-components'
import Link from 'next/link'

const LogoBox = styled.div`
  cursor: pointer;
  width: 100px;
  flex-basis: 200px;
  flex-shrink: 0;
  display: flex;
  align-contents: center;
  margin-right: 0.75rem;
  margin-left: 0.75rem;
`

export const Logo = () => (
    <LogoBox>
        <Link href="/">
            <a>
                <img src="/navdata-logo-white.svg" width={"100"} alt={"nav data"}/>
            </a>
        </Link>
    </LogoBox>
)

export default Logo
