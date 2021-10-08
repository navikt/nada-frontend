import { DataproductSchema } from '../../lib/schema/schema_types'
import { format, parseISO } from 'date-fns'
import { nb } from 'date-fns/locale'
import ReactMarkdown from 'react-markdown'
import { NewDatasetForm } from '../forms/dataset/new'
import apiPOST from '../../lib/api/post'
import { useState } from 'react'
import { Button } from '@navikt/ds-react'
import DatasetList from './DatasetList'

export interface DataproductDetailProps {
  product: DataproductSchema
}

export const DataProductDetail = ({ product }: DataproductDetailProps) => {
  const humanizeDate = (isoDate: string) =>
    format(parseISO(isoDate), 'PPPP', { locale: nb })

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
      <h2>Datasett i dataproduktet:</h2>
      <DatasetList productId={product.id} datasets={product.datasets} />
    </div>
  )
}
