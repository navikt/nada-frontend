import * as React from 'react'
import { Story } from '../../../components/stories/story'
import { useStoryQuery } from '../../../lib/schema/graphql'
import Head from 'next/head'
import { useRouter } from 'next/router'
// import { DraftToolbar } from '../../../components/stories/draftToolbar'


const StoryDraft = () => {
	const router = useRouter()
	const { cid } = router.query
	const id = cid as string
	const story = useStoryQuery({ variables: { id, draft: true } })

	if (!story.data) {
		return <div>Loading...</div>
	}

	return (
		<>
			<Head>
				<title>vis en story</title>
			</Head>
			{/* <DraftToolbar story={story.data?.story} /> */}
			<Story story={story.data?.story!} />
			{/* <DraftToolbar story={story.data?.story} /> */}
		</>
	)
}

export default StoryDraft
