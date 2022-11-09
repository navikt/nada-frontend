import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import ErrorMessage from '../lib/error'
import { useRouter } from 'next/router'
import { CREATE_DATAPRODUCT } from '../../lib/queries/dataproduct/createDataproduct'
import { useMutation } from '@apollo/client'
import TeamkatalogenSelector, { Team } from '../lib/teamkatalogenSelector'
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
import { useContext, useState } from 'react'
import { UserState } from '../../lib/context'
import DatasetSourceForm from './dataset/datasetSourceForm'
import TagsSelector from '../lib/tagsSelector'
import { PiiLevel } from '../../lib/schema/graphql'

const prefilledDataproductDescription = 
`*Relevante beskrivelser gjør at folk lettere forstår dataene slik at de raskt kan utforske dem. 
I søket vil den første delen av beskrivelsen inkluderes i visningen.*

**Kontekst**  
*Hva er lurt å få med som forklarer hva dataproduktet består av og hvor det kommer fra? 
Hvordan samles data inn? Hvilke kilder er brukt? Hvordan ser populasjonen ut? 
Er dataene stabile over tid eller finnes det kjente strukturelle brudd? 
Hva er det du lurer på når du utforsker andres dataprodukter?*

**Hvorfor dataproduktet er interessant**  
*Hvem kan komme til å bruke dataproduktet til hva?  
Om dere allerede vet et case dataene skal brukes til, er det veldig nyttig med en beskrivelse.*`

export const prefilledDatasetDescription =
`*En kort beskrivelse av datasettet*

**Kontekst**  
*Hvordan skiller dette datasettet seg fra de andre datasettene i produktet? Hva brukes datasettet til?*

**Spesielle forhold**  
*Er det taushetsbelagt informasjon i datasettet, 
f. eks. børssensitiv informasjon som ikke må deles før et angitt tidspunkt? 
Inneholder datasettet informasjon om personer med fortrolig eller strengt fortrolig adresse? 
Er det andre ting eller forutsetninger i datasettet man bør være oppmerksom på, så er det lurt å skrive det ned*

**Ofte stilte spørsmål**  
*Er det noen spørsmål som går igjen, så kan du svare på dem en gang for alle - og kanskje slippe unna litt mas*`

const defaultValues: FieldValues = {
  name: null,
  description: prefilledDataproductDescription,
  team: "",
  teamContact: null,
  datasetName: null,
  datasetDescription: prefilledDatasetDescription,
  sourceCodeURL: null,
  bigQuery: null,
  keywords: [] as string[],
  pii: null,
}

const schema = yup.object().shape({
  name: yup.string().required('Du må fylle inn navn'),
  description: yup.string(),
  team: yup
    .string()
    .required('Velg en gruppe fra GCP som skal ha ansvar for dataproduktet'),
  teamkatalogenURL: yup.string().required('Du må velg en team i teamkatalogen'),
  teamContact: yup.string(),
  datasetName: yup.string().required('Du må fylle inn navn'),
  datasetDescription: yup.string(),
  sourceCodeURL: yup.string().url('Link må være en gyldig URL'),
  bigquery: yup.object({
    dataset: yup.string().required(),
    projectID: yup.string().required(),
    table: yup.string().required(),
  }),
  keywords: yup.array().of(yup.string()),
  pii: yup
    .boolean()
    .required(
      'Du må velge om datasettet inneholder personidentifiserende informasjon'
    ),
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
  teamkatalogenURL: string
  teamContact: string
  datasetName: string
  datasetDescription: string
  sourceCodeURL: string
  bigquery: BigQueryFields
  keywords: string[]
  pii: PiiLevel
  productAreaID: string
  teamID: string
}

export const NewDataproductForm = () => {
  const router = useRouter()
  const userInfo = useContext(UserState)
  const [productAreaID, setProductAreaID] = useState<string>('')
  const [teamID, setTeamID] = useState<string>('')

  const { register, handleSubmit, watch, formState, setValue, control } =
    useForm({
      resolver: yupResolver(schema),
      defaultValues: defaultValues,
    })

  const { errors } = formState
  const keywords = watch('keywords')

  const onDeleteKeyword = (keyword: string | undefined) => {
    setValue(
      'keywords',
      keywords.filter((k: string) => k !== keyword)
    )
  }

  const onAddKeyword = (keyword: string | undefined) => {
    keywords
      ? setValue('keywords', [...keywords, keyword])
      : setValue('keywords', [keyword])
  }

  const valueOrNull = (val: string) => (val == '' ? null : val)

  const onSubmit = async (data: any) => {
    try {
      await createDataproduct({
        variables: {
          input: {
            name: data.name,
            description: valueOrNull(data.description),
            group: data.team,
            teamkatalogenURL: valueOrNull(data.teamkatalogenURL),
            teamContact: valueOrNull(data.teamContact),
            productAreaID: valueOrNull(productAreaID),
            teamID: valueOrNull(teamID),
            datasets: [
              {
                name: data.datasetName,
                description: valueOrNull(data.datasetDescription),
                repo: valueOrNull(data.sourceCodeURL),
                bigquery: data.bigquery,
                keywords: data.keywords,
                pii: data.pii ? PiiLevel.Sensitive : PiiLevel.None,
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
    <div className="mt-8 w-[46rem]">
      <Heading level="1" size="large">
        Legg til dataprodukt
      </Heading>
      <form
        className="pt-12 flex flex-col gap-10"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <TextField
          className="w-full"
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
          className="w-full"
          label="Velg gruppe fra GCP"
          {...register('team', {
            onChange: () => setValue('teamkatalogenURL', ''),
          })}
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
          gcpGroup={team}
          register={register}
          watch={watch}
          errors={errors}
          setProductAreaID={setProductAreaID}
          setTeamID={setTeamID}
        />
        <TextField
          label="Ønsket kontaktpunkt for dataproduktet"
          description="Kontaktpunktet kan være enten navnet på en slack-kanal (uten #) eller en e-post."
          {...register('teamContact')}
          error={errors.teamContact?.message}
          className="w-full"
        />
        <hr className="border-border-inverted" />
        <div>
          <Heading level="2" size="medium">
            Legg til et datasett
          </Heading>
          <span className="italic text-[#555]">
            Flere datasett kan legges til etter lagring{' '}
          </span>
        </div>
        <TextField
          label="Navn på datasett"
          className="w-full"
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
          className="w-full"
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
              <Radio value={true}>
                Ja, inneholder personidentifiserende informasjon
              </Radio>
              <Radio value={false}>
                Nei, inneholder ikke personidentifiserende informasjon
              </Radio>
            </RadioGroup>
          )}
        />
        {backendError && <ErrorMessage error={backendError} />}
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
