import styled from 'styled-components'
import { Button, TextField } from '@navikt/ds-react'
import React, { useState } from 'react'
import { Search } from '@navikt/ds-icons'

const SearchDiv = styled.div`
  width: 100%;
  padding: 5px;
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

interface ProductSearchBoxProps {
  onSubmit: (value: string) => void
}

export default function ProductSearchBox({ onSubmit }: ProductSearchBoxProps) {
  const [value, setValue] = useState<string>('')

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
              onSubmit(value)
            }
          }}
        />
        <Button
          aria-label={'Søk'}
          onClick={() => {
            onSubmit(value)
          }}
        >
          <Search />
        </Button>
      </div>
    </SearchDiv>
  )
}
