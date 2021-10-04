import styled from 'styled-components'
import { Button, TextField } from '@navikt/ds-react'
import React, { useContext } from 'react'
import { SearchState } from '../../pages/_app'
import { useRouter } from 'next/router'
import { Search } from '@navikt/ds-icons'

const SearchDiv = styled.div`
  width: 70%;
  padding: 15px;
  margin: 0 auto;
  .navds-form-field {
    width: 100%;
  }
  .navds-button {
    padding: 0 2em 0 1em;
    margin-left: 1em;
    border-radius: 0.25em;
  }
`

export default function SearchBox() {
  const searchState = useContext(SearchState)
  const router = useRouter()

  return (
    <SearchDiv role="navigation">
      <div style={{ display: 'flex' }}>
        <TextField
          label=""
          hideLabel
          value={searchState.value}
          onChange={(e) => {
            searchState.setValue(e.target.value)
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              searchState.setQuery(searchState.value)
              router.push({
                pathname: '/search',
                query: { q: searchState.value },
              })
            }
          }}
        />
        <Button
          onClick={() => {
            searchState.setQuery(searchState.value)
            router.push({
              pathname: '/search',
              query: { q: searchState.query },
            })
          }}
        >
          <Search /> Søk
        </Button>
      </div>
    </SearchDiv>
  )
}
