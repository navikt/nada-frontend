import { ArrayElement } from '../../lib/schema/ArrayElement'
import { SearchContentQuery } from '../../lib/schema/graphql'
import styled from 'styled-components'

interface LogoProps {
  size?: number | undefined
}

export const CollectionLogo = ({ size = undefined }: LogoProps) =>
  size ? (
    <img width={size} height={size} src="/result-icons/datacollection.svg" alt="data collection logo"/>
  ) : (
    <img src="/result-icons/datacollection.svg" alt="data collection logo"/>
  )
export const ProductLogo = ({ size = undefined }: LogoProps) =>
  size ? (
    <img width={size} height={size} src="/result-icons/dataproduct.svg" alt="data product logo"/>
  ) : (
    <img src="/result-icons/dataproduct.svg" alt="data product logo"/>
  )

type Result = ArrayElement<SearchContentQuery['search']>['result']
type ResultType = Result['__typename']

export const resultTypenameMap: Record<ResultType, string> = {
  Collection: 'Datasamling',
  Dataproduct: 'Dataprodukt',
}

export const resultIconMap: Record<ResultType, React.ReactNode> = {
  Collection: <CollectionLogo />,
  Dataproduct: <ProductLogo />,
}

interface ResultIconProps {
  result: Result
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  color: #555;
  padding: 0.75rem 0.75rem;

  img {
    width: 80px;
    padding-bottom: 5px;
    display: block;
  }
`

export const ResultIcon = ({ result }: ResultIconProps) => (
  <Container>
    {resultIconMap[result.__typename]}
    {resultTypenameMap[result.__typename]}
  </Container>
)
