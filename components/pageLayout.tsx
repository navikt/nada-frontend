import styled from 'styled-components'
import User from './header/user'
import Create from './header/create'
import Logo from './header/logo'
import HeaderSearchBox from './search/headerSearchBox'
import { useRouter } from 'next/router'

const HeaderBar = styled.header`
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95vw;
    max-width: 1500px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25em 1em;
  height: 60px;
  border-bottom: 1px solid #aaa;
`

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`
const Main = styled.main`
  width: 80vw;
  @media only screen and (max-width: 768px) {
    width: 95vw;
  }
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`
export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  return (
    <Container>
      <HeaderBar role="banner">
        <div>
          {router.pathname !== '/' && <Logo />}
          <div style={{ display: 'flex', marginLeft: 'auto' }}>
            <Create />
            <User />
          </div>
        </div>
      </HeaderBar>
      <Main>{children}</Main>
    </Container>
  )
}

export default PageLayout
