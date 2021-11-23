import { navGronn, navRod } from '../../../styles/constants'
import styled from 'styled-components'
import IconBox from '../../lib/icons/iconBox'
import BigQueryLogo from '../../lib/icons/bigQueryLogo'
import { Success, Warning } from '@navikt/ds-icons'
import Keyword from '../../widgets/Keyword'
import { useDataproductSummaryQuery } from '../../../lib/schema/graphql'
import { colorScheme } from '../../lib/colorScheme'
import { DescriptionExcerpt } from '../../../lib/descriptionExcerpt'
import LoaderSpinner from '../../lib/spinner'
import ErrorMessage from '../../lib/error'
import * as React from 'react'

export const DataproductDiv = styled.div`
  margin-bottom: 15px;
  width: 100%;
  border: 2px solid ${colorScheme.Dataproduct.dark};
  border-radius: 5px;
  cursor: pointer;
`

export const DataproductHeading = styled.div`
  padding: 0.25rem 0.75rem;

  display: flex;
  background-color: ${colorScheme.Dataproduct.dark};
  color: white;
  margin: 0;
  h3,
  h4 {
    line-height: 1.2;
    margin: 0;
  }

  > div {
    margin-right: 0.5em;
  }

  h4 {
    font-size: 12pt;
    font-weight: normal;
  }
`

export const DataproductMeta = styled.div`
  padding: 0.25rem 0.75rem;

  background-color: ${colorScheme.Dataproduct.light};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

interface DataproductCardProps {
  id: string
}
const DataproductCard = ({ id }: DataproductCardProps) => {
  const { data, error } = useDataproductSummaryQuery({
    variables: { id },
  })

  if (error) return <ErrorMessage error={error} />

  if (!data) return <LoaderSpinner />

  const {
    dataproduct: { name, datasource, keywords, pii, description },
  } = data

  return (
    <DataproductDiv>
      <DataproductHeading>
        <IconBox size={48}>
          <BigQueryLogo />
        </IconBox>
        <div>
          <h3>{name}</h3>
          <h4>{datasource.type}</h4>
        </div>
      </DataproductHeading>
      <DataproductMeta>
        <div>PII:</div>
        {pii ? (
          <Warning style={{ fontSize: '1em' }} color={navRod} />
        ) : (
          <Success style={{ fontSize: '1em' }} color={navGronn} />
        )}
        <div>Nøkkelord:</div>
        {keywords.map((k) => (
          <Keyword key={k} keyword={k} small />
        ))}
      </DataproductMeta>
      <DescriptionExcerpt>
        {description || '*ingen beskrivelse*'}
      </DescriptionExcerpt>
    </DataproductDiv>
  )
}

export default DataproductCard
