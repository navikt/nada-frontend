import { QueryResult } from '@apollo/client'
import {
  Exact,
  SearchContentWithOptionsQuery,
  SearchOptions,
  useDeleteStoryMutation,
  useTeamkatalogenQuery,
} from '../../lib/schema/graphql'
import ErrorMessage from '../lib/error'
import LoaderSpinner from '../lib/spinner'
import SearchResultLink from './searchResultLink'
import { Tabs } from '@navikt/ds-react'
import React, { useContext, useEffect, useState } from 'react'
import { SearchParam } from '../../pages/search'
import { useRouter } from 'next/router'
import { USER_INFO } from '../../lib/queries/userInfo/userInfo'
import { UserState } from '../../lib/context'
import { useGetProductAreas } from '../../lib/rest/productAreas'

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
    group: string
    keywords?: string[]
    teamkatalogenURL?: string | null | undefined
    description?: string
  }[]
  insightProducts?: {
    __typename?: 'InsightProduct'
    id: string
    name: string
    group: string
    type: string
    link: string
    teamkatalogenURL?: string | null | undefined
    description?: string
  }[]
  searchParam?: SearchParam
  updateQuery?: (updatedParam: SearchParam) => void
}

const ResultList = ({
  search,
  dataproducts,
  stories,
  insightProducts,
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

  const {productAreas} = useGetProductAreas()
  const [deleteStoryQuery] = useDeleteStoryMutation()
  const userInfo= useContext(UserState)
  const deleteStory = (id: string) => deleteStoryQuery({
    variables:{
      id: id
    },
    refetchQueries:[
      {
        query: USER_INFO,
      }
    ]
  })

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
              label={`Fortellinger (${datastories.length})`}
            />
            <Tabs.Tab
              value="dataproduct"
              label={`Produkter (${dataproducts.length})`}
            />
          </Tabs.List>
          <Tabs.Panel className="flex flex-col pt-4 gap-4" value="story">
            {datastories.map(
              (it, idx)=>
              (
                it.result.__typename ==='Story' && (
                <SearchResultLink
                  key={idx}
                  name={it.result.name}
                  type={'story'}
                  keywords={it.result.keywords}
                  description={it.excerpt}
                  link={`/story/${it.result.id}`}
                  group={{
                    group: it.result.groupName,
                    teamkatalogenURL: it.result.teamkatalogenURL,
                  }}
                  teamkatalogen={tk.data}
                  productAreas={productAreas}
                />
              )
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
                    productAreas={productAreas}
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
            productAreas={productAreas}
          />
        ))}
      </Results>
    )
  }

  if (stories) {
    return (
      <div>
        <Results>
          {stories?.map((s, idx) => (
            <SearchResultLink
              key={idx}
              group={{
                group: s.group,
                teamkatalogenURL: s.teamkatalogenURL,
              }}
              id={s.id}
              name={s.name}
              resourceType={"datafortelling"}
              link={`/story/${s.id}`}
              teamkatalogen={tk.data}
              productAreas={productAreas}
              keywords={s.keywords}
              editable = {true}
              description= {s.description}
              deleteResource = {deleteStory}
            />
          ))}
        </Results>
      </div>
    )
  }

  if (insightProducts) {
    return (
      <div>
        <Results>
          {insightProducts?.map((p, idx) => (
            <SearchResultLink
              key={idx}
              group={{
                group: p.group,
                teamkatalogenURL: p.teamkatalogenURL,
              }}
              resourceType={"innsiktsprodukt"}
              id={p.id}
              name={p.name}
              link={p.link}
              teamkatalogen={tk.data}
              productAreas={productAreas}
              description= {p.description}
              innsiktsproduktType={p.type}
              editable={!!userInfo?.googleGroups?.find(it=> it.email == p.group)}     
            />
          ))}
        </Results>
      </div>
    )
  }
  return <></>
}
export default ResultList
