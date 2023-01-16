import { QueryResult } from '@apollo/client'
import { Accordion, Loader, Search } from '@navikt/ds-react'
import router from 'next/router'
import { useState } from 'react'
import {
  Exact,
  KeywordsQuery,
  ProductAreasQuery,
  ProductAreasQueryResult,
  useKeywordsQuery,
  useProductAreasQuery,
} from '../../lib/schema/graphql'
import { FiltersPicker, FilterTreeNode } from './filtersPicker'

export interface SearchPanelProps {
  searchTerm: string
  searchTeam: string[]
  searchKeyword: string[]
  productAreaFiltersTree: FilterTreeNode
  keywordsFiltersTree: FilterTreeNode
  updateQuery: (term: string, teams: string[], keywords: string[]) => void
}

export const SearchPanel = ({
  searchTerm,
  searchTeam,
  searchKeyword,
  productAreaFiltersTree,
  keywordsFiltersTree,
  updateQuery,
}: SearchPanelProps) => {
  const [updatedSearchTerm, setUpdatedSearchTerm] = useState(searchTerm)
  const po = useProductAreasQuery()
  const kw = useKeywordsQuery()

  console.log(searchTeam)
  const onToggleProductArea = (filter: string) => {
    const picked = !Object.entries(productAreaFiltersTree[filter]).every(
      (it) => !!searchTeam.find((team) => team === it[0])
    )

    let updatedFilterValues: string[] = []
    if (picked) {
      updatedFilterValues = [
        ...new Set([
          ...searchTeam,
          ...Object.entries(productAreaFiltersTree[filter]).map((it) => it[0]),
        ]),
      ]
    } else {
      updatedFilterValues = searchTeam
        .filter(
          (it) =>
            !Object.entries(productAreaFiltersTree[filter]).find(
              (e) => e[0] === it
            )
        )
    }
    updateQuery(updatedSearchTerm, updatedFilterValues, searchKeyword)
  }

  const onToggleTeam = (filter: string) => {
    const picked = !searchTeam.find((it) => filter === it)
    const updatedFilterValues = (picked
      ? [...new Set([...searchTeam, filter])]
      : searchTeam.filter((it) => it != filter))
    updateQuery(updatedSearchTerm, updatedFilterValues, searchKeyword)
  }

  const onToggleProductAreaOrTeam = (filter: string) => {
    return Object.entries(productAreaFiltersTree).find((pa) => pa[0] === filter)
      ? onToggleProductArea(filter)
      : onToggleTeam(filter)
  }

  const onPickKeyword = (filter: string) => {
    const picked = !searchKeyword.find((it) => filter === it)
    const updatedFilterValues = picked
      ? [...new Set([...searchKeyword, filter]).values()]
      : searchKeyword.filter((it) => it != filter)
    updateQuery(updatedSearchTerm, searchTeam, updatedFilterValues)
  }

  return (
    <div>
      <form
        className="self-center px-5 mb-5 mt-3"
        onSubmit={(e) => {
          e.preventDefault()
          updateQuery(updatedSearchTerm, searchTeam, searchKeyword)
        }}
      >
        <Search
          label="panel søk"
          size="small"
          variant="simple"
          placeholder="Søk"
          value={updatedSearchTerm}
          onChange={(text) => {
            setUpdatedSearchTerm(text)
          }}
        />
      </form>
      <Accordion>
        {po.loading ? (
          <Loader />
        ) : (
          <FiltersPicker
            header="Områder"
            filtersTree={productAreaFiltersTree}
            onToggle={onToggleProductAreaOrTeam}
          ></FiltersPicker>
        )}
        {kw.loading ? (
          <Loader />
        ) : (
          <FiltersPicker
            header="Nøkkelord"
            filtersTree={keywordsFiltersTree}
            onToggle={onPickKeyword}
          ></FiltersPicker>
        )}
      </Accordion>
    </div>
  )
}
