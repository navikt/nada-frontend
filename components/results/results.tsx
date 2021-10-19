import SearchResult from './searchResult'
import styled from 'styled-components'
import { Loader } from '@navikt/ds-react'
import useSWR from 'swr'
import fetcher from '../../lib/api/fetcher'
import { SearchResultEntry } from '../../lib/schema/schema_types'
import { useRouter } from 'next/router'
import SearchResultLink from './searchResult'

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

  const { data, error } = useSWR<SearchResultEntry[], Error>(
    `/api/search?q=${q}`,
    fetcher
  )

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

  if (!data.length) return <div>Ingen resultater funnet</div>

  if (limit)
    return (
      <div>
        {data.slice(0, limit).map((d) => (
          <SearchResultLink key={d.id} result={d} />
        ))}
      </div>
    )

  return (
    <div>
      {data.map((d) => (
        <SearchResultLink key={d.id} result={d} />
      ))}
    </div>
  )
}

export default Results
