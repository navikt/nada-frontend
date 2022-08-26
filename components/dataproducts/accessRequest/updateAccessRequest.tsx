import {
  AccessRequest,
  useUpdateAccessRequestMutation,
} from '../../../lib/schema/graphql'
import * as React from 'react'
import AccessRequestForm, {
  AccessRequestFormInput,
} from './accessRequestForm'
import { DatasetQuery } from '../../../lib/schema/datasetQuery'

interface UpdateAccessRequestFormProps {
  updateAccessRequestData: AccessRequest
  dataset: DatasetQuery
  setModal: (value: boolean) => void
}

const UpdateAccessRequest = ({
  dataset,
  updateAccessRequestData,
  setModal,
}: UpdateAccessRequestFormProps) => {
  const [updateAccessRequest] = useUpdateAccessRequestMutation()
  const accessRequest: AccessRequestFormInput = {
    ...updateAccessRequestData,
  }

  const onSubmit = async (requestData: AccessRequestFormInput) => {
    updateAccessRequest({
      variables: {
        input: {
          id: updateAccessRequestData.id,
          expires: requestData.expires,
          owner: updateAccessRequestData.owner,
          polly: requestData.polly,
        },
      },
      refetchQueries: ['userInfoDetails'],
    }).then(() => {
      setModal(false)
    })
  }

  return (
    <AccessRequestForm
      dataset={dataset}
      accessRequest={accessRequest}
      isEdit={true}
      onSubmit={onSubmit}
    />
  )
}

export default UpdateAccessRequest
