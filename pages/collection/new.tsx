import PageLayout from '../../components/pageLayout'
import { ErrorSummary } from '@navikt/ds-react'
import { useContext, useState } from 'react'
import { UserState } from '../../lib/context'
import { useRouter } from 'next/router'
import { NewCollectionForm } from '../../components/collections/newCollectionForm'
import { useMutation } from '@apollo/client'
import { CREATE_COLLECTION } from '../../lib/queries/collection/createCollection'

const NewCollection = () => {
  const router = useRouter()

  const [backendError, setBackendError] = useState()
  const user = useContext(UserState)
  const [createCollection, { data, loading, error }] =
    useMutation(CREATE_COLLECTION)

  const onSubmit = async (input: any) => {
    try {
      const { data } = await createCollection({
        variables: { input },
      })
      router.push(`/collection/${data.createCollection.id}`)
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
