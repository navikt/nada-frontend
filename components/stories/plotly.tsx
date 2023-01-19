import { usePlotlyViewQuery } from '../../lib/schema/graphql'

//@ts-ignore
import Plot from 'react-plotly.js'
import LoaderSpinner from '../lib/spinner'
import ErrorMessage from '../lib/error'

interface ResultsProps {
  id: string
  draft?: boolean
}

export function Plotly({ id, draft }: ResultsProps) {
  const { data, loading, error } = usePlotlyViewQuery({
    variables: { id, draft },
  })
  if (error) return <ErrorMessage error={error} />
  if (loading || !data) return <LoaderSpinner />
  const spec = JSON.parse(JSON.stringify(data.storyView))
  spec.layout.width = undefined
  spec.layout.autosize = true
  return (
    <div className="w-screen md:w-[70vw] overflow-auto py-4">
      <Plot
        useResizeHandler={true}
        className="w-[90rem] md:w-[70vw]"
        data={spec.data}
        layout={spec.layout}
        frames={spec.frames}
      />
    </div>
  )
}

export default Plotly
