import SearchResult from './searchResult'
import styled from 'styled-components'
import { Loader } from '@navikt/ds-react'
import useSWR from 'swr'
import fetcher from '../../lib/api/fetcher'
import {
  AllDataproductsSchema,
  DataproductSchema,
} from '../../lib/schema/schema_types'
import { useRouter } from 'next/router'
import SearchResultLink from './searchResult'
import { request } from 'graphql-request'
import { AllDataproducts } from '../../lib/queries/dataproduct'
import { useAllDataproductsQuery } from '../../lib/schema/graphql'

const NoResultsYetBox = styled.div`
  margin: 0 auto;
`

interface ResultsProps {
  limit?: number
}

export function Results({ limit }: ResultsProps) {
  const router = useRouter()
  let { q } = router.query
  if (typeof q !== 'string') q = ''

  const { data, loading, error } = useAllDataproductsQuery()

  if (error) {
    return (
      <NoResultsYetBox>
        <h1>Error</h1>
      </NoResultsYetBox>
    )
  }

  if (!data) {
    return (
      <NoResultsYetBox>
        <Loader transparent />
      </NoResultsYetBox>
    )
  }
  console.log(data)

  if (!data.dataproducts.length) return <div>Ingen resultater funnet</div>

  if (limit)
    return (
      <div>
        {data.dataproducts.slice(0, limit).map((d) => (
          <SearchResultLink key={d.id} result={d} />
        ))}
      </div>
    )

  return (
    <div>
      {data.dataproducts.map((d) => (
        <SearchResultLink key={d.id} result={d} />
      ))}
    </div>
  )
}

export default Results
