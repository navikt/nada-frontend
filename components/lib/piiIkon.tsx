import { Success, Warning } from '@navikt/ds-icons'
import { navGronn, navRod } from '../../styles/constants'

export const PiiIkon = ({ pii }: { pii: boolean }) =>
  pii ? (
    <div className="flex align-center my-2 mx-auto gap-2">
      <Warning color={navRod} />
      <p>Inneholder personidentifiserende informasjon (PII)</p>
    </div>
  ) : (
    <div className="flex align-center my-2 mx-auto gap-2">
      <Success color={navGronn} />
      <p>
        Inneholder <b>ikke</b> personidentifiserende informasjon (PII)
      </p>
    </div>
  )
