import {
  AccessRequest,
  useUpdateAccessRequestMutation,
} from '../../../lib/schema/graphql'
import * as React from 'react'
import { useRouter } from "next/router";
import AccessRequestForm, {AccessRequestFormInput} from "./accessRequestForm";

interface UpdateAccessRequestFormProps {
  updateAccessRequestData: AccessRequest
}

const UpdateAccessRequest = ({updateAccessRequestData}: UpdateAccessRequestFormProps) => {
  const router = useRouter()
  const [updateAccessRequest] = useUpdateAccessRequestMutation()
  const accessRequest: AccessRequestFormInput = {
    ...updateAccessRequestData
  }

  const onSubmit = async (requestData: AccessRequestFormInput) => {
      updateAccessRequest({
        variables: {
          input: {
            id: updateAccessRequestData.id,
            expires: requestData.expires,
            owner: updateAccessRequestData.owner,
            polly: requestData.polly
          },
        }
      }).then(() => {
        router.push(`/user/requests`)
      })
  }

  return (
      <AccessRequestForm accessRequest={accessRequest} isEdit={true} isView={false} onSubmit={onSubmit}/>
  )
}

export default UpdateAccessRequest
