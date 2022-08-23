import { Select } from '@navikt/ds-react'
import { useContext } from 'react'
import {
  FieldErrors,
  FieldValues,
  SetFieldValue,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form'
import { UserState } from '../../../lib/context'
import ProjectTables from '../datasource/projectTables'

interface DatasetSourceFormProps {
  team: string
  label: string
  register: UseFormRegister<FieldValues>
  watch: UseFormWatch<FieldValues>
  errors: FieldErrors<FieldValues>
  setValue: SetFieldValue<FieldValues>
}

const DatasetSourceForm = ({
  team,
  label,
  errors,
  register,
  watch,
  setValue,
}: DatasetSourceFormProps) => {
  const userInfo = useContext(UserState)

  const teamProject = userInfo?.gcpProjects.find(
    (project) => project.group.email === team
  )?.id

  register('bigquery.projectID')
  register('bigquery.dataset')
  register('bigquery.table')

  const handleOnChangeDataset = (e: any) => {
    console.log(e.target.value)
    const tableIDParts = e.target.value.split('.')
    setValue('bigquery.projectID', teamProject)
    setValue('bigquery.dataset', tableIDParts[1])
    setValue('bigquery.table', tableIDParts[2])
  }

  return (
    <>
      {teamProject && (
        <>
          <Select onChange={handleOnChangeDataset} label={label}>
            <option value="">Velg datasett</option>
            <ProjectTables projectID={teamProject} />
          </Select>
        </>
      )}
    </>
  )
}

export default DatasetSourceForm
