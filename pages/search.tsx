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

export type FilterTypes = {
  [key: string]: string[] | string
  groups: string[]
  keywords: string[]
  services: MappingService[]
  text: string
  preferredType: string
}

const arrayify = (query: string | string[] | undefined) => {
  if (query) {
    if (typeof query === 'string') return query.split(',')
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
    preferredType: router.query.preferredType?.toString() || ''
  }

  const search = useSearchContentWithOptionsQuery({
    variables: {
      options: {
        limit: 1000,
        types: ['dataproduct', 'story'] as SearchType[],
        groups: filters.groups,
        keywords: filters.keywords,
        services: filters.services,
        text: filters.text
      },
    },
    fetchPolicy: 'network-only',
  })

  const updateQuery = async (
    key: string,
    value: string | string[],
    clear?: boolean
  ) => {
    if (clear) {
      filters = emptyFilters
    } else {
      if (key === 'text') {
        filters['text'] = value as string
        amplitudeLog('søk', {...filters})
      }
      else if (key === 'preferredType') {
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
        amplitudeLog('søk', {...filters})
      }
    }
    await router.push(buildQueryString())
  }

  const buildQueryString = () => {
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
        <title>Kategorier</title>
      </Head>
      <div className="flex mt-[100px]">
        <div className="flex-shrink-0 w-[300px] pr-7">
          {router.isReady && (
            <SideMenu filters={filters} updateQuery={updateQuery} />
          )}
        </div>
        <div className="flex-grow">
          <Filters filters={filters} updateQuery={updateQuery} />
          <ResultList
            search={search}
            preferredType={filters.preferredType}
            updateQuery={updateQuery}
          />
        </div>
      </div>
    </InnerContainer>
  )
}

export default Search
