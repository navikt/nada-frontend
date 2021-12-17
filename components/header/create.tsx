import styled from 'styled-components'
import React from 'react'
import IconButton from '@mui/material/IconButton'
import {AddCircleFilled} from '@navikt/ds-icons'
import {useRouter} from 'next/router'
import {useUserInfoDetailsQuery} from '../../lib/schema/graphql'

const CreateBox = styled.div`
  white-space: nowrap;
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 10px;
`

export default function Create() {
    const {error, loading, data} = useUserInfoDetailsQuery({partialRefetch: true})
    const userInfo = data?.userInfo
    const router = useRouter()

    if (!error && userInfo)
        return (
            <CreateBox>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="Add new item"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    onClick={async () => await router.push('/dataproduct/new')}
                    color="inherit"
                >
                    <AddCircleFilled/>
                </IconButton>
            </CreateBox>
        )
    return <></>
}
