import { Button, Loader } from '@navikt/ds-react'

interface RightJustifiedGiveAccessProps {
  onClick: () => void
  loading?: boolean
}

export const RightJustifiedGiveAccess = ({
  onClick,
  loading,
}: RightJustifiedGiveAccessProps) => (
  <div className="w-full flex justify-end gap-4">
    <Button onClick={onClick}>
      {loading ? (
        <>
          <Loader /> Lagrer
        </>
      ) : (
        'Be om tilgang'
      )}
    </Button>
  </div>
)

export default RightJustifiedGiveAccess
