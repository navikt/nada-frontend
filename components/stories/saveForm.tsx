import { Fieldset } from '@navikt/ds-react'
import styled from "styled-components"
import { StoryQuery, usePublishStoryMutation } from "../../lib/schema/graphql"
import TopBar from '../lib/topBar'
import TeamSelector from '../lib/teamSelector'
import StorySelector from '../lib/storySelector'
import RightJustifiedSubmitButton from '../widgets/formSubmit'
import { useRouter } from 'next/router'
import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { storyValidation } from '../../lib/schema/yupValidations'
import KeywordsInput from "../lib/KeywordsInput";
import { useContext, useEffect } from 'react'
import { UserState } from '../../lib/context'


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

interface FromProps {
    name: string
    keywords: string[]
    story: string | null
    group: string
}

function SaveForm({ story }: SaveFormProps) {
    const userInfo = useContext(UserState)
    const router = useRouter()
    const { register, handleSubmit, formState, watch, control, setValue } =
        useForm({
            resolver: yupResolver(storyValidation),
            defaultValues: {
                name: story.name,
                keywords: [],
                story: null,
                group: "",
            } as FromProps,
        })

    const { errors } = formState
    const keywords = watch('keywords')
    const group = watch('group')
    const overwriteStory = useWatch({
        control,
        name: 'story'
    });

    useEffect(() => {
        const story = userInfo?.stories.find(s => s.id == overwriteStory)
        setValue('keywords', story?.keywords || [])
    }, [overwriteStory])

    const onDelete = (keyword: string) => {
        setValue('keywords', keywords.filter((k: string) => k !== keyword))
    }

    const onAdd = (keyword: string) => {
        keywords ?
            setValue('keywords', [...keywords, keyword]) :
            setValue('keywords', [keyword])
    }

    const [publishStory] = usePublishStoryMutation()

    const onSubmit = (requestData: any) => {
        if (requestData.story && !confirm("This will overwrite existing story. Are you sure?")) {
            return
        }
        publishStory({
            refetchQueries: ["searchContent", "Story"],
            variables: {
                id: story.id,
                target: requestData.story ? requestData.story : null,
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

    return (
        <Container>
            <DataproductBox>
                <TopBar name={`Lagre ${story.name}`} type={story.__typename} />
                <DataproductBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Fieldset legend={''}>
                            <TeamSelector register={register} errors={errors} />
                            <StorySelector register={register} group={group} />
                            <KeywordsInput
                                onAdd={onAdd}
                                onDelete={onDelete}
                                keywords={keywords || []}
                                error={errors.keywords?.[0].message}
                            />
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
