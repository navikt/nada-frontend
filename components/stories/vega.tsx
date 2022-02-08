import {StoryViewVega, useVegaViewQuery} from '../../lib/schema/graphql'
import VisualizationSpec, { VegaLite} from 'react-vega'

//@ts-ignore
import Plot from 'react-plotly.js';
import LoaderSpinner from "../lib/spinner";
import ErrorMessage from "../lib/error";


interface ResultsProps {
    id: string
    draft: boolean
}


export function  Vega({ id, draft }: ResultsProps) {
    const { data, loading, error } = useVegaViewQuery({ variables: { id, draft } })
    if (error) return <ErrorMessage error={error} />
    if (loading || !data) return <LoaderSpinner />
    const storyViews = data.storyView as StoryViewVega


    let storyView = JSON.parse(JSON.stringify(storyViews.spec)) as VisualizationSpec.VisualizationSpec
    if (storyView.$schema?.includes("vega-lite")) {
        return <VegaLite config={{autosize:{type: 'fit', resize: true}, projection: {type: 'mercator'}}} spec={storyView} />
    }
    return <Vega id={""} draft={true}/>
}

export default Vega
