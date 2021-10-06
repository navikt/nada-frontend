import styled from 'styled-components'
import User from './user'
import Create from './create'
import Logo from './logo'
import SearchBox from '../search/searchBox'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { SearchState } from '../../lib/context'

const HeaderBar = styled.header`
  display: flex;
  margin: 40px 0;
  justify-content: space-between;
  align-items: center;
`

export default function Header() {
  const searchState = useContext(SearchState)

  return (
    <HeaderBar role="banner">
      <Logo />

      {searchState.searchQuery !== '' && <SearchBox />}
      <Create />
      <User />
    </HeaderBar>
  )
}
