import styled from 'styled-components'
import { Loader } from '@navikt/ds-react'
import { useRouter } from 'next/router'
import SearchResultLink from './searchResult'
import {
  SearchContentQuery,
  useSearchContentQuery,
} from '../../lib/schema/graphql'

interface ResultsProps {
  results?: SearchContentQuery['search']
}

export function ResultList({ results }: ResultsProps) {
  return (
    <div>
      {results?.map((d) => (
        <SearchResultLink key={d.id} result={d} />
      ))}
    </div>
  )
}

export default ResultList
