import styled from 'styled-components'
import React from 'react'
import IconButton from '@mui/material/IconButton'
import { Information } from '@navikt/ds-icons'
import { useRouter } from 'next/router'

const HeaderIcon = styled.div`
  white-space: nowrap;
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 10px;
`

export default function About() {
  const router = useRouter()
  return (
    <HeaderIcon>
      <IconButton
        size="large"
        edge="end"
        aria-label="Add new item"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        onClick={async () => await router.push('/about')}
        color="inherit"
      >
        <Information />
      </IconButton>
    </HeaderIcon>
  )
}
