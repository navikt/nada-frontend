import styled from 'styled-components'

const LogoImage = styled.img`
  display: block;
  width: 80vw;
  max-width: 400px;
  margin: 0 auto;
`

export const FrontPageLogo = () => (
    <LogoImage src="/navdata-logo.svg" alt="nav data logo" />
)
