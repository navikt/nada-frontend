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
  preferredType?: string
  updateQuery: (key: string, value: string, clear?: boolean) => void
}

const ResultList = ({
  search,
  dataproducts,
  stories,
  preferredType,
  updateQuery,
}: ResultListInterface) => {
  useEffect(() => {
    if (search?.data?.search.filter(
      (d) => d.result.__typename === 'Dataproduct'
    ).length == 0) {
      updateQuery("preferredType", "story")
    } else if (search?.data?.search.filter(
      (d) => d.result.__typename === 'Story'
    ).length == 0) {
      updateQuery("preferredType", "dataproduct")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  if (search) {
    const { data, loading, error } = search
    const tk = useTeamkatalogenQuery({
      variables: { q: '' },
    })
    const po = useProductAreasQuery()

    if (error) return <ErrorMessage error={error} />
    if (loading || !data) return <LoaderSpinner />
    const dataproducts = data.search.filter(
      (d) => d.result.__typename === 'Dataproduct'
    )
    const datastories = data.search.filter(
      (d) => d.result.__typename === 'Story'
    )
    return (
      <Results>
        <Tabs
          defaultValue={preferredType}
          size="medium"
          value = {preferredType}
          onChange={(focused) => updateQuery("preferredType", focused)}
        >
          <Tabs.List>
            <Tabs.Tab
              value="story"
              label={`Fortellinger (${datastories.length})`}
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
            )}
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
          />
        ))}
      </Results>
    )
  }
  return <></>
}
export default ResultList
