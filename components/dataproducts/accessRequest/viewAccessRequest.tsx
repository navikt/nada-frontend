import {
  AccessRequest,
} from '../../../lib/schema/graphql'
import * as React from 'react'
import AccessRequestForm, {AccessRequestFormInput} from "./accessRequestForm";

interface ViewAccessRequestFormProps {
  viewAccessRequestData: AccessRequest
}

const ViewAccessRequest = ({viewAccessRequestData}: ViewAccessRequestFormProps) => {
  const accessRequest: AccessRequestFormInput = {
    ...viewAccessRequestData
  }

  return (
      <AccessRequestForm accessRequest={accessRequest} isEdit={false} isView={true} onSubmit={() => {}}/>
  )
}

export default ViewAccessRequest
