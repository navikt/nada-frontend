import { Accordion, Loader, Search } from '@navikt/ds-react'
import { useState } from 'react'
import {
  useKeywordsQuery,
  useProductAreasQuery,
} from '../../lib/schema/graphql'
import { SearchParam } from '../../pages/search'
import { FiltersPicker, FilterTreeNode } from './filtersPicker'

export interface SearchPanelProps {
  searchParam: SearchParam
  productAreaFiltersTree: FilterTreeNode
  keywordsFiltersTree: FilterTreeNode
  updateQuery: (searchParam: SearchParam) => void
}

export const SearchPanel = ({
  searchParam,
  productAreaFiltersTree,
  keywordsFiltersTree,
  updateQuery,
}: SearchPanelProps) => {
  const [updatedSearchTerm, setUpdatedSearchTerm] = useState(
    searchParam.freeText || ''
  )
  const po = useProductAreasQuery()
  const kw = useKeywordsQuery()

  const onToggleTeam = (filter: string) => {
    const picked = !searchParam.teams?.find((it) => filter === it)
    const updatedFilterValues = picked
      ? [...new Set([...(searchParam.teams || []), filter])]
      : searchParam.teams?.filter((it) => it != filter)
    updateQuery({ ...searchParam, teams: updatedFilterValues })
  }

  const onPickKeyword = (filter: string) => {
    const picked = !searchParam.keywords?.find((it) => filter === it)
    const updatedFilterValues = picked
      ? [...new Set([...(searchParam.keywords || []), filter]).values()]
      : searchParam.keywords?.filter((it) => it != filter)
    updateQuery({ ...searchParam, keywords: updatedFilterValues })
  }

  return (
    <div>
      <form
        className="self-center px-5 mb-5 mt-3"
        onSubmit={(e) => {
          e.preventDefault()
          updateQuery({ ...searchParam, freeText: updatedSearchTerm })
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
            onToggle={onToggleTeam}
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
