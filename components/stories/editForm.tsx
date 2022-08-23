import { Fieldset } from '@navikt/ds-react'
import styled from 'styled-components'
import {
  StoryQuery,
  useUpdateStoryMetadataMutation,
} from '../../lib/schema/graphql'
import TopBar from '../lib/topBar'
import RightJustifiedSubmitButton from '../widgets/formSubmit'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import KeywordsInput from '../lib/KeywordsInput'
import TeamkatalogenSelector from '../lib/teamkatalogenSelector'
import { StoryDocument } from '../../lib/schema/graphql'

const Container = styled.div`
  width: 768px;
  margin: 0 auto;
  margin-top: 40px;
`

const DataproductBox = styled.div`
  border-radius: 5px;
  border: 1px solid black;
`

const DataproductBody = styled.div`
  padding: 1em 1em 2em 1em;
`

interface SaveFormProps {
  story: StoryQuery['story']
}

function EditForm({ story }: SaveFormProps) {
  const router = useRouter()
  const { register, handleSubmit, formState, watch, setValue } = useForm({
    defaultValues: {
      keywords: story.keywords,
      teamkatalogenURL: story.owner.teamkatalogenURL,
    },
  })

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
    <Container>
      <DataproductBox>
        <TopBar name={`Lagre ${story.name}`} type={story.__typename} />
        <DataproductBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset legend={''}>
              <TeamkatalogenSelector
                group={story.owner.group}
                register={register}
                errors={errors}
                watch={watch}
              />
              <KeywordsInput
                onAdd={onAdd}
                onDelete={onDelete}
                keywords={keywords || []}
                error={errors.keywords?.[0].message}
              />
              <RightJustifiedSubmitButton
                onCancel={() => router.push(`/story/${story.id}`)}
              />
            </Fieldset>
          </form>
        </DataproductBody>
      </DataproductBox>
    </Container>
  )
}

export default EditForm
