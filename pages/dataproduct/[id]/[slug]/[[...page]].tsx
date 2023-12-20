import * as React from 'react'
import { useRouter } from 'next/router'
import DataproductPage from '../../../../components/dataproducts/dataproductPage'

const Dataproduct = () => {
  const router = useRouter()
  const id = router.query.id as string

  return id ? <DataproductPage id={id} slug={router.query.slug as string} /> : <></>
}
export default Dataproduct
