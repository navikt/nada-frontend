import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, useForm } from 'react-hook-form'
import ErrorMessage from '../lib/error'
import { useRouter } from 'next/router'
import { CREATE_DATAPRODUCT } from '../../lib/queries/dataproduct/createDataproduct'
import { useMutation } from '@apollo/client'
import TeamkatalogenSelector from '../lib/teamkatalogenSelector'
import DescriptionEditor from '../lib/DescriptionEditor'
import {
  Button,
  Heading,
  Select,
  TextField,
} from '@navikt/ds-react'
import amplitudeLog from '../../lib/amplitude'
import * as yup from 'yup'
import { useContext, useState } from 'react'
import { UserState } from '../../lib/context'
import { ContactInput } from './contactInput'


const defaultValues: FieldValues = {
  name: null,
  description: '',
  team: '',
  teamContact: null,
  datasetName: null,
  datasetDescription: '',
  sourceCodeURL: null,
  bigQuery: null,
  keywords: [] as string[],
  pii: null,
  grantAllUsers: 'dontGrantAllUsers'
}

const schema = yup.object().shape({
  name: yup.string().nullable().required('Du må fylle inn navn'),
  description: yup.string(),
  team: yup
    .string()
    .required('Velg en gruppe fra GCP som skal ha ansvar for dataproduktet'),
  teamkatalogenURL: yup.string().required('Du må velg en team i teamkatalogen'),
  teamContact: yup.string().nullable(),
})

export interface NewDataproductFields {
  name: string
  description: string
  team: string
  teamkatalogenURL: string
  teamContact: string
}

export const NewDataproductForm = () => {
  const router = useRouter()
  const userInfo = useContext(UserState)
  const [productAreaID, setProductAreaID] = useState<string>('')
  const [teamID, setTeamID] = useState<string>('')
  const [createDataset, setCreateDataset] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState,
    setValue,
    getValues,
    control,
    trigger
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  })

  const { errors } = formState
  const dataproductName = watch('name')
  const description = watch('description')
  const team = watch('team')
  const teamkatalogenURL = watch('teamkatalogenURL')
  const teamContact = watch('teamContact')

  const valueOrNull = (val: string) => (val == '' ? null : val)

  const submitForm = async () => {
    try {
      await createDataproduct({
        variables: {
          input: {
            name: dataproductName,
            group: team,
            description: valueOrNull(description),
            teamkatalogenURL: valueOrNull(teamkatalogenURL),
            teamContact: valueOrNull(teamContact),
            productAreaID: valueOrNull(productAreaID),
            teamID: valueOrNull(teamID),
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

  const [createDataproduct, { loading, error: backendError }] = useMutation(
    CREATE_DATAPRODUCT,
    {
      onCompleted: (data) => {
          if (createDataset) {
            router.push(
                `/dataproduct/${data.createDataproduct.id}/${data.createDataproduct.slug}/new`
            )
          } else {
            router.push(
                `/dataproduct/${data.createDataproduct.id}/${data.createDataproduct.slug}`
            )
          }
      }
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

  const pii = watch('pii')
  return (
    <div className="mt-8 md:w-[46rem]">
      <Heading level="1" size="large">
        Legg til dataprodukt
      </Heading>
      <form
        className="pt-12 flex flex-col gap-10"
        onSubmit={handleSubmit(submitForm, onError)}
      >
        <TextField
          className="w-full"
          label="Navn på dataprodukt"
          {...register('name')}
          error={errors.name?.message?.toString()}
        />
        <DescriptionEditor
          label="Beskrivelse av hva dataproduktet kan brukes til"
          name="description"
          control={control}
        />
        <Select
          className="w-full"
          label="Velg gruppe fra GCP"
          {...register('team', {
            onChange: () => setValue('teamkatalogenURL', ''),
          })}
          error={errors.team?.message?.toString()}
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
          gcpGroups={[team]}
          register={register}
          watch={watch}
          errors={errors}
          setProductAreaID={setProductAreaID}
          setTeamID={setTeamID}
        />
        <ContactInput register={register} formState={formState} />
        {backendError && <ErrorMessage error={backendError} />}
        <div className="flex flex-row gap-4 mb-16">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Avbryt
          </Button>
          <div className="flex flex-row gap-4">
            <Button
                onClick={() => submitForm()}
                variant="primary"
                size="medium"
            >
                Lagre dataprodukt
            </Button>
            <Button
                onClick={() =>{
                    setCreateDataset(true)
                    submitForm()
                }}
                variant="primary"
                size="medium"
            >
                Lagre dataprodukt og legg til datasett
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
