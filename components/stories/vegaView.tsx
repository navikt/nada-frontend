import {StoryViewVega, useVegaViewQuery} from '../../lib/schema/graphql'
import VisualizationSpec, {VegaLite, Vega } from 'react-vega'

//@ts-ignore
import Plot from 'react-plotly.js';
import LoaderSpinner from "../lib/spinner";
import ErrorMessage from "../lib/error";


interface ResultsProps {
    id: string
    draft: boolean
}


export function VegaView({ id, draft }: ResultsProps) {
    const { data, loading, error } = useVegaViewQuery({ variables: { id, draft } })
    if (error) return <ErrorMessage error={error} />
    if (loading || !data) return <LoaderSpinner />
    const storyViews = data.storyView as StoryViewVega

    let storyView = JSON.parse(JSON.stringify(storyViews.spec))
    storyView.width = "container"
    if (storyView.$schema?.includes("vega-lite")) {
        return <VegaLite style={{width: "100%", height: "100%"}} config={{autosize:{type: 'fit', contains: "padding", resize: true}, projection: {type: 'mercator'}}} spec={storyView} />
    }
    return <Vega style={{width: "100%", height: "100%"}} spec={storyView} config={{autosize:{type: 'fit', contains: "padding", resize: true}}}/>
}

export default VegaView
