import { StoryViewVega, useVegaViewQuery } from '../../lib/schema/graphql'
import { VegaLite, Vega } from 'react-vega'

import LoaderSpinner from '../lib/spinner'
import ErrorMessage from '../lib/error'

interface ResultsProps {
  id: string
}

export function VegaView({ id }: ResultsProps) {
  const { data, loading, error } = useVegaViewQuery({
    variables: { id },
  })
  if (error) return <ErrorMessage error={error} />
  if (loading || !data) return <LoaderSpinner />
  const storyViews = data.storyView as StoryViewVega

  let storyView = JSON.parse(JSON.stringify(storyViews.spec))
  storyView.width = 'container'
  if (storyView.$schema?.includes('vega-lite')) {
    return (
      <div className="w-screen md:w-[70vw] overflow-auto py-4">
        <VegaLite
        className="w-[90rem] md:w-[70vw]"
          config={{
            autosize: { type: 'fit', contains: 'padding', resize: true },
            projection: { type: 'mercator' },
          }}
          spec={storyView}
        />
      </div>
    )
  }
  return (
    <div className="w-screen md:w-[70vw] overflow-auto py-4">
    <Vega
      className="w-[90rem] md:w-[70vw]"
      spec={storyView}
      config={{ autosize: { type: 'fit', contains: 'padding', resize: true } }}
    />
    </div>
  )
}

export default VegaView
