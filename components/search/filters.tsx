import * as React from 'react'
import styled from "styled-components";
import {Close} from "@navikt/ds-icons";
import {emailToValue, FilterTypes} from '../../pages/search';


const FilterRow = styled.div`
  display: flex;
  margin-bottom: 30px;
`
const FilterPill = styled.span<{ all?: boolean }>`
  cursor: pointer;
  font-size: 0.75em;
  background: ${(props) => props.all ? 'var(--navds-button-color-primary-background)' : '#d4d4d4'};
  ${(props) => props.all ? 'color: var(--navds-button-color-primary-text)' : ''};
  border-radius: ${(props) => props.all ? '2px' : '20px'};
  ${(props) => props.all ? 'color: var(--navds-button-color-primary-text)' : ''};
  padding: 5px 5px 5px 10px;
  margin-right: 10px;
  :hover {
    background: ${(props) => props.all ? 'var(--navds-button-color-primary-background-hover)' : '#c5c5c5'};
    > svg {
    transform: scale(1.4); 
    color: ${(props) => props.all ? '#fff' : 'red'};
    }
  }
  > svg {
    vertical-align: middle;
    font-size: 0.75em;
    margin: 0 2px 0 5px;
  }
`

interface filterProps {
    updateQuery: (key: string, value: string, clear?: boolean) => void
    filters: FilterTypes
}

const Filters = ({updateQuery, filters}: filterProps) =>  (
        <>
            {Object.keys(filters).filter((key) => key === "keywords" || key === "groups").map((key) => filters[key]).flat().length > 0 &&
            <FilterRow>
                <FilterPill all={true} onClick={() => updateQuery("", "", true)}>Fjern alle filtre<Close/></FilterPill>
                {Object.keys(filters)
                    .filter(key => key === "keywords" || key === "groups")
                    .map((key) => {
                        const values = filters[key] as string[]
                        return values.map((value: string) => <FilterPill key={value} onClick={() => updateQuery(key, value)}>{emailToValue(value)}<Close/></FilterPill>)
                    })}
            </FilterRow>}

        </>)

export default Filters
