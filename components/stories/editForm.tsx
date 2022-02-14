import {Fieldset} from '@navikt/ds-react'
import styled from "styled-components"
import {StoryQuery, useUpdateStoryMetadataMutation} from "../../lib/schema/graphql"
import TopBar from '../lib/topBar'
import RightJustifiedSubmitButton from '../widgets/formSubmit'
import {useRouter} from 'next/router'
import {useForm} from 'react-hook-form'
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

function EditForm({story}: SaveFormProps) {
    const router = useRouter()
    const {handleSubmit, formState, watch, setValue} =
        useForm({
            defaultValues: {
                keywords: story.keywords
            },
        })

    const {errors} = formState
    const keywords = watch('keywords')

    const onDelete = (keyword: string) => {
        setValue('keywords', keywords.filter((k: string) => k !== keyword))
    }

    const onAdd = (keyword: string) => {
        keywords ?
            setValue('keywords', [...keywords, keyword]) :
            setValue('keywords', [keyword])
    }

    const [updateStoryMetadata] = useUpdateStoryMetadataMutation()

    const onSubmit = (requestData: any) => {
        updateStoryMetadata({
            refetchQueries: ["searchContent", "Story"],
            variables: {
                id: story.id,
                name: story.name,
                keywords
            },
        }).then((published: any) => {
            if (published.errors) {
                console.log(published.errors)
            }
            if (published.data) {
                router.push(`/story/${published.data?.updateStoryMetadata.id}`)
            }
        }).catch((error: Error) => {
            console.log(error)
        })

    }

    return (
        <Container>
            <DataproductBox>
                <TopBar name={`Lagre ${story.name}`} type={story.__typename}/>
                <DataproductBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Fieldset legend={''}>
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

export default EditForm