import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, useForm } from 'react-hook-form'
import ErrorMessage from '../lib/error'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import TeamkatalogenSelector from '../lib/teamkatalogenSelector'
import DescriptionEditor from '../lib/DescriptionEditor'
import {
  Button,
  Heading,
  TextField,
  Select,
} from '@navikt/ds-react'
import amplitudeLog from '../../lib/amplitude'
import * as yup from 'yup'
import { useContext, useState } from 'react'
import TagsSelector from '../lib/tagsSelector'
import {UserState} from "../../lib/context";
import { UPDATE_QUARTOSTORY_METADATA } from '../../lib/queries/story/updateQuartoStory'
import { useUpdateQuartoStoryMetadataMutation } from '../../lib/schema/graphql'
import { USER_INFO } from '../../lib/queries/userInfo/userInfo'

const schema = yup.object().shape({
  name: yup.string().nullable().required('Skriv inn navnet på datafortellingen'),
  description: yup.string(),
  teamkatalogenURL: yup.string().required('Du må velge team i teamkatalogen'),
  keywords: yup.array().of(yup.string()),
  group: yup.string(),
})


export interface EditQuartoStoryMetadataFields {
  id: string
  name: string
  description: string
  keywords: string[]
  teamkatalogenURL: string
  group: string
}

export const EditQuartoStoryMetadataForm = ({id, name, description, keywords, teamkatalogenURL, group}: EditQuartoStoryMetadataFields) => {
  const router = useRouter()
  const [productAreaID, setProductAreaID] = useState<string>('')
  const [teamID, setTeamID] = useState<string>('')
  const userInfo = useContext(UserState)
  const [updateQuartoQuery, {loading, error}] = useUpdateQuartoStoryMetadataMutation()
  const {
    register,
    handleSubmit,
    watch,
    formState,
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: name,
      description: description,
      keywords: keywords,
      teamkatalogenURL: teamkatalogenURL,
      group: group,
    },
  })

  const { errors } = formState
  const kw = watch('keywords')
  
  const onDeleteKeyword = (keyword: string) => {
    setValue(
      'keywords',
      kw.filter((k: string) => k !== keyword)
    )
  }

  const onAddKeyword = (keyword: string) => {
    kw
      ? setValue('keywords', [...kw, keyword])
      : setValue('keywords', [keyword])
  }

  const valueOrNull = (val: string) => (val == '' ? null : val)

  const onSubmit = async (data: any) => {
    const editQuartoData = {
      variables: {
        id: id,
        name: data.name,
        description: data.description,
        keywords: data.keywords,
        teamkatalogenURL: data.teamkatalogenURL,
        productAreaID: productAreaID,
        teamID: teamID,
        group: data.group,
        },
      refetchQueries:[
        {
            query: USER_INFO,
        }
      ]
    }

    updateQuartoQuery(editQuartoData).then(()=>{
      amplitudeLog('skjema fullført', { skjemanavn: 'endre-datafortelling' })
      router.back()
    }).catch(e=>{
      console.log(e)
      amplitudeLog('skjemainnsending feilet', {
        skjemanavn: 'endre-datafortelling',
      })
    })
  }

  const onCancel = () => {
      amplitudeLog('Klikker på: Avbryt',
      {
        pageName: 'endre-datafortelling',
      })
      router.back()
  }

  const onError = (errors: any) => {
    amplitudeLog('skjemavalidering feilet', {
      skjemanavn: 'endre-datafortelling',
      feilmeldinger: Object.keys(errors)
        .map((errorKey) => errorKey)
        .join(','),
    })
  }


  return (
    <div className="mt-8 md:w-[46rem]">
      <Heading level="1" size="large">
        Legg til datafortelling
      </Heading>
      <form
        className="pt-12 flex flex-col gap-10"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <TextField
          className="w-full"
          label="Navn på datafortelling"
          {...register('name')}
          error={errors.name?.message?.toString()}
        />
        <DescriptionEditor
          label="Beskrivelse av hva datafortellingen kan brukes til"
          name="description"
          control={control}
        />
        <Select
          className="w-full"
          label="Velg gruppe fra GCP"
          {...register('group', {
            onChange: () => setValue('teamkatalogenURL', ''),
          })}
          error={errors.group?.message?.toString()}
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
          gcpGroups={userInfo?.gcpProjects.map(it=> it.group.email)}
          register={register}
          watch={watch}
          errors={errors}
          setProductAreaID={setProductAreaID}
          setTeamID={setTeamID}
        />
        <TagsSelector
            onAdd={onAddKeyword}
            onDelete={onDeleteKeyword}
            tags={kw || []}
        />
        {error && <ErrorMessage error={error} />}
        <div className="flex flex-row gap-4 mb-16">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Avbryt
          </Button>
          <Button type="submit" disabled={loading}>Lagre</Button>
        </div>
      </form>
    </div>
  )
}