import PageLayout from '../../components/pageLayout'
import { useContext } from 'react'
import { UserState } from '../../lib/context'
import { NewDataproductForm } from '../../components/dataproducts/newDataproductForm'

const NewDataproduct = () => {
  const user = useContext(UserState)

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
