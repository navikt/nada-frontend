import * as React from 'react'
import { Story } from '../../../../components/stories/story'
import { useStoryQuery } from '../../../../lib/schema/graphql'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { DraftToolbar } from '../../../../components/stories/draftToolbar'
import ErrorMessage from '../../../../components/lib/error'
import LoaderSpinner from '../../../../components/lib/spinner'
import styled from 'styled-components'

const Container = styled.div`
  margin-top: 50px;
  gap: 20px;
`

const StoryDraft = () => {
  const router = useRouter()
  const id = router.query.id as string
  const { data, error, loading } = useStoryQuery({
    variables: { id, draft: true },
  })

  if (error) return <ErrorMessage error={error} />
  if (loading || !data) return <LoaderSpinner />

  const story = data.story

  return (
    <>
      <Head>
        <title>Kladd - {story.name}</title>
      </Head>
      <DraftToolbar
        onSave={() => router.push(`/story/draft/${story.id}/save`)}
      />
      <Container>
        <Story story={story} draft={true} />
      </Container>
    </>
  )
}

export default StoryDraft
