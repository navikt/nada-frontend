import { useMutation } from '@apollo/client'
import { ErrorSummary } from '@navikt/ds-react'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import { NewCollectionForm } from '../../components/collections/newCollectionForm'
import PageLayout from '../../components/pageLayout'
import amplitudeLog from '../../lib/amplitude'
import { UserState } from '../../lib/context'
import { CREATE_COLLECTION } from '../../lib/queries/collection/createCollection'

const NewCollection = () => {
  React.useEffect(() => {
    const eventProperties = {
      skjemanavn: 'ny-collection',
    }
    amplitudeLog('skjema startet', eventProperties)
  }, [])

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
      amplitudeLog('skjema fullført', { skjemanavn: 'ny-collection' })
      router.push(`/collection/${data.createCollection.id}`)
      setBackendError(undefined)
    } catch (e: any) {
      amplitudeLog('skjemainnsending feilet', { skjemanavn: 'ny-collection' })
      setBackendError(e.toString())
    }
  }

  const onCancel = () => {
    amplitudeLog('Klikker på: Avbryt', {
      pageName: 'ny-collection',
    });
    router.back();
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
      <NewCollectionForm onSubmit={onSubmit} onCancel={onCancel} />
    </PageLayout>
  )
}

export default NewCollection
