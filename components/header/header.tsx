import styled from 'styled-components'
import User from './user'
import Create from './create'
import Logo from './logo'
import SearchBox from '../search/searchBox'
import { useRouter } from 'next/router'

const HeaderBar = styled.header`
  display: flex;
  margin: 40px 0;
  justify-content: space-between;
  align-items: center;
`

export default function Header() {
  const router = useRouter()
  return (
    <HeaderBar role="banner">
      <Logo />

      {router.pathname !== '/' && <SearchBox />}
      <Create />
      <User />
    </HeaderBar>
  )
}
