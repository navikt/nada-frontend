import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Checkbox, Heading, Radio, RadioGroup, Select, Table, Textarea, TextField } from '@navikt/ds-react'
import { useRouter } from 'next/router'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import * as yup from 'yup'
import DatasetSourceForm from '../../../components/dataproducts/dataset/datasetSourceForm'
import { useContext, useState } from 'react'
import { UserState } from '../../../lib/context'
import { useColumnTags } from '../../../components/dataproducts/dataset/useColumnTags'

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
  const [pseudoColumns, setPseudoColumns] = useState<string[]>([])

  const team = watch('team')
  const bigquery = watch('bigquery')

  const {columns, loading, error} = useColumnTags(bigquery?.projectID, bigquery?.dataset, bigquery?.table)
  const onSubmitForm = async (requestData: any) => {
  }



  return (
    <div className="pt-8 pr-8 md:w-[46rem]">
      <Heading level="1" size="medium" spacing>
        Legg til psueodonimisert view
      </Heading>


      <form
        onSubmit={onSubmitForm}
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
                    <Checkbox onChange={e=>{
                      var newColumns = pseudoColumns.filter(it=> it!== row.name)
                      if(e.target.value){
                        newColumns.push(row.name)
                      }
                      setPseudoColumns(newColumns)
                    }} value={pseudoColumns.some(it=> it === row.name)}>""</Checkbox>
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
          >
            Avbryt
          </Button>
          <Button type="submit">Lagre</Button>
        </div>
      </form>
    </div>
  )
}

export default NewPsuedoView