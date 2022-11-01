import {
  NewAccessRequest,
  useCreateAccessRequestMutation,
  useDataproductQuery,
} from '../../../lib/schema/graphql'
import { useContext, useState } from 'react'
import AccessRequestForm from './accessRequestForm'
import { AccessRequestFormInput } from './accessRequestForm'
import { useRouter } from 'next/router'
import ErrorMessage from '../../lib/error'
import LoaderSpinner from '../../lib/spinner'
import { DatasetQuery } from '../../../lib/schema/datasetQuery'
import { UserState } from '../../../lib/context'

interface NewAccessRequestFormProps {
  dataset: DatasetQuery
}

const NewAccessRequestForm = ({ dataset }: NewAccessRequestFormProps) => {
  const [createAccessRequest] = useCreateAccessRequestMutation()
  const [error, setError] = useState<Error | null>(null)
  const router = useRouter()

  const userInfo = useContext(UserState)

  const dp = useDataproductQuery({
    variables: {
      id: dataset.dataproductID,
    },
  })

  if (dp.error) return <ErrorMessage error={dp.error} />
  if (dp.loading || !dp.data) return <LoaderSpinner />

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
      router.push(`/dataproduct/${dp?.data?.dataproduct.id}/${dataset.id}`)
    })
  }

  return (
    <AccessRequestForm dataset={dataset} isEdit={false} onSubmit={onSubmit} error={error} />
  )
}

export default NewAccessRequestForm
