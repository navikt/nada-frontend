import { DataproductCollectionSchema } from '../../lib/schema/schema_types'
import { format, parseISO } from 'date-fns'
import { nb } from 'date-fns/locale'
import ReactMarkdown from 'react-markdown'
import { useState } from 'react'
import { MicroCard } from '@navikt/ds-react'
import { EditDatacollectionForm } from './editDatacollectionForm'
import DataproductList from './dataproductList'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import apiDELETE from '../../lib/api/delete'
import ErrorMessage from '../lib/error'
import DotMenu from '../lib/editMenu'

export interface DatacollectionDetailProps {
  collection: DataproductCollectionSchema
}

const StyledEdit = styled.div`
  display: flex;
  margin: 40px 0 0 0;
  justify-content: space-between;
  align-items: center;
`
const MetadataTable = ({ collection }: DatacollectionDetailProps) => {
  const humanizeDate = (isoDate: string) =>
    format(parseISO(isoDate), 'PPPP', { locale: nb })
  return (
    <table>
      <tr>
        <th>Opprettet:</th>
        <td>{humanizeDate(collection.created)}</td>
      </tr>
      <tr>
        <th>Oppdatert:</th>
        <td>{humanizeDate(collection.last_modified)}</td>
      </tr>
      <tr>
        <th>Nøkkelord:</th>
        <td>
          {collection.keywords &&
            collection.keywords.map((k) => <MicroCard key={k}>{k}</MicroCard>)}
        </td>
      </tr>
    </table>
  )
}

export const DatacollectionDetail = ({
  collection,
}: DatacollectionDetailProps) => {
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
        <DotMenu
          onEdit={() => setEdit(true)}
          onDelete={async () => await deleteDatacollection(collection.id)}
        />
      </StyledEdit>
      <MetadataTable collection={collection} />

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
