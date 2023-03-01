import { Fieldset } from '@navikt/ds-react'
import {
  StoryQuery,
  useUpdateStoryMetadataMutation,
} from '../../lib/schema/graphql'
import TopBar from '../lib/topBar'
import RightJustifiedSubmitButton from '../widgets/formSubmit'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import TeamkatalogenSelector from '../lib/teamkatalogenSelector'
import { StoryDocument } from '../../lib/schema/graphql'
import { useState } from 'react'
import { editStoryValidation } from '../../lib/schema/yupValidations'
import { yupResolver } from '@hookform/resolvers/yup'
import TagsSelector from '../lib/tagsSelector'

interface SaveFormProps {
  story: StoryQuery['story']
}

function EditForm({ story }: SaveFormProps) {
  const router = useRouter()
  const { register, handleSubmit, formState, watch, setValue } = useForm({
    resolver: yupResolver(editStoryValidation),
    defaultValues: {
      keywords: story.keywords,
      teamkatalogenURL: story.owner.teamkatalogenURL,
    },
  })
  const [productAreaID, setProductAreaID] = useState('')
  const [teamID, setTeamID] = useState('')

  const { errors } = formState
  const keywords = watch('keywords')

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

  const [updateStoryMetadata] = useUpdateStoryMetadataMutation()

  const onSubmit = (requestData: any) => {
    updateStoryMetadata({
      refetchQueries: [
        'searchContent',
        {
          query: StoryDocument,
          variables: { id: story.id },
        },
      ],
      variables: {
        id: story.id,
        name: story.name,
        keywords,
        teamkatalogenURL: requestData.teamkatalogenURL,
        productAreaID: productAreaID,
        teamID: teamID,
      },
    })
      .then((published: any) => {
        if (published.errors) {
          console.log(published.errors)
        }
        if (published.data) {
          router.push(`/story/${published.data?.updateStoryMetadata.id}`)
        }
      })
      .catch((error: Error) => {
        console.log(error)
      })
  }

  return (
    <div className="max-w-3xl">
        <TopBar name={`Lagre ${story.name}`} type={story.__typename} />
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset legend={''}>
              <TeamkatalogenSelector
                gcpGroups={[story.owner.group]}
                register={register}
                watch={watch}
                errors={errors}
                setProductAreaID={setProductAreaID}
                setTeamID={setTeamID}
              />
              <TagsSelector 
                onAdd= {onAdd}
                onDelete= {onDelete}
                tags = {keywords || []}
              />
              <RightJustifiedSubmitButton
                onCancel={() => router.push(`/story/${story.id}`)}
              />
            </Fieldset>
          </form>
        </div>
    </div>
  )
}

export default EditForm
