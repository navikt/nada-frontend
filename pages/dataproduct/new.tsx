import PageLayout from '../../components/pageLayout'
import { ErrorSummary } from '@navikt/ds-react'
import { useContext, useState } from 'react'
import { AuthState } from '../../lib/context'
import { useRouter } from 'next/router'
import { apiPOST } from '../../lib/api/post'
import { NewDataproductForm } from '../../components/dataproducts/newDataproductForm'

const NewDataproduct = () => {
  const router = useRouter()

  const [backendError, setBackendError] = useState()
  const user = useContext(AuthState).user

  const onSubmit = async (requestData: any) => {
    try {
      const createdProduct = await apiPOST(`/api/datasets`, requestData)
      router.push(`/dataproduct/${createdProduct.id}`)
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
      <NewDataproductForm onCreate={onSubmit} />
    </PageLayout>
  )
}

export default NewDataproduct
