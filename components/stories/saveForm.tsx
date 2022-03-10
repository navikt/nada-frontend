import { Fieldset } from '@navikt/ds-react'
import styled from "styled-components"
import { StoryQuery, usePublishStoryMutation, useUpdateStoryMutation } from "../../lib/schema/graphql"
import TopBar from '../lib/topBar'
import TeamSelector from '../lib/teamSelector'
import StorySelector from '../lib/storySelector'
import RightJustifiedSubmitButton from '../widgets/formSubmit'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { storyValidation } from '../../lib/schema/yupValidations'
import KeywordsInput from "../lib/KeywordsInput";


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

function SaveForm({ story }: SaveFormProps) {
    const router = useRouter()
    const { register, handleSubmit, formState, watch, setValue } =
        useForm({
            resolver: yupResolver(storyValidation),
            defaultValues: {
                name: story.name,
                keywords: [] as string[],
            },
        })

    const { errors } = formState
    const keywords = watch('keywords')

    const onDelete = (keyword: string) => {
        setValue('keywords', keywords.filter((k: string) => k !== keyword))
    }

    const onAdd = (keyword: string) => {
        keywords ?
            setValue('keywords', [...keywords, keyword]) :
            setValue('keywords', [keyword])
    }

    const [publishStory] = usePublishStoryMutation()
    const [updateStory] = useUpdateStoryMutation()

    const onSubmit = (requestData: any) => {
        if (requestData.story) {
            updateStory({
                variables: {
                    id: story.id,
                    target: requestData.story
                }
            }).then((published) => {
                if (published.errors) {
                    console.log(published.errors)
                }
                if (published.data) {
                    router.push(`/story/${published.data?.updateStory.id}`)
                }
            }).catch((error) => {
                console.log(error)
            })
        } else {
            publishStory({
                variables: {
                    id: story.id,
                    group: requestData.group,
                    keywords
                },
            }).then((published) => {
                if (published.errors) {
                    console.log(published.errors)
                }
                if (published.data) {
                    router.push(`/story/${published.data?.publishStory.id}`)
                }
            }).catch((error) => {
                console.log(error)
            })
        }
    }

    return (
        <Container>
            <DataproductBox>
                <TopBar name={`Lagre ${story.name}`} type={story.__typename} />
                <DataproductBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Fieldset legend={''}>
                            <TeamSelector register={register} errors={errors} />
                            <KeywordsInput
                                onAdd={onAdd}
                                onDelete={onDelete}
                                keywords={keywords || []}
                                error={errors.keywords?.[0].message}
                            />
                            <StorySelector register={register} />
                            <RightJustifiedSubmitButton
                                onCancel={() => router.push(`/story/draft/${story.id}`)}
                            />
                        </Fieldset>
                    </form>
                </DataproductBody>
            </DataproductBox>
        </Container>
    )
}

export default SaveForm
