import { Fieldset, Select } from '@navikt/ds-react'
import {
  NewStory,
  StoryQuery,
  usePublishStoryMutation,
} from '../../lib/schema/graphql'
import TopBar from '../lib/topBar'
import TeamkatalogenSelector from '../lib/teamkatalogenSelector'
import StorySelector from '../lib/storySelector'
import RightJustifiedSubmitButton from '../widgets/formSubmit'
import { useRouter } from 'next/router'
import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { storyValidation } from '../../lib/schema/yupValidations'
import { useContext, useEffect, useState } from 'react'
import { UserState } from '../../lib/context'
import TagsSelector from '../lib/tagsSelector'

interface SaveFormProps {
  story: StoryQuery['story']
}

interface FromProps {
  id: string
  keywords: string[]
  target: string | null
  group: string
  teamkatalogenURL: string | null
}

function SaveForm({ story }: SaveFormProps) {
  const userInfo = useContext(UserState)
  const router = useRouter()
  const { register, handleSubmit, formState, watch, control, setValue } =
    useForm({
      resolver: yupResolver(storyValidation),
      defaultValues: {
        id: story.id,
        keywords: [],
        target: null,
        group: '',
        teamkatalogenURL: null,
      } as FromProps,
    })

  const [productAreaID, setProductAreaID] = useState('')
  const [teamID, setTeamID] = useState('')
  const { errors } = formState
  const keywords = watch('keywords')
  const group = watch('group')
  const overwriteStory = useWatch({
    control,
    name: 'target',
  })

  useEffect(() => {
    const story = userInfo?.stories.find((s) => s.id == overwriteStory)
    setValue('keywords', story?.keywords || [])
  }, [overwriteStory, userInfo?.stories, setValue])

  const onDelete = (keyword: string) => {
    setValue(
      'keywords',
      keywords.filter((k: string) => k !== keyword)
    )
  }

  const onAdd = (keyword: string) => {
    keywords
      ? setValue('keywords', [...keywords, keyword])
      : setValue('keywords', [keyword])
  }

  const [publishStory] = usePublishStoryMutation()

  const onSubmit = (requestData: NewStory) => {
    if (requestData.target == '') {
      requestData.target = undefined
    }
    if (
      requestData.target &&
      !confirm(
        'Dette vil overskrive den eksisterende datafortellingen. Er du sikker?'
      )
    ) {
      return
    }
    requestData.productAreaID = productAreaID
    requestData.teamID = teamID
    publishStory({
      refetchQueries: ['searchContent'],
      variables: {
        input: requestData,
      },
    })
      .then((published) => {
        if (published.errors) {
          console.log(published.errors)
        }
        if (published.data) {
          router.push(`/story/${published.data?.publishStory.id}`)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="w-[48rem] my-0 mx-auto mt-10">
      <div className="border border-border rounded">
        <TopBar name={`Lagre ${story.name}`} type={story.__typename} />
        <div className="p-1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset legend={''}>
              <Select
                className="w-full 2xl:w-[32rem]"
                label="Velg gruppe fra GCP"
                {...register('group', {
                  onChange: () => setValue('teamkatalogenURL', ''),
                })}
                error={errors.group?.message}
              >
                <option value="">Velg gruppe</option>
                {[
                  ...new Set(
                    userInfo?.gcpProjects.map(
                      ({ group }: { group: { name: string } }) => (
                        <option
                          value={
                            userInfo?.groups.filter(
                              (g) => g.name === group.name
                            )[0].email
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
              {group && (
                <TeamkatalogenSelector
                  gcpGroup={group}
                  register={register}
                  watch={watch}
                  errors={errors}
                  setProductAreaID={setProductAreaID}
                  setTeamID={setTeamID}
                />
              )}
              <StorySelector register={register} group={group} />
              <TagsSelector
                onAdd={onAdd}
                onDelete={onDelete}
                tags={keywords || []}
              />
              <RightJustifiedSubmitButton
                onCancel={() => router.push(`/story/draft/${story.id}`)}
              />
            </Fieldset>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SaveForm
