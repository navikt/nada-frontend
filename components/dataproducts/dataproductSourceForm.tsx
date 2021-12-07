import { useState } from 'react'
import TreeView from '@mui/lab/TreeView'
import {
  FieldErrors,
  FieldValues,
  SetFieldValue,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form'
import { Project } from './datasource/project'
import { useUserInfoDetailsQuery } from '../../lib/schema/graphql'

interface DataproductSourceFormProps {
  register: UseFormRegister<FieldValues>
  watch: UseFormWatch<FieldValues>
  errors: FieldErrors<FieldValues>
  setValue: SetFieldValue<FieldValues>
}

export const DataproductSourceForm = ({
  register,
  watch,
  setValue,
}: DataproductSourceFormProps) => {
  const userInfo = useUserInfoDetailsQuery().data?.userInfo

  const [activePaths, setActivePaths] = useState<string[]>([])
  register('bigquery.projectID')
  register('bigquery.dataset')
  register('bigquery.table')
  const group = watch('group')

  const teamProjects = userInfo?.gcpProjects
    .filter((project) => project.group.email == group)
    .map((group) => group.id)

  const handleNodeSelect = (e: any, node: string) => {
    const [projectID, datasetID, tableID] = node.split('/')
    if (projectID && datasetID && tableID) {
      setValue('bigquery.projectID', projectID)
      setValue('bigquery.dataset', datasetID)
      setValue('bigquery.table', tableID)
    }
  }

  return (
    <TreeView
      onNodeSelect={handleNodeSelect}
      onNodeToggle={(x, n) => setActivePaths(n)}
    >
      {teamProjects?.map((projectID) => {
        return (
          <Project
            key={projectID}
            projectID={projectID}
            activePaths={activePaths}
          />
        )
      })}
    </TreeView>
  )
}
export default DataproductSourceForm
