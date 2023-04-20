import { QueryResult } from '@apollo/client'
import {
  Exact,
  SearchContentWithOptionsQuery,
  SearchOptions,
  useDeleteQuartoStoryMutation,
  useProductAreasQuery,
  useTeamkatalogenQuery,
} from '../../lib/schema/graphql'
import ErrorMessage from '../lib/error'
import LoaderSpinner from '../lib/spinner'
import SearchResultLink from './searchResultLink'
import { Tabs } from '@navikt/ds-react'
import React, { useContext, useEffect, useState } from 'react'
import { SearchParam } from '../../pages/search'
import { useRouter } from 'next/router'
import DeleteModal from '../lib/deleteModal'
import { USER_INFO } from '../../lib/queries/userInfo/userInfo'
import { UserState } from '../../lib/context'

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
  quartoStories?: {
    __typename?: 'QuartoStory'
    id: string
    name: string
    group: string
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
  quartoStories,
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

  const router = useRouter();
  const tk = useTeamkatalogenQuery({
    variables: { q: '' },
  })

  const po = useProductAreasQuery()
  const [deleteQuartoQuery] = useDeleteQuartoStoryMutation()
  const userInfo= useContext(UserState)
  const deleteQuarto = (id: string) => deleteQuartoQuery({
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

  if (stories || quartoStories) {
    return (
      <div>
        <Results>
          {quartoStories?.map((s, idx) => (
            <SearchResultLink
              key={idx}
              group={{
                group: s.group,
                teamkatalogenURL: s.teamkatalogenURL,
              }}
              id={s.id}
              name={s.name}
              link={`/quarto/${s.id}`}
              teamkatalogen={tk.data}
              productAreas={po.data}
              editable = {true}
              description= {s.description}
              deleteResource = {deleteQuarto}
            />
          ))}
          {stories?.map((s, idx) => (
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
              id={p.id}
              name={p.name}
              link={p.link}
              teamkatalogen={tk.data}
              productAreas={po.data}
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
