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
import { Label } from '@navikt/ds-react'

interface DataproductSourceFormProps {
  register: UseFormRegister<FieldValues>
  watch: UseFormWatch<FieldValues>
  errors: FieldErrors<FieldValues>
  setValue: SetFieldValue<FieldValues>
  team: string
  label: string
}

export const DataproductSourceForm = ({
  label,
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
      <Label>{label}</Label>
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
        <div className="flex gap-2 navds-error-message navds-label before:content-['•']">Velg en tabell eller et view</div>
      )}
    </div>
  )
}
export default DataproductSourceForm
