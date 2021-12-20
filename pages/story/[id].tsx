import * as React from 'react'
import { Story } from '../../components/stories/story'
import { useStoryQuery } from '../../lib/schema/graphql'
import Head from 'next/head'
import { useRouter } from 'next/router'

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
			<Story story={story} />
		</>
	)
}

export default StoryPage
