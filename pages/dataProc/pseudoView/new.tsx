import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Checkbox, Heading, Link, Modal, Radio, RadioGroup, Select, Table, Textarea, TextField } from '@navikt/ds-react'
import { useRouter } from 'next/router'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import * as yup from 'yup'
import DatasetSourceForm from '../../../components/dataproducts/dataset/datasetSourceForm'
import { useContext, useState } from 'react'
import { UserState } from '../../../lib/context'
import { CREATE_PSEUDOVIEW } from '../../../lib/queries/pseudoView/newPseudoView'
import { useColumnTags } from '../../../components/dataproducts/dataset/useColumnTags'
import { isConstValueNode } from 'graphql'
import { ExternalLink } from '@navikt/ds-icons'

const schema = yup.object().shape({
  team: yup.string().required(),
  bigquery: yup.object({
    dataset: yup.string().required(),
    projectID: yup.string().required(),
    table: yup.string().required(),
  }),
})

const NewPsuedoView = () => {
  const router = useRouter()
  const userInfo = useContext(UserState)
  const { register, watch, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  })
  const [pseudoViewName, setPseudoViewName] = useState<string>("")
  const [pseudoColumns, setPseudoColumns] = useState<string[]>([])

  const [created, setCreated] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const team = watch('team')
  const bigquery = watch('bigquery')

  const { columns, loading, error } = useColumnTags(bigquery?.projectID, bigquery?.dataset, bigquery?.table)
  const bigQueryUrl = `https://console.cloud.google.com/bigquery?d=${bigquery?.dataset}&p=${bigquery?.projectID}&t=${pseudoViewName}&page=table`

  const [createPseudoView] = useMutation(
    CREATE_PSEUDOVIEW,
    {
      onCompleted: (data) =>setCreated(true)
    }
  )

  const onSubmitForm = async () => {
    setSubmitted(true)
    var requestData: any = {}
    requestData.projectID = bigquery.projectID
    requestData.dataset = bigquery.dataset
    requestData.table = bigquery.table
    requestData.targetColumns = pseudoColumns
    const createRes = await createPseudoView({
      variables: { input: requestData }
    })
    const tableUrl = createRes.data.createPseudoView as string
    setPseudoViewName(tableUrl?.split(".")[2])
  }

  const submittable = bigquery?.dataset && bigquery?.projectID && bigquery?.table && pseudoColumns?.length && !submitted
  return (
    <div className="pt-8 pr-8 md:w-[46rem]">
      <Modal
        open={created}
        aria-label="Fjern metabase database"
        onClose={() => setCreated(false)}
        className="max-w-full md:max-w-3xl px-8 h-[20rem]"
      >
        <Modal.Content className="h-full">
          <div className="flex flex-col gap-8">
            <Heading level="1" size="medium">
              Gratulerer
            </Heading>
            <div>
              Et psueodoynimisert BigQuery view har blitt lagt i prosjektet ditt
              <Link
                className="nada-search-result"
                target="_blank"
                rel="norefferer"
                href={bigQueryUrl}
              >
                <div className="flex flex-col">
                  <div className="flex flex-row text-text-action">
                    {"Åpne BigQuery viewet i Google Cloud Console"}<ExternalLink />
                  </div>
                </div>
              </Link>
            </div>
            <div>
              Du kan legge til en dataprodukt/datasett med det viewet, eller legg til andre viewer
            </div>
            <div className="flex flex-row gap-4">
              <Button
                onClick={() => router.push("/dataproduct/new")}
                variant="secondary"
                size="small"
              >
                Legg til dataprodukt
              </Button>
              <Button
                onClick={() =>location.reload()}
                variant="secondary"
                size="small"
              >
                Legg til et nytt view
              </Button>
              <Button
                onClick={() => router.push("/")}
                variant="primary"
                size="small"
              >
                Tilbake til forsiden
              </Button>
            </div>
          </div>
        </Modal.Content>
      </Modal>

      <Heading level="1" size="medium" spacing>
        Legg til psueodonimisert view
      </Heading>
      <form
        className="flex flex-col gap-10 h-[90%]"
      >
        <Select
          className="w-full"
          label="Velg gruppe fra GCP"
          {...register('team')}
          error={errors.team?.message?.toString()}
        >
          <option value="">Velg gruppe</option>
          {[...new Set(
            userInfo?.gcpProjects.map(
              ({ group }: { group: { name: string } }) => (
                <option
                  value={
                    userInfo?.groups.filter((g) => g.name === group.name)[0]
                      .email
                  }
                  key={group.name}
                >
                  {group.name}
                </option>
              )
            )
          ),
          ]}
        </Select>

        <DatasetSourceForm
          label="Velg tabell eller view"
          team={team}
          register={register}
          watch={watch}
          errors={errors}
          setValue={setValue}
        />

        <div className="mb-3 w-[91vw] overflow-auto">
          <Table className="w-[60rem]" size="small">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Pseudonymise</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {columns?.map((row) => (
                <Table.Row key={row.name}>
                  <Table.DataCell>{row.name}</Table.DataCell>
                  <Table.DataCell>{row.type}</Table.DataCell>
                  <Table.DataCell>{row.description}</Table.DataCell>
                  <Table.DataCell className="w-60">
                    <Checkbox onChange={e => {
                      var newColumns = pseudoColumns.filter(it => it !== row.name)
                      if (e.target.checked) {
                        newColumns.push(row.name)
                      }
                      setPseudoColumns(newColumns)
                    }} value={pseudoColumns.some(it => it === row.name)}>{""}</Checkbox>
                  </Table.DataCell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>

        <div className="flex flex-row gap-4 grow items-end">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              router.back()
            }}
            disabled={submitted}
          >
            Avbryt
          </Button>
          <Button type="button" onClick={onSubmitForm} disabled={!submittable}>Lagre</Button>
        </div>
      </form>
    </div >
  )
}

export default NewPsuedoView