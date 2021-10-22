import styled from 'styled-components'
import { Loader } from '@navikt/ds-react'
import { useRouter } from 'next/router'
import SearchResultLink from './searchResult'
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

  if (loading) {
    return (
      <NoResultsYetBox>
        <Loader transparent />
      </NoResultsYetBox>
    )
  }
  if (!data) {
    return (
      <NoResultsYetBox>
        <h1>No data found</h1>
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
