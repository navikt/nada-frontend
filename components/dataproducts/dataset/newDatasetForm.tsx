import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Button, Heading, Radio, RadioGroup, TextField } from '@navikt/ds-react'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { CREATE_DATASET } from '../../../lib/queries/dataset/createDataset'
import { DataproductQuery } from '../../../lib/schema/graphql'
import DescriptionEditor from '../../lib/DescriptionEditor'
import KeywordsInput from '../../lib/KeywordsInput'
import DataproductSourceForm from '../dataproductSourceForm'
import PiiCheckboxInput from '../piiCheckboxInput'
import DatasetSourceForm from './datasetSourceForm'

interface NewDatasetFormProps {
  dataproduct: DataproductQuery
}

interface BigQueryFields {
  dataset: string
  projectID: string
  table: string
}

interface NewDatasetFormFields {
  dataproductID: string
  name: string
  description: string
  repo: string
  pii: boolean
  keywords: string
  bigquery: BigQueryFields
  requesters: []
}

const schema = yup.object().shape({
  name: yup.string().required('Du må fylle inn navn'),
  description: yup.string(),
  bigquery: yup.object({
    dataset: yup.string().required(),
    projectID: yup.string().required(),
    table: yup.string().required(),
  }),
  pii: yup
    .bool()
    .required(
      'Du må spesifisere om datasettet inneholder personidentifiserende informasjon'
    ),
})

const NewDatasetForm = ({ dataproduct }: NewDatasetFormProps) => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onDelete = (keyword: string) => {
    setValue(
      'keywords',
      keywords.filter((k: string) => k !== keyword)
    )
  }

  const keywords = watch('keywords')
  const team = dataproduct.dataproduct.owner.group

  const onAdd = (keyword: string) => {
    keywords
      ? setValue('keywords', [...keywords, keyword])
      : setValue('keywords', [keyword])
  }

  const [createDataset, { loading, error: backendError }] = useMutation(
    CREATE_DATASET,
    {
      onCompleted: (data) =>
        router.push(
          `/dataproduct/${dataproduct.dataproduct.id}/${dataproduct.dataproduct.slug}/${data.createDataset.id}`
        ),
    }
  )

  const onSubmitForm = async (requestData: any) => {
    console.log('')
    console.log(requestData)
    requestData.dataproductID = dataproduct.dataproduct.id
    try {
      await createDataset({
        variables: { input: requestData },
        refetchQueries: ['Dataproduct'],
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="pt-8 pr-8">
      <Heading level="1" size="medium" spacing>
        Nytt datasett
      </Heading>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="flex flex-col gap-10 h-[90%]"
      >
        <TextField
          {...register('name')}
          label="Skriv inn navn"
          error={errors?.name?.message}
          size="medium"
        />
        <DescriptionEditor
          {...register('description')}
          name="description"
          label="Beskrivelse"
          control={control}
        />
        <TextField
          {...register('repo')}
          type={'url'}
          id="repo"
          label="Link til kildekode"
          error={errors.repo?.message}
        />
        <DataproductSourceForm
          label="Velg tabell eller view"
          team={team}
          register={register}
          watch={watch}
          errors={errors}
          setValue={setValue}
        />
        <KeywordsInput
          onAdd={onAdd}
          onDelete={onDelete}
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
        <div className="flex flex-row gap-4 grow items-end">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              router.push(
                `/dataproduct/${dataproduct.dataproduct.id}/${dataproduct.dataproduct.slug}/info`
              )
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

export default NewDatasetForm
