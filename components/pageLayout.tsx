import Header from './header/header'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 80vw;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`
const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`
export const PageLayout = ({ children }: { children: React.ReactNode }) => (
  <Container>
    <Header />
    <Main role="content">{children}</Main>
  </Container>
)

export default PageLayout
