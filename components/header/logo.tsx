import styled from 'styled-components'
import Link from 'next/link'

const LogoBox = styled.div`
  cursor: pointer;
  width: 200px;
  flex-basis: 200px;
  flex-shrink: 0;
  display: flex;
  align-contents: center;
  margin-right: 12px;
`

export const Logo = () => (
    <LogoBox>
        <Link href="/">
            <a>
                <img src="/navdata-logo.svg" width={"200"} alt={"nav data"}/>
            </a>
        </Link>
    </LogoBox>
)

export default Logo
