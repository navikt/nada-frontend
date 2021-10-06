import PageLayout from '../../components/pageLayout'
import { ErrorSummary } from '@navikt/ds-react'

import { useContext, useState } from 'react'
import { AuthState } from '../../lib/context'
import { useRouter } from 'next/router'
import { NewDatasetForm } from '../../components/forms/dataset/new'
import apiPOST from '../../lib/api/post'

const NewDataset = () => {
  const router = useRouter()
  const [backendError, setBackendError] = useState()
  const user = useContext(AuthState).user

  const createAndRedirect = async (requestData: any) => {
    try {
      const createdDataset = await apiPOST(`/api/datasets`, requestData)
      await router.push(`/dataset/${createdDataset.id}`)
      setBackendError(undefined)
    } catch (e: any) {
      setBackendError(e.toString())
    }
  }

  // FIXME: Blaffer feilmelding i påvente av user
  if (!user)
    return (
      <PageLayout>
        <h1>Du må være logget inn!</h1>
        <p>Bruk login-knappen øverst.</p>
      </PageLayout>
    )

  return (
    <PageLayout>
      {backendError && (
        <ErrorSummary heading={'Feil fra server'}>{backendError}</ErrorSummary>
      )}
      <NewDatasetForm onSubmit={createAndRedirect} />
    </PageLayout>
  )
}

export default NewDataset
