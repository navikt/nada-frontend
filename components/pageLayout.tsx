import User from './header/user'
import Logo from './header/logo'
import {useRouter} from 'next/router'
import {Header} from "@navikt/ds-react-internal";
import {AddCircle, Information} from "@navikt/ds-icons";
import React, {useContext} from "react";
import {UserState} from "../lib/context";


export const PageLayout = ({children}: { children: React.ReactNode }) => {
    const router = useRouter()
    const userInfo = useContext(UserState)

    return (
        <div className="min-h-screen flex flex-col">
            <Header className="flex flex-row justify-between">
                <Header.Title><Logo/></Header.Title>
                <div className="flex flex-row">
                    {userInfo && <Header.Button className="border-transparent" onClick={async () => await router.push('/dataproduct/new')}><AddCircle/></Header.Button>}
                    <Header.Button className={userInfo ? "" : "border-transparent"} onClick={async () => await router.push('/about')}><Information/></Header.Button>
                    <User/>
                </div>
            </Header>
            <main className="w-[95vw] md:w-[80vw] flex flex-col grow self-center">{children}</main>
        </div>
    )
}

export default PageLayout
