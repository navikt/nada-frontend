import { QueryResult } from '@apollo/client'
import {
  Exact,
  SearchContentWithOptionsQuery,
  SearchOptions,
  useProductAreasQuery,
  useTeamkatalogenQuery,
} from '../../lib/schema/graphql'
import ErrorMessage from '../lib/error'
import LoaderSpinner from '../lib/spinner'
import SearchResultLink from './searchResultLink'
import { Tabs } from '@navikt/ds-react'
import React, { useEffect } from 'react'
import { SearchParam } from '../../pages/search'

const Results = ({ children }: { children: React.ReactNode }) => (
  <div className="results">{children}</div>
)

type ResultListInterface = {
  search?: QueryResult<
    SearchContentWithOptionsQuery,
    Exact<{ options: SearchOptions }>
  >
  dataproducts?: {
    __typename?: 'Dataproduct' | undefined
    id: string
    name: string
    keywords: string[]
    slug: string
    owner: { __typename?: 'Owner' | undefined; group: string }
  }[]
  stories?: {
    __typename?: 'Story'
    id: string
    name: string
    owner?: { __typename?: 'Owner'; group: string } | null | undefined
  }[]
  searchParam?: SearchParam
  updateQuery?: (updatedParam: SearchParam) => void
}

const ResultList = ({
  search,
  dataproducts,
  stories,
  searchParam,
  updateQuery,
}: ResultListInterface) => {
  useEffect(() => {
    if (!!searchParam) {
      if (
        search?.data?.search.filter(
          (d) => d.result.__typename === 'Dataproduct'
        ).length == 0
      ) {
        updateQuery?.({ ...searchParam, preferredType: 'story' })
      } else if (
        search?.data?.search.filter((d) => d.result.__typename === 'Story')
          .length == 0
      ) {
        updateQuery?.({ ...searchParam, preferredType: 'dataproduct' })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const tk = useTeamkatalogenQuery({
    variables: { q: '' },
  })
  const po = useProductAreasQuery()

  if (search && !!searchParam) {
    const { data, loading, error } = search

    if (error) return <ErrorMessage error={error} />
    if (loading || !data) return <LoaderSpinner />
    const dataproducts = data.search.filter(
      (d) => d.result.__typename === 'Dataproduct'
    )
    const datastories = data.search.filter(
      (d) => d.result.__typename === 'Story'
    )
    const quartostories = data.search.filter(
      (d)=> d.result.__typename === 'QuartoStory'
    )
    return (
      <Results>
        <Tabs
          defaultValue={searchParam?.preferredType}
          size="medium"
          value={searchParam?.preferredType}
          onChange={(focused) => {
            updateQuery?.({ ...searchParam, preferredType: focused })
          }}
        >
          <Tabs.List>
            <Tabs.Tab
              value="story"
              label={`Fortellinger (${datastories.length + quartostories.length})`}
            />
            <Tabs.Tab
              value="dataproduct"
              label={`Produkter (${dataproducts.length})`}
            />
          </Tabs.List>
          <Tabs.Panel className="flex flex-col pt-4 gap-4" value="story">
            {datastories.map(
              (d, idx) =>
                d.result.__typename === 'Story' && (
                  <SearchResultLink
                    key={idx}
                    group={d.result.group!}
                    name={d.result.name}
                    type={'story'}
                    keywords={d.result.keywords}
                    description={d.excerpt}
                    link={`/story/${d.result.id}`}
                    teamkatalogen={tk.data}
                    productAreas={po.data}
                  />
                )
            ).concat(quartostories.map(
              (it, idx)=>
              (
                <SearchResultLink
                  key={idx}
                  name={it.result.name}
                  type={'story'}
                  keywords={it.result.keywords}
                  description={it.excerpt}
                  link={`/quarto/${it.result.id}`}
                  teamkatalogen={tk.data}
                  productAreas={po.data}
                />
              )
                 
            ))}
          </Tabs.Panel>
          <Tabs.Panel className="flex flex-col gap-4" value="dataproduct">
            {dataproducts.map(
              (d, idx) =>
                d.result.__typename === 'Dataproduct' && (
                  <SearchResultLink
                    key={idx}
                    group={d.result.owner}
                    name={d.result.name}
                    keywords={d.result.keywords}
                    description={d.result.description}
                    link={`/dataproduct/${d.result.id}/${d.result.slug}`}
                    datasets={d.result.datasets}
                    teamkatalogen={tk.data}
                    productAreas={po.data}
                  />
                )
            )}
          </Tabs.Panel>
        </Tabs>
        {data.search.length == 0 && 'ingen resultater'}
      </Results>
    )
  }
  if (dataproducts) {
    return (
      <Results>
        {dataproducts.map((d, idx) => (
          <SearchResultLink
            key={idx}
            group={d.owner}
            name={d.name}
            keywords={d.keywords}
            link={`/dataproduct/${d.id}/${d.slug}`}
            teamkatalogen={tk.data}
            productAreas={po.data}
          />
        ))}
      </Results>
    )
  }
  if (stories) {
    return (
      <Results>
        {stories.map((s, idx) => (
          <SearchResultLink
            key={idx}
            group={s.owner}
            name={s.name}
            link={`/story/${s.id}`}
            teamkatalogen={tk.data}
            productAreas={po.data}
          />
        ))}
      </Results>
    )
  }
  return <></>
}
export default ResultList
