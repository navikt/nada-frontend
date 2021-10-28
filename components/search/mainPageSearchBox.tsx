import styled from 'styled-components'
import { Button } from '@navikt/ds-react'
import React, { useState } from 'react'
import { Search } from '@navikt/ds-icons'

const StyledLargeSearchDiv = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  .searchfield {
    display: flex;
    flex-direction: row-reverse;
    align-contents: center;
    div {
      border: 1px solid var(--navds-text-field-color-border);

      fontsize: 48px;

      padding: 10px;

      border-radius: 0.25em 0 0 0.25em;
      border-right: none;
      svg {
        display: block;
        height: 100%;
        width: 100%;
      }
    }
    > input {
      width: 100%;
      padding: 0.5rem;
      height: 48px;
      border: 1px solid var(--navds-text-field-color-border);
      appearance: none;
      border-left: none;
      border-radius: 0 0.25em 0.25em 0;
    }
    > input:focus + div {
      padding: 8px;
      border-width: 3px;
      border-color: rgb(0, 52, 125);
      outline: none;
    }

    > input:focus {
      border-width: 3px;
      border-color: rgb(0, 52, 125);
      outline: none;
    }
  }
  .navds-button {
    padding: 0.75em 1.5em;
    margin: 1em auto;
    display: block;
    border-radius: 0.5em;
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

export interface FrontPageSearchBoxProps {
  onSearch: (query: string) => void
}

export default function FrontPageSearchBox({
  onSearch,
}: FrontPageSearchBoxProps) {
  const [value, setValue] = useState<string>('')

  return (
    <StyledLargeSearchDiv role="navigation">
      <div className={'searchfield'}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSearch(value)
          }}
        />
        <div>
          <Search />
        </div>
      </div>
      <div>
        <Button
          variant={'secondary'}
          aria-label={'Søk'}
          onClick={() => onSearch(value)}
        >
          Søk
        </Button>
      </div>
    </StyledLargeSearchDiv>
  )
}
