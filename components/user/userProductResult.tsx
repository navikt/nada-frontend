import { useUserInfoUserProductsQuery } from '../../lib/schema/graphql'
import * as React from 'react'
import ErrorMessage from '../lib/error'
import LoaderSpinner from '../lib/spinner'
import SearchResultLink from '../results/searchResult'

export const UserProductResultLink = () => {
  const { data, loading, error } = useUserInfoUserProductsQuery()

  if (error) return <ErrorMessage error={error} />
  if (loading || !data) return <LoaderSpinner />

  return (
    <div>
      {data.userInfo.dataproducts.map((p) => {
        return <SearchResultLink key={p.id} result={p} />
      })}
      {data.userInfo.collections.map((p) => {
        return <SearchResultLink key={p.id} result={p} />
      })}
    </div>
  )
}

export default UserProductResultLink
