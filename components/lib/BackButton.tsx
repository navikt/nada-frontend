import { Back } from '@navikt/ds-icons'
import * as React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 1em 0;
  font-size: 20px;
  cursor: pointer;
`

export const BackButton = () => (
  <Container onClick={() => window.history.back()}>
    <Back /> Tilbake
  </Container>
)
