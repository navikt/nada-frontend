import Link from 'next/link'
import styled from 'styled-components'
import User from './user'
import HeaderLogo from '../lib/icons/headerLogo'
import SearchBox from '../search/searchBox'
import {useRouter} from "next/router";

const HeaderBar = styled.header`
  display: flex;
  margin: 40px 0;
  justify-content: space-between;
`

export default function Header() {

    const router = useRouter()
    console.log(router.pathname)
    return (
        <HeaderBar role="banner">
            <Link href="/">
                <div>
                    <HeaderLogo/>
                </div>
            </Link>

            {router.pathname !== '/' && <SearchBox/>}
            <User/>
        </HeaderBar>
    )
}
