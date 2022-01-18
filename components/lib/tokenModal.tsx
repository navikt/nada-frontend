import * as React from 'react'
import {Copy} from "@navikt/ds-icons";
import {Modal} from '@navikt/ds-react'
import {useStoryTokenQuery} from "../../lib/schema/graphql";
import ErrorMessage from "./error";
import LoaderSpinner from "./spinner";
import styled from "styled-components";
import {useState} from "react";


const TokenBox = styled.span`
border: 1px solid black;
padding 15px;
border-radius: 5px;
background-color: #f0f0f0;
`
const Wrapper = styled.div`
position: relative;
display: inline;

`
const Copied = styled.div`
position: absolute;
right: 20px;
top: -4px;
padding: 1px 5px;
border-radius: 3px;
background-color: #555;
color: #f5f5f5

`

const StyledCopy = styled(Copy)`
margin-left: 10px;
cursor: pointer;
:hover {
    color: #999;
    padding-top: 2px;
}

`
let timeout: NodeJS.Timeout | undefined = undefined

interface tokenModalProps {
    open: boolean
    onCancel: () => void
    id: string
}


export const TokenModal = ({
                               id,
                               open,
                               onCancel,
                           }: tokenModalProps) => {

    const token = useStoryTokenQuery({variables: {id}})
    const [copied, setCopied] = useState(false)
    const copyToClipboard = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, id: string | undefined) => {
        id && navigator.clipboard.writeText(id)
        setCopied(true)
        if (timeout){
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => {setCopied(false); timeout = undefined}, 1500)


    }
    const updateLink = `ds.update(token='${token.data?.storyToken.token}')`

    return (
        <Modal open={open} onClose={onCancel}>
            <Modal.Content>
                <div style={{paddingTop: "100px", paddingBottom: "20px"}}>
                    {token.error && <ErrorMessage error={token.error}/>}
                    {token.loading || !token.data && <LoaderSpinner/>}
                    {token.data && <TokenBox>{updateLink}<Wrapper><StyledCopy
                        onClick={(e) => copyToClipboard(e, updateLink)}/>
                        {copied && <Copied>kopiert</Copied>}
                    </Wrapper>
                    </TokenBox>}
                </div>
            </Modal.Content>
        </Modal>
    )
}
export default TokenModal
