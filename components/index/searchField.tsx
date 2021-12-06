import styled from 'styled-components'
import React, { FormEvent, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { navBlaLighten40 } from '../../styles/constants'

const SearchDiv = styled.form`
  display: flex;
  font-size: 1.25em;
  align-items: center;
  border: 2px solid ${navBlaLighten40};
  border-radius: 10px;
  padding: 5px 10px;
`

const SearchInput = styled.input`
  flex-grow: 1;
  border: none;
  padding: 0;
  :focus-visible {
    outline: none;
  }
`

const SearchButton = styled.button`
  border: none;
  background: none;
  line-height: 1;
  font-size: 1em;
  display: flex;
  align-items: center;
`

export interface FrontPageSearchBoxProps {
  onSearch: (query: string) => void
}

export default function FrontPageSearchBox({
                                             onSearch,
                                           }: FrontPageSearchBoxProps) {
  const [value, setValue] = useState<string>('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSearch(value)
  }

  return (
    <div role='navigation'>
      <SearchDiv onSubmit={onSubmit}>
        <SearchInput
          aria-label={'Søkefelt'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <SearchButton id='some-id' aria-label={'Søk'} onClick={() => onSearch(value)}>
          <SearchIcon fontSize='large' />
        </SearchButton>
      </SearchDiv>
    </div>
  )
}
