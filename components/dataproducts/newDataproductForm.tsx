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
    defaultValues: {  
        name: undefined,
        description: '',
        team: '',
        teamContact: null,
        teamkatalogenURL: undefined,
    }
  })

  const { errors } = formState
  const dataproductName = watch('name')
  const description = watch('description')
  const team = watch('team')
  const teamkatalogenURL = watch('teamkatalogenURL')
  const teamContact = watch('teamContact')

  const valueOrNull = (val: string | undefined | null) => (typeof val === 'string' && val !== '' ? val : null)

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
            router.push(
                `/dataproduct/${data.createDataproduct.id}/${data.createDataproduct.slug}`
            )
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

  const gcpProjects = userInfo?.gcpProjects as any[] || []
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
              gcpProjects.map(
                ({ group }: { group: { name: string } }) => (
                  <option
                    value={
                      userInfo?.googleGroups.filter((g:any) => g.Name === group.name)[0]
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
                variant="primary"
                size="medium"
            >
                Lagre dataprodukt
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
