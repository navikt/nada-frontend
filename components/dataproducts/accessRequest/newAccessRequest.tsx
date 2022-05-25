import {
  NewAccessRequest,
  useCreateAccessRequestMutation, useDataproductQuery
} from '../../../lib/schema/graphql'
import * as React from 'react'
import AccessRequestForm, {AccessRequestFormInput} from "./accessRequestForm";
import {useRouter} from "next/router";
import ErrorMessage from "../../lib/error";
import LoaderSpinner from "../../lib/spinner";


interface NewAccessRequestFormProps {
  newAccessRequest: NewAccessRequest
}

const NewAccessRequestForm = ({newAccessRequest}: NewAccessRequestFormProps) => {
  const [createAccessRequest] = useCreateAccessRequestMutation()
  const router = useRouter()
  const accessRequest: AccessRequestFormInput = {
    ...newAccessRequest
  }

  const { data, error, loading } = useDataproductQuery({
    variables: { id: accessRequest.dataproductID },
  })

  if (error) return <ErrorMessage error={error} />
  if (loading || !data) return <LoaderSpinner />

  const onSubmit = async (requestData: AccessRequestFormInput) => {
    const accessRequest: NewAccessRequest = {
      ...requestData
    }
    await createAccessRequest({
        variables: {
          input: accessRequest
        },
        refetchQueries: ['userInfoDetails'],
      }).then(() => {
          router.push(`/dataproduct/${accessRequest.dataproductID}/${data.dataproduct.slug}`)
        })
  }

  return (
      <AccessRequestForm accessRequest={accessRequest} isEdit={false} isView={false} onSubmit={onSubmit}/>
  )
}

export default NewAccessRequestForm
