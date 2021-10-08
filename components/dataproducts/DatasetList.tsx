import { DatasetSchema, DatasetSummary } from '../../lib/schema/schema_types'
import Link from 'next/link'
import { NewDatasetForm } from '../forms/dataset/new'
import apiPOST from '../../lib/api/post'
import { useContext, useState } from 'react'

import { AddCircleFilled } from '@navikt/ds-icons'
import styled from 'styled-components'
import { navBla } from '../../styles/constants'
import ErrorMessage from '../lib/error'
import { AuthState } from '../../lib/context'

interface DatasetInlineProps {
  dataset: DatasetSummary
}

const DatasetInline = ({ dataset }: DatasetInlineProps) => (
  <div style={{ display: 'block' }}>
    <Link href={`/dataset/${dataset.id}`}>{dataset.name}</Link>
  </div>
)

interface DatasetListProps {
  productId: string
  datasets: DatasetSummary[]
}

const AddButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  svg {
    font-size: 32px;
    color: ${navBla};
  }

  p {
    flex-grow: 1;
  }
`

interface AddDatasetButtonProps {
  message?: string
  onClick: React.MouseEventHandler
  ariaLabel?: string
}

const AddDatasetButton = ({
  message,
  onClick,
  ariaLabel,
}: AddDatasetButtonProps) => {
  const user = useContext(AuthState).user

  return (
    <AddButtonContainer>
      {message && <p>{message}</p>}
      {user && <AddCircleFilled aria-label={ariaLabel} onClick={onClick} />}
    </AddButtonContainer>
  )
}

export const DatasetList = ({ productId, datasets }: DatasetListProps) => {
  const [showNewDataset, setShowNewDataset] = useState<boolean>(false)

  const createAndAppend = async (requestData: any) => {}
  const onCreate = async (newDataset: DatasetSchema) => {
    datasets.push(newDataset)
    setShowNewDataset(false)
  }
  return (
    <>
      {datasets.map((d) => (
        <DatasetInline key={d.id} dataset={d} />
      ))}

      {showNewDataset ? (
        <NewDatasetForm dataproduct_id={productId} onCreate={onCreate} />
      ) : (
        <AddDatasetButton
          message={
            datasets.length ? undefined : 'Ingen datasett tilknyttet produkt'
          }
          ariaLabel={'Legg til datasett'}
          onClick={() => setShowNewDataset(true)}
        />
      )}
    </>
  )
}

export default DatasetList
