import { isAfter, parseISO } from 'date-fns'
import {
  DataproductQuery,
  DatasetQuery,
  UserInfoDetailsQuery,
} from '../../../lib/schema/graphql'
import * as React from 'react'
import { useState } from 'react'
import EditDataset from './editDataset'
import ViewDataset from './viewDataset'

const findAccessType = (
  groups: UserInfoDetailsQuery['userInfo']['groups'] | undefined,
  dataset: DatasetQuery['dataset'],
  isOwner: boolean
) => {
  if (!groups) return { type: 'utlogget' }
  if (isOwner) return { type: 'owner' }
  const activeAccess = dataset.access.filter(
    (a) =>
      !a.revoked && (!a.expires || isAfter(parseISO(a.expires), Date.now()))
  )[0]
  if (activeAccess) return { type: 'user', expires: activeAccess.expires }
  return { type: 'none' }
}

interface EntryProps {
  dataproduct: DataproductQuery['dataproduct']
  dataset: DatasetQuery['dataset']
  userInfo: UserInfoDetailsQuery['userInfo'] | undefined
  isOwner: boolean
}

const Dataset = ({ dataset, userInfo, isOwner, dataproduct }: EntryProps) => {
  const accessType = findAccessType(userInfo?.groups, dataset, isOwner)
  const [edit, setEdit] = useState(false)

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
