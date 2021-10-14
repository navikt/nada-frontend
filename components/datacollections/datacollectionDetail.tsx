import { DataproductSchema } from '../../lib/schema/schema_types'
import { format, parseISO } from 'date-fns'
import { nb } from 'date-fns/locale'
import ReactMarkdown from 'react-markdown'
import DataproductList from './dataproductList'

export interface DatacollectionDetailProps {
  collection: DataproductSchema
}

export const DatacollectionDetail = ({
  collection,
}: DatacollectionDetailProps) => {
  const humanizeDate = (isoDate: string) =>
    format(parseISO(isoDate), 'PPPP', { locale: nb })

  return (
    <div>
      <h1>{collection.name}</h1>
      <div>
        <i>Opprettet:</i> {humanizeDate(collection.created)}
        <i>Oppdatert:</i> {humanizeDate(collection.last_modified)}
      </div>
      <div>
        <ReactMarkdown>
          {collection.description || '*ingen beskrivelse*'}
        </ReactMarkdown>
      </div>
      <h2>Datasett i dataproduktet:</h2>
      <DataproductList collection={collection} />
    </div>
  )
}
