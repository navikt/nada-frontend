import { useDataproductQuery } from '../../../lib/schema/graphql'
import { GetServerSideProps } from 'next'
import { addApolloState, initializeApollo } from '../../../lib/apollo'
import { GET_DATAPRODUCT } from '../../../lib/queries/dataproduct/dataproduct'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Head from 'next/head'

interface DataproductProps {
  id: string
}

const Dataproduct = (props: DataproductProps) => {
  const router = useRouter()
  const id = router.query.id as string

  const currentPage = router.query.page?.[0] ?? 'info'
  console.log(currentPage)

  const productQuery = useDataproductQuery({
    variables: { id },
    ssr: true,
  })

  const product = productQuery?.data?.dataproduct

  useEffect(() => {
    router.push(`/dataproduct/${id}/${product?.slug}/${currentPage}`)
  }, [router, id, product?.slug, currentPage])

  return (
    <>
      <Head>
        <title>Redirigerer deg til ny side</title>
      </Head>
      <></>
    </>
  )
}

export default Dataproduct
