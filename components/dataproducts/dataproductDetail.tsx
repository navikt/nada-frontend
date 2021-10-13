import { DataproductSchema } from '../../lib/schema/schema_types'
import { format, parseISO } from 'date-fns'
import { nb } from 'date-fns/locale'
import ReactMarkdown from 'react-markdown'
import { useEffect, useState } from 'react'
import { Button, MicroCard } from '@navikt/ds-react'
import { EditDataProductForm } from './editDataproductForm'
import DatasetList from './datasetList'
import styled from 'styled-components'

export interface DataproductDetailProps {
  product: DataproductSchema
}

const StyledEdit = styled.div`
  display: flex;
  margin: 40px 0;
  justify-content: space-between;
  align-items: center;
`

export const DataProductDetail = ({ product }: DataproductDetailProps) => {
  const humanizeDate = (isoDate: string) =>
    format(parseISO(isoDate), 'PPPP', { locale: nb })

  const [edit, setEdit] = useState(false)

  return edit ? (
    <EditDataProductForm dataproduct={product} close={setEdit} />
  ) : (
    <div>
      <StyledEdit>
        <h1>{product.name}</h1>
        <Button onClick={() => setEdit(true)}>Edit</Button>
      </StyledEdit>
      <div>
        <i>Opprettet:</i> {humanizeDate(product.created)}
        <br />
        <i>Oppdatert:</i> {humanizeDate(product.last_modified)}
        {product.keywords &&
          product.keywords.map((k, i) => (
            <MicroCard key={`dataproduct_keyword_${i}`}>k</MicroCard>
          ))}
      </div>
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
