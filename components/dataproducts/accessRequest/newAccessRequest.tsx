import {
  NewAccessRequest,
  useCreateAccessRequestMutation, useDataproductQuery, useDatasetQuery
} from '../../../lib/schema/graphql'
import { useContext } from 'react'
import AccessRequestFormV2 from "./accessRequestFormV2";
import {AccessRequestFormInput} from "./accessRequestForm"
import {useRouter} from "next/router";
import ErrorMessage from "../../lib/error";
import LoaderSpinner from "../../lib/spinner";
import { DatasetQuery } from '../../../lib/schema/datasetQuery';
import { UserState } from '../../../lib/context';


interface NewAccessRequestFormProps {
  dataset: DatasetQuery
}

const NewAccessRequestForm = ({dataset}: NewAccessRequestFormProps) => {
  const [createAccessRequest] = useCreateAccessRequestMutation()
  const router = useRouter()
  
  const userInfo = useContext(UserState)

  const {data, error, loading} = useDataproductQuery({
    variables: {
      id: dataset.dataproductID
    }
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
          router.push(`/dataproduct/${data.dataproduct.id}/${dataset.id}`)
        })
  }

  const isOwner = (userInfo?.groups.map(g => g.email).concat([userInfo?.email]) || []).includes(data.dataproduct.owner.group)

  return (
      <AccessRequestFormV2 dataset={dataset} isEdit={false} onSubmit={onSubmit}/>
  )
}

export default NewAccessRequestForm
