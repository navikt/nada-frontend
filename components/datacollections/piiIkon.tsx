import styled from 'styled-components'
import { Success, Warning } from '@navikt/ds-icons'
import { navGronn, navRod } from '../../styles/constants'

interface PiiIkonProps {
  pii: boolean
}

const PiiIkonDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5em auto;
  svg {
    margin-right: 0.5em;
  }
`
export const PiiIkon = ({ pii }: PiiIkonProps) =>
  pii ? (
    <PiiIkonDiv>
      <Warning color={navRod} /> Personsensitive data
    </PiiIkonDiv>
  ) : (
    <PiiIkonDiv>
      <Success color={navGronn} />
      Ingen personsensitive data
    </PiiIkonDiv>
  )
