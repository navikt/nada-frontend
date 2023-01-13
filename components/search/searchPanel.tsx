import { QueryResult } from '@apollo/client'
import { Accordion, Loader, Search } from '@navikt/ds-react'
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

const mapProductAreas = (
  productAreas: ProductAreasQuery,
  pickedFilters: string[]
) => {
  const productAreasTree = {} as FilterTreeNode
  productAreas.productAreas.forEach((it) => {
    if (!!it.teams && it.teams.length > 0) {
      productAreasTree[it.name] = {} as FilterTreeNode
      it.teams.forEach((team) => {
        ;(productAreasTree[it.name] as FilterTreeNode)[team.name] =
          !!pickedFilters.find((f) => f === team.name)
      })
    }
  })
  return productAreasTree
}

const buildProductAreaFiltersTree = (
  queryResult: QueryResult<ProductAreasQuery, Exact<{ [key: string]: never }>>,
  pickedFilters: string[]
) => {
  return queryResult.loading || !queryResult.data
    ? ({} as FilterTreeNode)
    : mapProductAreas(queryResult.data, pickedFilters)
}

const buildKeywordsFiltersTree = (
  queryResult: QueryResult<KeywordsQuery, Exact<{ [key: string]: never }>>,
  pickedFilters: string[]
) => {
  const keywordsTree = {} as FilterTreeNode
  return queryResult.loading || !queryResult.data
    ? ({} as FilterTreeNode)
    : (Object.fromEntries(
        new Map(
          queryResult.data.keywords.map((it) => [
            it.keyword,
            !!pickedFilters.find((f) => it.keyword === f),
          ])
        )
      ) as FilterTreeNode)
}

export const SearchPanel = () => {
  const [pickedTeams, setPickedTeams] = useState<string[]>([])
  const [pickedKeyword, setPickedKeyword] = useState<string[]>([])
  const po = useProductAreasQuery()
  const kw = useKeywordsQuery()

  const productAreaFiltersTree = buildProductAreaFiltersTree(po, pickedTeams)
  const keywordsFiltersTree = buildKeywordsFiltersTree(kw, pickedKeyword)

  const onToggleProductArea = (filter: string) => {
    const picked = !Object.entries(productAreaFiltersTree[filter]).every(
      (it) => !!pickedTeams.find((team) => team === it[0])
    )

    let updatedFilterValues: string[] = []
    if (picked) {
      updatedFilterValues = [
        ...new Set([
          ...pickedTeams,
          ...Object.entries(productAreaFiltersTree[filter]).map((it) => it[0]),
        ]),
      ]
    } else {
      updatedFilterValues = pickedTeams.filter(
        (it) =>
          !Object.entries(productAreaFiltersTree[filter]).find(
            (e) => e[0] === it
          )
      )
    }
    setPickedTeams(updatedFilterValues)
  }

  const onToggleTeam = (filter: string) => {
    const picked = !pickedTeams.find((it) => filter === it)
    const updatedFilterValues = picked
      ? [...new Set([...pickedTeams, filter])]
      : pickedTeams.filter((it) => it != filter)
    setPickedTeams(updatedFilterValues)
  }

  const onToggleProductAreaOrTeam = (filter: string) => {
    Object.entries(productAreaFiltersTree).find((pa) => pa[0] === filter)
      ? onToggleProductArea(filter)
      : onToggleTeam(filter)
  }

  const onPickKeyword = (filter: string) => {
    const picked = !pickedKeyword.find((it) => filter === it)
    const updatedFilterValues = picked
      ? [...new Set([...pickedKeyword, filter]).values()]
      : pickedKeyword.filter((it) => it != filter)
    setPickedKeyword(updatedFilterValues)
  }
  return (
    <div>
      <Search
        label="panel søk"
        size="small"
        variant="simple"
        placeholder="Søk"
        onChange={(text) => {}}
      />
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
