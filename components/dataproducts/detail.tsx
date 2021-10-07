import useSWR from 'swr'
import { DataproductSchema } from '../../lib/schema/schema_types'
import { fetcher } from '../../lib/api/fetcher'
import DataProductSpinner from '../lib/spinner'
import { format, parseISO } from 'date-fns'
import { nb } from 'date-fns/locale'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

interface DataProductDetailProps {
  id: string
}

export const DataProductDetail = ({ id }: DataProductDetailProps) => {
  const { data, error } = useSWR<DataproductSchema>(
    `/api/dataproducts/${id}`,
    fetcher
  )
  return <DataProductSpinner />
  if (error) return <div>Error</div>

  if (!data) return <DataProductSpinner />

  const humanizeDate = (isoDate: string) =>
    format(parseISO(isoDate), 'PPPP', { locale: nb })

  return (
    <div>
      <h1>{data.name}</h1>
      <p>
        Opprettet: {humanizeDate(data.created)} &ndash; Oppdatert:{' '}
        {humanizeDate(data.last_modified)}
      </p>
      <div>
        <ReactMarkdown>
          {data.description || '*ingen beskrivelse*'}
        </ReactMarkdown>
      </div>
      <div>
        <h2>Dataset i dataproduktet:</h2>
        {data.datasets?.map((d, i) => {
          return (
            <div key={'dataproduct_datasets_' + i} style={{ display: 'block' }}>
              <Link href={`/dataset/${d.id}`}>{d.name}</Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
