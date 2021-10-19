import styled from 'styled-components'
import { Button, TextField } from '@navikt/ds-react'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Search } from '@navikt/ds-icons'

interface SearchBoxProps {
  large?: boolean
}

const SearchDiv = styled.div`
  width: 70%;
  padding: 0 5px;
  margin: 0 auto;

  .navds-form-field {
    width: 100%;
    > input {
      border-radius: 0.25em 0 0 0.25em;
    }
  }
  .navds-button {
    padding: 0;
    margin-left: 0em;
    border-radius: 0 0.25em 0.25em 0;
  }
`

const LargeSearchDiv = styled(SearchDiv)`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;

  .navds-form-field {
    > input {
      border-radius: 0.25em;
    }
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
        pathname: '/',
      }

export default function SearchBox({ large }: SearchBoxProps) {
  const router = useRouter()
  let { q } = router.query
  if (typeof q !== 'string') q = ''
  const [value, setValue] = useState<string>(q)
  const VariantDiv = large ? LargeSearchDiv : SearchDiv

  return (
    <VariantDiv role="navigation">
      <div style={{ display: 'flex' }}>
        <TextField
          label=""
          hideLabel
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              router.push(redirectPath(value))
            }
          }}
        />
        <Button
          aria-label={'Søk'}
          onClick={() => {
            router.push(redirectPath(value))
          }}
        >
          <Search />
          {large ? 'Søk' : null}
        </Button>
      </div>
    </VariantDiv>
  )
}
