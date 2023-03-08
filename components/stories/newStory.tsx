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
import { ChangeEvent, useContext, useState } from 'react'
import TagsSelector from '../lib/tagsSelector'
import {UserState} from "../../lib/context";
import { CREATE_QUARTO_STORY } from '../../lib/queries/story/createQuartoStory'


const defaultValues: FieldValues = {
  name: null,
  description: '',
  teamkatalogenURL: '',
  keywords: [] as string[]
}

const schema = yup.object().shape({
  name: yup.string().nullable().required('Skriv inn navnet på datafortellingen'),
  description: yup.string(),
  teamkatalogenURL: yup.string().required('Du må velge team i teamkatalogen'),
  keywords: yup.array().of(yup.string())
})


export interface NewStoryFields {
  name: string
  description: string
  teamkatalogenURL: string
  keywords: string[]
}

export const NewStoryForm = () => {
  const router = useRouter()
  const [productAreaID, setProductAreaID] = useState<string>('')
  const [teamID, setTeamID] = useState<string>('')
  const userInfo = useContext(UserState)
  const [quartoFile, setQuartoFile] = useState<File | undefined | null>(undefined);
  
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
      setQuartoFile(event.target.files?.item(0))
  }

  const {
    register,
    handleSubmit,
    watch,
    formState,
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
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

  const onSubmit = async (data: any) => {
    const uploadData = {
      variables: {
        file: quartoFile,
        input: {
          name: data.name,
          description: valueOrNull(data.description),
          keywords: data.keywords,
          teamkatalogenUrl: data.teamkatalogenUrl,
          productAreaID: productAreaID,
          teamID: teamID,
          group: data.group,
        },
      },
      refetchQueries: ['searchContent'],
    }

    console.log(uploadData)
    try {
      await createStory(uploadData)
      amplitudeLog('skjema fullført', { skjemanavn: 'ny-datafortelling' })
    } catch (e) {
      amplitudeLog('skjemainnsending feilet', {
        skjemanavn: 'ny-datafortelling',
      })
      console.log(e)
    }
  }

  const [createStory, { loading, error: backendError }] = useMutation(
      CREATE_QUARTO_STORY,
      {
        onCompleted: (data) =>{
          console.log(data)
            router.push(
                `/`
            )
        }
,      }
  )

  const onCancel = () => {
    amplitudeLog(
      'Klikker på: Avbryt',
      {
        pageName: 'ny-datafortelling',
      },
      () => {
        router.back()
      }
    )
  }

  const onError = (errors: any) => {
    amplitudeLog('skjemavalidering feilet', {
      skjemanavn: 'ny-datafortelling',
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
            tags={keywords || []}
        />
        <input type="file" onChange={handleFileUpload}/>
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
