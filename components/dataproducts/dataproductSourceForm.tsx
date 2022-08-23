import { useContext, useState } from 'react'
import TreeView from '@mui/lab/TreeView'
import {
  FieldErrors,
  FieldValues,
  SetFieldValue,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form'
import { Project } from './datasource/project'
import { UserState } from '../../lib/context'
import styled from 'styled-components'

const ErrorMessage = styled.div`
  font-size: var(--navds-font-size-large);
  font-weight: var(--navds-font-weight-bold);
  letter-spacing: 0;
  line-height: var(--navds-font-line-height-large);
  margin: 0;
  color: var(--navds-error-message-color-text);
`

interface DataproductSourceFormProps {
  register: UseFormRegister<FieldValues>
  watch: UseFormWatch<FieldValues>
  errors: FieldErrors<FieldValues>
  setValue: SetFieldValue<FieldValues>
  team: string
}

export const DataproductSourceForm = ({
  team,
  errors,
  register,
  watch,
  setValue,
}: DataproductSourceFormProps) => {
  const userInfo = useContext(UserState)

  const [activePaths, setActivePaths] = useState<string[]>([])
  register('bigquery.projectID')
  register('bigquery.dataset')
  register('bigquery.table')

  const teamProjects = userInfo?.gcpProjects
    .filter((project) => project.group.email == team)
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
    <div>
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
      {errors.bigquery && (
        <ErrorMessage>Velg en tabell eller et view</ErrorMessage>
      )}
    </div>
  )
}
export default DataproductSourceForm
