import * as React from 'react'
import { useStoryQuery } from '../../../lib/schema/graphql'
import Head from 'next/head'
import { useRouter } from 'next/router'
import EditForm from '../../../components/stories/editForm'
import ErrorMessage from '../../../components/lib/error'
import LoaderSpinner from '../../../components/lib/spinner'

const StoryDraft = () => {
  const router = useRouter()
  const id = router.query.id as string
  const { data, error, loading } = useStoryQuery({ variables: { id } })

  if (error) return <ErrorMessage error={error} />
  if (loading || !data) return <LoaderSpinner />

  const story = data.story

  return (
    <>
      <Head>
        <title>Lagre {story.name}</title>
      </Head>
      <EditForm story={story} />
    </>
  )
}

export default StoryDraft
