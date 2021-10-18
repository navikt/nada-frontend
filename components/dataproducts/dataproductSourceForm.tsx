import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormWatch,
  SetFieldValue,
} from 'react-hook-form'
import { useContext, useEffect, useState } from 'react'
import { components } from '../../lib/schema/schema'
import Tree, {
  Node as TreeNode,
  NodeId as TreeNodeId,
  NodeList,
} from '@naisutech/react-tree'
import { AuthState } from '../../lib/context'
import { Fieldset } from '@navikt/ds-react'

// This is a bit of a mess. We are pulling data from three different sources, in three different formats,
// and building an array with a relatively inexplicable format for use by the Tree component.

interface DataproductSourceFormProps {
  register: UseFormRegister<FieldValues>
  watch: UseFormWatch<FieldValues>
  errors: FieldErrors<FieldValues>
  setValue: SetFieldValue<FieldValues>
}

interface ProjectTableResponse {
  DataproductID: string
  Dataset: string
  ProjectID: string
  TableName: string
}

const teamName = (id: string) => id.split(':', 2)[1]
const projectName = (id: string) => id.split(':', 3)[2]
const datasetName = (id: string) => id.split(':', 4)[3]
const tableName = (id: string) => id.split(':', 5)[4]

const nodeIsTeam = (id: string) => id.split(':', 1)[0] === 'team'
const nodeIsProject = (id: string) => id.split(':', 1)[0] === 'project'
const nodeIsTable = (id: string) => id.split(':', 1)[0] === 'table'

export const DataproductSourceForm = ({
  register,
  watch,
  errors,
  setValue,
}: DataproductSourceFormProps) => {
  const [teams, setTeams] = useState<components['schemas']['Group'][]>([])
  type TeamID = string
  type ProjectID = string
  type DatasetID = string
  type TableID = string

  const [teamProjects, setTeamProjects] = useState<Record<TeamID, ProjectID[]>>(
    {}
  )
  const [tablesInProject, setTablesInProject] = useState<
    Record<ProjectID, ProjectTableResponse[]>
  >({})
  const [datasets, setDatasets] = useState<Record<ProjectID, DatasetID[]>>({})
  const [tables, setTables] = useState<Record<DatasetID, TableID[]>>({})

  const [viewedTeams, setViewedTeams] = useState<string[]>([])
  const [viewedProjects, setViewedProjects] = useState<string[]>([])

  const [nodes, setNodes] = useState<NodeList>([])

  const user = useContext(AuthState).user

  console.log(errors)
  register('owner.group')
  register('datasource.project_id')
  register('datasource.dataset')
  register('datasource.table')

  useEffect(() => {
    if (!user?.groups) return
    setTeams(user.groups.filter((g) => g.email !== 'all-users@nav.no'))
  }, [user])

  // Processes the full state to create a NodeList for the <Tree>
  useEffect(() => {
    const tablesInDataset = (datasetID: string) =>
      tables[datasetID].map((tableID) => ({
        id: tableID,
        parentId: datasetID,
        label: tableName(tableID),
      }))

    const teamsList = teams.map(
      (t): TreeNode => ({
        id: `team:${t.email}`,
        parentId: null,
        label: t.name,
      })
    )
    for (const [team, projectList] of Object.entries(teamProjects)) {
      projectList.forEach((project) =>
        teamsList.push({
          id: project,
          parentId: team,
          label: projectName(project),
        })
      )
    }
    for (const [project, datasetList] of Object.entries(datasets)) {
      datasetList.forEach((datasetID) => {
        teamsList.push({
          id: datasetID,
          parentId: project,
          label: datasetName(datasetID),
          items: tablesInDataset(datasetID),
        })
      })
    }

    setNodes(teamsList)
  }, [teams, teamProjects, datasets, tables])

  useEffect(() => {
    for (const teamID of viewedTeams.filter((t) => !(t in teamProjects))) {
      fetch(`/api/groups/${teamName(teamID)}/gcp_projects`)
        .then((res) => res.json())
        .then((p: string[]) => {
          setTeamProjects({
            ...teamProjects,
            [teamID]: p.map((p) => `project:${teamName(teamID)}:${p}`),
          })
        })
    }
  }, [viewedTeams])

  // If the expanded tab is an unloaded project, load it.
  useEffect(() => {
    for (const projectID of viewedProjects.filter(
      (p) => !(p in tablesInProject)
    )) {
      fetch(`/api/gcp/${projectName(projectID)}/tables`)
        .then((res) => res.json())
        .then((d: ProjectTableResponse[]) => {
          setTablesInProject({
            ...tablesInProject,
            [projectID]: d,
          })
        })
    }
  }, [viewedProjects])

  useEffect(() => {
    const getUnique = (datasetIDs: string[]) => Array.from(new Set(datasetIDs))

    const responseToDatasetID = (projectID: string, ds: ProjectTableResponse) =>
      `dataset:${teamName(projectID)}:${projectName(projectID)}:${ds.Dataset}`

    const responseToTableID = (datasetID: string, ds: ProjectTableResponse) =>
      `table:${teamName(datasetID)}:${projectName(datasetID)}:${datasetName(
        datasetID
      )}:${ds.TableName}`

    const datasetsInResponse = (
      projectID: string,
      tables: ProjectTableResponse[]
    ) => getUnique(tables.map((s) => responseToDatasetID(projectID, s)))

    const hasSameProjectAndDataset = (
      datasetID: string,
      res: ProjectTableResponse
    ) =>
      res.Dataset === datasetName(datasetID) &&
      res.ProjectID === projectName(datasetID)

    const tablesInDataset = (datasetID: string, res: ProjectTableResponse[]) =>
      getUnique(
        res
          .filter((s) => hasSameProjectAndDataset(datasetID, s))
          .map((s) => responseToTableID(datasetID, s))
      )

    for (const project in tablesInProject) {
      if (!(project in datasets)) {
        setDatasets((ds) => ({
          ...ds,
          [project]: datasetsInResponse(project, tablesInProject[project]),
        }))

        for (const dataset of datasetsInResponse(
          project,
          tablesInProject[project]
        )) {
          setTables((tables) => ({
            ...tables,
            [dataset]: tablesInDataset(dataset, tablesInProject[project]),
          }))
        }
      }
    }
  }, [tablesInProject])

  const openCloseHandler = (nodeIds: TreeNodeId[]) => {
    console.log(nodeIds)
    for (const nodeId of nodeIds) {
      const id = nodeId as string

      if (nodeIsTeam(id) && !(id in viewedTeams)) {
        setViewedTeams([...viewedTeams, id])
      }

      if (nodeIsProject(id as string) && !(id in viewedProjects)) {
        setViewedProjects([...viewedProjects, id])
      }
    }
  }

  const selectHandler = (nodeId: TreeNodeId[]) => {
    console.log(nodeId[0])
    if (!nodeId.length) return

    const id = nodeId[0] as string

    if (!nodeIsTable(id)) return

    setValue('owner.group', teamName(id))
    setValue('datasource.project_id', projectName(id))
    setValue('datasource.dataset', datasetName(id))
    setValue('datasource.table', tableName(id))
  }

  return (
    <Fieldset legend="Datakilde" errorPropagation={false}>
      <Tree
        theme="light"
        nodes={nodes}
        onOpenClose={openCloseHandler}
        onSelect={selectHandler}
      />
    </Fieldset>
  )
}
