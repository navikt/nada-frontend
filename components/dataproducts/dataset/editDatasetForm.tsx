import {
  Button,
  ErrorSummary,
  Heading,
  Radio,
  RadioGroup,
  Textarea,
  TextField,
} from '@navikt/ds-react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react'
import * as yup from 'yup'
import {
  DatasetQuery,
  useUpdateDatasetMutation,
  UpdateDataset,
  PiiLevel,
} from '../../../lib/schema/graphql'
import { GET_DATASET } from '../../../lib/queries/dataset/dataset'
import DescriptionEditor from '../../lib/DescriptionEditor'
import { GET_DATAPRODUCT } from '../../../lib/queries/dataproduct/dataproduct'
import TagsSelector from '../../lib/tagsSelector';

interface EditDatasetFormProps {
  dataset: DatasetQuery["dataset"]
  setEdit: (value: boolean) => void
}

interface EditDatasetFormFields {
  name: string
  description: string
  repo: string
  pii: string
  bigquery: {
    projectID: string
    dataset: string
    table: string
  }
  keywords: string[]
  anonymisation_description: string | null | undefined
}

const schema = yup.object().shape({
  name: yup.string().nullable().required('Du må fylle inn navn'),
  description: yup.string(),
  repo: yup.string().nullable(),
  pii: yup
    .string()
    .nullable()
    .oneOf(["sensitive", "anonymised", "none"])
    .required(
      'Du må spesifisere om datasettet inneholder personidentifiserende informasjon'
    ),
  bigquery: yup.object({
    dataset: yup.string().required(),
    projectID: yup.string().required(),
    table: yup.string().required(),
  }),
  anonymisation_description: yup.string().nullable().when("pii", {
    is: "anonymised",
    then: yup.string().nullable().required('Du må beskrive hvordan datasettet har blitt anonymisert')
  }),
})

const EditDatasetForm = ({ dataset, setEdit }: EditDatasetFormProps) => {
  const [backendError, setBackendError] = useState()
  const [updateDataset] = useUpdateDatasetMutation()

  const { register, handleSubmit, watch, formState, setValue, getValues, control } =
    useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        name: dataset.name,
        description: dataset.description || '',
        pii: dataset.pii.toString(),
        repo: dataset.repo || '',
        keywords: dataset.keywords,
        bigquery: {
          projectID: dataset.datasource.projectID,
          dataset: dataset.datasource.dataset,
          table: dataset.datasource.table,
        },
        anonymisation_description: dataset.anonymisation_description,
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
      pii: requestData.pii === "sensitive"
        ? PiiLevel.Sensitive
        : requestData.pii === "anonymised"
          ? PiiLevel.Anonymised
          : PiiLevel.None,
      repo: requestData.repo,
      keywords: requestData.keywords,
      anonymisation_description: requestData.anonymisation_description,
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
            id: dataset.dataproductID,
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
        <TagsSelector
          onAdd={onAddKeyword}
          onDelete={onDeleteKeyword}
          tags={keywords || []}
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
              <Radio value={"sensitive"}>
                Ja, inneholder personopplysninger
              </Radio>
              <Radio value={"anonymised"}>
                Det er benyttet metoder for å anonymisere personopplysningene
              </Radio>
              <Textarea 
                placeholder="Beskriv kort hvordan opplysningene er anonymisert" 
                label="Metodebeskrivelse" 
                aria-hidden={getValues("pii") !== "anonymised"}
                className={getValues("pii") !== "anonymised" ? "hidden" : ""}
                error={errors?.anonymisation_description?.message}
                {...register("anonymisation_description")}
              />
              <Radio value={"none"}>
                Nei, inneholder ikke personopplysninger
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
export default EditDatasetForm
