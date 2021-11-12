import {
  useUserInfoAccessableDataproductQuery,
  useUserInfoUserProductsQuery,
} from '../../lib/schema/graphql'
import * as React from 'react'
import ErrorMessage from '../lib/error'
import LoaderSpinner from '../lib/spinner'
import SearchResultLink from '../results/searchResult'

export const UserAccessableProduct = () => {
  const { data, loading, error } = useUserInfoAccessableDataproductQuery()

  if (error) return <ErrorMessage error={error} />
  if (loading || !data) return <LoaderSpinner />

  return (
    <div>
      {data.userInfo.accessable.map((p) => {
        return <SearchResultLink key={p.id} result={p} />
      })}
    </div>
  )
}

export default UserAccessableProduct
