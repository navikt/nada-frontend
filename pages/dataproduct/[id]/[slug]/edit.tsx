import LoaderSpinner from '../../../../components/lib/spinner'
import ErrorMessage from '../../../../components/lib/error'
import {
  Group,
  useDataproductQuery,
  useDeleteDataproductMutation,
} from '../../../../lib/schema/graphql'
import { GetServerSideProps } from 'next'
import { addApolloState, initializeApollo } from '../../../../lib/apollo'
import { GET_DATAPRODUCT } from '../../../../lib/queries/dataproduct/dataproduct'
import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import amplitudeLog from '../../../../lib/amplitude'
import EditDataproduct from '../../../../components/dataproducts/editDataproduct'
import Head from 'next/head'
import TopBar from '../../../../components/lib/topBar'
import { UserState } from '../../../../lib/context'
import DeleteModal from '../../../../components/lib/deleteModal'
import { useRouter } from 'next/router'
import InnerContainer from '../../../../components/lib/innerContainer'

interface DataproductProps {
  id: string
}

const DataproductEdit = (props: DataproductProps) => {
  const { id } = props
  const [showDelete, setShowDelete] = useState(false)
  const [deleteError, setDeleteError] = useState('')
  const userInfo = useContext(UserState)
  const router = useRouter()

  const [deleteDataproduct] = useDeleteDataproductMutation({
    variables: { id: id },
    awaitRefetchQueries: true,
    refetchQueries: ['searchContent'],
  })

  const { data, loading, error } = useDataproductQuery({
    variables: { id, rawDesc: true },
    ssr: true,
  })
  useEffect(() => {
    const eventProperties = {
      sidetittel: 'productEdit',
      title: data?.dataproduct.name,
    }
    amplitudeLog('sidevisning', eventProperties)
  }, [data?.dataproduct.name])

  if (error) return <ErrorMessage error={error} />

  if (loading || !data?.dataproduct) return <LoaderSpinner />

  const isOwner =
    userInfo?.groups === undefined
      ? false
      : userInfo.groups.some(
          (g: Group) => g.email === data.dataproduct.owner.group
        )

  const onDelete = async () => {
    try {
      await deleteDataproduct()
      await router.push('/')
    } catch (e: any) {
      setDeleteError(e.toString())
    }
  }

  return (
    <InnerContainer>
      <Head>
        <title>{data.dataproduct.name}</title>
      </Head>
      <TopBar name={data.dataproduct.name} type={data.dataproduct.__typename}>
        {isOwner && (
          <div className="flex gap-2">
            <p className="font-bold px-2 border-r border-border">
              Endre dataprodukt
            </p>
            <a href="#" onClick={() => setShowDelete(true)}>
              Slette dataprodukt
            </a>
          </div>
        )}
      </TopBar>
      <div className="flex flex-col h-full flex-grow">
        <EditDataproduct product={data.dataproduct} />
      </div>
      <DeleteModal
        open={showDelete}
        onCancel={() => setShowDelete(false)}
        onConfirm={() => onDelete()}
        name={data.dataproduct.name}
        error={deleteError}
        resource="dataprodukt"
      />
    </InnerContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query
  const cookie = context.req.headers.cookie

  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: GET_DATAPRODUCT,
    variables: { id },
    context: {
      headers: {
        cookie,
      },
    },
  })

  return addApolloState(apolloClient, {
    props: { id },
  })
}

export default DataproductEdit
