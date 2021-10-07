import useSWR from 'swr'
import { DataproductSchema } from '../../lib/schema/schema_types'
import { fetcher } from '../../lib/api/fetcher'
import DataProductSpinner from '../lib/spinner'
import { format, parseISO } from 'date-fns'
import { nb } from 'date-fns/locale'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import { NewDatasetForm } from '../forms/dataset/new'
import apiPOST from '../../lib/api/post'
import { useState } from 'react'
import { Button } from '@navikt/ds-react'

export interface DataproductDetailProps {
  product: DataproductSchema
}

export const DataProductDetail = ({ product }: DataproductDetailProps) => {
  const [backendError, setBackendError] = useState()
  const [showNewDataset, setShowNewDataset] = useState(false)
  const humanizeDate = (isoDate: string) =>
    format(parseISO(isoDate), 'PPPP', { locale: nb })

  const createAndAppend = async (requestData: any) => {
    try {
      const createdDataset = await apiPOST(`/api/datasets`, requestData)
      product.datasets
        ? product.datasets.push(createdDataset)
        : (product.datasets = [createdDataset])
      setBackendError(undefined)
      setShowNewDataset(false)
    } catch (e: any) {
      setBackendError(e.toString())
    }
  }
  return (
    <div>
      <h1>{product.name}</h1>
      <p>
        Opprettet: {humanizeDate(product.created)} &ndash; Oppdatert:{' '}
        {humanizeDate(product.last_modified)}
      </p>
      <div>
        <ReactMarkdown>
          {product.description || '*ingen beskrivelse*'}
        </ReactMarkdown>
      </div>
      <div>
        <h2>Dataset i dataproduktet:</h2>
        {product.datasets?.map((d, i) => {
          return (
            <div key={'dataproduct_datasets_' + i} style={{ display: 'block' }}>
              <Link href={`/dataset/${d.id}`}>{d.name}</Link>
            </div>
          )
        })}
      </div>

      {showNewDataset ? (
        <NewDatasetForm
          dataproduct_id={product.id}
          onSubmit={createAndAppend}
        />
      ) : (
        <Button onClick={() => setShowNewDataset(true)}>Legg til</Button>
      )}
    </div>
  )
}
