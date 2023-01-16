import * as React from 'react'
import router, { useRouter } from 'next/router'
import Head from 'next/head'
import SideMenu from '../components/search/sidemenu'
import Filters from '../components/search/filters'
import {
  Exact,
  KeywordsQuery,
  MappingService,
  ProductAreasQuery,
  SearchType,
  useKeywordsQuery,
  useProductAreasQuery,
  useSearchContentWithOptionsQuery,
} from '../lib/schema/graphql'
import ResultList from '../components/search/resultList'
import amplitudeLog from '../lib/amplitude'
import InnerContainer from '../components/lib/innerContainer'
import { Heading } from '@navikt/ds-react'
import { SearchPanel } from '../components/search/searchPanel'
import { string } from 'yup'
import { useState } from 'react'
import { FilterTreeNode } from '../components/search/filtersPicker'
import { QueryResult } from '@apollo/client'
import FiltersList from '../components/search/filtersList'

export const arrayify = (query: string | string[] | undefined) => {
  if (query) {
    if (typeof query === 'string') return query.split(',')
    if (Array.isArray(query)) return query
  }
  return []
}

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

  const searchPreferredType = router.query.preferredType?.toString() || ''
  const searchText = (!!router.query.text && router.query.text.toString()) || ''
  const searchTeamIDs = arrayify(router.query.teamIDs)
  const searchKeywords = arrayify(router.query.keywords)
  const searchTeam = searchTeamIDs
    .map((id) => teamIDToName.get(id))
    .filter((t) => !!t)
  const productAreaFiltersTree = buildProductAreaFiltersTree(po, searchTeam)
  const keywordsFiltersTree = buildKeywordsFiltersTree(kw, searchKeywords)
  const search = useSearchContentWithOptionsQuery({
    variables: {
      options: {
        limit: 1000,
        types: ['dataproduct', 'story'] as SearchType[],
        groups: [],
        teamIDs: searchTeamIDs,
        keywords: searchKeywords,
        text: searchText,
      },
    },
    fetchPolicy: 'network-only',
  })

  const updateQuery = async (
    searchTerm: string,
    searchTeam: string[],
    searchKeyword: string[]
  ) => {
    await router.push(
      buildQueryString(
        searchTerm,
        searchPreferredType,
        searchTeam.map((t) => teamNameToID.get(t)).filter((id) => !!id),
        searchKeyword
      )
    )
  }

  const updatePreferredType = async (updatedPreferredType: string) => {
    await router.push(
      buildQueryString(
        searchText,
        updatedPreferredType,
        searchTeamIDs,
        searchKeywords
      )
    )
  }

  const buildQueryString = (
    term: string,
    preferredType: string,
    teamID: string[],
    keyword: string[]
  ) => {
    const queryString = new URLSearchParams()
    queryString.append('text', term)
    queryString.append('preferredType', preferredType)
    teamID.forEach((t) => queryString.append('teamIDs', t))
    keyword.forEach((k) => queryString.append('keywords', k))
    return baseUrl + '?' + queryString.toString()
  }

  const noFilters = !searchText && !searchTeam.length && !searchKeywords.length

  return (
    <InnerContainer>
      <Head>
        <title>Søkeresultater</title>
      </Head>
      <div className="flex flex-row mt-11">
        <div className="flex flex-col w-80">
          {router.isReady && (
            <SearchPanel
              searchTerm={searchText}
              searchTeam={searchTeam}
              searchKeyword={searchKeywords}
              productAreaFiltersTree={productAreaFiltersTree}
              keywordsFiltersTree={keywordsFiltersTree}
              updateQuery={updateQuery}
            />
          )}
        </div>
        <div className="flex-grow pl-6">
          {!noFilters && (
            <FiltersList
              searchTerm={searchText}
              searchTeam={searchTeam}
              searchKeyword={searchKeywords}
              updateQuery={updateQuery}
              className={'mt-3'}
            />
          )}
          <ResultList
            search={search}
            preferredType={searchPreferredType}
            updatePreferredType={updatePreferredType}
          />
        </div>
      </div>
    </InnerContainer>
  )
}

export default Search
