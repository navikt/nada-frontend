import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Heading, Radio, RadioGroup, Textarea, TextField } from '@navikt/ds-react'
import { useRouter } from 'next/router'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { CREATE_DATASET } from '../../../lib/queries/dataset/createDataset'
import { DataproductQuery, PiiLevel } from '../../../lib/schema/graphql'
import DescriptionEditor from '../../lib/DescriptionEditor'
import TagsSelector from '../../lib/tagsSelector'
import { prefilledDatasetDescription } from '../newDataproductForm'
import AnnotateDatasetTable from './annotateDatasetTable'
import DatasetSourceForm from './datasetSourceForm'
import { useColumnTags } from './useColumnTags'
import {Personopplysninger} from "./helptext";

interface NewDatasetFormProps {
  dataproduct: DataproductQuery
}

const defaultValues: FieldValues = {
  name: null,
  description: prefilledDatasetDescription,
  bigquery: null,
  pii: null,
  anonymisation_description: null,
}

const schema = yup.object().shape({
  name: yup.string().nullable().required('Du må fylle inn navn'),
  description: yup.string(),
  bigquery: yup.object({
    dataset: yup.string().required(),
    projectID: yup.string().required(),
    table: yup.string().required(),
  }),
  pii: yup
    .string()
    .nullable()
    .oneOf(["sensitive", "anonymised", "none"])
    .required(
      'Du må spesifisere om datasettet inneholder personidentifiserende informasjon'
    ),
  anonymisation_description: yup.string().nullable().when("pii", {
    is: "anonymised",
    then: yup.string().nullable().required('Du må beskrive hvordan datasettet har blitt anonymisert')
  }),
})

const NewDatasetForm = ({ dataproduct }: NewDatasetFormProps) => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  })
  const projectID = watch('bigquery.projectID')
  const datasetID = watch('bigquery.dataset')
  const tableID = watch('bigquery.table')
  const pii = watch('pii')
  const {
    columns,
    loading: loadingColumns,
    error: columnsError,
    tags,
    annotateColumn,
  } = useColumnTags(projectID, datasetID, tableID)

  const onDeleteKeyword = (keyword: string) => {
    setValue(
      'keywords',
      keywords.filter((k: string) => k !== keyword)
    )
  }

  const keywords = watch('keywords')
  const team = dataproduct.dataproduct.owner.group

  const onAddKeyword = (keyword: string) => {
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
    requestData.dataproductID = dataproduct.dataproduct.id
    requestData.bigquery.piiTags = JSON.stringify(Object.fromEntries(tags || new Map<string, string>()))
    const pii = requestData.pii === "sensitive"
      ? PiiLevel.Sensitive
      : requestData.pii === "anonymised"
        ? PiiLevel.Anonymised
        : PiiLevel.None
    requestData.pii = pii
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
    <div className="pt-8 pr-8 w-[46rem]">
      <Heading level="1" size="medium" spacing>
        Legg til datasett
      </Heading>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="flex flex-col gap-10 h-[90%]"
      >
        <TextField
          {...register('name')}
          className="w-full"
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
          className="w-full"
          id="repo"
          label="Link til kildekode"
          error={errors.repo?.message}
        />
        <DatasetSourceForm
          label="Velg tabell eller view"
          team={team}
          register={register}
          watch={watch}
          errors={errors}
          setValue={setValue}
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
              legend={<p className="flex gap-2 items-center">Inneholder datasettet personopplysninger? <Personopplysninger /></p>}
              error={errors?.pii?.message}
            >
              <Radio value={"sensitive"}>
                Ja, inneholder personopplysninger
              </Radio>
              {pii == 'sensitive' && projectID && datasetID && tableID && (
                <AnnotateDatasetTable
                  loading={loadingColumns}
                  error={columnsError}
                  columns={columns}
                  tags={tags}
                  annotateColumn={annotateColumn}
                />
              )}
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
