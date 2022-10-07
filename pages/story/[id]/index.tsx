import * as React from 'react'
import { Story } from '../../../components/stories/story'
import {
  Group,
  useDeleteStoryMutation,
  useStoryQuery,
} from '../../../lib/schema/graphql'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorMessage from '../../../components/lib/error'
import LoaderSpinner from '../../../components/lib/spinner'
import DeleteModal from '../../../components/lib/deleteModal'
import TokenModal from '../../../components/lib/tokenModal'
import { useContext, useState } from 'react'
import { UserState } from '../../../lib/context'
import amplitudeLog from '../../../lib/amplitude'
import InnerContainer from '../../../components/lib/innerContainer'

const StoryPage = () => {
  const router = useRouter()
  const id = router.query.id as string
  const userInfo = useContext(UserState)
  const query = useStoryQuery({ variables: { id } })
  const [deleteStory] = useDeleteStoryMutation({
    variables: { id },
    awaitRefetchQueries: true,
    refetchQueries: ['searchContent'],
  })

  const [showDelete, setShowDelete] = useState(false)
  const [showToken, setShowToken] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  React.useEffect(() => {
    if(!query.loading && query.data){
      const eventProperties = {
        sidetittel: 'datafortelling',
        title: query.data?.story.name,
      }
      amplitudeLog('sidevisning', eventProperties)
    }
  })

  if (query.error) return <ErrorMessage error={query.error} />
  if (query.loading || !query.data) return <LoaderSpinner />
  const story = query.data.story
  const isOwner =
    userInfo?.groups.some((g: Group) => g.email === story?.owner?.group) ||
    false

  const onDelete = async () => {
    try {
      await deleteStory()
      await router.push('/')
    } catch (e: any) {
      setDeleteError(e.toString())
    }
  }

  return (
    <InnerContainer>
      <Head>
        <title>{story.name}</title>
      </Head>
      <div className="mt-[50px] gap-5">
        <Story
          story={story}
          setShowDelete={setShowDelete}
          setShowToken={setShowToken}
          isOwner={isOwner}
        />
      </div>
      <DeleteModal
        open={showDelete}
        onCancel={() => setShowDelete(false)}
        onConfirm={() => onDelete()}
        name={story.name}
        error={deleteError}
        resource="dataprodukt"
      />
      <TokenModal
        open={showToken}
        onCancel={() => setShowToken(false)}
        id={story.id}
      />
    </InnerContainer>
  )
}

export default StoryPage
