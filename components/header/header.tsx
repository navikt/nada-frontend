import styled from 'styled-components'
import User from './user'
import Create from './create'
import Logo from './logo'
import HeaderSearchBox from '../search/headerSearchBox'
import { useRouter } from 'next/router'

interface HeaderProps {
  forceSearch?: boolean
}

const HeaderBar = styled.header`
  display: flex;
  margin: 40px 0;
  justify-content: space-between;
  align-items: center;
`

export default function Header({ forceSearch }: HeaderProps) {
  const router = useRouter()

  return (
    <HeaderBar role="banner">
      <Logo />
      {router.pathname !== '/' && <HeaderSearchBox />}
      <Create />
      <User />
    </HeaderBar>
  )
}
