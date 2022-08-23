import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../lib/error'
import { useRouter } from 'next/router'
import PiiCheckboxInput from './piiCheckboxInput'
import RightJustifiedSubmitButton from '../widgets/formSubmit'
import KeywordsInput from '../lib/KeywordsInput'
import { CREATE_DATAPRODUCT } from '../../lib/queries/dataproduct/createDataproduct'
import { useMutation } from '@apollo/client'
import TeamkatalogenSelector from '../lib/teamkatalogenSelector'
import DescriptionEditor from '../lib/DescriptionEditor'
import { Heading, Select, TextField } from '@navikt/ds-react'
import amplitudeLog from '../../lib/amplitude'
import * as yup from 'yup'
import { Divider } from '@navikt/ds-react-internal'
import { useContext, useState } from 'react'
import { UserState } from '../../lib/context'
import { TreeView } from '@mui/lab'
import { Project } from './datasource/project'
import DatasetSourceForm from './dataset/datasetSourceForm'
import { SearchContentDocument } from '../../lib/schema/graphql'

const schema = yup.object().shape({
  name: yup.string().required('Du må fylle inn navn'),
  description: yup.string(),
  team: yup.string().required('Velg et eierteam for produktet'),
  teamkatalogenTeam: yup.string(),
  datasetName: yup.string().required('Du må fylle inn navn'),
  datasetDescription: yup.string(),
  sourceCodeURL: yup.string().url('Link må være en gyldig URL'),
  bigquery: yup.object({
    dataset: yup.string().required(),
    projectID: yup.string().required(),
    table: yup.string().required(),
  }),
  keywords: yup.array().of(yup.string()),
  pii: yup.boolean().required(),
})

interface BigQueryFields {
  dataset: string
  projectID: string
  table: string
}

export interface NewDataproductFields {
  name: string
  description: string
  team: string
  teamkatalogenTeam: string
  datasetName: string
  datasetDescription: string
  sourceCodeURL: string
  bigquery: BigQueryFields
  keywords: string[]
  pii: boolean
}

export const NewDataproductForm = () => {
  const router = useRouter()
  const userInfo = useContext(UserState)
  const [activePaths, setActivePaths] = useState<string[]>([])

  const { register, handleSubmit, watch, formState, setValue, control } =
    useForm({
      resolver: yupResolver(schema),
    })

  const { errors } = formState
  const keywords = watch('keywords')

  const onDeleteKeyword = (keyword: string) => {
    setValue(
      'keywords',
      keywords.filter((k: string) => k !== keyword)
    )
  }

  const onAddKeyword = (keyword: string) => {
    keywords
      ? setValue('keywords', [...keywords, keyword])
      : setValue('keywords', [keyword])
  }

  const valueOrNull = (val: string) => (val == '' ? null : val)

  const onSubmit = async (data: NewDataproductFields) => {
    try {
      await createDataproduct({
        variables: {
          input: {
            name: data.name,
            description: valueOrNull(data.description),
            group: data.team,
            teamkatalogenURL: valueOrNull(data.teamkatalogenTeam),
            datasets: [
              {
                name: data.datasetName,
                description: valueOrNull(data.datasetDescription),
                repo: valueOrNull(data.sourceCodeURL),
                bigquery: data.bigquery,
                keywords: data.keywords,
                pii: data.pii,
              },
            ],
          },
        },
        refetchQueries: ['searchContent'],
      })
      amplitudeLog('skjema fullført', { skjemanavn: 'nytt-dataprodukt' })
    } catch (e) {
      amplitudeLog('skjemainnsending feilet', {
        skjemanavn: 'nytt-dataprodukt',
      })
      console.log(e)
    }
  }

  register('bigquery.projectID')
  register('bigquery.dataset')
  register('bigquery.table')

  const team = watch('team')

  const [createDataproduct, { loading, error: backendError }] = useMutation(
    CREATE_DATAPRODUCT,
    {
      onCompleted: (data) =>
        router.push(
          `/dataproduct/${data.createDataproduct.id}/${data.createDataproduct.slug}`
        ),
    }
  )

  const onCancel = () => {
    amplitudeLog(
      'Klikker på: Avbryt',
      {
        pageName: 'nytt-dataprodukt',
      },
      () => {
        router.back()
      }
    )
  }

  const onError = (errors: any) => {
    amplitudeLog('skjemavalidering feilet', {
      skjemanavn: 'nytt-dataprodukt',
      feilmeldinger: Object.keys(errors)
        .map((errorKey) => errorKey)
        .join(','),
    })
  }

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
    <form
      className="pt-12 flex flex-col gap-10"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      {backendError && <ErrorMessage error={backendError} />}
      <TextField
        label="Navn på dataprodukt"
        {...register('name')}
        error={errors.name?.message}
      />
      <DescriptionEditor
        label="Beskrivelse"
        name="description"
        control={control}
      />
      <Select label="Team" {...register('team')} error={errors.team?.message}>
        <option value="">Velg team</option>
        {[
          ...new Set(
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
      <TeamkatalogenSelector
        group={team}
        register={register}
        errors={errors}
        watch={watch}
      />
      <Divider />
      <Heading level="2" size="medium">
        Legg til et datasett (Flere datasett kan legges til etter lagring)
      </Heading>
      <TextField
        label="Navn på datasett"
        {...register('datasetName')}
        error={errors.datasetName?.message}
      />
      <DescriptionEditor
        label="Beskrivelse"
        name="datasetDescription"
        control={control}
      />
      <TextField
        label="Link til kildekode"
        {...register('sourceCodeURL')}
        error={errors.sourceCodeURL?.message}
      />
      <DatasetSourceForm
        label="Velg tabell eller view"
        team={team}
        register={register}
        watch={watch}
        errors={errors}
        setValue={setValue}
      />
      <KeywordsInput
        onAdd={onAddKeyword}
        onDelete={onDeleteKeyword}
        keywords={keywords || []}
        error={errors.keywords?.[0].message}
      />
      <PiiCheckboxInput register={register} watch={watch} />
      <RightJustifiedSubmitButton onCancel={onCancel} loading={loading} />
    </form>
  )
}
