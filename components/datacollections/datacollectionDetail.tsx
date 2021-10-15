import { DataproductCollectionSchema } from '../../lib/schema/schema_types'
import { format, parseISO } from 'date-fns'
import { nb } from 'date-fns/locale'
import ReactMarkdown from 'react-markdown'
import { useState } from 'react'
import { Button, MicroCard } from '@navikt/ds-react'
import { EditDatacollectionForm } from './editDatacollectionForm'
import DataproductList from './dataproductList'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import apiDELETE from '../../lib/api/delete'
import ErrorMessage from '../lib/error'

export interface DatacollectionDetailProps {
  collection: DataproductCollectionSchema
}

const StyledEdit = styled.div`
  display: flex;
  margin: 40px 0;
  justify-content: space-between;
  align-items: center;
`

export const DatacollectionDetail = ({
  collection,
}: DatacollectionDetailProps) => {
  const humanizeDate = (isoDate: string) =>
    format(parseISO(isoDate), 'PPPP', { locale: nb })

  const [edit, setEdit] = useState(false)
  const [backendError, setBackendError] = useState()
  const router = useRouter()
  const deleteDatacollection = async (id: string) => {
    try {
      await apiDELETE(`/api/collections/${id}`)
      await router.push(`/`)
    } catch (e: any) {
      setBackendError(e.toString())
    }
  }

  return edit ? (
    <EditDatacollectionForm datacollection={collection} close={setEdit} />
  ) : (
    <div>
      {backendError && <ErrorMessage error={backendError} />}
      <StyledEdit>
        <h1>{collection.name}</h1>
        <Button onClick={() => setEdit(true)}>Edit</Button>
      </StyledEdit>
      <div>
        <i>Opprettet:</i> {humanizeDate(collection.created)}
        <br />
        <i>Oppdatert:</i> {humanizeDate(collection.last_modified)}
        {collection.keywords &&
          collection.keywords.map((k, i) => (
            <MicroCard key={`dataproduct_keyword_${i}`}>k</MicroCard>
          ))}
        <br />
        <Button
          onClick={async () => await deleteDatacollection(collection.id)}
          variant={'danger'}
        >
          Slett
        </Button>
      </div>
      <div>
        <ReactMarkdown>
          {collection.description || '*ingen beskrivelse*'}
        </ReactMarkdown>
      </div>
      <h2>Dataprodukter i datasamlingen:</h2>
      <DataproductList collection={collection} />
    </div>
  )
}
