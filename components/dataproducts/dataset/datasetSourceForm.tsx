import { useContext, useState } from 'react'
import { TreeView } from '@mui/x-tree-view/TreeView';
import {
  FieldErrors,
  FieldValues,
  SetFieldValue,
  UseFormRegister,
} from 'react-hook-form'
import { Project } from '../datasource/project'
import { UserState } from '../../../lib/context'
import { Label } from '@navikt/ds-react'
import { FormValues } from './newDatasetForm';

interface DataproductSourceFormProps {
  register: UseFormRegister<FormValues>
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
    } else {
      setValue('bigquery.projectID', undefined)
      setValue('bigquery.dataset', undefined)
      setValue('bigquery.table', undefined)
    }
  }

  return (
    <div className="flex flex-col justify-start gap-2">
      <Label>{label}</Label>
      {team ? (
        <div>
          <TreeView
            onNodeSelect={handleNodeSelect}
            onNodeToggle={(x, n) => setActivePaths(n)}
          >
            {teamProjects?.map((projectID) => (
            <Project
            key={projectID}
            projectID={projectID}
            activePaths={activePaths}
            />
            ))}
          </TreeView>
          {errors.bigquery && (
            <div className="flex gap-2 navds-error-message navds-label before:content-['•']">
              Velg en tabell eller et view
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="w-full h-[48px] border border-border-strong rounded p-1"></div>
          <div className="flex gap-2 navds-error-message navds-label before:content-['•']">
            Du må velge gruppe i GCP før du kan velge tabell eller view
          </div>
        </div>
      )}
    </div>
  )
}

export default DataproductSourceForm
