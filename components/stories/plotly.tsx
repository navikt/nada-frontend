import {usePlotlyViewQuery} from '../../lib/schema/graphql'

//@ts-ignore
import Plot from 'react-plotly.js';
import LoaderSpinner from "../lib/spinner";
import ErrorMessage from "../lib/error";


interface ResultsProps {
    id: string
    draft?: boolean
}

export function Plotly({id, draft}: ResultsProps) {
    const {data, loading, error} = usePlotlyViewQuery({variables: {id, draft}})
    if (error) return <ErrorMessage error={error}/>
    if (loading || !data) return <LoaderSpinner/>
    const spec = JSON.parse(JSON.stringify(data.storyView))
    spec.layout.width = undefined
    spec.layout.autosize = true
    return (
        <div><Plot useResizeHandler={true} style={{width:"100%", height:"100%"}} data={spec.data} layout={spec.layout} frames={spec.frames}/></div>
    )
}

export default Plotly
