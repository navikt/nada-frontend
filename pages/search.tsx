import { QueryResult } from '@apollo/client'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as React from 'react'
import InnerContainer from '../components/lib/innerContainer'
import FiltersList from '../components/search/filtersList'
import { FilterTreeNode } from '../components/search/filtersPicker'
import ResultList from '../components/search/resultList'
import { SearchPanel } from '../components/search/searchPanel'

import {
  Exact,
  KeywordsQuery,
  ProductAreasQuery,
  SearchType,
  useKeywordsQuery,
  useProductAreasQuery,
  useSearchContentWithOptionsQuery,
} from '../lib/schema/graphql'

export interface SearchParam {
  [s: string]: undefined | string | string[]
  preferredType?: string
  freeText?: string
  teams?: string[]
  keywords?: string[]
}

export const isEmptyFilter = (param: SearchParam) =>
  !param.freeText && !param.keywords?.length && !param.teams?.length

export const emptyFilter = {
  freeText: '',
  teams: [],
  keywords: [],
}

export const arrayify = (query: string | string[] | undefined) => {
  if (query) {
    if (typeof query === 'string') return query.split(',')
    if (Array.isArray(query)) return query
  }
  return []
}

//Use an object to represent the filters tree, where the object itself is the root of the tree, and its
//properties represent product areas, which are also objects. The properties of the nested objects
//for product areas represent the team filters, which are booleans. The values of the boolean properties
//represent if the related filters are selected.
//For example, if the product areas info is:
// - PO1
//   - team1
// - PO2
//   - team2
//   - team3
// and only team1 is selected as a filter
//The object layout will be:
//{
//  PO1: {
//          team1 : true,
//       },
//  PO2:{
//          team2 : false,
//          team3 : false,
//      },
//}
const mapProductAreasToFiltersTree = (
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
    : mapProductAreasToFiltersTree(queryResult.data, pickedFilters)
}

const buildKeywordsFiltersTree = (
  queryResult: QueryResult<KeywordsQuery, Exact<{ [key: string]: never }>>,
  pickedFilters: string[]
) => {
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

//backend search use team_id instead of team name, which is not human readable
//so we use the maps to convert the values
const buildTeamIDMaps = (
  queryResult: QueryResult<ProductAreasQuery, Exact<{ [key: string]: never }>>
) => {
  return queryResult.loading || !queryResult.data
    ? [new Map(), new Map()]
    : [
        new Map(
          queryResult.data.productAreas.flatMap((it) =>
            it.teams.map((t) => [t.name, t.id])
          )
        ),
        new Map(
          queryResult.data.productAreas.flatMap((it) =>
            it.teams.map((t) => [t.id, t.name])
          )
        ),
      ]
}

const Search = () => {
  const po = useProductAreasQuery()
  const kw = useKeywordsQuery()
  const [teamNameToID, teamIDToName] = buildTeamIDMaps(po)

  const router = useRouter()
  const baseUrl = router.asPath.split('?')[0]

  const searchParam: SearchParam = {
    preferredType: router.query.preferredType?.toString() || '',
    freeText: (!!router.query.text && router.query.text.toString()) || '',
    teams: arrayify(router.query.teamIDs).map((it) => teamIDToName.get(it)),
    keywords: arrayify(router.query.keywords),
  }
  const productAreaFiltersTree = buildProductAreaFiltersTree(
    po,
    searchParam.teams || []
  )
  const keywordsFiltersTree = buildKeywordsFiltersTree(
    kw,
    searchParam.keywords || []
  )
  const search = useSearchContentWithOptionsQuery({
    variables: {
      options: {
        limit: 1000,
        types: ['dataproduct', 'story'] as SearchType[],
        groups: [],
        teamIDs: searchParam.teams?.map((it) => teamNameToID.get(it)),
        keywords: searchParam.keywords,
        text: searchParam.freeText,
      },
    },
    fetchPolicy: 'network-only',
  })

  const updateQuery = async (updatedParam: SearchParam) => {
    await router.push(buildQueryString(updatedParam))
  }

  const buildQueryString = (param: SearchParam) => {
    const queryString = new URLSearchParams()
    queryString.append('text', param.freeText || '')
    queryString.append('preferredType', param.preferredType || 'story')
    param.teams?.forEach((t) =>
      queryString.append('teamIDs', teamNameToID.get(t))
    )
    param.keywords?.forEach((k) => queryString.append('keywords', k))
    return baseUrl + '?' + queryString.toString()
  }

  return (
    <InnerContainer>
      <Head>
        <title>Søkeresultater</title>
      </Head>
      <div className="flex flex-row mt-11">
        <div className="flex flex-col w-80">
          {router.isReady && (
            <SearchPanel
              searchParam={searchParam}
              productAreaFiltersTree={productAreaFiltersTree}
              keywordsFiltersTree={keywordsFiltersTree}
              updateQuery={updateQuery}
            />
          )}
        </div>
        <div className="flex-grow pl-6">
          {!isEmptyFilter(searchParam) && (
            <FiltersList
              searchParam={searchParam}
              updateQuery={updateQuery}
              className={'mt-3'}
            />
          )}
          <ResultList
            search={search}
            searchParam={searchParam}
            updateQuery={updateQuery}
          />
        </div>
      </div>
    </InnerContainer>
  )
}

export default Search
