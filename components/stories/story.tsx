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
import TopBar, {TopBarActions} from "../lib/topBar";
import * as React from "react";
import Vega from "./vegaView";
import Link from 'next/link'
import {Dispatch, SetStateAction} from "react";
import {navRod} from "../../styles/constants";

const StoryDiv = styled.div`
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  padding: 0 1em;
  > * {
    width: 100%;
  }
`

interface StoryProps {
    isOwner?: boolean;
    story: StoryQuery['story']
    draft?: boolean,
    setShowDelete?: Dispatch<SetStateAction<boolean>>
    setShowToken?: Dispatch<SetStateAction<boolean>>
}

export function Story({story, draft, isOwner, setShowDelete, setShowToken,}: StoryProps) {
    const views = story.views as StoryQuery['story']['views']

    return (
        <>
            <TopBar type={'Story'} name={story.name}>
                {!draft && isOwner &&
                    <TopBarActions>
                        <Link href={`/story/${story.id}/edit`}><a>Endre</a></Link>
                        <a onClick={() => setShowToken && setShowToken(true)}>Vis token</a>
                        <a onClick={() => setShowDelete && setShowDelete(true)} style={{color: navRod}}>Slett</a>
                    </TopBarActions>
                }
            </TopBar>
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
