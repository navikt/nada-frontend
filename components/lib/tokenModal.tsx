import * as React from 'react'
import {Modal} from '@navikt/ds-react'
import {useStoryTokenQuery} from "../../lib/schema/graphql";
import ErrorMessage from "./error";
import LoaderSpinner from "./spinner";
import styled from "styled-components";
import Copy from "./copy";


const TokenBox = styled.span`
border: 1px solid black;
padding 15px;
border-radius: 5px;
background-color: #f0f0f0;
`

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
    const updateLink = `ds.update(token='${token.data?.storyToken.token}')`

    return (
        <Modal open={open} onClose={onCancel}>
            <Modal.Content>
                <div style={{paddingTop: "100px", paddingBottom: "20px"}}>
                    {token.error && <ErrorMessage error={token.error}/>}
                    {token.loading || !token.data && <LoaderSpinner/>}
                    {token.data && <TokenBox>{updateLink}<Copy text={updateLink}/>
                    </TokenBox>}
                </div>
            </Modal.Content>
        </Modal>
    )
}
export default TokenModal
