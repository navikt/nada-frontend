import styled from 'styled-components'
import { Button, SearchField, SearchFieldInput, TextField } from '@navikt/ds-react'
import { Close, Search } from '@navikt/ds-icons'
import React, { useContext } from 'react'
import { SearchFieldButton, SearchFieldClearButton } from "@navikt/ds-react/esm/form/search-field";
import { SearchState } from '../../pages/_app';

const SearchDiv = styled.div`
  width: 80%;
  padding: 15px;
  margin: 0 auto;
  .navds-form-field {
    width: 100%;
  };
`

export interface SearchBoxProps {
    query: string
    setQuery: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchBox() {

    const searchState = useContext(SearchState)

    const [searchBox, setSearchBox] = React.useState(searchState.query)

    return (
        <SearchDiv role="navigation">
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                }}
            >
                <div style={{ display: "flex", }}>
                    <TextField label="" hideLabel
                        onChange={(event) => {
                            setSearchBox(event.target.value)
                        }}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                searchState.setQuery(searchBox)
                            }
                        }}
                    />
                    <Button onClick={() => searchState.setQuery(searchBox)}>
                        <Search /> Søk
                    </Button>
                </div>
            </form>
        </SearchDiv>
    )
}
