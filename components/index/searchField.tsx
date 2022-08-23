import styled from 'styled-components'
import React, { FormEvent, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { navBlaLighten40 } from '../../styles/constants'

interface SearchDivProps {}
const SearchForm = styled.form<SearchDivProps>`
  display: flex;
  font-size: 1.25em;
  align-items: center;
  border: 2px solid ${navBlaLighten40};
  border-radius: 10px;
  padding: 5px 10px;
  width: 80%;
  min-width: 350px;
  max-width: 500px;
`

const SearchInput = styled.input`
  width: 100%;
  border: none;
  padding: 0;
  :focus-visible {
    outline: none;
  }
`

const SearchButton = styled.button<SearchDivProps>`
  border: none;
  background: none;
  line-height: 1;
  font-size: 1em;
  svg {
    height: 1em;
    width: 1em;
  }
  display: flex;
  align-items: center;
`

interface SearchBoxProps {
  onSearch: (query: string) => void
}

const SearchBox = ({ onSearch }: SearchBoxProps) => {
  const [value, setValue] = useState<string>('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSearch(value)
  }

  return (
    <div
      role="navigation"
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <SearchForm onSubmit={onSubmit}>
        <SearchInput
          type={'search'}
          aria-label={'Søkefelt'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <SearchButton id="some-id" aria-label={'Søk'}>
          <SearchIcon fontSize="large" />
        </SearchButton>
      </SearchForm>
    </div>
  )
}
export default SearchBox
