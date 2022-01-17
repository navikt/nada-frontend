import * as React from 'react'
import { Story } from '../../components/stories/story'
import { useStoryQuery } from '../../lib/schema/graphql'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styled from "styled-components";
import BackButton from "../../components/lib/BackButton";

const Container = styled.div`
  margin-top: 40px;
`

const StoryContainer = styled.div`
  border-radius: 5px;
  border: 1px solid black;
`
const StoryPage = () => {
	const router = useRouter()
	const id = router.query.id as string
	const query = useStoryQuery({ variables: { id } })

	if (!query.data) {
		return <div>Loading...</div>
	}
	const story = query.data.story

	return (
		<>
			<Head>
				<title>{story.name}</title>
			</Head>
			<Container>
				<BackButton onClick={() => router.push('/')} />
				<StoryContainer>
					<Story story={story} draft={false}/>
				</StoryContainer>
			</Container>
		</>
	)
}

export default StoryPage
