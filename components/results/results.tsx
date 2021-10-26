import styled from 'styled-components'
import { Loader } from '@navikt/ds-react'
import { useRouter } from 'next/router'
import SearchResultLink from './searchResult'
import { useSearchContentQuery } from '../../lib/schema/graphql'

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

  const { data, loading, error } = useSearchContentQuery({
    variables: { q: { text: q } },
  })

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

  if (!data.search.length) return <div>Ingen resultater funnet</div>

  if (limit)
    return (
      <div>
        {data.search.slice(0, limit).map((d) => (
          <SearchResultLink key={d.id} result={d} />
        ))}
      </div>
    )

  return (
    <div>
      {data.search.map((d) => (
        <SearchResultLink key={d.id} result={d} />
      ))}
    </div>
  )
}

export default Results
