import { ConfirmationPanel } from '@navikt/ds-react'
import styled from 'styled-components'

interface PiiCheckboxInputProps {
  register: any
  watch: any
}
// Until ds-react serves our needs
const ConfirmationPanelWrapper = styled.div`
  margin-top: 8px;

  > div.navds-confirmation-panel {
    background-color: #9bd0b0 !important;
  }
  > div.navds-confirmation-panel--checked {
    background-color: #e3b0a8 !important;
  }
`
export const PiiCheckboxInput = ({
  register,
  watch,
}: PiiCheckboxInputProps) => {
  const piiValue = watch('pii')

  return (
    <ConfirmationPanelWrapper>
      <ConfirmationPanel
        {...register('pii')}
        checked={piiValue}
        label="Personidentifiserende informasjon"
        size="small"
      >
        Dette dataproduktet inneholder {!piiValue && <b> IKKE </b>}
        personidentifiserende informasjon
      </ConfirmationPanel>
    </ConfirmationPanelWrapper>
  )
}

export default PiiCheckboxInput
