import styled from 'styled-components'
import React, { FormEvent, useState } from 'react'
import { Search } from '@navikt/ds-icons'
import { navBlaLighten60, navBlaLighten80 } from '../../styles/constants'

const SearchDiv = styled.form`
  display: flex;
  font-size: 1.25em;
  align-items: center;
  border: 5px solid ${navBlaLighten60};
  border-radius: 10px;
  padding: 5px 10px;
`

const SearchInput = styled.input`
  flex-grow: 1;
  margin-left: 0.5em;
  border: none;
  padding: 0;
  :focus-visible {
    outline: none;
  }
`

const SearchButton = styled.button`
  border: none;
  background: none;
`

const SearchIcon = styled(Search)`
  text-align: center;
  background: none;
`

const redirectPath = (query: string) =>
  query.length
    ? {
        pathname: '/search',
        query: { q: query },
      }
    : {
        pathname: '/',
      }

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
    <SearchDiv role="navigation" onSubmit={onSubmit}>
      <SearchIcon />

      <SearchInput value={value} onChange={(e) => setValue(e.target.value)} />

      <SearchButton aria-label={'Søk'} onClick={() => onSearch(value)}>
        Søk
      </SearchButton>
    </SearchDiv>
  )
}
