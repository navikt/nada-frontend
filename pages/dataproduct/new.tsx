import { useRouter } from 'next/router'
import PageLayout from '../../components/pageLayout'
import useSWR, { SWRConfig } from 'swr'
import { DataproductSchema } from '../../lib/schema_types'
import ReactMarkdown from 'react-markdown'
import { format, parseISO } from 'date-fns'
import { nb } from 'date-fns/locale'
import { GetServerSideProps } from 'next'
import DataProductSpinner from '../../components/lib/spinner'
import Link from 'next/link'
import { getBackendURI } from '../../lib/apiConfig'
import { fetcher } from '../../lib/fetcher'


const NewDataProduct = () => {
  return (
    <PageLayout>
        <div>nytt dataprodukt</div>
    </PageLayout>
  )
}

export default NewDataProduct
