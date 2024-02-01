import {
  NewAccessRequest,
  useCreateAccessRequestMutation,
} from '../../../lib/schema/graphql'
import { useState } from 'react'
import AccessRequestForm from './accessRequestForm'
import { AccessRequestFormInput } from './accessRequestForm'
import { useRouter } from 'next/router'
import ErrorMessage from '../../lib/error'
import LoaderSpinner from '../../lib/spinner'
import { DatasetQuery } from '../../../lib/schema/datasetQuery'
import { useGetDataproduct } from '../../../lib/rest/dataproducts'

interface NewAccessRequestFormProps {
  dataset: DatasetQuery
  setModal: (value: boolean) => void
}

const NewAccessRequestForm = ({ dataset, setModal }: NewAccessRequestFormProps) => {
  const [createAccessRequest] = useCreateAccessRequestMutation()
  const {dataproduct, error: dpError, loading: dpLoading} = useGetDataproduct(dataset.dataproductID)
  const [error, setError] = useState<Error | null>(null)
  const router = useRouter()

  if (dpError) return <ErrorMessage error={dpError} />
  if (dpLoading || !dataproduct) return <LoaderSpinner />

  const onSubmit = async (requestData: AccessRequestFormInput) => {
    const accessRequest: NewAccessRequest = {
      ...requestData,
    }
    await createAccessRequest({
      onError: setError,
      variables: {
        input: accessRequest,
      },
      refetchQueries: ['userInfoDetails'],
    }).then(() => {
      router.push(`/dataproduct/${dataproduct.id}/${dataset.id}`)
    })
  }

  return (
    <AccessRequestForm setModal={setModal} dataset={dataset} isEdit={false} onSubmit={onSubmit} error={error} />
  )
}

export default NewAccessRequestForm
