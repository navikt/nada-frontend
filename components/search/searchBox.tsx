import styled from 'styled-components'
import { Button, TextField } from '@navikt/ds-react'
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { Search } from '@navikt/ds-icons'
import { SearchState } from '../../lib/context'

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

const redirectPath = (query: string) =>
  query.length
    ? {
        pathname: '/search',
        query: { q: query },
      }
    : {
        pathname: '/dataproducts',
      }

export default function SearchBox() {
  const searchState = useContext(SearchState)
  const [value, setValue] = useState<string>(searchState.searchQuery)
  const router = useRouter()

  return (
    <SearchDiv role="navigation">
      <div style={{ display: 'flex' }}>
        <TextField
          label=""
          hideLabel
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              searchState.setSearchQuery(value)
              router.push(redirectPath(value))
            }
          }}
        />
        <Button
          onClick={() => {
            searchState.setSearchQuery(value)
            router.push(redirectPath(value))
          }}
        >
          <Search /> Søk
        </Button>
      </div>
    </SearchDiv>
  )
}
