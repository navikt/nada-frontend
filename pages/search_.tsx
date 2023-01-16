import * as React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import SideMenu from '../components/search/sidemenu'
import Filters from '../components/search/filters'
import {
  MappingService,
  SearchType,
  useSearchContentWithOptionsQuery,
} from '../lib/schema/graphql'
import ResultList from '../components/search/resultList'
import amplitudeLog from '../lib/amplitude'
import InnerContainer from '../components/lib/innerContainer'
import { Heading } from '@navikt/ds-react'
import { SearchPanel } from '../components/search/searchPanel'
import { string } from 'yup'
import { useState } from 'react'

export type FilterTypes = {
  [key: string]: string[] | string
  groups: string[]
  keywords: string[]
  services: MappingService[]
  text: string
  preferredType: string
}

export const arrayify = (query: string | string[] | undefined) => {
  if (query) {
    if (typeof query === 'string') return query.split(',')
    if (Array.isArray(query)) return query
  }
  return []
}

export const emailToValue = (value: string) => {
  if (value.includes('@')) return `team: ${value.split('@')[0].toString()}`
  return value
}

const Search = () => {
  const router = useRouter()
  const baseUrl = router.asPath.split('?')[0]
  let emptyFilters: FilterTypes = {
    groups: [],
    keywords: [],
    services: [],
    text: '',
    preferredType: 'story',
  }
  let filters: FilterTypes = {
    groups: arrayify(router.query.groups),
    keywords: arrayify(router.query.keywords),
    services: arrayify(router.query.services) as MappingService[],
    text: (router.query.text && router.query.text.toString()) || '',
    preferredType: router.query.preferredType?.toString() || '',
  }

  console.log(router.query)
  const searchText = (!!router.query.text && router.query.text.toString()) || ''
  const searchTeamIDs = arrayify(router.query.teamIDs)
  const searchKeywords = arrayify(router.query.keywords)

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

  const updateQuery_ = async (
    key: string,
    value: string | string[],
    clear?: boolean
  ) => {
    if (clear) {
      filters = emptyFilters
    } else {
      if (key === 'text') {
        filters['text'] = value as string
        amplitudeLog('søk', { ...filters })
      } else if (key === 'preferredType') {
        filters['preferredType'] = value as string
      } else {
        const values = filters[key] as string[]
        if (values.length > 0 && values.includes(value.toString())) {
          filters[key] = values.filter((v) => v !== value)
        } else {
          const currentValue = filters[key] as string[]
          currentValue.push(value.toString())
          filters[key] = currentValue
        }
        amplitudeLog('søk', { ...filters })
      }
    }
    await router.push(buildQueryString_())
  }

  const updateQuery = async (
    searchTerm: string,
    searchTeamID: string[],
    searchKeyword: string[]
  ) => {
    await router.push(buildQueryString(searchTerm, searchTeamID, searchKeyword))
  }

  const buildQueryString = (
    term: string,
    teamID: string[],
    keyword: string[]
  ) => {
    const queryString = new URLSearchParams()
    queryString.append('text', term)
    teamID.forEach((t) => queryString.append('teamIDs', t))
    keyword.forEach((k) => queryString.append('keywords', k))
    return baseUrl + '?' + queryString.toString()
  }

  const buildQueryString_ = () => {
    const queryString = new URLSearchParams()
    for (var key in filters) {
      if (key != 'types' && filters[key].length > 0)
        queryString.append(key, filters[key].toString())
    }
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
              searchTerm={searchText}
              searchTeam={searchTeamIDs}
              searchKeyword={searchKeywords}
              productAreaFiltersTree={{}}
              keywordsFiltersTree={{}}
              updateQuery={updateQuery}
            />
          )}
        </div>
        <div className="flex-grow pl-6">
          <Filters filters={filters} updateQuery={()=>{}} />
          <ResultList
            search={search}
            preferredType={filters.preferredType}
            updatePreferredType={()=>{}}
          />
        </div>
      </div>
    </InnerContainer>
  )
}

export default Search
