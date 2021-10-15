import PageLayout from '../../components/pageLayout'
import { useContext } from 'react'
import { AuthState } from '../../lib/context'
import { NewDataproductForm } from '../../components/dataproducts/newDataproductForm'

const NewDataproduct = () => {
  const user = useContext(AuthState).user

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
      <NewDataproductForm />
    </PageLayout>
  )
}

export default NewDataproduct
