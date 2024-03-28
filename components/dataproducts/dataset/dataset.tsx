import { isAfter, parseISO } from 'date-fns'
import * as React from 'react'
import { useState } from 'react'
import EditDataset from './editDataset'
import ViewDataset from './viewDataset'
import { useGetDataset } from '../../../lib/rest/dataproducts'
import LoaderSpinner from '../../lib/spinner'
import { Alert } from '@navikt/ds-react'

const findAccessType = (
  groups: any,
  dataset: any,
  isOwner: boolean
) => {
  if (!groups) return { type: 'utlogget' }
  if (isOwner) return { type: 'owner' }
  if(!dataset) return {type: 'none'}
  const activeAccess = dataset.access.filter(
    (a: any) =>
      !a.revoked && (!a.expires || isAfter(parseISO(a.expires), Date.now()))
  )[0]
  if (activeAccess) return { type: 'user', expires: activeAccess.expires }
  return { type: 'none' }
}

interface EntryProps {
  dataproduct: any
  datasetID: string
  userInfo: any
  isOwner: boolean
}

const Dataset = ({ datasetID, userInfo, isOwner, dataproduct }: EntryProps) => {
  const [edit, setEdit] = useState(false)
  const {dataset, loading, error} = useGetDataset(datasetID)
  const accessType = findAccessType(userInfo?.groups, dataset, isOwner)

  if(loading || !dataset){
    return <LoaderSpinner></LoaderSpinner>
  }

  if(error){
    return <Alert variant='error'>{error}</Alert>
  }

  return (
    <>
      {edit ? (
        <EditDataset datasetID={dataset.id} setEdit={setEdit} />
      ) : (
        <ViewDataset
          dataset={dataset}
          dataproduct={dataproduct}
          accessType={accessType}
          userInfo={userInfo}
          isOwner={isOwner}
          setEdit={setEdit}
        />
      )}
    </>
  )
}

export default Dataset
