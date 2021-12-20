import * as React from 'react'
import { Story } from '../../../../components/stories/story'
import { useStoryQuery } from '../../../../lib/schema/graphql'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { DraftToolbar } from '../../../../components/stories/draftToolbar'
import SaveForm from '../../../../components/stories/saveForm'


const StoryDraft = () => {
	const router = useRouter()
	const id = router.query.id as string
	const query = useStoryQuery({ variables: { id, draft: true } })

	if (!query.data) {
		return <div>Loading...</div>
	}
	const story = query.data.story

	return (
		<>
			<Head>
				<title>Lagre {story.name}</title>
			</Head>
			<SaveForm story={story} />
		</>
	)
}

export default StoryDraft
