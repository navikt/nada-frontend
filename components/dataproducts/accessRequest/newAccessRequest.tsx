import { useState } from 'react'
import AccessRequestForm from './accessRequestForm'
import { AccessRequestFormInput } from './accessRequestForm'
import { useRouter } from 'next/router'
import ErrorMessage from '../../lib/error'
import LoaderSpinner from '../../lib/spinner'
import { DatasetQuery } from '../../../lib/schema/datasetQuery'
import { useGetDataproduct } from '../../../lib/rest/dataproducts'
import { createAccessRequest } from '../../../lib/rest/access'

interface NewAccessRequestFormProps {
  dataset: DatasetQuery
  setModal: (value: boolean) => void
}

const NewAccessRequestForm = ({ dataset, setModal }: NewAccessRequestFormProps) => {
  const {dataproduct, error: dpError, loading: dpLoading} = useGetDataproduct(dataset.dataproductID)
  const [error, setError] = useState<any>(null)
  const router = useRouter()

  if (dpError) return <ErrorMessage error={dpError} />
  if (dpLoading || !dataproduct) return <LoaderSpinner />

  const onSubmit = async (requestData: AccessRequestFormInput) => {
    try{
      await createAccessRequest(
        dataset.id,
        requestData.expires,
        undefined,
        requestData.polly??undefined,
        requestData.subject,
        requestData.subjectType
      )
        router.push(`/dataproduct/${dataproduct.id}/${dataset.id}`)
    } catch (e) {
      setError(e)
    }
  }

  return (
    <AccessRequestForm setModal={setModal} dataset={dataset} isEdit={false} onSubmit={onSubmit} error={error} />
  )
}

export default NewAccessRequestForm
