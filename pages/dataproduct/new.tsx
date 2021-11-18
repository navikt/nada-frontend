import PageLayout from '../../components/pageLayout'
import { useContext } from 'react'
import { UserState } from '../../lib/context'
import { NewDataproductForm } from '../../components/dataproducts/newDataproductForm'

const NewDataproduct = () => {
  const user = useContext(UserState)

  if (!user)
    return (
      <div>
        <h1>Du må være logget inn!</h1>
        <p>Bruk login-knappen øverst.</p>
      </div>
    )

  return <NewDataproductForm />
}

export default NewDataproduct
