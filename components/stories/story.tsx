import styled from 'styled-components'
import {InView} from 'react-intersection-observer'
import {Group, Story, StoryQuery, StoryViewHeader, StoryViewMarkdown, StoryViewPlotly} from '../../lib/schema/graphql'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Header from './header'

//@ts-ignore
import Plot from 'react-plotly.js';
import Plotly from "./plotly";
import LoaderSpinner from "../lib/spinner";
import TopBar from "../lib/topBar";
import {Name} from "../lib/detailTypography";
import EditMenu, {MenuItem} from "../lib/editMenu";
import * as React from "react";
import {useContext, useState} from "react";
import {UserState} from "../../lib/context";
import {useRouter} from "next/router";
import DeleteModal from "../lib/deleteModal";
import TokenModal from "../lib/tokenModal";
import {MetadataTable} from "./metadataTable";
import Vega from "./vega";

const StoryDiv = styled.div`
  padding: 10px;
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  > * {
    width: 100%;
  }
`
const deleteStory = () => {console.log("TODO: Venter på backend"); throw new Error("Ikke implementert")}
interface ResultsProps {
    story: Story
    draft: boolean
}
export function Story({story, draft}: ResultsProps) {
    const router = useRouter()
    const userInfo = useContext(UserState)
    const views = story.views as StoryQuery['story']['views']


    const [showDelete, setShowDelete] = useState(false)
    const [showToken, setShowToken] = useState(false)
    const [deleteError, setDeleteError] = useState('')
    console.log(showToken)

    const onDelete = async () => {
        try {
            await deleteStory()
            await router.push('/')
        } catch (e: any) {
            setDeleteError(e.toString())
        }
    }


    const isOwner =
        userInfo?.groups.some((g: Group) => {
            return g.email === story?.owner?.group
        }) || false

    const menuItems: MenuItem[] = [
        {title:"Slett", func: () => setShowDelete(true) },
        {title:"Vis token", func: () => setShowToken(true) }
    ]

    return (
        <>
            <TopBar type={'Story'}>

                <Name>{story.name}</Name>
                {isOwner && (
                    <EditMenu menuItems={menuItems} />
                )}
            </TopBar>
            {!draft && <MetadataTable created={story.created} lastModified={story.lastModified} owner={story.owner}/>}
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
                            <InView key={id}>
                                {
                                    ({inView, ref }) => {
                                        return inView ?
                                            <div ref={ref}><Plotly id={view.id} draft={draft}/></div> :
                                            <div ref={ref}><LoaderSpinner/></div>
                                    }
                                }
                            </InView>)
                    }
                    if (view.__typename === 'StoryViewVega') {
                        return (
                            <InView key={id}>
                                {
                                    ({inView, ref}) => {
                                        return inView ?
                                            <div ref={ref}><Vega id={view.id} draft={draft}/></div> :
                                            <div ref={ref}><LoaderSpinner/></div>
                                    }
                                }
                            </InView>)
                    }

                    })}
                    </StoryDiv>
            <DeleteModal
                open={showDelete}
                onCancel={() => setShowDelete(false)}
                onConfirm={() => onDelete()}
                name={story.name}
                error={deleteError}
            />
            <TokenModal
                open={showToken}
                onCancel={() => setShowToken(false)}
                id={story.id}
            />
        </>
    )
}

export default Story
