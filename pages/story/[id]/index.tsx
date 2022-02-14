import * as React from 'react'
import {Story} from '../../../components/stories/story'
import {Group, StoryQuery, useDeleteStoryMutation, useStoryQuery} from '../../../lib/schema/graphql'
import Head from 'next/head'
import {useRouter} from 'next/router'
import styled from "styled-components";
import ErrorMessage from "../../../components/lib/error";
import LoaderSpinner from "../../../components/lib/spinner";
import {MetadataTable} from "../../../components/stories/metadataTable";
import DeleteModal from "../../../components/lib/deleteModal";
import TokenModal from "../../../components/lib/tokenModal";
import {useContext, useState} from "react";
import {UserState} from "../../../lib/context";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 50px;
  gap: 20px;
`
const MainPage = styled.div`
  flex-grow: 1;
`

const StoryPage = () => {
    const router = useRouter()
    const id = router.query.id as string
    const userInfo = useContext(UserState)
    const query = useStoryQuery({variables: {id}})
    const [deleteStory] = useDeleteStoryMutation({
        variables: {id},
        awaitRefetchQueries: true,
        refetchQueries: ['searchContent'],
    })



    const [showDelete, setShowDelete] = useState(false)
    const [showToken, setShowToken] = useState(false)
    const [deleteError, setDeleteError] = useState('')

    if (query.error) return <ErrorMessage error={query.error}/>
    if (query.loading || !query.data) return <LoaderSpinner/>
    const story = query.data.story
    const isOwner = userInfo?.groups.some((g: Group) => g.email === story?.owner?.group) || false


    const onDelete = async () => {
        try {
            await deleteStory()
            await router.push('/')
        } catch (e: any) {
            setDeleteError(e.toString())
        }
    }

    return (
        <>
            <Head>
                <title>{story.name}</title>
            </Head>
            <Container>
                <MainPage>
                    <Story story={story}/>
                </MainPage>
                <MetadataTable created={story.created} lastModified={story.lastModified} owner={story.owner}
                               setShowDelete={setShowDelete} setShowToken={setShowToken} isOwner={isOwner} keywords={story.keywords}/>
            </Container>
            <DeleteModal
                open={showDelete}
                onCancel={() => setShowDelete(false)}
                onConfirm={() => onDelete()}
                name={story.name}
                error={deleteError}
            />
            <TokenModal
                open={showToken}
                onCancel={() => setShowToken(false)}
                id={story.id}
            />
        </>
    )
}

export default StoryPage
