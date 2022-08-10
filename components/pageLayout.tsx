import styled from 'styled-components'
import User from './header/user'
import Logo from './header/logo'
import {useRouter} from 'next/router'
import {Header} from "@navikt/ds-react-internal";
import {AddCircle, Information} from "@navikt/ds-icons";
import React, {useContext} from "react";
import {UserState} from "../lib/context";

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

const NadaHeader = styled(Header)`
    display: flex
    flex-direction: row
    justify-content: space-between;
`

const NadaHeaderRight = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: auto;
    margin-right: 1rem;
`

export const PageLayout = ({children}: { children: React.ReactNode }) => {
    const router = useRouter()
    const userInfo = useContext(UserState)

    return (
        <Container>
            <NadaHeader>
                {router.pathname !== '/' && <Header.Title><Logo/></Header.Title>}
                <NadaHeaderRight>
                    {userInfo && <Header.Button onClick={async () => await router.push('/dataproduct/new')}><AddCircle/></Header.Button>}
                    <Header.Button onClick={async () => await router.push('/about')}><Information/></Header.Button>
                    <User/>
                </NadaHeaderRight>
            </NadaHeader>
            <Main>{children}</Main>
        </Container>
    )
}

export default PageLayout
