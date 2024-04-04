import LoaderSpinner from '../../../../components/lib/spinner'
import ErrorMessage from '../../../../components/lib/error'
import {
  Group,
  useDeleteDataproductMutation,
} from '../../../../lib/schema/graphql'
import { GetServerSideProps } from 'next'
import { addApolloState, initializeApollo } from '../../../../lib/apollo'
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
import { useGetDataproduct } from '../../../../lib/rest/dataproducts'

interface DataproductProps {
  id: string
}

const DataproductEdit = () => {
  const [showDelete, setShowDelete] = useState(false)
  const [deleteError, setDeleteError] = useState('')
  const userInfo = useContext(UserState)
  const router = useRouter()
  const id = router.query.id as string

  const [deleteDataproduct] = useDeleteDataproductMutation({
    variables: { id: id },
    awaitRefetchQueries: true,
    refetchQueries: ['searchContent'],
  })

  const { dataproduct, loading, error } = useGetDataproduct(id)
  useEffect(() => {
    const eventProperties = {
      sidetittel: 'productEdit',
      title: dataproduct?.name,
    }
    amplitudeLog('sidevisning', eventProperties)
  }, [dataproduct?.name])

  if (error) return <ErrorMessage error={error} />

  if (loading || !dataproduct) return <LoaderSpinner />

  const isOwner =
    !userInfo?.googleGroups
      ? false
      : userInfo.googleGroups.some(
          (g: any) => g.email === dataproduct?.owner?.group
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
        <title>{dataproduct.name}</title>
      </Head>
      <TopBar name={dataproduct.name} type={dataproduct.__typename}>
        {isOwner && (
          <div className="flex gap-2">
            <p className="font-bold px-2 border-r border-border-strong">
              Endre dataprodukt
            </p>
            <a href="#" onClick={() => setShowDelete(true)}>
              Slette dataprodukt
            </a>
          </div>
        )}
      </TopBar>
      <div className="flex flex-col h-full flex-grow">
        <EditDataproduct product={dataproduct} />
      </div>
      <DeleteModal
        open={showDelete}
        onCancel={() => setShowDelete(false)}
        onConfirm={() => onDelete()}
        name={dataproduct.name}
        error={deleteError}
        resource="dataprodukt"
      />
    </InnerContainer>
  )
}

export default DataproductEdit
