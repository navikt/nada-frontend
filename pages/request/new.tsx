import * as React from 'react'
import Head from 'next/head'
import {
  NewAccessRequest,
  SubjectType,
  useDatasetQuery,
  useUserInfoDetailsQuery,
} from '../../lib/schema/graphql'
import NewAccessRequestForm from '../../components/dataproducts/accessRequest/newAccessRequest'
import { useRouter } from 'next/router'
import { ErrorMessage } from '@navikt/ds-react'
import LoaderSpinner from '../../components/lib/spinner'
import { useContext } from 'react'
import { UserState } from '../../lib/context'

const AccessRequestNew = () => {
  const { query } = useRouter()
  const datasetID = query.datasetID as string
  const userInfo = useContext(UserState)

  const { data, loading, error } = useDatasetQuery({
    variables: {
      id: datasetID,
    },
  })

  if (!userInfo)
    return (
      <div>
        <h1>Du må være logget inn!</h1>
        <p>Bruk login-knappen øverst.</p>
      </div>
    )

  const defaultValues: NewAccessRequest = {
    owner: userInfo.email,
    datasetID: datasetID,
    expires: '',
    polly: null,
    subject: userInfo.email,
    subjectType: SubjectType.User,
  }

  if (error) return <ErrorMessage error={error} />
  if (loading || !data) return <LoaderSpinner />

  return (
    <>
      <Head>
        <title>ny tilgangssøknad</title>
      </Head>
      <NewAccessRequestForm
        dataset={data.dataset}
        newAccessRequest={defaultValues}
      />
    </>
  )
}

export default AccessRequestNew
