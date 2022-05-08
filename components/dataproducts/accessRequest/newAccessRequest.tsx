import {
  NewAccessRequest,
  useCreateAccessRequestMutation
} from '../../../lib/schema/graphql'
import * as React from 'react'
import AccessRequestForm, {AccessRequestFormInput} from "./accessRequestForm";
import {useRouter} from "next/router";


interface NewAccessRequestFormProps {
  newAccessRequest: NewAccessRequest
}

const NewAccessRequestForm = ({newAccessRequest}: NewAccessRequestFormProps) => {
  const [createAccessRequest] = useCreateAccessRequestMutation()
  const router = useRouter()
  const accessRequest: AccessRequestFormInput = {
    ...newAccessRequest
  }

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
          router.push(`/user/requests`)
        })
  }

  return (
      <AccessRequestForm accessRequest={accessRequest} isEdit={false} onSubmit={onSubmit}/>
  )
}

export default NewAccessRequestForm
