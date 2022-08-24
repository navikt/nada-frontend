import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Controller, useForm } from 'react-hook-form'
import ErrorMessage from '../lib/error'
import { useRouter } from 'next/router'
import KeywordsInput from '../lib/KeywordsInput'
import { CREATE_DATAPRODUCT } from '../../lib/queries/dataproduct/createDataproduct'
import { useMutation } from '@apollo/client'
import TeamkatalogenSelector from '../lib/teamkatalogenSelector'
import DescriptionEditor from '../lib/DescriptionEditor'
import {
  Button,
  Heading,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@navikt/ds-react'
import amplitudeLog from '../../lib/amplitude'
import * as yup from 'yup'
import { Divider } from '@navikt/ds-react-internal'
import { useContext, useState } from 'react'
import { UserState } from '../../lib/context'
import DatasetSourceForm from './dataset/datasetSourceForm'

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
    console.log(data.pii)
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

  return (
    <div className="mt-8">
      <Heading level="1" size="large">
        Legg til dataprodukt
      </Heading>
      <form
        className="pt-12 flex flex-col gap-10"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        {backendError && <ErrorMessage error={backendError} />}
        <TextField
          className="w-full 2xl:w-[32rem]"
          label="Navn på dataprodukt"
          {...register('name')}
          error={errors.name?.message}
        />
        <DescriptionEditor
          label="Beskrivelse"
          name="description"
          control={control}
        />
        <Select
          className="w-full 2xl:w-[32rem]"
          label="Velg gruppe fra GCP"
          {...register('team')}
          error={errors.team?.message}
        >
          <option value="">Velg gruppe</option>
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
          className="w-full 2xl:w-[32rem]"
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
          className="w-full 2xl:w-[32rem]"
          {...register('sourceCodeURL')}
          error={errors.sourceCodeURL?.message}
        />
        <DatasetSourceForm
          label="Velg tabell eller view fra GCP"
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
        <Controller
          name="pii"
          control={control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              legend="Inneholder datasettet personidentifiserende informasjon?"
              error={errors?.pii?.message}
            >
              <Radio value={true}>
                Ja, inneholder personidentifiserende informasjon
              </Radio>
              <Radio value={false}>
                Nei, inneholder ikke personidentifiserende informasjon
              </Radio>
            </RadioGroup>
          )}
        />
        <div className="flex flex-row gap-4 mb-16">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Avbryt
          </Button>
          <Button type="submit">Lagre</Button>
        </div>
      </form>
    </div>
  )
}
