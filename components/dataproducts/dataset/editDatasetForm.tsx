import {
  Button,
  ErrorSummary,
  Heading,
  Radio,
  RadioGroup,
  TextField,
} from '@navikt/ds-react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { useState } from 'react'
import * as yup from 'yup'
import {
  DatasetQuery,
  useUpdateDatasetMutation,
  UpdateDataset,
} from '../../../lib/schema/graphql'
import { GET_DATASET } from '../../../lib/queries/dataset/dataset'
import DescriptionEditor from '../../lib/DescriptionEditor'
import KeywordsInput from '../../lib/KeywordsInput'
import { GET_DATAPRODUCT } from '../../../lib/queries/dataproduct/dataproduct'

interface EditDatasetFormProps {
  dataset: DatasetQuery['dataset']
  setEdit: (value: boolean) => void
}

interface EditDatasetFormFields {
  name: string
  description: string
  repo: string
  pii: boolean
  bigquery: {
    projectID: string
    dataset: string
    table: string
  }
  keywords: []
}

const schema = yup.object().shape({
  name: yup.string().required('Du må fylle inn navn'),
  description: yup.string(),
  repo: yup.string(),
  pii: yup
    .bool()
    .required(
      'Du må spesifisere om datasettet inneholder personidentifiserende informasjon'
    ),
  bigquery: yup.object({
    dataset: yup.string().required(),
    projectID: yup.string().required(),
    table: yup.string().required(),
  }),
})

const EditDataset = ({ dataset, setEdit }: EditDatasetFormProps) => {
  const [backendError, setBackendError] = useState()
  const [updateDataset] = useUpdateDatasetMutation()
  const { register, handleSubmit, watch, formState, setValue, control } =
    useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        name: dataset.name,
        description: dataset.description || '',
        pii: dataset.pii,
        repo: dataset.repo || '',
        keywords: dataset.keywords,
        bigquery: {
          projectID: dataset.datasource.projectID,
          dataset: dataset.datasource.dataset,
          table: dataset.datasource.table,
        },
      },
    })

  const keywords = watch('keywords')
  const bigquery = watch('bigquery')

  const onDeleteKeyword = (keyword: string) => {
    setValue(
      'keywords',
      keywords.filter((k: string) => k !== keyword)
    )
  }

  const onAddKeyword = (keyword: string) => {
    setValue('keywords', [...keywords, keyword])
  }

  const { errors } = formState
  const onSubmit = (requestData: EditDatasetFormFields) => {
    const payload: UpdateDataset = {
      name: requestData.name,
      description: requestData.description,
      pii: requestData.pii,
      repo: requestData.repo,
      keywords: requestData.keywords,
    }
    updateDataset({
      variables: { id: dataset.id, input: payload },
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: GET_DATASET,
          variables: {
            id: dataset.id,
          },
        },
        {
          query: GET_DATAPRODUCT,
          variables: {
              id: dataset.dataproductID
          },
        },
        'searchContent',
      ],
    }).then(() => {
      setBackendError(undefined)
      setEdit(false)
    })
  }
  {
    backendError && (
      <ErrorSummary heading={'Feil fra server'}>{backendError}</ErrorSummary>
    )
  }

  return (
    <div className="block pt-8 pr-8">
      <Heading level="1" size="medium" spacing>
        Endre datasett
      </Heading>
      <form
        onSubmit={handleSubmit(onSubmit)}
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
        <TextField
          label="Dataset"
          disabled
          value={
            bigquery.projectID + '.' + bigquery.dataset + '.' + bigquery.table
          }
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
        <div className="flex flex-row gap-4 grow items-end">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setEdit(false)
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
export default EditDataset
