import styled from 'styled-components'
import React, { FormEvent, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { navBlaLighten40 } from '../../styles/constants'

interface SearchDivProps {
    big?: boolean
}
const SearchForm = styled.form<SearchDivProps>`
  display: flex;
  font-size: ${(props) => props.big ? '1.25em': '1em'};
  align-items: center;
  border: 2px solid ${navBlaLighten40};
  border-radius: 10px;
  border-radius: ${(props) => props.big ? '10px' : '5px'};
  padding: ${(props) => props.big ? '5px 10px' : '5px 0px 5px 10px'};
  width: ${(props) => props.big ? '80%' : '100%'};
  ${(props) => props.big && ' min-width: 350px; max-width: 500px; margin-top: 80px; margin-bottom: 50px;'}
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
  font-size: ${(props) => props.big ? '1em' : '0.6em'};
  svg { 
    height: ${(props) => props.big ? '1em' : '0.6em'};
    width: ${(props) => props.big ? '1em' : '0.6em'};
  }
  display: flex;
  align-items: center;
`

interface SearchBoxProps {
    onSearch: (query: string) => void
    big?: boolean
}

const SearchBox = ({ onSearch, big }: SearchBoxProps) =>  {
    const [value, setValue] = useState<string>("")
    console.log(value)

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSearch(value)
    }

    return (
        <div
            role="navigation"
            style={{ display: 'flex', justifyContent: 'center' }}
        >
            <SearchForm onSubmit={onSubmit} big={big}>
                <SearchInput
                    aria-label={'Søkefelt'}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />

                <SearchButton
                    id="some-id"
                    aria-label={'Søk'}
                >
                    <SearchIcon fontSize="large" />
                </SearchButton>
            </SearchForm>
        </div>
    )
}
export default SearchBox