import { DataproductSchema } from '../../lib/schema/schema_types'
import { format, parseISO } from 'date-fns'
import { nb } from 'date-fns/locale'
import ReactMarkdown from 'react-markdown'
import { useEffect, useState } from 'react'
import { Button, MicroCard } from '@navikt/ds-react'
import { EditDataProductForm } from './editDataproductForm'
import DatasetList from './datasetList'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import apiDELETE from '../../lib/api/delete'
import ErrorMessage from '../lib/error'

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
  const [backendError, setBackendError] = useState()
  const router = useRouter()
  const deleteDataproduct = async (id: string) => {
    try {
      await apiDELETE(`/api/dataproducts/${id}`)
      await router.push(`/`)
    } catch (e: any) {
      setBackendError(e.toString())
    }
  }

  return edit ? (
    <EditDataProductForm dataproduct={product} close={setEdit} />
  ) : (
    <div>
      {backendError && <ErrorMessage error={backendError} />}
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
        <br />
        <Button
          onClick={async () => await deleteDataproduct(product.id)}
          variant={'danger'}
        >
          Slett
        </Button>
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
