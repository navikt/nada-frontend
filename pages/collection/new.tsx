import PageLayout from '../../components/pageLayout'
import { ErrorSummary } from '@navikt/ds-react'
import { useContext, useState } from 'react'
import { UserState } from '../../lib/context'
import { useRouter } from 'next/router'
import { apiPOST } from '../../lib/api/post'
import { NewCollectionForm } from '../../components/collections/newCollectionForm'

const NewCollection = () => {
  const router = useRouter()

  const [backendError, setBackendError] = useState()
  const user = useContext(UserState).user

  const onSubmit = async (requestData: any) => {
    try {
      const createdCollection = await apiPOST(`/api/collections`, requestData)
      router.push(`/collection/${createdCollection.id}`)
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
      <NewCollectionForm onSubmit={onSubmit} onCancel={router.back} />
    </PageLayout>
  )
}

export default NewCollection
