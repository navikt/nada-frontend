import styled from 'styled-components'
import User from './header/user'
import Create from './header/create'
import Logo from './header/logo'
import HeaderSearchBox from './search/headerSearchBox'
import { useRouter } from 'next/router'

interface HeaderProps {
  forceSearch?: boolean
}

const HeaderBar = styled.header`
  display: flex;
  padding: 0.25em 1em;
  border-bottom: 1px solid #aaa;
  justify-content: space-between;
  align-items: center;
`

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`
const Main = styled.main`
  max-width: 80vw;
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
        {router.pathname !== '/' && <Logo />}
        {router.pathname !== '/' && <HeaderSearchBox />}
        <div style={{ display: 'flex', marginLeft: 'auto' }}>
          <Create />
          <User />
        </div>
      </HeaderBar>
      <Main role="content">{children}</Main>
    </Container>
  )
}

export default PageLayout
