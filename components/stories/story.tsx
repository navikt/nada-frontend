import styled from 'styled-components'
import {InView} from 'react-intersection-observer'
import {
    StoryQuery,
    StoryViewHeader,
    StoryViewMarkdown,
    StoryViewPlotly,
} from '../../lib/schema/graphql'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Header from './header'

//@ts-ignore
import Plot from 'react-plotly.js';
import Plotly from "./plotly";
import LoaderSpinner from "../lib/spinner";
import TopBar from "../lib/topBar";
import * as React from "react";
import Vega from "./vegaView";

const StoryDiv = styled.div`
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  > * {
    width: 100%;
  }
`

interface ResultsProps {
    story: StoryQuery['story']
    draft?: boolean
}

export function Story({story, draft}: ResultsProps) {
    const views = story.views as StoryQuery['story']['views']

    return (
        <>
                <TopBar type={'Story'} name={story.name}/>
                <StoryDiv>
                    {views.map((view, id) => {
                        if (view.__typename === 'StoryViewHeader') {
                            return <Header key={id} text={view.content} size={view.level}/>
                        }
                        if (view.__typename === 'StoryViewMarkdown') {
                            return <ReactMarkdown key={id} remarkPlugins={[remarkGfm]}>
                                {view.content}
                            </ReactMarkdown>
                        }
                        if (view.__typename === 'StoryViewPlotly') {
                            return (
                                <InView key={id} triggerOnce={true}>
                                    {
                                        ({inView, ref}) => {
                                            return inView ?
                                                <div ref={ref}><Plotly id={view.id} draft={draft}/></div> :
                                                <div ref={ref}><LoaderSpinner/></div>
                                        }
                                    }
                                </InView>)
                        }
                        if (view.__typename === 'StoryViewVega') {
                            return (
                                <InView key={id} triggerOnce={true}>
                                    {
                                        ({inView, ref}) => {
                                            return inView ?
                                                <div ref={ref}><Vega id={view.id} draft={draft!!}/></div> :
                                                <div ref={ref}><LoaderSpinner/></div>
                                        }
                                    }
                                </InView>)
                        }

                    })}
                </StoryDiv>
        </>
    )
}

export default Story
